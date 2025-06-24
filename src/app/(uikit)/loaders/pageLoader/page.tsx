'use client'
import CodeBlock from "@/components/codeBlock"
import ColorText from "@/components/colorText"
import PageWrapper from "@/components/pageWrapper"
import { Button } from "@/uiKit/button/button"
import { useState } from "react"

export default function PageLoader() {
    const [selectedColor, setSelectedColor] = useState('#8e51ff')

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
            <PageLoader />
            <ColorText text="Page Loader"/>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>
            <Button >Show loader</Button>
            <Button>Hide loader</Button>

            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Size</span>
                <CodeBlock code="String" showLineNumbers={false} />
                <span>Size of the element. A unit is expected to be passed in</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Color</span>
                <CodeBlock code="Color" showLineNumbers={false} />
                <span>Color that will be use</span>
            </div>

            <input value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} type="color" className="w-20 h-12 shrink-0" />


        </PageWrapper>

    )
}
