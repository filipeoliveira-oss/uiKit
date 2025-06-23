'use client'
import CodeBlock from "@/components/codeBlock";
import PageWrapper from "@/components/pageWrapper";
import AutoComplete from "@/uiKit/autoComplete/autoComplete";
import { useState } from "react";

export default function AutoCompletePage() {
    const [t, st] = useState('')

    const a =
        `npx fouikit
components
autoComplete`

    const deps = [
        { name: "tailwind-variants", url: "https://www.npmjs.com/package/tailwind-variants" },
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
        { name: "react-dom", url: "https://www.npmjs.com/package/react-dom" },
        { name: "ag-grid-react", url: "https://www.npmjs.com/package/ag-grid-react" }
    ]

    return (
        <PageWrapper requirements={deps} title="AutoComplete">
            <h1 className="text-4xl font-bold">AutoComplete</h1>
            <span>AutoComplete is an input component that provides real-time suggestions while being typed</span>

            <CodeBlock code={a} />


            <h2 className="text-3xl font-bold">Usage</h2>

            <AutoComplete suggestions={['Filipe', 'Munique', 'Lucas', 'Rhayssa', 'André', 'Larissa']} label="Nome" onChangeValue={st} value={t} inputClassName="bg-white text-black" className="bg-white p-2" />

            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">suggestions*</span>
                <CodeBlock code="Array<string>" language="ts" showLineNumbers={false} />
                <span>Suggestions to show on autocomplete</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">value*</span>
                <CodeBlock code="string" language="ts" showLineNumbers={false} />
                <span>Current value</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">onChangeValue*</span>
                <CodeBlock code="(e:string) => void" language="ts" showLineNumbers={false} />
                <span>Function to execute when value change</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">label</span>
                <CodeBlock code="string" language="js" showLineNumbers={false} />
                <span>Label of the field</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">placeholder</span>
                <CodeBlock code="string" language="js" showLineNumbers={false} />
                <span>String to be shown when no value is selected</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">disabled</span>
                <CodeBlock code="bool" language="js" showLineNumbers={false} />
                <span>When disabled, the element cannot be edited and focused</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">contentMaxHeight</span>
                <CodeBlock code="string" language="js" showLineNumbers={false} />
                <span>Max height that the suggestions can occupy. A unit MUST be passed</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">inputClassName</span>
                <CodeBlock code="string" language="js" showLineNumbers={false} />
                <span>Classname that will be applied to the input</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">ClassName</span>
                <CodeBlock code="string" language="js" showLineNumbers={false} />
                <span>Classname that will be applied to the container</span>
            </div>

        </PageWrapper>
    )
}