"use client"

import { useState, useCallback } from "react"
import { Copy, Check, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/uiKit/components/button/button"

interface ShareLinkProps {
  peerId: string
}

export function ShareLink({ peerId }: ShareLinkProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = useCallback(async () => {
    const url = `${window.location.origin}/utilities/peerDrop?join=${peerId}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [peerId])

  const copyCode = useCallback(async () => {
    await navigator.clipboard.writeText(peerId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [peerId])

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">Código da sala</p>
        <div className="flex items-center justify-center gap-2">
          <code className="text-xl font-bold tracking-wider text-primary bg-primary/10 px-4 py-3 rounded-lg">
            {peerId}
          </code>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyCode}
            className="text-muted-foreground hover:text-foreground"
          >
            {copied ? <Check className="w-5 h-5 text-primary" /> : <Copy className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">ou</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={copyToClipboard}
      >
        <Link2 className={cn("w-4 h-4 mr-2", copied && "text-primary")} />
        {copied ? "Link copiado!" : "Copiar link de convite"}
      </Button>
    </div>
  )
}
