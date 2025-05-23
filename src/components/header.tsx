'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {

    const pathname = usePathname()

    function HeaderLink({url,title, initialPath} : {url:string, title:string,initialPath:string}) {
        return (
            <Link href={url} className={`font-semibold ${pathname.startsWith(initialPath) ? 'text-blue-500' : 'hover:text-zinc-200'}`}>{title}</Link>
        )
    }

    return (
        <div className="w-full h-[8%] bg-black flex justify-center shrink-0">
            <div className="w-[80%] h-full flex flex-row text-white justify-between items-center">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <h1 className={`text-2xl  font-light`}>FOUIKIT</h1>
                    <span className="w-fit h-fit py-[2px] px-1 bg-zinc-600 text-zinc-400 rounded-full">v4.0.1</span>
                </div>

                <div className="flex flex-row gap-4">
                    <HeaderLink title="Docs" url="/docs/introduction" initialPath="/docs"/>
                    <HeaderLink title="Hooks" url="/hooks/useInputFocus" initialPath="/hooks"/>
                    <HeaderLink title="Components" url="/components/actionMenu" initialPath="/components"/>
                </div>
            </div>
        </div>
    )
}