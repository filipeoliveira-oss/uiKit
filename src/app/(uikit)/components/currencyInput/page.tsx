'use client'
import CodeBlock from "@/components/codeBlock";
import ColorText from "@/components/colorText";
import ComponentDisplay from "@/components/componentDisplay";
import PageWrapper from "@/components/pageWrapper";
import CurrencyInput from "@/uiKit/components/currencyInput/currencyInput";
import { useState } from "react";

export default function Currency() {
    const [value, setValue] = useState('')

    const a = 
    `npx fouikit
components
Currency Input`

const deps = [
        { name: "react-number-format", url: "https://www.npmjs.com/package/react-number-format" },
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "clsx", url: "https://www.npmjs.com/package/clsx" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
        { name: "react-dom", url: "https://www.npmjs.com/package/react-dom" }
    ]


    return (
        <PageWrapper requirements={deps} title="Currency Input">
            <ColorText text="Currency input"/>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <ComponentDisplay>
                <CurrencyInput onChangeValue={(e) => setValue} value={value} label="Value"/>
            </ComponentDisplay>

            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">setValue*</span>
                <CodeBlock code="(e:NumberFormatValues) => void" showLineNumbers={false} />
                <span>Function to execute when value change</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">value*</span>
                <CodeBlock code="Boolean" showLineNumbers={false} />
                <span>The current value</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Label</span>
                <CodeBlock code="string" showLineNumbers={false} />
                <span>Label that will be shown above the component</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">placeholder</span>
                <CodeBlock code="string" showLineNumbers={false} />
                <span>Placeholder that will shown in the input</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">inputClassName</span>
                <CodeBlock code="string" showLineNumbers={false} />
                <span>Classname that will be applied to the input itself</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">className</span>
                <CodeBlock code="string" showLineNumbers={false} />
                <span>Classname that will be applied to the input container</span>
            </div>
        </PageWrapper>
    )
}