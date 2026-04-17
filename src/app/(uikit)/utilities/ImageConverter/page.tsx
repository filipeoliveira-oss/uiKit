'use client'

import { useRef, useState } from 'react'

type FileItem = {
    id: string
    file: File
    targetFormat: string
    progress: number
    status: 'idle' | 'converting' | 'done'
    resultUrl?: string
}


const formats = [
    'png', 'jpg', 'jpeg', 'webp', 'avif', 'tiff', 'ico'
]

const canvasSupported = ['png', 'jpg', 'jpeg', 'webp']

export default function ImageConverter() {
    const [files, setFiles] = useState<FileItem[]>([])
    const [dragOver, setDragOver] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFiles = (fileList: FileList | null) => {
        if (!fileList) return

        const newFiles: FileItem[] = Array.from(fileList).map((file) => ({
            id: crypto.randomUUID(),
            file,
            targetFormat: 'png',
            progress: 0,
            status: 'idle'
        }))

        setFiles((prev) => [...prev, ...newFiles])
    }

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(false)
        handleFiles(e.dataTransfer.files)
    }

    const uploadWithProgress = (
        item: FileItem,
        onProgress: (progress: number) => void
    ) => {
        return new Promise<string>((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.open('POST', '/api/convert')
            xhr.responseType = 'blob'

            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    const percent = (e.loaded / e.total) * 100
                    onProgress(percent)
                }
            }

            xhr.onload = () => {
                if (xhr.status === 200) {
                    const blob = xhr.response
                    resolve(URL.createObjectURL(blob))
                } else {
                    reject()
                }
            }

            xhr.onerror = reject

            const formData = new FormData()
            formData.append('file', item.file)
            formData.append('format', item.targetFormat)

            xhr.send(formData)
        })
    }

    const runQueue = async (tasks: (() => Promise<void>)[], limit = 3) => {
        let i = 0

        const workers = Array.from({ length: limit }).map(async () => {
            while (i < tasks.length) {
                const current = i++
                await tasks[current]()
            }
        })

        await Promise.all(workers)
    }

    const handleConvert = async () => {
        const tasks = files.map((item) => {
            return async () => {
                setFiles((prev) =>
                    prev.map((f) =>
                        f.id === item.id ? { ...f, status: 'converting', progress: 0 } : f
                    )
                )

                try {
                    const resultUrl = await uploadWithProgress(item, (progress) => {
                        setFiles((prev) =>
                            prev.map((f) =>
                                f.id === item.id ? { ...f, progress } : f
                            )
                        )
                    })

                    setFiles((prev) =>
                        prev.map((f) =>
                            f.id === item.id
                                ? { ...f, status: 'done', progress: 100, resultUrl }
                                : f
                        )
                    )
                } catch {
                    setFiles((prev) =>
                        prev.map((f) =>
                            f.id === item.id
                                ? { ...f, status: 'idle', progress: 0 }
                                : f
                        )
                    )
                }
            }
        })

        await runQueue(tasks, 3)
    }

    const downloadAll = () => {
        files.forEach((f) => {
            if (f.resultUrl) {
                const a = document.createElement('a')
                a.href = f.resultUrl
                a.download = `${f.file.name.split('.')[0]}.${f.targetFormat}`
                a.click()
            }
        })
    }

    const allDone = files.length > 0 && files.every(f => f.status === 'done')

    return (
        <div className="h-full px-6 pb-16 relative">

            {/* GRID BACKGROUND */}
            <div className="max-w-3xl mx-auto relative z-10">

                {/* HEADER */}
                <div className="pt-14 pb-10 space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                        Converta <span className="text-primary">qualquer formato</span>,
                        <br />
                        em segundos.
                    </h1>

                    <p className="text-sm max-w-md">
                        Selecione suas imagens abaixo e escolha um formato para cada
                    </p>
                </div>

                {/* DROPZONE */}
                <div
                    onDrop={onDrop}
                    onDragOver={(e) => {
                        e.preventDefault()
                        setDragOver(true)
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onClick={() => inputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition
          ${dragOver
                            ? 'border-primary bg-primary/10'
                            : 'border-border '
                        }`}
                >
                    <p className="text-base font-medium">
                        Arraste suas imagens para cá
                    </p>
                    <p className="text-sm ">
                        ou <span className=" underline">clique para selecionar</span>
                    </p>

                    <input
                        ref={inputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFiles(e.target.files)}
                    />
                </div>

                {/* FILE LIST */}
                <div className="mt-6 space-y-3 ">
                    {files.map((item) => (
                        <div
                            key={item.id}
                            className=" border border-border rounded-xl p-4 flex gap-4 items-center"
                        >
                            {/* LEFT */}
                            <div className="flex-1 min-w-0 space-y-2">
                                <p className="truncate text-sm font-medium">
                                    {item.file.name}
                                </p>

                                {/* PROGRESS */}
                                <div className="h-1 bg-[#0c2830] rounded overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all"
                                        style={{ width: `${item.progress}%` }}
                                    />
                                </div>

                                <p className="text-xs text-primary">
                                    {item.status === 'done'
                                        ? 'Convertido ✓'
                                        : item.status === 'converting'
                                            ? 'Convertendo...'
                                            : 'Pronto'}
                                </p>
                            </div>

                            {/* SELECT */}
                            <select
                                value={item.targetFormat}
                                onChange={(e) =>
                                    setFiles((prev) =>
                                        prev.map((f) =>
                                            f.id === item.id
                                                ? { ...f, targetFormat: e.target.value }
                                                : f
                                        )
                                    )
                                }
                                className="border border-border rounded px-2 py-1 text-xs "
                            >
                                {formats.map((f) => (
                                    <option key={f}>{f}</option>
                                ))}
                            </select>

                            {/* DOWNLOAD */}
                            {item.resultUrl && (
                                <a
                                    href={item.resultUrl}
                                    download
                                    className="text-xs px-3 py-1 rounded border border-border transition hover:scale-95"
                                >
                                    Baixar
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                {/* ACTIONS */}
                {files.length > 0 && (
                    <div className="flex gap-3 mt-6 border-t border-border pt-6">
                        <button
                            onClick={handleConvert}
                            className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:brightness-110 transition cursor-pointer"
                        >
                            Converter arquivos
                        </button>

                        <button
                            onClick={downloadAll}
                            disabled={!allDone}
                            className="px-4 py-3 rounded-xl border border-border disabled:opacity-30 cursor-pointer"
                        >
                            Baixar todos
                        </button>

                        <button
                            onClick={() => setFiles([])}
                            className="ml-auto text-sm text-red-400 cursor-pointer"
                        >
                            Limpar
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}