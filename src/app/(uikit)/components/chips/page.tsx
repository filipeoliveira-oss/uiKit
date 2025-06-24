'use client'
import CodeBlock from "@/components/codeBlock";
import ColorText from "@/components/colorText";
import ComponentDisplay from "@/components/componentDisplay";
import PageWrapper from "@/components/pageWrapper";
import { Chips } from "@/uiKit/chips/chips";
import { useState } from "react";

export default function ChipsPage() {

    const [value, setValue] = useState<Array<string>>([])

    const deps = [
        { name: "react", url: "https://www.npmjs.com/package/react" },
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "clsx", url: "https://www.npmjs.com/package/clsx" },
    ]
    const a =
        `npx fouikit
components
Chips`



    const code =
        `const [values, setValues] = useState<Array<string>>([]);

{...}

<Chips value={value} changeValue={setValue}/>`

    const template =
        `const customChip = (item:string) => {
    return (
        <div>
            <span>{item} - (active)</span>
        </div>
    );
};
        `

    return (
        <PageWrapper requirements={deps} title="Chips">
            <ColorText text="Chips"/>
            <div className="flex flex-col gap-2">
                <span>Chips is used to enter multiple values on an input field.</span>
                <span>Chips is a HTMLInputElement replica, that means that every Input property works on the element</span>
            </div>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <CodeBlock code={code} showLineNumbers={false} language="js" />

            <ComponentDisplay>
                <Chips value={value} changeValue={setValue} label="Label"/>
            </ComponentDisplay>

            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">value*</span>
                <CodeBlock code="Array<string>" showLineNumbers={false} language="js" />
                <span>Controlled value for the chips</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">changeValue*</span>
                <CodeBlock code="(e:string) => void" language="js" showLineNumbers={false} />
                <span>Function to be executed when value changes</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">label</span>
                <CodeBlock code="string" showLineNumbers={false} language="js" />
                <span>A label that appears on top of the input field</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">separator</span>
                <CodeBlock code="string" showLineNumbers={false} language="js" />
                <span>A new chip is added when ; key is pressed, separator property allows definining an additional key.</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">template</span>
                <CodeBlock code="(chip: string) => React.ReactNode" showLineNumbers={false} language="js" />
                <CodeBlock code={template} showLineNumbers={false} language="js" />

                <span>Chip content is customized using itemTemplate function that receives a single chip value as a parameter. Can use function components or const</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">disabled</span>
                <CodeBlock code="bool" showLineNumbers={false} language="js" />
                <span>When disabled is present, the element cannot be edited and focused.</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">keyFilter</span>
                <CodeBlock code="'number' | 'letter' | 'any'" showLineNumbers={false} language="js" />
                <span>Chips has built-in key filtering support to block certain keys. Accepts every key by default</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">inputClassName</span>
                <CodeBlock code="string" showLineNumbers={false} language="js" />
                <span>ClassName to be applied to the input</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">className</span>
                <CodeBlock code="string" showLineNumbers={false} language="js" />
                <span>ClassName to be applied to the container</span>
            </div>

        </PageWrapper>
    )
}