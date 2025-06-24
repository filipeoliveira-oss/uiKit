'use client'
import CodeBlock from "@/components/codeBlock";
import ColorText from "@/components/colorText";
import ComponentDisplay from "@/components/componentDisplay";
import PageWrapper from "@/components/pageWrapper";
import Dropdown from "@/uiKit/components/dropdown/dropdown";
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
                <Dropdown options={['option1', 'option2', 'option3']} onChangeValue={(e) => sv(e)} value={v} />
            </ComponentDisplay>

            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">options*</span>
                <CodeBlock code="Array<string> | Array<Record<string, any>>" showLineNumbers={false} />
                <span>The options to be shown</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">onChangeValue*</span>
                <CodeBlock code="(e: element) => void" showLineNumbers={false} />
                <span>Function to execute on change</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">value*</span>
                <CodeBlock code="string | number | Record<string, any> | null" showLineNumbers={false} />
                <span>Current Value</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">placeholder</span>
                <CodeBlock code="string" showLineNumbers={false} />
                <span>Placeholder to show when value is null</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">disabled</span>
                <CodeBlock code="Boolean" showLineNumbers={false} />
                <span>When disabled, it cannot be focused or modified</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">filter</span>
                <CodeBlock code="Boolean" showLineNumbers={false} />
                <span>Search input to filter elements</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">filterKey</span>
                <CodeBlock code="string" showLineNumbers={false} />
                <span>Key to filter when options are objects. Mandatory to make object search.</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">itemTemplate</span>
                <CodeBlock code="(item: any) => React.ReactNode" showLineNumbers={false} />
                <span>Item template to show the item. Mandatory to work with objects</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">className</span>
                <CodeBlock code="string" showLineNumbers={false} />
                <span>Class to be applied to the dropdown</span>
            </div>


        </PageWrapper>
    )
}