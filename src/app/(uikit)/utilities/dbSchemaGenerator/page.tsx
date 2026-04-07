'use client'
import { Download, Fullscreen } from "lucide-react";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function DbSchemaGenerator() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [mounted, setMounted] = useState(false);

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
        <div className="w-full h-full px-4">
            <div className="w-full h-4 flex flex-row gap-2 justify-end">
                <button
                    className="flex flex-row gap-2 h-fit w-fit p-2 items-center justify-center bg-zinc-800 rounded-md cursor-pointer"
                    onClick={() => setIsFullscreen(true)}
                >
                    <Fullscreen />
                    Tela cheia
                </button>

                <button
                    className="flex flex-row gap-2 h-fit w-fit p-2 items-center justify-center bg-zinc-800 rounded-md cursor-pointer"
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
                                className="bg-zinc-800 p-2 rounded-md cursor-pointer"
                                onClick={() => setIsFullscreen(false)}
                            >
                                Sair da tela cheia
                            </button>
                        </div>

                        <div className="w-full h-full">
                            {iframeContent}
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
}