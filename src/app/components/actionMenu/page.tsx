'use client'
import CodeBlock from "@/components/codeBlock"
import PageWrapper from "@/components/pageWrapper"
import ActionsMenu from "@/uiKit/actionsMenu/actionsMenu"
import { useState } from "react"

export default function ActionMenu() {
    const [currentPosition, setCurrentPosition] = useState('bottomRight')

    const a = `
    npx fouikit
    components
    ActionMenu`

    const deps = [
        { name: "tailwind-variants", url: "https://www.npmjs.com/package/tailwind-variants" },
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
        { name: "react-dom", url: "https://www.npmjs.com/package/react-dom" },
        { name: "ag-grid-react", url: "https://www.npmjs.com/package/ag-grid-react" }
    ]
    return (
        <PageWrapper requirements={deps} title="Action Menu">
            <h1 className="text-4xl font-bold">Actions Menu</h1>
            <span>Actions menu is a menu dropdown</span>

            <CodeBlock code={a} />


            <h2 className="text-3xl font-bold">Usage</h2>

            <ActionsMenu>
                <span className="w-fit">option1</span>
                <span className="w-fit">option2</span>
                <span className="w-fit">option3</span>
            </ActionsMenu>

            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Children*</span>
                <CodeBlock code="React.ReactNode" showLineNumbers={false} />
                <span>This will be the elements inside the action menu pop-up</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Icon</span>
                <CodeBlock code="React.ReactNode" showLineNumbers={false} />
                <span>The icon that will be the icon inside the trigger. Set as Lucide Ellipsis by default</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Position</span>
                <CodeBlock code="topLeft | topRight | top | bottomLeft | bottomRight | bottom" showLineNumbers={false} />
                <span>The position that the pop-up will be displayed</span>

                <div className="w-full h-fit flex flex-col gap-4 mt-4">
                    <span>Try to change the current position bellow</span>

                    <ActionsMenu position={currentPosition as any}>
                        <span className="w-fit">option1</span>
                        <span className="w-fit">option2</span>
                        <span className="w-fit">option3</span>
                    </ActionsMenu>

                    <select className="w-full h-12 bg-zinc-600" name="position" value={currentPosition} onChange={(e) => setCurrentPosition(e.target.value)}>
                        <option value="topLeft">topLeft</option>
                        <option value="topRight">topRight</option>
                        <option value="top">top</option>
                        <option value="bottomLeft">bottomLeft</option>
                        <option value="bottomRight">bottomRight</option>
                        <option value="bottom">bottom</option>
                    </select>
                </div>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Classname</span>
                <CodeBlock code="Classname string" showLineNumbers={false} />
                <span>Classname that will be applied to the children</span>
            </div>

        </PageWrapper>
    )
}