'use client'
import CodeBlock from "@/components/codeBlock";
import PageWrapper from "@/components/pageWrapper";

export default function Installation() {
   
    return (
        <PageWrapper requirements={[{name:'React 18+', url:'https://react.dev/'}, {name:'Tailwind CSS V4', url:'https://tailwindcss.com/'}]} title="Installation">
            <h1 className="text-4xl font-bold">Installation</h1>

            <div className="w-full h-[1px] bg-zinc-500"></div>

            <div className="w-full flex flex-col gap-2">
                <h2 className="text-3xl font-semibold">Automatic Installation</h2>

                <span>Execute the following command to choose which component/hook you want!</span>

                <CodeBlock code="npx fouikit"/>
            </div>
        </PageWrapper>
    )
}