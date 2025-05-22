'use client'
import CodeBlock from "@/components/codeBlock"
import PageWrapper from "@/components/pageWrapper"
import MaskInput from "@/uiKit/maskInput/maskInput"
import { useState } from "react"

export default function MaskInputPage() {
    const [v, sv] = useState('')

    const a = `
        npx fouikit
        components
        Mask Input`

    return (
        <PageWrapper>
            <h1 className="text-4xl font-bold">Dropdown</h1>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <MaskInput onChangeValue={(e) => sv(e.target.value)} value={v} mask="" type="number"/>

            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">onChangeValue*</span>
                <CodeBlock code="(e) => setValue(e.target.value)" showLineNumbers={false} />
                <span>Value to executes when it changes</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">value*</span>
                {/* <CodeBlock code="(e) => setValue(e.target.value)" showLineNumbers={false} /> */}
                <span>The current value</span>
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