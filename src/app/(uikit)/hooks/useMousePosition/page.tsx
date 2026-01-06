'use client'
import CodeBlock from '@/components/codeBlock';
import ColorText from '@/components/colorText';
import PageWrapper from '@/components/pageWrapper';

export default function useDocumentTitlePage() {


    const a =
        `    npx fouikit
    hooks
    useMousePosition`

    const code =
        `    const {x, y} = useMousePosition()`

    const deps = [
        { name: "react", url: "https://www.npmjs.com/package/react" },
        { name: "react-dom", url: "https://www.npmjs.com/package/react-dom" }
    ]

    return (
        <PageWrapper requirements={deps} title="useOnClickOutside">
            <ColorText text='useMousePosition'/>
            <span>useMousePosition is a hook that will return the current X and Y value of the cursor.</span>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>
            <CodeBlock code={code} language='javascript' />

            <h2 className="text-3xl font-bold">Returns</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">X</span>
                <CodeBlock code="float" showLineNumbers={false} />
                <span>The current value for X position</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Y</span>
                <CodeBlock code="float" showLineNumbers={false} />
                <span>The current value for Y position</span>
            </div>


        </PageWrapper>
    )
}