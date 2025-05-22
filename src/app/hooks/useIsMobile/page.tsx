'use client'
import CodeBlock from "@/components/codeBlock";
import { useIsMobile } from "@/uiKit/useIsMobile/useIsMobile";

export default function UseIsMobile() {

    const isMobile = useIsMobile()

    const install = `
    npx fouikit
    hooks
    useIsMobile`


    const example = `
    //default max-width (768px)
    const isMobile = useIsMobile()
    
    //custom max-width (500px)
    const isMobile = useIsMobile(500)`

    return (
        <div className="w-full h-full overflow-auto flex flex-col gap-8  pb-12">
            <h1 className="text-4xl font-bold">useInputFocus</h1>
            <span>useIsMobile accepts a max-width to define if the screen is on a mobile width or not.</span>
            <span>By default the max-width is 768px (screen MD from tailwind)</span>

            <CodeBlock code={install} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <span>open the browser console and reduce the width screen</span>
            <span>Width lesser than 768px: {String(isMobile)}</span>


            <CodeBlock language="javascript" code={example} />
        </div>
    )
}