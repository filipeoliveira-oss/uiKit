'use client'
import CodeBlock from "@/components/codeBlock";
import PageWrapper from "@/components/pageWrapper";
import { useIsMobile } from "@/uiKit/hooks/useIsMobile/useIsMobile";

export default function UseIsMobile() {

    const isMobile = useIsMobile()

    const install = 
    `npx fouikit
hooks
useIsMobile`


    const example = 
    `//default max-width (768px)
const isMobile = useIsMobile()

//custom max-width (500px)
const isMobile = useIsMobile(500)`

     const deps = [
  { name: "react", url: "https://www.npmjs.com/package/react" },
  { name: "react-dom", url: "https://www.npmjs.com/package/react-dom" }
]

    return (
        <PageWrapper requirements={deps} title="UseIsMobile">
            <h1 className="text-4xl font-bold">useInputFocus</h1>
            <span>useIsMobile accepts a max-width to define if the screen is on a mobile width or not.</span>
            <span>By default the max-width is 768px (screen MD from tailwind)</span>

            <CodeBlock code={install} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <span>open the browser console and reduce the width screen</span>
            <span>Width lesser than 768px: {String(isMobile)}</span>


            <CodeBlock language="javascript" code={example} />
        </PageWrapper>
    )
}