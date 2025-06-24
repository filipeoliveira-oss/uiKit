'use client'

import CodeBlock from "@/components/codeBlock"
import ColorText from "@/components/colorText"
import ComponentDisplay from "@/components/componentDisplay"
import PageWrapper from "@/components/pageWrapper"
import InputOtp from "@/uiKit/inputOtp/inputOtp"
import { useState } from "react"

export default function InputOtpPage() {

    const [s, st] = useState('')

    const a =
        `npx fouikit
components
Input Otp`


    const deps = [
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
    ]


    return (
        <PageWrapper requirements={deps} title="Input Otp">
            <ColorText text="Input Otp" />
            <span>Input Otp groups a collection of contents in tabs</span>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <ComponentDisplay>
                <InputOtp value={s} changeOtp={(e) => st(e)} tokenLength={6} />
            </ComponentDisplay>
           

            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">value*</span>
                <CodeBlock code="string" language="ts" showLineNumbers={false} />
                <span>Current value</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">changeOtp*</span>
                <CodeBlock code="(e: string) => void" language="ts" showLineNumbers={false} />
                <span>Function to change the current value</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">tokenLength*</span>
                <CodeBlock code="number" language="ts" showLineNumbers={false} />
                <span>The token length to be displayed</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">intergerOnly</span>
                <CodeBlock code="bool" language="ts" showLineNumbers={false} />
                <span>If it should only accept integers</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">separator</span>
                <CodeBlock code="string" language="ts" showLineNumbers={false} />
                <span>String to separe the elements</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">disabled</span>
                <CodeBlock code="React.ReactNode" language="ts" showLineNumbers={false} />
                <span>If disabled is not possible to focus or change</span>
            </div>

        </PageWrapper>
    )
}