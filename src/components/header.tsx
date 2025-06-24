'use client'
import { componentsList, hooksList } from "@/lib/uiKitElements";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {

    const pathname = usePathname()
    return (
        <div className="border-b border-zinc-100/50 w-full h-20 text-white bg-transparent flex items-center justify-center fixed z-50 backdrop-blur-lg">
            <div className="w-defaultWidth h-full flex items-center justify-between">
                <Link href={'/'} className="text-4xl">FOUIKIT</Link>

                <ul className="flex flex-row w-fit h-full items-center justify-center gap-8">
                    <li className="w-fit h-full flex items-center justify-center"><Link href={'/docs/introduction'} className={`text-lg w-fit h-full flex items-center border-b-3 ${pathname.startsWith('/docs') ? 'border-reactblue': 'border-transparent'}`}>Docs</Link></li>
                    <li className="w-fit h-full flex items-center justify-center"><Link href={hooksList.sort((a,b) => a.title.localeCompare(b.title))[0].url} className={`text-lg w-fit h-full flex items-center border-b-3 ${pathname.startsWith('/hooks') ? 'border-reactblue': 'border-transparent'}`}>Hooks</Link></li>
                    <li className="w-fit h-full flex items-center justify-center"><Link href={componentsList.sort((a,b) => a.title.localeCompare(b.title))[0].url} className={`text-lg w-fit h-full flex items-center border-b-3 ${pathname.startsWith('/components') ? 'border-reactblue': 'border-transparent'}`}>Components</Link></li>
                    <li className="w-fit h-full flex items-center justify-center"><Link href={'/loaders'} className={`text-lg w-fit h-full flex items-center border-b-3 ${pathname.startsWith('/loaders') ? 'border-reactblue': 'border-transparent'}`}>Loaders</Link></li>
                </ul>

                {/* <div className="w-40 h-8 rounded-full flex flex-row items-center border border-zinc-100 px-2">
                    <input  className="w-full h-[90%] outline-none border-none" placeholder="Search"/>
                    <Search color="#fff"/>
                </div> */}
                <div></div>
            </div>
        </div>
    )
}