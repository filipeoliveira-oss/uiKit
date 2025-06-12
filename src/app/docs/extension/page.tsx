'use client'
import PageWrapper from "@/components/pageWrapper";
import Link from "next/link";

export default function Installation() {
   
    return (
        <PageWrapper requirements={[]} showRequirements={false} title="Installation">
            <h1 className="text-4xl font-bold">Extension</h1>

            <div className="w-full h-[1px] bg-zinc-500"></div>

            <div className="w-full flex flex-col gap-2">
                <h2 className="text-3xl font-semibold">VS Code Extension</h2>

                <span>FOUIKIT provides a VS Code Extension that provides several tools for front end development</span>

                <Link href={'https://marketplace.visualstudio.com/items?itemName=FilipeOliveira084.fouikit-front-end-utilities'} className="mt-4">Clique aqui para instalar a FOUIKIT Front End Utilities</Link>
                
                 <span>The extension provides the following tools</span>

                 <ul className="w-[80%] h-fit list-disc pl-4 ">
                        {['Color converter', 'Glassmorphism','Gradient generator', 'SVG to TSX', 'Fake Data'].map((each, index) => (
                            <li className="text-zinc-300" key={index}>
                                <span>{each}</span>
                            </li>
                        ))}
                    </ul>
            </div>
        </PageWrapper>
    )
}