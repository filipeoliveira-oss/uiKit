'use client'
import ColorText from "@/components/colorText";
import mindForge from '../../../../public/mindforge.webp'
import dbgen from '../../../../public/dbschema.webp'
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Utilities() {
    return (
        <div className="w-full h-full flex flex-col gap-12 overflow-y-auto overflow-x-hidden pb-12 px-4">
            <div className="w-full h-fit flex flex-col gap-2">
                <Link href={'/utilities/dbSchemaDesigner'} className="hover:opacity-85">
                    <ColorText text='Database Schema Generator' />
                </Link>
                <span>O Database Schema Designer é um designer de esquemas SQL que combina edição visual por formulário com geração e importação de scripts SQL. Ele permite criar, organizar e exportar estruturas de banco de dados de forma intuitiva, com suporte nativo a quatro SGBDs.</span>
                <span><strong>Bancos suportados:</strong> PostgreSQL, MySQL, Oracle, SQL Server.</span>
                <Link href={'/utilities/dbSchemaDesigner'} className="w-full h-fit flex items-center justify-center mt-8 hover:opacity-85 cursor-pointer" >
                    <Image alt="Database generator" src={dbgen} width={600} height={300} />
                </Link>
                <Link href={'/utilities/dbSchemaDesigner'} className="underline flex flex-row gap-2 hover:opacity-85">Ir para aplicação <ArrowRight /></Link>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <Link href={'/utilities/mindForge'} className="hover:opacity-85">
                    <ColorText text='Mind map' />
                </Link>
                <span>Ferramenta de organização visual de ideias que roda inteiramente no navegador, sem servidor, sem internet e sem cadastro. Todos os mapas são salvos como arquivos JSON na pasta MAPASMENTAIS no seu próprio computador — seus dados nunca saem da sua máquina.</span>
                <span><strong>Principais funcionalidades:</strong> Edição em árvore, Personalização de nós, Salvamento automático, Exportação.</span>
                <Link href={'/utilities/mindForge'} className="w-full h-fit flex items-center justify-center mt-8 hover:opacity-85 cursor-pointer">
                    <Image alt="Mind Forge" src={mindForge} width={600} height={300} />
                </Link>
                <Link href={'/utilities/mindForge'} className="underline flex flex-row gap-2 hover:opacity-85">Ir para aplicação <ArrowRight /></Link>
            </div>
        </div>
    )
}