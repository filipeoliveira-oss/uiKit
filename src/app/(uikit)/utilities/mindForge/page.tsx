'use client'
import { Download, Fullscreen } from "lucide-react";
import React, { useState } from "react";

export default function dbSchemaDesigner() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/mindForge.html";
        link.download = "mindForge.html";
        link.click();
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-12 px-4">
                <div className="w-full h-4 flex flex-row gap-2 justify-end">
                    <button
                        className="flex flex-row gap-2 p-2 bg-background rounded-md cursor-pointer h-fit w-fit"
                        onClick={() => setIsFullscreen(true)}
                    >
                        <Fullscreen />
                        Tela cheia
                    </button>

                    <button
                        className="flex flex-row gap-2 p-2 bg-background rounded-md cursor-pointer h-fit w-fit"
                        onClick={handleDownload}
                    >
                        <Download />
                        Baixar utilitário
                    </button>
                </div>
            </div>

            
            <div
                id="utilitiesModal"
                className={
                    isFullscreen
                        ? "fixed inset-0 z-50 bg-black"
                        : "w-full h-full px-4 "
                }
                
            >
                {isFullscreen && (
                    <div className="absolute bottom-0 right-4 z-50">
                        <button
                            className="bg-background p-2 rounded-md cursor-pointer"
                            onClick={() => setIsFullscreen(false)}
                        >
                            Sair da tela cheia
                        </button>
                    </div>
                )}

                <iframe
                    src="/mindForge.html"
                    className="w-full h-full"
                />
            </div>
        </div>
    );
}