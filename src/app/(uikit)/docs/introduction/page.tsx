import Link from "next/link";
import React from "react";

export default function IntroPage() {
  return (
    <div className="h-full flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight mb-6">
            Componentes React prontos, sem dor de cabeça
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl">
            Uma coleção de componentes modernos feitos com React e Tailwind, prontos para copiar e colar. Sem dependências externas, sem configuração complicada, só código direto ao ponto.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl border border-border">
            <h3 className="text-xl font-semibold mb-3">Zero dependências</h3>
            <p className="">
              Nada de bibliotecas pesadas. Tudo funciona apenas com React e Tailwind.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border">
            <h3 className="text-xl font-semibold mb-3">Copiar e usar</h3>
            <p className="">
              Pegue o componente, cole no seu projeto e pronto. Sem instalação, sem setup.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border">
            <h3 className="text-xl font-semibold mb-3">Design moderno</h3>
            <p className="">
              Interfaces pensadas para produtos reais, com foco em UX e performance.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Como funciona
          </h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>Escolha um componente na lista</li>
            <li>Copie o código diretamente ou utilize o código npx</li>
            <li>Tenha o código no seu projeto React</li>
            <li>Customize como quiser</li>
          </ol>
        </div>

        {/* CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-2xl border border-border">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Comece agora
            </h3>
            <p className="">
              Explore os componentes disponíveis e acelere seu desenvolvimento.
            </p>
          </div>

          <Link href={'/components'} className="px-6 py-3 rounded-xl font-medium hover:opacity-90 transition">
            Ver componentes
          </Link>
        </div>
      </div>
    </div>
  );
}
