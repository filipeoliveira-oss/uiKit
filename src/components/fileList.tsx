"use client"

import { FileIcon, Download, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { FileMetadata, TransferProgress } from "@/lib/hooks/use-peer"
import { Button } from "@/uiKit/components/button/button"

interface FileListProps {
  files: FileMetadata[]
  transfers: TransferProgress[]
  onRequestFile: (fileId: string) => void
  isHost: boolean
}

export function FileList({ files, transfers, onRequestFile, isHost }: FileListProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatSpeed = (bytesPerSecond: number) => {
    if (bytesPerSecond === 0) return "0 B/s"
    const k = 1024
    const sizes = ["B/s", "KB/s", "MB/s", "GB/s"]
    const i = Math.floor(Math.log(bytesPerSecond) / Math.log(k))
    return parseFloat((bytesPerSecond / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getTransfer = (fileId: string) => transfers.find(t => t.fileId === fileId)

  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <FileIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>Nenhum arquivo disponível</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        Arquivos disponíveis ({files.length})
      </h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {files.map((file) => {
          const transfer = getTransfer(file.id)
          const isTransferring = transfer?.status === "transferring" || transfer?.status === "pending"
          const isCompleted = transfer?.status === "completed"

          return (
            <div
              key={file.id}
              className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg border border-border/50"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{formatFileSize(file.size)}</span>
                  {transfer && transfer.status !== "completed" && (
                    <>
                      <span>•</span>
                      <span>{transfer.progress}%</span>
                      {transfer.speed > 0 && (
                        <>
                          <span>•</span>
                          <span>{formatSpeed(transfer.speed)}</span>
                        </>
                      )}
                    </>
                  )}
                </div>
                {isTransferring && (
                  <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${transfer?.progress || 0}%` }}
                    />
                  </div>
                )}
              </div>
              {!isHost && (
                <Button
                  size="sm"
                  variant={isCompleted ? "ghost" : "primary"}
                  disabled={isTransferring}
                  onClick={() => onRequestFile(file.id)}
                  className={cn(
                    "flex-shrink-0",
                    isCompleted && "text-primary"
                  )}
                >
                  {isTransferring ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-1" />
                      Baixar
                    </>
                  )}
                </Button>
              )}
              {isHost && isTransferring && (
                <div className="flex-shrink-0 text-xs text-primary">
                  Enviando...
                </div>
              )}
              {isHost && isCompleted && (
                <div className="flex-shrink-0">
                  <Check className="w-4 h-4 text-primary" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
