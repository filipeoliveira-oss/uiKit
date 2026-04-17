"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import type { Peer as PeerType, DataConnection } from "peerjs"

export interface FileMetadata {
  id: string
  name: string
  size: number
  type: string
}

export interface TransferProgress {
  fileId: string
  fileName: string
  progress: number
  speed: number
  status: "pending" | "transferring" | "completed" | "error"
}

// 16KB chunks for optimal transfer speed
const CHUNK_SIZE = 16384

// Dynamic import for PeerJS - browser only library
async function importPeer() {
  const { default: Peer } = await import("peerjs")
  return Peer
}

export function usePeer() {
  const [peerId, setPeerId] = useState<string>("")
  const [isHost, setIsHost] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [files, setFiles] = useState<FileMetadata[]>([])
  const [transfers, setTransfers] = useState<TransferProgress[]>([])
  const [error, setError] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "waiting" | "connecting" | "connected">("idle")

  const peerRef = useRef<PeerType | null>(null)
  const connectionRef = useRef<DataConnection | null>(null)
  const filesRef = useRef<Map<string, File>>(new Map())
  const receivedChunksRef = useRef<Map<string, ArrayBuffer[]>>(new Map())
  const fileMetadataRef = useRef<Map<string, FileMetadata>>(new Map())
  const transferStartTimeRef = useRef<Map<string, number>>(new Map())
  const transferredBytesRef = useRef<Map<string, number>>(new Map())
  const isHostRef = useRef(false)

  const generatePeerId = useCallback(() => {
    return "pd-" + Math.random().toString(36).substring(2, 8).toUpperCase()
  }, [])

  const updateTransferProgress = useCallback((fileId: string, progress: number, status: TransferProgress["status"]) => {
    const startTime = transferStartTimeRef.current.get(fileId) || Date.now()
    const transferred = transferredBytesRef.current.get(fileId) || 0
    const elapsed = (Date.now() - startTime) / 1000
    const speed = elapsed > 0 ? transferred / elapsed : 0

    setTransfers(prev => {
      const existing = prev.find(t => t.fileId === fileId)
      if (existing) {
        return prev.map(t => t.fileId === fileId ? { ...t, progress, speed, status } : t)
      }
      const metadata = fileMetadataRef.current.get(fileId)
      return [...prev, {
        fileId,
        fileName: metadata?.name || "Arquivo",
        progress,
        speed,
        status
      }]
    })
  }, [])

  const handleData = useCallback(async (data: unknown) => {
    try {
      if (typeof data === "object" && data !== null && "type" in data) {
        const message = data as { type: string; [key: string]: unknown }
        
        if (message.type === "file-list") {
          const fileList = message.files as FileMetadata[]
          setFiles(fileList)
          fileList.forEach((f: FileMetadata) => fileMetadataRef.current.set(f.id, f))
        } else if (message.type === "file-request") {
          const fileId = message.fileId as string
          const file = filesRef.current.get(fileId)
          if (file && connectionRef.current) {
            const conn = connectionRef.current
            const metadata: FileMetadata = {
              id: fileId,
              name: file.name,
              size: file.size,
              type: file.type
            }
            conn.send({ type: "file-start", metadata })
            
            transferStartTimeRef.current.set(fileId, Date.now())
            transferredBytesRef.current.set(fileId, 0)
            updateTransferProgress(fileId, 0, "transferring")

            const arrayBuffer = await file.arrayBuffer()
            const totalChunks = Math.ceil(arrayBuffer.byteLength / CHUNK_SIZE)
            
            for (let i = 0; i < totalChunks; i++) {
              const start = i * CHUNK_SIZE
              const end = Math.min(start + CHUNK_SIZE, arrayBuffer.byteLength)
              const chunk = arrayBuffer.slice(start, end)
              
              conn.send({ type: "file-chunk", fileId, chunk, index: i })
              transferredBytesRef.current.set(fileId, end)
              updateTransferProgress(fileId, Math.round((end / arrayBuffer.byteLength) * 100), "transferring")
              
              // Small delay to prevent overwhelming the connection
              if (i % 10 === 0) {
                await new Promise(resolve => setTimeout(resolve, 1))
              }
            }
            
            conn.send({ type: "file-end", fileId })
            updateTransferProgress(fileId, 100, "completed")
          }
        } else if (message.type === "file-start") {
          const metadata = message.metadata as FileMetadata
          fileMetadataRef.current.set(metadata.id, metadata)
          receivedChunksRef.current.set(metadata.id, [])
          transferStartTimeRef.current.set(metadata.id, Date.now())
          transferredBytesRef.current.set(metadata.id, 0)
          updateTransferProgress(metadata.id, 0, "transferring")
        } else if (message.type === "file-chunk") {
          const fileId = message.fileId as string
          const chunk = message.chunk as ArrayBuffer
          const chunks = receivedChunksRef.current.get(fileId) || []
          chunks.push(chunk)
          receivedChunksRef.current.set(fileId, chunks)
          
          const metadata = fileMetadataRef.current.get(fileId)
          if (metadata) {
            const totalReceived = chunks.reduce((acc, c) => acc + c.byteLength, 0)
            transferredBytesRef.current.set(fileId, totalReceived)
            updateTransferProgress(fileId, Math.round((totalReceived / metadata.size) * 100), "transferring")
          }
        } else if (message.type === "file-end") {
          const fileId = message.fileId as string
          const chunks = receivedChunksRef.current.get(fileId) || []
          const metadata = fileMetadataRef.current.get(fileId)
          
          if (metadata && chunks.length > 0) {
            const blob = new Blob(chunks, { type: metadata.type })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = metadata.name
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
            
            updateTransferProgress(fileId, 100, "completed")
            receivedChunksRef.current.delete(fileId)
          }
        }
      }
    } catch (err) {
      console.error("Error handling data:", err)
    }
  }, [updateTransferProgress])

  const setupConnection = useCallback((conn: DataConnection) => {
    connectionRef.current = conn
    
    conn.on("open", () => {
      setIsConnected(true)
      setConnectionStatus("connected")
      setError(null)
      
      // If host, send file list
      if (isHostRef.current) {
        const fileList = Array.from(filesRef.current.entries()).map(([id, file]) => ({
          id,
          name: file.name,
          size: file.size,
          type: file.type
        }))
        conn.send({ type: "file-list", files: fileList })
      }
    })
    
    conn.on("data", handleData)
    
    conn.on("close", () => {
      setIsConnected(false)
      setConnectionStatus("idle")
      connectionRef.current = null
      if (!isHostRef.current) {
        setError("Conexão encerrada pelo host")
      }
    })
    
    conn.on("error", (err) => {
      console.error("Connection error:", err)
      setError("Erro na conexão: " + err.message)
    })
  }, [handleData])

  const createHost = useCallback(async (selectedFiles: File[]) => {
    const id = generatePeerId()
    const Peer = await importPeer()
    
    return new Promise<string>((resolve, reject) => {
      const peer = new Peer(id)
      peerRef.current = peer
      
      peer.on("open", (peerId) => {
        setPeerId(peerId)
        setIsHost(true)
        isHostRef.current = true
        setConnectionStatus("waiting")
        
        filesRef.current.clear()
        selectedFiles.forEach(file => {
          const fileId = Math.random().toString(36).substring(2, 10)
          filesRef.current.set(fileId, file)
        })
        
        const fileList = Array.from(filesRef.current.entries()).map(([fileId, file]) => ({
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type
        }))
        setFiles(fileList)
        
        resolve(peerId)
      })
      
      peer.on("connection", (conn) => {
        setupConnection(conn)
      })
      
      peer.on("error", (err) => {
        console.error("Peer error:", err)
        setError("Erro ao criar sala: " + err.message)
        setConnectionStatus("idle")
        reject(err)
      })
      
      peer.on("disconnected", () => {
        setConnectionStatus("idle")
      })
    })
  }, [generatePeerId, setupConnection])

  const joinPeer = useCallback(async (hostId: string) => {
    setIsHost(false)
    isHostRef.current = false
    setConnectionStatus("connecting")
    setError(null)

    const Peer = await importPeer()
    
    return new Promise<void>((resolve, reject) => {
      const peer = new Peer()
      peerRef.current = peer
      
      peer.on("open", () => {
        setPeerId(peer.id || "")
        
        const conn = peer.connect(hostId, { reliable: true })
        setupConnection(conn)
        
        conn.on("open", () => {
          resolve()
        })
        
        conn.on("error", (err) => {
          setError("Não foi possível conectar ao host")
          setConnectionStatus("idle")
          reject(err)
        })
      })
      
      peer.on("error", (err) => {
        console.error("Peer error:", err)
        if (err.type === "peer-unavailable") {
          setError("Host não encontrado. Verifique o código e tente novamente.")
        } else {
          setError("Erro de conexão: " + err.message)
        }
        setConnectionStatus("idle")
        reject(err)
      })
      
      // Timeout
      setTimeout(() => {
        if (!connectionRef.current || connectionRef.current.open === false) {
          setError("Tempo esgotado ao conectar")
          setConnectionStatus("idle")
          reject(new Error("Connection timeout"))
        }
      }, 15000)
    })
  }, [setupConnection])

  const requestFile = useCallback((fileId: string) => {
    if (connectionRef.current?.open) {
      const metadata = fileMetadataRef.current.get(fileId)
      if (metadata) {
        setTransfers(prev => [...prev.filter(t => t.fileId !== fileId), {
          fileId,
          fileName: metadata.name,
          progress: 0,
          speed: 0,
          status: "pending"
        }])
      }
      connectionRef.current.send({ type: "file-request", fileId })
    }
  }, [])

  const disconnect = useCallback(() => {
    if (connectionRef.current) {
      connectionRef.current.close()
      connectionRef.current = null
    }
    if (peerRef.current) {
      peerRef.current.destroy()
      peerRef.current = null
    }
    setIsConnected(false)
    setConnectionStatus("idle")
    setPeerId("")
    setFiles([])
    setTransfers([])
    setError(null)
    filesRef.current.clear()
    isHostRef.current = false
  }, [])

  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return {
    peerId,
    isHost,
    isConnected,
    connectionStatus,
    files,
    transfers,
    error,
    createHost,
    joinPeer,
    requestFile,
    disconnect
  }
}
