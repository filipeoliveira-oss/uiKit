
import { componentsList, hooksList, IUikitElements, loadersList, utilitiesList } from "@/lib/uiKitElements";
import { useDebounceCallback } from "@/uiKit/hooks/useDebounceCallback/useDebounceCallback";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
    const [search, setSearch] = useState('')

    const [currentComponents, setCurrentComponents] = useState<IUikitElements[]>(componentsList)
    const [currentLoaders, setCurrentLoaders] = useState<IUikitElements[]>(loadersList)
    const [currentHooks, setCurrentHooks] = useState<IUikitElements[]>(hooksList)
    const [currentUtilities, setCurrentUtilities] = useState<IUikitElements[]>(utilitiesList)

    useDebounceCallback(() => {
        setCurrentComponents(returnFilteredList(componentsList, 'componentes'))
        setCurrentLoaders(returnFilteredList(loadersList, 'loaders'))
        setCurrentHooks(returnFilteredList(hooksList, 'hooks'))
        setCurrentUtilities(returnFilteredList(utilitiesList, 'utilitários'))
    }, 250, [search])

    function returnFilteredList(originalList: Array<IUikitElements>, componentType: string): Array<IUikitElements> {
        return originalList.filter((item) => item.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search))
    }

    return (
        <div className="h-full shrink-0 pb-4 px-2 overflow-y-auto overflow-x-hidden flex flex-col gap-4" style={{ width: 220 }}>
            <div className="w-48 h-10 shrink-0 outline-none flex flex-col px-4 gap-2 items-center cursor-pointer sticky top-0 bg-background">
                <div className="h-4 w-full"></div>
                <div className="w-48 h-10 shrink-0 border rounded-md outline-none flex flex-row px-4 gap-2 items-center cursor-pointer bg-background">
                    <Search size={20} strokeWidth={1.5} className="shrink-0" />
                    <input className="border-none outline-none" placeholder="pesquisar" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>

            <div className="w-full h-fit flex flex-col">
                {currentComponents.length > 0 && <span className="font-semibold text-sm text-foreground/70">COMPONENTES</span>}
                {currentComponents.map((component) => (
                    <Link href={component.url} key={`${component.url}-${component.title}`} className="w-full h-fit px-4 py-2 flex flex-row gap-2 hover:bg-foreground/10 cursor-pointer">
                        <span className="text-sm">{component.title}</span>
                    </Link>
                ))}
            </div>

            <div className="w-full h-fit flex flex-col">
                {currentHooks.length > 0 && <span className="font-semibold text-sm text-foreground/70">HOOKS</span>}
                {currentHooks.map((component) => (
                    <Link href={component.url} key={`${component.url}-${component.title}`} className="w-full h-fit px-4 py-2 flex flex-row gap-2 hover:bg-foreground/10 cursor-pointer">
                        <span className="text-sm">{component.title}</span>
                    </Link>
                ))}
            </div>
            <div className="w-full h-fit flex flex-col">
                {currentLoaders.length > 0 && <span className="font-semibold text-sm text-foreground/70">LOADERS</span>}
                {currentLoaders.map((component) => (
                    <Link href={component.url} key={`${component.url}-${component.title}`} className="w-full h-fit px-4 py-2 flex flex-row gap-2 hover:bg-foreground/10 cursor-pointer">
                        <span className="text-sm">{component.title}</span>
                    </Link>
                ))}
            </div>
            <div className="w-full h-fit flex flex-col">
                {currentUtilities.length > 0 && <span className="font-semibold text-sm text-foreground/70">UTILITÁRIOS</span>}
                {currentUtilities.map((component) => (
                    <Link href={component.url} key={`${component.url}-${component.title}`} className="w-full h-fit px-4 py-2 flex flex-row gap-2 hover:bg-foreground/10 cursor-pointer">
                        <span className="text-sm">{component.title}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}