'use client'

import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function ImageConverter() {
    const [file, setFile] = useState<Blob | MediaSource | null>()
    const inputRef = useRef<HTMLInputElement>(null)

    const handleConverter = () => {
        const img = new Image();

        if (!file) {
            toast.error('Selecione uma imagem!')
            return
        }
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;

            ctx!.drawImage(img, 0, 0);

            const converted = canvas.toDataURL("image/webp");
        };
    }

    const selectArchive = () =>{
        if(!inputRef){
            toast.error('Ocorreu um erro ao selecionar o arquivo!')
            return
        }

        inputRef.current?.click()
    }

    return (
        <div className="w-full h-full flex flex-col px-4">
            <div className="w-full h-fit flex items-center justify-center">
                <h1 className="text-2xl font-bold">Image converter</h1>
            </div>

            <div className="w-full h-56 border-2 border-dashed border-zinc-300 mt-12 flex items-center justify-center">
                <button onClick={selectArchive} className="bg-purple-600 p-6 rounded-lg shadow-lg shadow-purple-500/75 cursor-pointer" >Escolher arquivos</button>
                <input ref={inputRef} type="file" className="hidden"/>
            </div>
        </div>
    )
}