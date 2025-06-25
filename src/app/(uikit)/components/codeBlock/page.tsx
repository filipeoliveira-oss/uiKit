'use client'

import ColorText from "@/components/colorText"
import ComponentDisplay from "@/components/componentDisplay"
import PageWrapper from "@/components/pageWrapper"
import CodeBlock from "@/uiKit/components/codeBlock/codeBlock"
import OrderList from "@/uiKit/components/orderList/orderList"
import RadioGroup from "@/uiKit/components/radioGroup/radioGroup"
import Rating from "@/uiKit/components/rating/rating"
import { useState } from "react"

export default function RatingPage() {

    const [s, st] = useState(0)

    const a =
        `npx fouikit
components
Code Block`


    const deps = [
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
        { name: "shiki", url: "https://www.npmjs.com/package/shiki" },
    ]


    return (
        <PageWrapper requirements={deps} title="Code Block">
            <ColorText text="Code Block" />
            <span>Code block is a component to display code, highlighted with your favorite colors</span>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <CodeBlock code="const [state, setState] = useState<boolean>(false)" filename="app.tsx" />
            
            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">code*</span>
                <CodeBlock code="string" language="tsx" copy={false} />
                <span>Current code to be shown</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">filename</span>
                <CodeBlock code="string" language="tsx" copy={false} />
                <span>If the file name should be shown</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">language</span>
                <CodeBlock code="string" language="tsx" copy={false} />
                <span>language to interpret. Default to TSX</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">copy</span>
                <CodeBlock code="boolean" language="tsx" copy={false} />
                <span>If the copy button should be show</span>
            </div>

        </PageWrapper>
    )
}