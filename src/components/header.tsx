'use client'
import { Github, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";


export default function Header() {
    const { resolvedTheme, setTheme } = useTheme()

    return (
        <div className="w-full h-16 flex items-center justify-center border-b border-border/40 sticky top-0 z-50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="w-[80%] h-full flex flex-row justify-between ">
                <div className=" w-fit h-full flex flex-row items-center gap-8">
                    <div className="flex flex-row gap-2 items-center w-fit h-fit">
                        <Image src={'/icon.webp'} alt="Logo" height={51} width={60} />
                        <h1 className="text-2xl font-bold">FOUIKIT</h1>
                    </div>

                    <div className="flex flex-row gap-4">
                        <Link href={'/docs'}>Docs</Link>
                        <Link href={'/hooks'}>Hooks</Link>
                        <Link href={'/components'}>Components</Link>
                        <Link href={'/loaders'}>Loaders</Link>
                        <Link href={'/utilities'}>Utilities</Link>
                    </div>
                </div>

                <div className="w-fit h-full flex flex-row gap-2  items-center">
                    <Link href={'https://github.com/filipeoliveira-oss/uiKit'} target="_blank" rel="noopener noreferrer">
                        <Github size={18} strokeWidth={2} className="cursor-pointer" />
                    </Link>
                    {resolvedTheme === 'light' ?
                        <Moon size={18} strokeWidth={2} className="cursor-pointer" onClick={() => setTheme("dark")} />
                        :
                        <Sun size={18} strokeWidth={2} className="cursor-pointer" onClick={() => setTheme("light")} />
                    }
                </div>
            </div>
        </div>
    )
}