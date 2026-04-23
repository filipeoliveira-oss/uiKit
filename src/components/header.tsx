'use client'
import { componentsList, docsList, hooksList, IUikitElements, loadersList, utilitiesList } from "@/lib/uiKitElements";
import { useDebounceCallback } from "@/uiKit/hooks/useDebounceCallback/useDebounceCallback";
import { Component, Github, Hammer, Hourglass, Menu, Moon, Search, Sun, X, } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";


export default function Header() {
    const { theme, setTheme } = useTheme()
    const [search, setSearch] = useState('')
    const [searchModal, setSearchModal] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)
    const [currentComponents, setCurrentComponents] = useState<IUikitElements[]>(componentsList)
    const [currentLoaders, setCurrentLoaders] = useState<IUikitElements[]>(loadersList)
    const [currentHooks, setCurrentHooks] = useState<IUikitElements[]>(hooksList)
    const [currentUtilities, setCurrentUtilities] = useState<IUikitElements[]>(utilitiesList)
    const [currentDocs, setCurrentDocs] = useState<IUikitElements[]>(docsList)
    const [mobileSidebarSearch, setMobileSidebarSearch] = useState('')
    const [mobileComponents, setMobileComponents] = useState<IUikitElements[]>(componentsList)
    const [mobileLoaders, setMobileLoaders] = useState<IUikitElements[]>(loadersList)
    const [mobileHooks, setMobileHooks] = useState<IUikitElements[]>(hooksList)
    const [mobileUtilities, setMobileUtilities] = useState<IUikitElements[]>(utilitiesList)
    const [mobileDocs, setMobileDocs] = useState<IUikitElements[]>(docsList)
    const pathname = usePathname()
    const router = useRouter();

    const handleScrollIntoView = (element: HTMLElement) => {
        if (pathname !== '/') {
            router.push('/')
        } else {
            element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
        }
    }

    useDebounceCallback(() => {
        setCurrentComponents(returnFilteredList(componentsList, 'componentes', search))
        setCurrentLoaders(returnFilteredList(loadersList, 'loaders', search))
        setCurrentHooks(returnFilteredList(hooksList, 'hooks', search))
        setCurrentUtilities(returnFilteredList(utilitiesList, 'utilitários', search))
    }, 250, [search])

    useDebounceCallback(() => {
        setMobileComponents(returnFilteredList(componentsList, 'componentes', mobileSidebarSearch))
        setMobileLoaders(returnFilteredList(loadersList, 'loaders', mobileSidebarSearch))
        setMobileHooks(returnFilteredList(hooksList, 'hooks', mobileSidebarSearch))
        setMobileUtilities(returnFilteredList(utilitiesList, 'utilitários', mobileSidebarSearch))
        setMobileDocs(returnFilteredList(docsList, 'docs', mobileSidebarSearch))
    }, 250, [mobileSidebarSearch])

    useEffect(() => {
        if (searchModal || mobileMenu) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }, [searchModal, mobileMenu])

    function returnFilteredList(originalList: Array<IUikitElements>, componentType: string, term: string): Array<IUikitElements> {
        return originalList.filter((item) => item.title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, "").includes(term) ||
            componentType.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, "").includes(term))
    }

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                if (searchModal) setSearchModal(false)
                if (mobileMenu) setMobileMenu(false)
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [searchModal, mobileMenu]);

    return (
        <>
            <div className="w-full h-16 flex items-center justify-center border-b border-border/40 sticky top-0 z-40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
                <div className="w-[90%] md:w-[80%] h-full flex flex-row justify-between">
                    <div className="w-fit h-full flex flex-row items-center gap-4 md:gap-8">
                        <div className="flex flex-row gap-2 items-center w-fit h-fit cursor-pointer" onClick={() => handleScrollIntoView(document.getElementById('hero')!)}>
                            <Image src={'/icon.webp'} alt="Logo" height={51} width={60} />
                            <h1 className="text-2xl font-bold">FOUIKIT</h1>
                        </div>

                        <div className="hidden md:flex flex-row gap-4">
                            <Link href={'/docs'}>Docs</Link>
                            <Link href={'/components'}>Componentes</Link>
                            <Link href={'/hooks'}>Hooks</Link>
                            <Link href={'/loaders'}>Loaders</Link>
                            <Link href={'/utilities'}>Utilitários</Link>
                        </div>
                    </div>

                    <div className="w-fit h-full flex flex-row gap-2 items-center">
                        <button className="hidden md:flex w-48 h-1/2 border mr-4 rounded-md outline-none flex-row px-4 gap-2 items-center cursor-pointer" onClick={() => setSearchModal(true)}>
                            <Search size={20} strokeWidth={1.5} />
                            <span className="text-sm">Pesquisar...</span>
                        </button>
                        <button className="md:hidden p-2 rounded-md hover:bg-foreground/10 cursor-pointer" onClick={() => setSearchModal(true)}>
                            <Search size={20} strokeWidth={1.5} />
                        </button>
                        <Link href={'https://github.com/filipeoliveira-oss/uiKit'} target="_blank" rel="noopener noreferrer">
                            <Github size={18} strokeWidth={2} className="cursor-pointer" />
                        </Link>
                        {theme === 'light' ?
                            <Moon size={18} strokeWidth={2} className="cursor-pointer" onClick={() => setTheme("dark")} />
                            :
                            <Sun size={18} strokeWidth={2} className="cursor-pointer" onClick={() => setTheme("light")} />
                        }
                        <button className="md:hidden p-2 rounded-md hover:bg-foreground/10 cursor-pointer" onClick={() => setMobileMenu(true)}>
                            <Menu size={20} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </div>

            {searchModal && (
                createPortal(
                    <div className="h-dvh w-dvw fixed top-0 left-0 bg-black/40 z-50 flex items-center justify-center">
                        <div className="w-[90%] md:w-1/2 h-1/2 bg-card rounded-2xl border flex flex-col">
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
                                    <Link href={component.url} key={`${component.url}-${component.title}`} className="w-full h-fit px-4 py-2 flex flex-row gap-2 hover:bg-foreground/10 cursor-pointer" onClick={() => setSearchModal(false)}>
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
                                    <Link href={component.url} key={`${component.url}-${component.title}`} className="w-full h-fit px-4 py-2 flex flex-row gap-2 hover:bg-foreground/10 cursor-pointer" onClick={() => setSearchModal(false)}>
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
                                    <Link href={component.url} key={`${component.url}-${component.title}`} className="w-full h-fit px-4 py-2 flex flex-row gap-2 hover:bg-foreground/10 cursor-pointer" onClick={() => setSearchModal(false)}>
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
                                    <Link href={component.url} key={`${component.url}-${component.title}`} className="w-full h-fit px-4 py-2 flex flex-row gap-2 hover:bg-foreground/10 cursor-pointer" onClick={() => setSearchModal(false)}>
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

            {mobileMenu && (
                createPortal(
                    <div className="md:hidden h-dvh w-dvw fixed top-0 left-0 bg-black/40 z-50 flex" onClick={() => setMobileMenu(false)}>
                        <div className="w-72 h-full bg-background border-r flex flex-col" onClick={(e) => e.stopPropagation()}>
                            <div className="h-16 flex flex-row items-center justify-between px-4 border-b shrink-0">
                                <div className="flex flex-row gap-2 items-center">
                                    <Image src={'/icon.webp'} alt="Logo" height={34} width={40} />
                                    <span className="font-bold text-lg">FOUIKIT</span>
                                </div>
                                <button className="p-2 rounded-md hover:bg-foreground/10 cursor-pointer" onClick={() => setMobileMenu(false)}>
                                    <X size={20} strokeWidth={1.5} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-1 px-4 py-3 border-b shrink-0">
                                <Link href={'/docs'} className="px-3 py-2 rounded-md hover:bg-foreground/10 text-sm font-medium" onClick={() => setMobileMenu(false)}>Docs</Link>
                                <Link href={'/components'} className="px-3 py-2 rounded-md hover:bg-foreground/10 text-sm font-medium" onClick={() => setMobileMenu(false)}>Componentes</Link>
                                <Link href={'/hooks'} className="px-3 py-2 rounded-md hover:bg-foreground/10 text-sm font-medium" onClick={() => setMobileMenu(false)}>Hooks</Link>
                                <Link href={'/loaders'} className="px-3 py-2 rounded-md hover:bg-foreground/10 text-sm font-medium" onClick={() => setMobileMenu(false)}>Loaders</Link>
                                <Link href={'/utilities'} className="px-3 py-2 rounded-md hover:bg-foreground/10 text-sm font-medium" onClick={() => setMobileMenu(false)}>Utilitários</Link>
                            </div>

                            <div className="px-4 py-3 border-b shrink-0">
                                <div className="w-full h-9 border rounded-md flex flex-row px-3 gap-2 items-center bg-background">
                                    <Search size={16} strokeWidth={1.5} className="shrink-0 text-foreground/60" />
                                    <input
                                        className="border-none outline-none text-sm w-full bg-transparent"
                                        placeholder="pesquisar"
                                        value={mobileSidebarSearch}
                                        onChange={(e) => setMobileSidebarSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden px-2 py-3">
                                {mobileDocs.length > 0 && (
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-xs text-foreground/70 px-2 mb-1">DOCUMENTAÇÃO</span>
                                        {mobileDocs.map((item) => (
                                            <Link href={item.url} key={`mobile-${item.url}-${item.title}`} onClick={() => setMobileMenu(false)}
                                                className={`w-full h-fit px-4 py-2 flex flex-row gap-2 cursor-pointer rounded-md ${pathname.toLowerCase() === item.url.toLowerCase() ? 'bg-accent/40 text-accent-foreground' : 'hover:bg-foreground/10'}`}>
                                                <span className="text-sm">{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {mobileComponents.length > 0 && (
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-xs text-foreground/70 px-2 mb-1">COMPONENTES</span>
                                        {mobileComponents.map((item) => (
                                            <Link href={item.url} key={`mobile-${item.url}-${item.title}`} onClick={() => setMobileMenu(false)}
                                                className={`w-full h-fit px-4 py-2 flex flex-row gap-2 cursor-pointer rounded-md ${pathname.toLowerCase() === item.url.toLowerCase() ? 'bg-accent/40 text-accent-foreground' : 'hover:bg-foreground/10'}`}>
                                                <span className="text-sm">{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {mobileHooks.length > 0 && (
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-xs text-foreground/70 px-2 mb-1">HOOKS</span>
                                        {mobileHooks.map((item) => (
                                            <Link href={item.url} key={`mobile-${item.url}-${item.title}`} onClick={() => setMobileMenu(false)}
                                                className={`w-full h-fit px-4 py-2 flex flex-row gap-2 cursor-pointer rounded-md ${pathname.toLowerCase() === item.url.toLowerCase() ? 'bg-accent/40 text-accent-foreground' : 'hover:bg-foreground/10'}`}>
                                                <span className="text-sm">{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {mobileLoaders.length > 0 && (
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-xs text-foreground/70 px-2 mb-1">LOADERS</span>
                                        {mobileLoaders.map((item) => (
                                            <Link href={item.url} key={`mobile-${item.url}-${item.title}`} onClick={() => setMobileMenu(false)}
                                                className={`w-full h-fit px-4 py-2 flex flex-row gap-2 cursor-pointer rounded-md ${pathname.toLowerCase() === item.url.toLowerCase() ? 'bg-accent/40 text-accent-foreground' : 'hover:bg-foreground/10'}`}>
                                                <span className="text-sm">{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {mobileUtilities.length > 0 && (
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-xs text-foreground/70 px-2 mb-1">UTILITÁRIOS</span>
                                        {mobileUtilities.map((item) => (
                                            <Link href={item.url} key={`mobile-${item.url}-${item.title}`} onClick={() => setMobileMenu(false)}
                                                className={`w-full h-fit px-4 py-2 flex flex-row gap-2 cursor-pointer rounded-md ${pathname.toLowerCase() === item.url.toLowerCase() ? 'bg-accent/40 text-accent-foreground' : 'hover:bg-foreground/10'}`}>
                                                <span className="text-sm">{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    , document.body)
            )}
        </>
    )
}
