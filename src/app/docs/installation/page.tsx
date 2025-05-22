'use client'
import CodeBlock from "@/components/codeBlock";
import PageWrapper from "@/components/pageWrapper";
import Link from "next/link";

export default function Installation() {
    return (
        <PageWrapper>
            <h1 className="text-4xl font-bold">Installation</h1>

            <h2 className="text-2xl font-semibold">Requirements</h2>

            <ul className="w-[80%] h-fit list-disc pl-4 ">
                <li className="text-zinc-300">
                    <Link href={'https://react.dev/'} className="underline">React 18+</Link>
                </li>
                <li className="mt-2 text-zinc-300">
                    <Link href={'https://tailwindcss.com/'} className="underline">Tailwind CSS V4</Link>
                </li>
            </ul>

            <div className="w-full h-[1px] bg-zinc-500"></div>

            <div className="w-full flex flex-col gap-2">
                <h2 className="text-3xl font-semibold">Automatic Installation</h2>

                <span>Execute the following command to choose which component/hook you want!</span>

                <CodeBlock code="npx fouikit"/>
            </div>
        </PageWrapper>
    )
}