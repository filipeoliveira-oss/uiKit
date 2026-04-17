"use client"

import { cn } from "@/lib/utils"
import { Wifi, WifiOff, Loader2 } from "lucide-react"

interface ConnectionStatusProps {
  status: "idle" | "waiting" | "connecting" | "connected"
  isHost: boolean
}

export function ConnectionStatus({ status, isHost }: ConnectionStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "connected":
        return {
          icon: Wifi,
          label: "Conectado",
          color: "text-primary",
          bgColor: "bg-primary/10",
          pulse: false
        }
      case "waiting":
        return {
          icon: Loader2,
          label: isHost ? "Aguardando conexão..." : "Procurando host...",
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          pulse: true
        }
      case "connecting":
        return {
          icon: Loader2,
          label: "Conectando...",
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          pulse: true
        }
      default:
        return {
          icon: WifiOff,
          label: "Desconectado",
          color: "text-muted-foreground",
          bgColor: "bg-muted",
          pulse: false
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
      config.bgColor,
      config.color
    )}>
      <Icon className={cn("w-4 h-4", config.pulse && "animate-spin")} />
      <span>{config.label}</span>
    </div>
  )
}
