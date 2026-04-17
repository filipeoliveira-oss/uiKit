"use client"

import { Button } from "@/uiKit/components/button/button"
import { Copy, Check, Terminal } from "lucide-react"
import { useState, useEffect } from "react"

const cliCommands = [
  { command: "npx fouikit", description: "Lista todos os elementos disponíveis" },
  { command: "npx fouikit add button", description: "Adicionar componente" },
]

export default function CliSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [typedText, setTypedText] = useState("")
  const fullText = "npx fouikit add button"

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 80)

    return () => clearInterval(interval)
  }, [])

  const handleCopy = (command: string, index: number) => {
    navigator.clipboard.writeText(command)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <section id="cli" className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
              <Terminal className="h-4 w-4" />
              CLI-first workflow
            </div>

            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Um comando.{" "}
              <span className="text-primary">Código no seu projeto.</span>
            </h2>

            <p className="max-w-lg text-muted-foreground">
              Sem configurações complexas, sem dependências para gerenciar. O CLI do fouikit copia 
              o código diretamente para o seu projeto, dando controle total sobre cada linha.
            </p>

            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Check className="h-3 w-3" />
                </div>
                Componentes copiados, não instalados
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Check className="h-3 w-3" />
                </div>
                Personalize como quiser
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Check className="h-3 w-3" />
                </div>
                Zero dependências externas
              </li>
            </ul>
          </div>

          {/* Right content - Terminal */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-muted-foreground">terminal</span>
              </div>

              {/* Terminal content */}
              <div className="space-y-4 p-6">
                {/* Typing animation */}
                <div className="flex items-center gap-2 font-mono text-sm">
                  <span className="text-muted-foreground">$</span>
                  <span className="text-foreground">{typedText}</span>
                  <span className="animate-pulse text-primary">|</span>
                </div>

                {/* Output */}
                <div className="space-y-1 font-mono text-sm text-muted-foreground">
                  <p className="text-green-500">✓ Button component added</p>
                  <p className="text-muted-foreground/60">→ components/uiKit/button.tsx</p>
                  <p className="text-muted-foreground/60">→ styles/button.css</p>
                </div>

                {/* Divider */}
                <div className="border-t border-border pt-4">
                  <p className="mb-3 text-xs text-muted-foreground">Comandos disponíveis:</p>
                  <div className="space-y-2">
                    {cliCommands.map((item, index) => (
                      <div
                        key={item.command}
                        className="group flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2"
                      >
                        <div className="flex items-center gap-3">
                          <code className="font-mono text-sm">{item.command}</code>
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => handleCopy(item.command, index)}
                        >
                          {copiedIndex === index ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-4 -z-10 rounded-xl bg-primary/5 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
