import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import DiscordSvg from "@/assets/discordSvg"

const footerLinks = {
    Recursos: [
        { label: "Componentes", href: "/components" },
        { label: "Hooks", href: "/hooks" },
        { label: "Loaders", href: "/loaders" },
        { label: "Utilitários", href: "/utilities" },
    ],
    Documentação: [
        { label: "Introdução", href: "/docs" },
        { label: "CLI", href: "/docs/cli" },
        // { label: "Contribuindo", href: "/docs/contributing" },
    ],
    Comunidade: [
        { label: "GitHub", href: "https://github.com/filipeoliveira-oss/uiKit" },
        { label: "Linkedin", href: "https://www.linkedin.com/in/filipeoliveirasilva/" },
        { label: "Discord", href: "https://discord.com/users/350428533585346561" },
    ],
}

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="container mx-auto max-w-6xl px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src={'/icon.webp'} alt="Logo" height={32} width={40} />
                            <span className="text-lg font-semibold">FOUIKIT</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Componentes React que você copia, não instala.
                            Código limpo, sem dependências.
                        </p>
                        <div className="flex gap-4 flex-row">
                            <Link
                                href="https://github.com/filipeoliveira-oss/uiKit"
                                className="text-muted-foreground transition-colors hover:text-foreground"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/filipeoliveirasilva"
                                className="text-muted-foreground transition-colors hover:text-foreground"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link
                                href="https://discord.com/users/350428533585346561"
                                className="text-muted-foreground transition-colors hover:text-foreground"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <DiscordSvg className='h-5 w-5'/>
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="mb-4 text-sm font-semibold">{title}</h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} FOUIKIT. Todos os direitos reservados.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Feito com ❤️ para a comunidade React
                    </p>
                </div>
            </div>
        </footer>
    )
}
