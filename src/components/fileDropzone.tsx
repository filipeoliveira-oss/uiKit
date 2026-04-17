"use client"

import { useCallback, useState } from "react"
import { Upload, FileIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void
  selectedFiles: File[]
}

export function FileDropzone({ onFilesSelected, selectedFiles }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      onFilesSelected([...selectedFiles, ...files])
    }
  }, [onFilesSelected, selectedFiles])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      onFilesSelected([...selectedFiles, ...files])
    }
  }, [onFilesSelected, selectedFiles])

  const removeFile = useCallback((index: number) => {
    onFilesSelected(selectedFiles.filter((_, i) => i !== index))
  }, [onFilesSelected, selectedFiles])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer",
          isDragging
            ? "border-primary bg-primary/10"
            : "border-border hover:border-primary/50 hover:bg-secondary/50"
        )}
      >
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center gap-3">
          <div className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center transition-colors",
            isDragging ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
          )}>
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-foreground font-medium">
              Arraste arquivos aqui ou clique para selecionar
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Suporta qualquer tipo de arquivo
            </p>
          </div>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {selectedFiles.length} arquivo{selectedFiles.length !== 1 ? "s" : ""} selecionado{selectedFiles.length !== 1 ? "s" : ""}
          </p>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity text-sm px-2"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
