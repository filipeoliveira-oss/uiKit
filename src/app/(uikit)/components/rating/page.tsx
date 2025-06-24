'use client'

import CodeBlock from "@/components/codeBlock"
import ColorText from "@/components/colorText"
import ComponentDisplay from "@/components/componentDisplay"
import PageWrapper from "@/components/pageWrapper"
import OrderList from "@/uiKit/orderList/orderList"
import RadioGroup from "@/uiKit/radioGroup/radioGroup"
import Rating from "@/uiKit/rating/rating"
import { useState } from "react"

export default function RatingPage() {

    const [s, st] = useState(0)

    const a =
        `npx fouikit
components
Ratting`


    const deps = [
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
    ]


    return (
        <PageWrapper requirements={deps} title="Radio Group">
            <ColorText text="Radio Group" />
            <span>Radio group is an extension to standard radio button element with theming</span>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <ComponentDisplay>
                <Rating setValue={(e) => st(e)} value={s} />
            </ComponentDisplay>


            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">value*</span>
                <CodeBlock code="number" language="ts" showLineNumbers={false} />
                <span>Current value</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">cancel</span>
                <CodeBlock code="bool" language="ts" showLineNumbers={false} />
                <span>If cancel is present, an icon will be shown to set the current value to 0</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">stars</span>
                <CodeBlock code="number" language="ts" showLineNumbers={false} />
                <span>The number of starts. Default to 5</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">onIcon</span>
                <CodeBlock code="React.ReactNode" language="ts" showLineNumbers={false} />
                <span>Icon to shown at on state</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">offIcon</span>
                <CodeBlock code="React.ReactNode" language="ts" showLineNumbers={false} />
                <span>Icon to shown at off state</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">cancelIcon</span>
                <CodeBlock code="React.ReactNode" language="ts" showLineNumbers={false} />
                <span>Icon to shown as cancel</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">strokeColor</span>
                <CodeBlock code="string" language="ts" showLineNumbers={false} />
                <span>Stroke color when the item os off</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">fillColor</span>
                <CodeBlock code="string" language="ts" showLineNumbers={false} />
                <span>Color to fill the star when active</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">disabled</span>
                <CodeBlock code="bool" language="ts" showLineNumbers={false} />
                <span>If disabled is present, it's not possible to focus or change the value</span>
            </div>

        </PageWrapper>
    )
}