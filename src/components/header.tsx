import { inter } from "@/app/layout";
import Link from "next/link";

export default function Header() {
    return (
        <div className="w-full h-[8%] bg-black flex justify-center shrink-0">
            <div className="w-[80%] h-full flex flex-row text-white justify-between items-center">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <h1 className={`text-2xl ${inter.className} font-light`}>FOUIKIT</h1>
                    <span className="w-fit h-fit py-[2px] px-1 bg-zinc-600 text-zinc-400 rounded-full">v4.0.0</span>
                </div>

                <div className="flex flex-row gap-4">
                    <Link href={'/docs/introduction'} className="font-semibold hover:text-zinc-200">Docs</Link>
                    <Link href={'/components'} className="font-semibold hover:text-zinc-200">Components</Link>
                </div>
            </div>
        </div>
    )
}