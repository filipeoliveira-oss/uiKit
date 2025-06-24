'use client'

import CodeBlock from "@/components/codeBlock"
import ColorText from "@/components/colorText"
import ComponentDisplay from "@/components/componentDisplay"
import PageWrapper from "@/components/pageWrapper"
import InputTextArea from "@/uiKit/components/inputTextArea/inputTextArea"
import { useState } from "react"

export default function InputTextAreaPage() {

    const [s, st] = useState('')

    const a =
        `npx fouikit
components
Input Text Area`


    const deps = [
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
    ]


    return (
        <PageWrapper requirements={deps} title="Input Text Area">
            <ColorText text="Input Text Area" />
            <span>Input Text Area adds styling and autoResize functionality to standard textarea element</span>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <ComponentDisplay>
                <InputTextArea value={s} changeValue={(e) => st(e)} />
            </ComponentDisplay>


            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">value*</span>
                <CodeBlock code="string" language="ts" showLineNumbers={false} />
                <span>Current value</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">changeValue*</span>
                <CodeBlock code="(e:string) => void" language="ts" showLineNumbers={false} />
                <span>Function to change the current value</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">label</span>
                <CodeBlock code="string" language="ts" showLineNumbers={false} />
                <span>Label to show above the component</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">autoResize</span>
                <CodeBlock code="bool" language="ts" showLineNumbers={false} />
                <span>If autoResize is on, the component will automatically increase its height</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">cols</span>
                <CodeBlock code="number" language="ts" showLineNumbers={false} />
                <span>Number of cols. Default to 30</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">rows</span>
                <CodeBlock code="number" language="ts" showLineNumbers={false} />
                <span>Number of rows. Default to 5</span>
            </div>

        </PageWrapper>
    )
}