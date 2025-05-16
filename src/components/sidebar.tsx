import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="w-[15%] h-full border border-red-500 overflow-y-auto overflow-x-hidden shrink-0">
            <div className="w-full h-fit flex flex-col gap-2 border border-green-200">
                <span className="font-semibold">Getting Started</span>
                <div className="w-full ml-4">
                    <ul className="w-[80%] h-fit list-disc pl-4 ">
                        <li className="text-zinc-300">
                            <Link href={'/docs/introduction'}>Introduction</Link>
                        </li>
                        <li className="mt-2 text-zinc-300">
                            <Link href={'/docs/installation'}>Installation</Link>
                        </li>
                    </ul>
                </div>


            </div>
        </div>
    )
}