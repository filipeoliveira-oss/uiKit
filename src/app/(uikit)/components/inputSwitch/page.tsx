'use client'

import CodeBlock from "@/components/codeBlock"
import ColorText from "@/components/colorText"
import ComponentDisplay from "@/components/componentDisplay"
import PageWrapper from "@/components/pageWrapper"
import InputSwitch from "@/uiKit/inputSwitch/inputSwitch"
import { useState } from "react"

export default function InputOtpPage() {

    const [s, st] = useState(false)

    const a =
        `npx fouikit
components
Input Otp`


    const deps = [
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
    ]


    return (
        <PageWrapper requirements={deps} title="Input Switch">
            <ColorText text="Input Switch" />
            <span>Input Switch is used to select a boolean value.</span>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <InputSwitch checked={s} onChangeChecked={(e) => st(e)}/>


            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">checked*</span>
                <CodeBlock code="bool" language="ts" showLineNumbers={false} />
                <span>If the switch is off or on</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">onChangeChecked*</span>
                <CodeBlock code="(e:boolean) => void" language="ts" showLineNumbers={false} />
                <span>Function to change the current state</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">showText</span>
                <CodeBlock code="bool" language="ts" showLineNumbers={false} />
                <span>If a text should be shown on each state</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">trueText</span>
                <CodeBlock code="string" language="ts" showLineNumbers={false} />
                <span>Text to show on active state. Default to 'On'</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">falseText</span>
                <CodeBlock code="string" language="ts" showLineNumbers={false} />
                <span>Text to show on deactive state. Default to 'Off'</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">trueBackgroundColor</span>
                <CodeBlock code="string" language="ts" showLineNumbers={false} />
                <span>Color to set the background on active state</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">falseBackgroundColor</span>
                <CodeBlock code="string" language="ts" showLineNumbers={false} />
                <span>Color to set the background on deactive state</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">widthMultiplier</span>
                <CodeBlock code="number" language="ts" showLineNumbers={false} />
                <span>Multiplier to the width. Default to 2</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">height</span>
                <CodeBlock code="string" language="ts" showLineNumbers={false} />
                <span>Height of the element. An unit must be passed, default to 40px</span>
            </div>


        </PageWrapper>
    )
}