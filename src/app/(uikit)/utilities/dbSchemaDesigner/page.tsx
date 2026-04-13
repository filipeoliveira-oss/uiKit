'use client'
import Modal from "@/uiKit/components/modal/modal";
import useDocumentTitle from "@/uiKit/hooks/useDocumentTitle/useDocumentTitle";
import { Download, Fullscreen, HelpCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function dbSchemaDesigner() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [helpModal, setHelpModal] = useState(false);
    useDocumentTitle('FOUIKIT | Utilitários | Database Schema Designer');

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/database_schema_designer.html";
        link.download = "database_schema_designer.html";
        link.click();
    };

    const iframeContent = (
        <iframe
            src="/database_schema_designer.html"
            className="w-full h-full"
        />
    );

    return (
        <>
            <div className="w-full h-[93%] px-4">
                <div className="w-full h-4 flex flex-row gap-2 justify-end">
                    <button
                        className="flex flex-row gap-2 h-fit w-fit p-2 items-center justify-center bg-background rounded-md cursor-pointer"
                        onClick={() => setHelpModal(prev => !prev)}
                    >
                        <HelpCircle />
                        Ajuda
                    </button>

                    <button
                        className="flex flex-row gap-2 h-fit w-fit p-2 items-center justify-center bg-background rounded-md cursor-pointer"
                        onClick={() => setIsFullscreen(true)}
                    >
                        <Fullscreen />
                        Tela cheia
                    </button>

                    <button
                        className="flex flex-row gap-2 h-fit w-fit p-2 items-center justify-center bg-background rounded-md cursor-pointer"
                        onClick={handleDownload}
                    >
                        <Download />
                        Baixar utilitário
                    </button>
                </div>

                {/* normal mode */}
                {!isFullscreen && (
                    <div className="w-full h-full mt-8">
                        {iframeContent}
                    </div>
                )}

                {/* fullscreen via portal */}
                {mounted && isFullscreen &&
                    createPortal(
                        <div
                            id="utilitiesModal"
                            className="fixed inset-0 z-50 bg-black"
                        >
                            <div className="absolute top-0 right-4">
                                <button
                                    className="bg-background p-2 rounded-md cursor-pointer"
                                    onClick={() => setIsFullscreen(false)}
                                >
                                    Sair da tela cheia
                                </button>
                            </div>

                            <div className="w-full h-[90%]">
                                {iframeContent}
                            </div>
                        </div>,
                        document.body
                    )}
            </div>

            <Modal isOpen={helpModal} title="Database Schema Designer - Ajuda" onClose={() => setHelpModal(false)}>
                <div className="w-full h-fit grid grid-cols-2 gap-8">
                    <div className="w-full h-fit flex flex-col">
                        <h2 className="font-semibold">Tabelas</h2>
                        <ul className="list-decimal! list-inside gap-2 flex flex-col">
                            <li>Clique em + Tabela para criar — já vem com coluna id como PK</li>
                            <li>Arraste o card no canvas para organizar o layout</li>
                            <li>Clique em Editar no card ou na lista lateral para abrir o painel</li>
                            <li>Troque o banco na barra — os tipos de dados se adaptam</li>
                        </ul>
                    </div>

                    <div className="w-full h-fit flex flex-col">
                        <h2 className="font-semibold">Colunas e constraints</h2>
                        <ul className="list-decimal! list-inside gap-2 flex flex-col">
                            <li>PK NN UQ — clique para ativar/desativar por coluna</li>
                            <li>Defina tipo, tamanho e valor default em cada linha</li>
                            <li>FK: escolha tabela.coluna no dropdown — uma seta aparece no canvas</li>
                            <li>Aba Constraints para CHECK e UNIQUE compostos; Índices para CREATE INDEX</li>
                        </ul>
                    </div>

                    <div className="w-full h-fit flex flex-col">
                        <h2 className="font-semibold">Exportar SQL</h2>
                        <ul className="list-decimal! list-inside gap-2 flex flex-col">
                            <li>Clique em Exportar SQL — o script é gerado na hora</li>
                            <li>Alterne as abas do modal para comparar PostgreSQL, MySQL, Oracle e SQL Server</li>
                            <li>Sintaxe adaptada por banco (ex: SERIAL → IDENTITY no SQL Server)</li>
                            <li>Copie ou baixe o arquivo .sql direto do modal</li>
                        </ul>
                    </div>

                    <div className="w-full h-fit flex flex-col">
                        <h2 className="font-semibold">Importar SQL</h2>
                        <ul className="list-decimal! list-inside gap-2 flex flex-col">
                            <li>Clique em Importar SQL e cole qualquer script CREATE TABLE</li>
                            <li>Detecta colunas, tipos, PK, NOT NULL, UNIQUE, DEFAULT e FK automaticamente</li>
                            <li>Suporta múltiplas tabelas no mesmo script</li>
                            <li>Tabelas já existentes são atualizadas, não duplicadas</li>
                        </ul>
                    </div>
                </div>
            </Modal>
        </>
    );
}