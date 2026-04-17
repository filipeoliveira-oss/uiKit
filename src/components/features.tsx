import { Zap, Package, Terminal, Rocket } from "lucide-react"

const features = [
    {
        icon: Package,
        title: "Sem instalação",
        description: "Copie componentes diretamente para o seu projeto. Sem pacotes npm, sem dependências externas.",
    },
    {
        icon: Zap,
        title: "Leve e rápido",
        description: "Código otimizado e minimalista. Cada componente é independente e pronto para usar.",
    },
    {
        icon: Terminal,
        title: "CLI poderoso",
        description: "Adicione componentes com um comando. O CLI cuida de tudo automaticamente.",
    },
    {
        icon: Rocket,
        title: "Pronto para produção",
        description: "Componentes testados e acessíveis. Compatíveis com React 18+ e Next.js.",
    },
]

export default function Features() {
    return (
        <section className="border-t border-border bg-secondary/30 py-20 md:py-28">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                        Por que escolher fouikit?
                    </h2>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        Desenvolvido para velocidade e simplicidade. Foque no que importa: construir seu produto.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                        >
                            <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 font-semibold">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
