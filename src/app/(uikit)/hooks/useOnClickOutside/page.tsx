'use client'
import CodeBlock from '@/components/codeBlock';
import ColorText from '@/components/colorText';
import PageWrapper from '@/components/pageWrapper';

export default function useDocumentTitlePage() {


    const a =
        `    npx fouikit
    hooks
    useOnClickOutside`

    const code =
        `    const ref = useRef(null)
    const handleClickOutside = () => {
        console.log('clicked outside!')
    }

    useOnClickOutside(ref, handleClickOutside)
    
    <div ref={ref}></div>`

    const deps = [
        { name: "react", url: "https://www.npmjs.com/package/react" },
        { name: "react-dom", url: "https://www.npmjs.com/package/react-dom" }
    ]

    return (
        <PageWrapper requirements={deps} title="useOnClickOutside">
            <ColorText text='useOnClickOutside'/>
            <span>useOnClickOutside is a hook that will trigger a function when the element is blurred.</span>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>
            <CodeBlock code={code} language='javascript' />

            <h2 className="text-3xl font-bold">Parameters</h2>
            <CodeBlock code='useOnClickOutside(ref, handler, eventType, eventListenerOptions)' language='javascript' />

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Ref*</span>
                <CodeBlock code="RefObject<T> | RefObject<T>[]" showLineNumbers={false} />
                <span>The ref of the element watched</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Handler*</span>
                <CodeBlock code="() => void" showLineNumbers={false} />
                <span>Function to be executed when the event happens outside the element</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">EventType</span>
                <CodeBlock code={`"mousedown" | "mouseup" | "touchstart" | "touchend" | "focusin" | "focusout"`} showLineNumbers={false} />
                <span>The Event Type to be watched. mousedown by default</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">eventListenerOptions</span>
                <CodeBlock code={`AddEventListenerOptions extends EventListenerOptions`} showLineNumbers={false} />
                <span>The options object to be passed to the addEventListener method</span>
            </div>

        </PageWrapper>
    )
}