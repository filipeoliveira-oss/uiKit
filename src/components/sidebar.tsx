'use client'
import { componentsList, hooksList } from "@/lib/uiKitElements";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {

    const pathname = usePathname()

    function SidebarElement({ url, title }: { url: string, title: string }) {
        return (
            <li className={`${pathname === url ? 'text-zinc-50' : 'text-zinc-400'} mt-1`}>
                <Link href={url} >{title}</Link>
            </li>
        )
    }

    return (
        <div className="w-[15%] h-full  overflow-y-auto overflow-x-hidden shrink-0 gap-4 flex flex-col">
            <div className="w-full h-fit flex flex-col gap-2 ">
                <span className="font-semibold">Getting Started</span>
                <div className="w-full ml-4">
                    <ul className="w-[80%] h-fit list-disc pl-4 ">
                        <SidebarElement url="/docs/introduction" title="Introduction" />
                        <SidebarElement url='/docs/installation' title="Installation" />
                        <SidebarElement url='/docs/extension' title="Extension" />
                    </ul>
                </div>
            </div>

            <div className="w-full h-fit flex flex-col gap-2 ">
                <span className="font-semibold">Hooks</span>
                <div className="w-full ml-4">
                    <ul className="w-[80%] h-fit list-disc pl-4 ">
                        {hooksList
                            .sort((a, b) => a.title.localeCompare(b.title))
                            .map((hook) => (
                                <SidebarElement key={hook.url} url={hook.url} title={hook.title} />
                            ))}
                    </ul>
                </div>
            </div>

            <div className="w-full h-fit flex flex-col gap-2 ">
                <span className="font-semibold">Loaders</span>
                <div className="w-full ml-4">
                    <ul className="w-[80%] h-fit list-disc pl-4 ">
                        <SidebarElement url="/loaders" title="Loaders preview" />
                        <SidebarElement url="/loaders/pageloader" title="Page loader" />
                    </ul>
                </div>
            </div>

            <div className="w-full h-fit flex flex-col gap-2 ">
                <span className="font-semibold">Components</span>
                <div className="w-full ml-4">
                    <ul className="w-[80%] h-fit list-disc pl-4 ">
                        {componentsList
                            .sort((a, b) => a.title.localeCompare(b.title))
                            .map((component) => (
                                <SidebarElement key={component.url} url={component.url} title={component.title} />
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}