'use client'
import CodeBlock from "@/components/codeBlock";
import ColorText from "@/components/colorText";
import PageWrapper from "@/components/pageWrapper";
import { Button } from "@/uiKit/components/button/button";
import Modal from "@/uiKit/components/modal/modal";
import { useState } from "react";

export default function ModalPage() {
    const [open, setOpen] = useState(false)
    const a = 
    `npx fouikit
components
Modal`

    const deps = [
  { name: "tailwind-variants", url: "https://www.npmjs.com/package/tailwind-variants" },
  { name: "framer-motion", url: "https://www.npmjs.com/package/framer-motion" },
  { name: "lucide-react", url: "https://www.npmjs.com/package/lucide-react" },
  { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
  { name: "clsx", url: "https://www.npmjs.com/package/clsx" },
  { name: "react", url: "https://www.npmjs.com/package/react" },
  { name: "react-dom", url: "https://www.npmjs.com/package/react-dom" }
]

    return (
        <PageWrapper requirements={deps} title="Modal">
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                This is the modal

                <Button onClick={() => setOpen(false)}>Close modal</Button>
            </Modal>

            <ColorText text="Modal"/>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <Button onClick={() => setOpen(true)}>Open modal</Button>


            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">isOpen*</span>
                <CodeBlock code="Boolean" showLineNumbers={false} />
                <span>Controls if the Modal is open or not</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">onClose</span>
                <CodeBlock code="Function" showLineNumbers={false} />
                <span>Function to be executed when the X icon is clicked. note that the X icon will only be displayed if this parameter is used</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">children</span>
                <CodeBlock code="React.ReactNode" showLineNumbers={false} />
                <span>Elements inside the modal</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">disableAnimation</span>
                <CodeBlock code="Boolean" showLineNumbers={false} />
                <span>if the modal should animate or not</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">animationDuration</span>
                <CodeBlock code="Seconds" showLineNumbers={false} />
                <span>The duration of the animate. 0.2 by default</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">title</span>
                <CodeBlock code="string" showLineNumbers={false} />
                <span>Title of the modal</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">openWidth</span>
                <CodeBlock code="string" showLineNumbers={false} />
                <span>The width of the modal. 50% of the screen by default</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">openHeight</span>
                <CodeBlock code="string" showLineNumbers={false} />
                <span>The height of the modal. 66% of the screen by default</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">overlayClassName</span>
                <CodeBlock code="string" showLineNumbers={false} />
                <span>The classname that will be applied to the background</span>
            </div>
        </PageWrapper>
    )
}