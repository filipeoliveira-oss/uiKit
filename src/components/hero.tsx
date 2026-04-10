"use client"

import { Button } from "@/uiKit/components/button/button"
import { ArrowRight, Copy, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const floatingComponents = [
    { name: "Button", code: "<Button variant=\"primary\">Click me</Button>" },
    { name: "Input", code: "<Input placeholder=\"Email...\" />" },
    { name: "Card", code: "<Card><CardContent>...</CardContent></Card>" },
    { name: "Dialog", code: "<Dialog><DialogTrigger>Open</DialogTrigger></Dialog>" },
]

export default function Hero() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

    const copyCode = (code: string, index: number) => {
        navigator.clipboard.writeText(code)
        setCopiedIndex(index)
        setTimeout(() => setCopiedIndex(null), 2000)
    }

    const handleScrollIntoView = (element: HTMLElement) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    }

    return (
        <section className="relative overflow-hidden py-20 md:py-32" id="hero">
            {/* Background gradient */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
                <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 rounded-full bg-primary/10 blur-[100px]" />
            </div>

            <div className="container mx-auto max-w-6xl px-4">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left content */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                            </span>
                            Open Source
                        </div>

                        <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                            Copie componentes React reais.{" "}
                            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Envie mais rápido.
                            </span>
                        </h1>

                        <p className="max-w-lg text-pretty text-lg text-muted-foreground md:text-xl">
                            Sem instalações. Sem dependências. Apenas código. Copie componentes diretamente para o seu projeto via CLI.
                        </p>

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link href={'/components'}>
                                <Button size="default" className="gap-2 ">
                                    Explorar Componentes
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Button size="default" variant="outline" className="gap-2" onClick={() => handleScrollIntoView(document.getElementById('cli')!)}>
                                Ver uso do CLI
                            </Button>
                        </div>

                        {/* CLI preview */}
                        <div className="rounded-lg border border-border bg-card p-4">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-muted-foreground">$</span>
                                <code className="font-mono text-foreground">npx fouikit add button</code>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="ml-auto h-8 w-8"
                                    onClick={() => copyCode("npx fouikit add button", -1)}
                                >
                                    {copiedIndex === -1 ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right content - Floating cards */}
                    <div className="relative hidden lg:block">
                        <div className="relative h-[500px]">
                            {floatingComponents.map((component, index) => (
                                <div
                                    key={component.name}
                                    className="absolute cursor-pointer rounded-xl border border-border bg-card/80 p-4 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-primary/10"
                                    style={{
                                        top: `${index * 25}%`,
                                        left: `${(index % 2) * 30}%`,
                                        animationDelay: `${index * 0.1}s`,
                                    }}
                                >
                                    <div className="mb-2 flex items-center justify-between gap-8">
                                        <span className="text-sm font-medium">{component.name}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => copyCode(component.code, index)}
                                        >
                                            {copiedIndex === index ? (
                                                <Check className="h-3 w-3 text-green-500" />
                                            ) : (
                                                <Copy className="h-3 w-3" />
                                            )}
                                        </Button>
                                    </div>
                                    <pre className="text-xs text-muted-foreground">
                                        <code className="font-mono">{component.code}</code>
                                    </pre>
                                </div>
                            ))}

                            {/* Decorative elements */}
                            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full border border-border/30 opacity-50" />
                            <div className="absolute -bottom-5 -right-5 h-20 w-20 rounded-full border border-border/50 opacity-50" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
