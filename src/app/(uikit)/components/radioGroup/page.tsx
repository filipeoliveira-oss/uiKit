'use client'

import CodeBlock from "@/components/codeBlock"
import ColorText from "@/components/colorText"
import ComponentDisplay from "@/components/componentDisplay"
import PageWrapper from "@/components/pageWrapper"
import OrderList from "@/uiKit/orderList/orderList"
import RadioGroup from "@/uiKit/radioGroup/radioGroup"
import { useState } from "react"

export default function RadioGroupPage() {

    const [s, st] = useState('')

    const a =
        `npx fouikit
components
Radio group`


    const deps = [
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
    ]


    return (
        <PageWrapper requirements={deps} title="Radio Group">
            <ColorText text="Radio Group" />
            <span>Radio group is an extension to standard radio button element with theming</span>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <ComponentDisplay>
                <RadioGroup changeValue={(e) => st(e)} name="element" options={['Option 1', 'Option 2', 'Option 3']} value={s}/>
            </ComponentDisplay>


            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">value*</span>
                <CodeBlock code="string" language="ts" showLineNumbers={false} />
                <span>Current value</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">changeValue*</span>
                <CodeBlock code="(e: string) => void" language="ts" showLineNumbers={false} />
                <span>Function to change the current value</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">options*</span>
                <CodeBlock code="Array<string>" language="ts" showLineNumbers={false} />
                <span>Array of options</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">name*</span>
                <CodeBlock code="string" language="ts" showLineNumbers={false} />
                <span>Identifier of the group</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">selectedColor</span>
                <CodeBlock code="string" language="ts" showLineNumbers={false} />
                <span>Color when selected</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">disabled</span>
                <CodeBlock code="bool" language="ts" showLineNumbers={false} />
                <span>If disabled is present, it's not possible to focus or change the value</span>
            </div>

        </PageWrapper>
    )
}