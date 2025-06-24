'use client'
import CodeBlock from "@/components/codeBlock";
import ColorText from "@/components/colorText";
import ComponentDisplay from "@/components/componentDisplay";
import PageWrapper from "@/components/pageWrapper";
import { Dropdown } from "@/uiKit/components/dropdown/dropdown";
import { useState } from "react";

export default function DropdownPage() {

    const [v, sv] = useState('')

    const a =
        `npx fouikit
components
Dropdown`

    const deps = [
        { name: "framer-motion", url: "https://www.npmjs.com/package/framer-motion" },
        { name: "lucide-react", url: "https://www.npmjs.com/package/lucide-react" },
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "clsx", url: "https://www.npmjs.com/package/clsx" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
        { name: "react-dom", url: "https://www.npmjs.com/package/react-dom" },
        { name: "usehooks-ts", url: "https://www.npmjs.com/package/usehooks-ts" }
    ]


    return (
        <PageWrapper requirements={deps} title="Dropdown">
            <ColorText text="Dropdown" />

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <ComponentDisplay>
                <Dropdown content={['option1', 'option2', 'option3']} onChangeValue={(e) => sv(e)} value={v}  />
            </ComponentDisplay>

            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">content*</span>
                <CodeBlock code="Array<string> | Array<Objects<...,labelKey:string>>" showLineNumbers={false} />
                <span>The options to be shown</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">LabelKey</span>
                <CodeBlock code="String" showLineNumbers={false} />
                <span>Mandatory if the content is an Array of objects with the labelKey element</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">onChangeValue*</span>
                <CodeBlock code="(e:element) => void" showLineNumbers={false} />
                <span>Function to execute on change</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">value*</span>
                <CodeBlock code="tring | number | null" showLineNumbers={false} />
                <span>Current Value</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Filter</span>
                <CodeBlock code="Boolean" showLineNumbers={false} />
                <span>If the filter will be shown or not</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">disabled</span>
                <CodeBlock code="Boolean" showLineNumbers={false} />
                <span>If the dropdown is disabled</span>
            </div>
        </PageWrapper>
    )
}