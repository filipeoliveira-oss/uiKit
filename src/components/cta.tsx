
import { Button } from "@/uiKit/components/button/button"
import { ArrowRight, Github } from "lucide-react"

export function Cta() {
  return (
    <section className="border-t border-border bg-secondary/30 py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-16">
          {/* Background gradient */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Comece a construir mais rápido hoje
            </h2>
            <p className="mb-8 text-pretty text-muted-foreground">
              Junte-se a dezenas de desenvolvedores que já estão usando FOUIKIT para 
              construir interfaces incríveis em tempo recorde.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="default" className="gap-2 shadow-lg shadow-primary/25">
                Explorar componentes
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="default" variant="outline" className="gap-2">
                <Github className="h-4 w-4" />
                Ver no GitHub
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Grátis e open source.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
