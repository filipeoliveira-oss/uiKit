import CodeBlock from "@/components/codeBlock";
import PageWrapper from "@/components/pageWrapper";
import { Tooltip } from "@/uiKit/tooltip/tooltip";

export default function TooltipPage() {

    const a = `
    npx fouikit
    components
    Tooltip`

    const deps = [
  { name: "tailwind-variants", url: "https://www.npmjs.com/package/tailwind-variants" },
  { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
  { name: "react", url: "https://www.npmjs.com/package/react" },
  { name: "framer-motion", url: "https://www.npmjs.com/package/framer-motion" }
]

    return (
        <PageWrapper requirements={deps} title="Tooltip">
            <h1 className="text-4xl font-bold">Tooltip</h1>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <Tooltip content="This is the tooltip">
                Hover me
            </Tooltip>


            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Content*</span>
                <CodeBlock code="String" showLineNumbers={false} />
                <span>String to be displayed in the tooltip</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">placement</span>
                <CodeBlock code="top-start | top | top-end | bottom-start | bottom | bottom-end | left-start | left | left-end | right-start | right | right-end" showLineNumbers={false} />
                <span>Placement of the tooltip relatively to the trigger. top-start by default</span>
            </div>
            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">delayOpen</span>
                <CodeBlock code="MS" showLineNumbers={false} />
                <span>Delay to show the tooltip. 150ms by default</span>
            </div>

             <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">delayHide</span>
                <CodeBlock code="MS" showLineNumbers={false} />
                <span>Delay to hide the tooltip. 150ms by default</span>
            </div>
             <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">backgroundColor</span>
                <CodeBlock code="MS" showLineNumbers={false} />
                <span>The background color of the tooltip. #ffffff by default</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">className</span>
                <CodeBlock code="String" showLineNumbers={false} />
                <span>Any other classname passed to the tooltip</span>
            </div>
        </PageWrapper>
    )
}