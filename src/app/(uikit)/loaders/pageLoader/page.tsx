'use client'
import CodeBlock from "@/components/codeBlock";
import ColorText from "@/components/colorText";
import PageWrapper from "@/components/pageWrapper";
import { Button } from "@/uiKit/components/button/button";
import { PageLoader, plController } from "@/uiKit/loaders/pageLoader/pageLoader";
import { useState } from "react";

export default function PageLoaderPage() {
    const [selectedColor, setSelectedColor] = useState('#FF0000')

    const a =
        `npx fouikit
components
pageLoader`

    const deps = [
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "react", url: "https://www.npmjs.com/package/react" }
    ]

    return (

        <PageWrapper requirements={deps} title="Page Loader">
            <PageLoader color={selectedColor} />
            <ColorText text="Page Loader" />

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>
            <span>PageLoader component must be imported somewhere in the current page (that includes the current page, layouts and any other component shown)</span>

            <Button onClick={() => plController.start()}>Show loader</Button>
            <Button onClick={() => plController.end()}>Hide loader</Button>

            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Template</span>
                <CodeBlock code="React.ReactNode" showLineNumbers={false} />
                <span>Template to change the default loader</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Color</span>
                <CodeBlock code="string" showLineNumbers={false} />
                <input value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} type="color" className="w-20 h-12 shrink-0" />
                <span>Color that will be use. Default to #FF0000</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">glow</span>
                <CodeBlock code="boolean" showLineNumbers={false} />
                <span>If glow is present, a glow effect will be applied. Default to True</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">height</span>
                <CodeBlock code="string" showLineNumbers={false} />
                <span>Height of the loader, a unit MUST be passed. Default to 2px.</span>
            </div>



        </PageWrapper>

    )
}
