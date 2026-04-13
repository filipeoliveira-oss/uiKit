"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Share2, ArrowRight, X, AlertCircle } from "lucide-react"

import { usePeer } from "@/lib/hooks/use-peer"
import { FileDropzone } from "@/components/fileDropzone"
import { Button } from "@/uiKit/components/button/button"
import { FileList } from "@/components/fileList"
import { ConnectionStatus } from "@/components/connectionStatus"
import { ShareLink } from "@/components/shareLink"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card"

type ViewState = "home" | "host" | "join" | "connected"

export default function Page() {
    const searchParams = useSearchParams()
    const [view, setView] = useState<ViewState>("home")
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [joinCode, setJoinCode] = useState("")
    const [joinError, setJoinError] = useState<string | null>(null)

    const {
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
    } = usePeer()

    useEffect(() => {
        const joinParam = searchParams.get("join")
        if (joinParam && view === "home") {
            setJoinCode(joinParam)
            setView("join")
        }
    }, [searchParams, view])

    useEffect(() => {
        if (isConnected) {
            setView("connected")
        }
    }, [isConnected])

    const handleCreateRoom = useCallback(async () => {
        if (selectedFiles.length === 0) return
        await createHost(selectedFiles)
        setView("connected")
    }, [selectedFiles, createHost])

    const handleJoinRoom = useCallback(async () => {
        if (!joinCode.trim()) return
        setJoinError(null)
        try {
            await joinPeer(joinCode.trim())
        } catch (err) {
            setJoinError("Não foi possível conectar. Verifique o código e tente novamente.")
        }
    }, [joinCode, joinPeer])

    const handleDisconnect = useCallback(() => {
        disconnect()
        setView("home")
        setSelectedFiles([])
        setJoinCode("")
        setJoinError(null)
    }, [disconnect])

    const renderHome = () => (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                    <Share2 className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                    PeerDrop
                </h1>
                <p className="text-lg text-muted-foreground max-w-md mx-auto text-pretty">
                    Compartilhe arquivos diretamente entre navegadores. Sem servidor, sem upload, sem limites.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 w-full max-w-2xl">
                <Card
                    className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                    onClick={() => setView("host")}
                >
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Share2 className="w-4 h-4 text-primary" />
                            </div>
                            Enviar arquivos
                        </CardTitle>
                        <CardDescription>
                            Selecione arquivos e compartilhe com um código único
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card
                    className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                    onClick={() => setView("join")}
                >
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <ArrowRight className="w-4 h-4 text-primary" />
                            </div>
                            Receber arquivos
                        </CardTitle>
                        <CardDescription>
                            Digite o código para conectar e baixar arquivos
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <div className="mt-12 text-center text-sm text-muted-foreground max-w-md">
                <p>
                    Os arquivos são transferidos diretamente entre navegadores usando WebRTC.
                    Se você fechar esta página, a conexão será encerrada.
                </p>
            </div>
        </div>
    )

    const renderHost = () => (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Compartilhar arquivos</CardTitle>
                        <CardDescription>Selecione os arquivos que deseja enviar</CardDescription>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            setView("home")
                            setSelectedFiles([])
                        }}
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    <FileDropzone
                        onFilesSelected={setSelectedFiles}
                        selectedFiles={selectedFiles}
                    />
                    <Button
                        className="w-full"
                        size="default"
                        disabled={selectedFiles.length === 0}
                        onClick={handleCreateRoom}
                    >
                        Criar sala de compartilhamento
                    </Button>
                </CardContent>
            </Card>
        </div>
    )

    const renderJoin = () => (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Entrar em uma sala</CardTitle>
                        <CardDescription>Digite o código para conectar</CardDescription>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            setView("home")
                            setJoinCode("")
                            setJoinError(null)
                        }}
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <input
                            type="text"
                            value={joinCode}
                            onChange={(e) => {
                                const value = e.target.value
                                // Keep pd- prefix lowercase, uppercase the rest
                                if (value.toLowerCase().startsWith("pd-")) {
                                    setJoinCode("pd-" + value.slice(3).toUpperCase())
                                } else {
                                    setJoinCode(value.toUpperCase())
                                }
                                setJoinError(null)
                            }}
                            placeholder="Ex: pd-ABC123"
                            className="w-full px-4 py-3 text-xl font-mono tracking-wider text-center bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                            maxLength={12}
                        />
                        {joinError && (
                            <div className="flex items-center gap-2 text-destructive text-sm">
                                <AlertCircle className="w-4 h-4" />
                                <span>{joinError}</span>
                            </div>
                        )}
                    </div>
                    <Button
                        className="w-full"
                        size="default"
                        disabled={joinCode.length < 9 || connectionStatus === "connecting"}
                        onClick={handleJoinRoom}
                    >
                        {connectionStatus === "connecting" ? "Conectando..." : "Conectar"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )

    const renderConnected = () => (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                        <ConnectionStatus status={connectionStatus} isHost={isHost} />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleDisconnect}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                            Desconectar
                        </Button>
                    </div>
                    <CardTitle>
                        {isHost ? "Compartilhando arquivos" : "Arquivos disponíveis"}
                    </CardTitle>
                    <CardDescription>
                        {isHost
                            ? "Compartilhe o código abaixo para que outros possam baixar"
                            : "Selecione os arquivos que deseja baixar"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {isHost && peerId && (
                        <ShareLink peerId={peerId} />
                    )}

                    <FileList
                        files={files}
                        transfers={transfers}
                        onRequestFile={requestFile}
                        isHost={isHost}
                    />

                    {error && (
                        <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-lg">
                            <AlertCircle className="w-4 h-4" />
                            <span>{error}</span>
                        </div>
                    )}

                    {isHost && (
                        <div className="text-center text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
                            <p className="font-medium mb-1">Importante</p>
                            <p>Mantenha esta página aberta. Se você fechar, a conexão será encerrada.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )

    switch (view) {
        case "host":
            return renderHost()
        case "join":
            return renderJoin()
        case "connected":
            return renderConnected()
        default:
            return renderHome()
    }
}
