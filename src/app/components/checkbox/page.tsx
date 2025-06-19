'use client'
import CodeBlock from "@/components/codeBlock";
import PageWrapper from "@/components/pageWrapper";
import Checkbox from "@/uiKit/checkBox/checkBox";
import { useState } from "react";

export default function CheckboxPage() {
    const [value, setValue] = useState(false)

    const a = 
    `npx fouikit
components
Checkbox`

    const deps = [
  { name: "tailwind-variants", url: "https://www.npmjs.com/package/tailwind-variants" },
  { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
  { name: "react", url: "https://www.npmjs.com/package/react" },
  { name: "framer-motion", url: "https://www.npmjs.com/package/framer-motion" }
]

    return (
        <PageWrapper requirements={deps} title="Checkbox">
            <h1 className="text-4xl font-bold">Checkbox</h1>
            <span>A custom Checkbox for the project</span>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <Checkbox setValue={setValue} value={value} />

            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">setValue</span>
                <CodeBlock code="(e:boolean) => void" language="js" showLineNumbers={false} />
                <span>Function to execute when value change</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">value</span>
                <CodeBlock code="Boolean" showLineNumbers={false} />
                <span>The current value</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">format</span>
                <CodeBlock code="square | rounded" showLineNumbers={false} />
                <span>Format the checkbox will use</span>


                <div className="w-1/2 h-fit flex flex-row gap-2">
                    <Checkbox setValue={setValue} value={value} format="square" />

                    <Checkbox setValue={setValue} value={value} format="rounded" />

                </div>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">falseAccentColor</span>
                <CodeBlock code="color (hex, rgb, rgba,hsl,hsla,oklch,olab,cmyk patterns)" showLineNumbers={false} />
                <span>The color it will use for false value. #FE0000 by default</span>

                <Checkbox setValue={() => { }} value={false} format="square" falseAccentColor="#fff" />
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">trueAccentColor</span>
                <CodeBlock code="color (hex, rgb, rgba,hsl,hsla,oklch,olab,cmyk patterns)" showLineNumbers={false} />
                <span>The color it will use for true value. #00CC44 by default</span>

                <Checkbox setValue={() => { }} value={true} format="square" trueAccentColor="#f0f" />
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">disabledAnimation</span>
                <CodeBlock code="Boolean" showLineNumbers={false} />
                <span>if it should run the animation or not. false by default</span>

                <Checkbox setValue={setValue} value={value} disabledAnimation />
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">animationDuration</span>
                <CodeBlock code="Seconds" showLineNumbers={false} />
                <span>The duration of the animation. 0.5s by default</span>

                <Checkbox setValue={setValue} value={value} animationDuration={2} />
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">size</span>
                <CodeBlock code="number" showLineNumbers={false} />
                <span>The size of the element. 32 by default</span>

                <Checkbox setValue={setValue} value={value} size={48} />
            </div>

        </PageWrapper>
    )
}