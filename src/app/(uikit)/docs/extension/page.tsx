'use client'
import ColorText from "@/components/colorText";
import PageWrapper from "@/components/pageWrapper";
import Link from "next/link";

export default function Installation() {
   
    return (
        <PageWrapper requirements={[]} showRequirements={false} title="Installation">
            <ColorText text="Extension"/>


            <div className="w-full flex flex-col gap-2">

                <span>FOUIKIT provides a VS Code Extension that provides several tools for front end development</span>

                <Link href={'https://marketplace.visualstudio.com/items?itemName=FilipeOliveira084.fouikit-front-end-utilities'} className="mt-4 underline" target="_blank">Click here to install FOUIKIT Front End Utilities</Link>
                
                 <span className="mt-4">The extension provides the following tools</span>

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