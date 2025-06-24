'use client'

import CodeBlock from "@/components/codeBlock"
import ColorText from "@/components/colorText"
import ComponentDisplay from "@/components/componentDisplay"
import PageWrapper from "@/components/pageWrapper"
import OrderList from "@/uiKit/orderList/orderList"
import { useState } from "react"

export default function OrderListPage() {

    const [s, st] = useState<any[]>(Array.from({ length:10 }, (_, i) => `Item ${i}`))

    const a =
        `npx fouikit
components
Order List`


    const deps = [
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
    ]


    const Item = (item:any) =>{
        return(
            <div className="w-96 h-fit rounded-3xl shadow p-2">
                {item}
            </div>
        )
    }

    return (
        <PageWrapper requirements={deps} title="Order List">
            <ColorText text="Order List" />
            <span>Order List is used to sort a collection</span>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <ComponentDisplay>
                <OrderList changeValue={(e) => st(e)} itemTemplate={Item} value={s}  />
            </ComponentDisplay>


            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">value*</span>
                <CodeBlock code="Array<any>" language="ts" showLineNumbers={false} />
                <span>Current items</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">changeValue*</span>
                <CodeBlock code="(items: Array<any>) => void" language="ts" showLineNumbers={false} />
                <span>Function to change the current items</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">itemTemplate*</span>
                <CodeBlock code="string" language="ts" showLineNumbers={false} />
                <span>Template to show the item</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">dragAndDrop</span>
                <CodeBlock code="bool" language="ts" showLineNumbers={false} />
                <span>If Drag And Drop will also be available</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">maxHeight</span>
                <CodeBlock code="string" language="ts" showLineNumbers={false} />
                <span>maxHeight. Default to 500px</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">header</span>
                <CodeBlock code="number" language="ts" showLineNumbers={false} />
                <span>Header to show</span>
            </div>

        </PageWrapper>
    )
}