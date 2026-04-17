import Link from "next/link";
import React from "react";

export default function InstallPage() {
    return (
        <div className="h-full flex items-center justify-center px-6">
            <div className="max-w-4xl w-full">
                {/* Hero */}
                <div className="mb-12">
                    <h1 className="text-3xl font-semibold tracking-tight mb-6">
                        Instalação simples, do seu jeito
                    </h1>
                    <p className="text-lg leading-relaxed max-w-2xl">
                        Você escolhe como quer usar os componentes. Copie e cole manualmente ou utilize o CLI para acelerar ainda mais seu fluxo.
                    </p>
                </div>

                {/* Options */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="p-6 rounded-2xl border border-border">
                        <h3 className="text-xl font-semibold mb-3">Copy & Paste</h3>
                        <p>
                            A forma mais simples. Copie o código do componente diretamente da documentação e cole no seu projeto.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl border border-border">
                        <h3 className="text-xl font-semibold mb-3">Listar componentes</h3>
                        <p className="mb-4">
                            Veja todos os componentes disponíveis via CLI.
                        </p>
                        <div className="bg-neutral-900 text-neutral-100 text-sm p-3 rounded-lg font-mono">
                            npx fouikit
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl border border-border">
                        <h3 className="text-xl font-semibold mb-3">Adicionar via CLI</h3>
                        <p className="mb-4">
                            Baixe um componente específico direto no seu projeto.
                        </p>
                        <div className="bg-neutral-900 text-neutral-100 text-sm p-3 rounded-lg font-mono">
                            npx fouikit add {'<component>'}
                        </div>
                    </div>
                </div>

                
                {/* CTA */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-2xl border border-border">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">
                            Comece agora
                        </h3>
                        <p>
                            Explore os componentes disponíveis e comece a construir.
                        </p>
                    </div>

                    <Link
                        href={'/components'}
                        className="px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
                    >
                        Ver componentes
                    </Link>
                </div>
            </div>
        </div>
    );
}
