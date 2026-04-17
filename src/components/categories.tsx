"use client"

import { Layers, Code2, Loader2, Wrench, ArrowRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    icon: Layers,
    title: "Componentes",
    description: "Buttons, Cards, Modals, Forms...",
    count: 23,
    href: "/components",
    color: "from-blue-500/20 to-blue-600/5",
  },
  {
    icon: Code2,
    title: "Hooks",
    description: "useLocalStorage, useDebounce, useMediaQuery e hooks utilitários essenciais.",
    count: 7,
    href: "/hooks",
    color: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    icon: Loader2,
    title: "Loaders",
    description: "Spinners, Progress bars e indicadores de carregamento animados.",
    count: 10,
    href: "/loaders",
    color: "from-amber-500/20 to-amber-600/5",
  },
  {
    icon: Wrench,
    title: "Utilitários",
    description: "Conversor de imagens, transferência P2P, formatadores e ferramentas práticas.",
    count: 2,
    href: "/utilities",
    color: "from-rose-500/20 to-rose-600/5",
  },
]

export default function Categories() {
  return (
    <section id="categories" className="py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Explore por categoria
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Encontre exatamente o que você precisa. Tudo organizado e pronto para copiar.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              
              <div className="relative">
                <div className="mb-4 inline-flex rounded-xl bg-secondary p-3 transition-colors group-hover:bg-primary/10">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>

                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                  <span className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
                    {category.count} itens
                  </span>
                </div>

                <p className="mb-4 text-muted-foreground">{category.description}</p>

                <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Explorar
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
