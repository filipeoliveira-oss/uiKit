'use client'
import { componentsList, hooksList, IUikitElements, loadersList, utilitiesList } from "@/lib/uiKitElements";
import Modal from "@/uiKit/components/modal/modal";
import { useDebounce } from "@/uiKit/hooks/useDebounce/useDebounce";
import { useDebounceCallback } from "@/uiKit/hooks/useDebounceCallback/useDebounceCallback";
import { Component, Github, Hammer, Hourglass, Moon, Puzzle, Search, Sun, X, } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";


export default function Header() {
    const { resolvedTheme, setTheme } = useTheme()
    const [search, setSearch] = useState('')
    const [searchModal, setSearchModal] = useState(false)
    const [currentComponents, setCurrentComponents] = useState(componentsList)
    const [currentLoaders, setCurrentLoaders] = useState(loadersList)
    const [currentHooks, setCurrentHooks] = useState(hooksList)
    const [currentUtilities, setCurrentUtilities] = useState(utilitiesList)

    const handleScrollIntoView = (element: HTMLElement) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }

    useDebounceCallback(() => {
        setCurrentComponents(returnFilteredList(componentsList, 'componentes'))
        setCurrentLoaders(returnFilteredList(loadersList, 'loaders'))
        setCurrentHooks(returnFilteredList(hooksList, 'hooks'))
        setCurrentUtilities(returnFilteredList(utilitiesList, 'utilitários'))
    }, 350, [search])

    useEffect(() => {
        if (searchModal) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }, [searchModal])


    function returnFilteredList(originalList: Array<IUikitElements>, componentType: string): Array<IUikitElements> {
        return originalList.filter((item) => item.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search) ||
            componentType.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search))
    }


    return (
        <>
            <div className="w-full h-16 flex items-center justify-center border-b border-border/40 sticky top-0 z-40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
                <div className="w-[80%] h-full flex flex-row justify-between ">
                    <div className=" w-fit h-full flex flex-row items-center gap-8">
                        <div className="flex flex-row gap-2 items-center w-fit h-fit cursor-pointer" onClick={() => handleScrollIntoView(document.getElementById('hero')!)}>
                            <Image src={'/icon.webp'} alt="Logo" height={51} width={60} />
                            <h1 className="text-2xl font-bold">FOUIKIT</h1>
                        </div>

                        <div className="flex flex-row gap-4">
                            <Link href={'/docs'}>Docs</Link>
                            <Link href={'/hooks'}>Hooks</Link>
                            <Link href={'/components'}>Componentes</Link>
                            <Link href={'/loaders'}>Loaders</Link>
                            <Link href={'/utilities'}>Utilitários</Link>
                        </div>
                    </div>

                    <div className="w-fit h-full flex flex-row gap-2 items-center">
                        <button className="w-48 h-1/2 border mr-4 rounded-md  outline-none flex flex-row px-4 gap-2 items-center cursor-pointer" onClick={() => setSearchModal(true)}>
                            <Search size={20} strokeWidth={1.5} />
                            <span className="text-sm">Pesquisar...</span>
                        </button>
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

            {searchModal && (
                createPortal(
                    <div className="h-dvh w-dvw fixed top-0 left-0 bg-black/40 z-50 flex items-center justify-center">
                        <div className="w-1/2 h-1/2 bg-card rounded-2xl border flex flex-col">
                            <label htmlFor="searchInput" className="w-full h-12 flex flex-row relative px-4 border-b items-center gap-4 shrink-0">
                                <X className="absolute top-3 right-4 cursor-pointer" onClick={(e) => { setSearchModal(false); e.stopPropagation() }} />
                                <Search />
                                <input className="outline-none h-12 w-full border-none!"
                                    placeholder="Procure por um componente, hook, loader ou utilitário"
                                    id="searchInput"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </label>

                            <div className="w-full h-full flex flex-col overflow-x-hidden overflow-y-auto">
                                {currentComponents.map((component) => (
                                    <Link href={component.url} key={`${component.url}-${component.title}`} className="w-full h-fit px-4 py-2 flex flex-row gap-2 hover:bg-foreground/40 cursor-pointer">
                                        <div className="w-fit h-fit p-2 rounded-md">
                                            <Component strokeWidth={1.5} />
                                        </div>
                                        <div className="w-fit h-fit flex flex-col">
                                            <span className="text-sm">{component.title}</span>
                                            <span className="text-sm">Componentes</span>
                                        </div>
                                    </Link>
                                ))}

                                {currentHooks.map((component) => (
                                    <Link href={component.url} key={`${component.url}-${component.title}`} className="w-full h-fit px-4 py-2 flex flex-row gap-2 hover:bg-foreground/40 cursor-pointer">
                                        <div className="w-fit h-fit p-2  rounded-md">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={1.5}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M17.586 11.414l-5.93 5.93a1 1 0 01-8-8l3.137-3.137a.707.707 0 011.207.5V10M20.414 8.586L22 7" />
                                                <circle cx={19} cy={10} r={2} />
                                            </svg>
                                        </div>
                                        <div className="w-fit h-fit flex flex-col">
                                            <span className="text-sm">{component.title}</span>
                                            <span className="text-sm">Hooks</span>
                                        </div>
                                    </Link>
                                ))}

                                {currentLoaders.map((component) => (
                                    <Link href={component.url} key={`${component.url}-${component.title}`} className="w-full h-fit px-4 py-2 flex flex-row gap-2 hover:bg-foreground/40 cursor-pointer">
                                        <div className="w-fit h-fit p-2  rounded-md">
                                            <Hourglass strokeWidth={1.5} />
                                        </div>
                                        <div className="w-fit h-fit flex flex-col">
                                            <span className="text-sm">{component.title}</span>
                                            <span className="text-sm">Loaders</span>
                                        </div>
                                    </Link>
                                ))}

                                {currentUtilities.map((component) => (
                                    <Link href={component.url} key={`${component.url}-${component.title}`} className="w-full h-fit px-4 py-2 flex flex-row gap-2 hover:bg-foreground/40 cursor-pointer">
                                        <div className="w-fit h-fit p-2  rounded-md">
                                            <Hammer strokeWidth={1.5} />
                                        </div>
                                        <div className="w-fit h-fit flex flex-col">
                                            <span className="text-sm">{component.title}</span>
                                            <span className="text-sm">Utilitários</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                    , document.body)
            )}
        </>
    )
}