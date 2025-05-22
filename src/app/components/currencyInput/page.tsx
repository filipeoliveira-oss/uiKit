'use client'
import CodeBlock from "@/components/codeBlock";
import PageWrapper from "@/components/pageWrapper";
import CurrencyInput from "@/uiKit/currencyInput/currencyInput";
import { useState } from "react";

export default function Currency() {
    const [value, setValue] = useState('')

    const a = `
    npx fouikit
    components
    Currency Input`

    return (
        <PageWrapper>
            <h1 className="text-4xl font-bold">Currency inputs</h1>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <CurrencyInput onChangeValue={(e) => setValue} value={value} className="text-black bg-zinc-50" />

            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">setValue*</span>
                <CodeBlock code="Function" showLineNumbers={false} />
                <span>Function to execute when value change</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">value*</span>
                <CodeBlock code="Boolean" showLineNumbers={false} />
                <span>The current value</span>
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