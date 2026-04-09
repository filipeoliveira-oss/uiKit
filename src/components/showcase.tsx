"use client"

import { Button } from "@/uiKit/components/button/button"
import { Copy, Check, Eye } from "lucide-react"
import { useState } from "react"

const showcaseComponents = [
  {
    name: "Button",
    preview: (
      <div className="flex flex-wrap gap-2">
        <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Primary</button>
        <button className="rounded-md border border-border px-4 py-2 text-sm">Outline</button>
      </div>
    ),
  },
  {
    name: "Input",
    preview: (
      <input
        type="text"
        placeholder="Digite seu email..."
        className="w-full rounded-md border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary"
      />
    ),
  },
  {
    name: "Badge",
    preview: (
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">Novo</span>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs">Default</span>
        <span className="rounded-full border border-border px-3 py-1 text-xs">Outline</span>
      </div>
    ),
  },
  {
    name: "Card",
    preview: (
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="mb-1 text-sm font-medium">Card Title</h4>
        <p className="text-xs text-muted-foreground">Card description goes here.</p>
      </div>
    ),
  },
  {
    name: "Avatar",
    preview: (
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">JD</div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-medium">AB</div>
      </div>
    ),
  },
  {
    name: "Switch",
    preview: (
      <div className="flex items-center gap-3">
        <div className="relative h-6 w-11 rounded-full bg-primary">
          <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-primary-foreground shadow-sm" />
        </div>
        <span className="text-sm">Ativado</span>
      </div>
    ),
  },
]

export default function Showcase() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = (index: number) => {
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <section id="components" className="border-t border-border bg-secondary/30 py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Componentes em destaque
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Uma prévia do que você encontra. Cada componente é customizável e pronto para produção.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {showcaseComponents.map((component, index) => (
            <div
              key={component.name}
              className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-medium">{component.name}</h3>
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleCopy(index)}
                  >
                    {copiedIndex === index ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex min-h-[80px] items-center justify-center rounded-lg bg-secondary/50 p-4">
                {component.preview}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="default" variant="outline" className="gap-2">
            Ver todos os componentes
            <span className="rounded bg-secondary px-2 py-0.5 text-xs">50+</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
