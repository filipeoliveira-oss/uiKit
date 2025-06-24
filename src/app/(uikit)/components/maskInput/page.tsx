'use client'
import CodeBlock from "@/components/codeBlock"
import ColorText from "@/components/colorText"
import ComponentDisplay from "@/components/componentDisplay"
import PageWrapper from "@/components/pageWrapper"
import MaskInput from "@/uiKit/components/maskInput/maskInput"
import { useState } from "react"

export default function MaskInputPage() {
    const [v, sv] = useState('')

    const a = 
    `npx fouikit
components
Mask Input`

    const deps = [
        { name: "@react-input/mask", url: "https://www.npmjs.com/package/@react-input/mask" },
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "clsx", url: "https://www.npmjs.com/package/clsx" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
        { name: "react-dom", url: "https://www.npmjs.com/package/react-dom" }
    ]

    return (
        <PageWrapper requirements={deps} title="Mask Input">
            <ColorText text="Mask Input"/>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <ComponentDisplay>
                <MaskInput onChangeValue={(e) => sv(e)} value={v} type="number" label="Phone"/>
            </ComponentDisplay>

            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">onChangeValue*</span>
                <CodeBlock code="(e:string) => void" showLineNumbers={false} />
                <span>Value to executes when it changes</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">value*</span>
                <CodeBlock code="string" showLineNumbers={false} />
                <span>The current value</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Type</span>
                <CodeBlock code="'string' | 'number' | 'all'" showLineNumbers={false} />
                <span>Define which keys will be accepted. Default to all</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Label</span>
                <CodeBlock code="String" showLineNumbers={false} />
                <span>Label that will be shown above the component</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">showMask</span>
                <CodeBlock code="Boolean" showLineNumbers={false} />
                <span>Show current mask or not</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Mask</span>
                <CodeBlock code="String" showLineNumbers={false} />
                <span>The mask it will use. place _ as the replaceable element (__)_____-____</span>
            </div>
            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">placeholder</span>
                <CodeBlock code="String" showLineNumbers={false} />
                <span>The placeholder it will use.</span>
            </div>
        </PageWrapper>
    )
}