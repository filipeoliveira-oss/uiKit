'use client'
import CodeBlock from '@/components/codeBlock';
import PageWrapper from '@/components/pageWrapper';
import useInputFocus from '@/uiKit/useInputFocus/useInputFocus';
import { useRef } from 'react';

export default function UseInputFocus() {

    const inputRef = useRef<HTMLInputElement>(null)
    const isFocused = useInputFocus(inputRef)

    const a = `
    npx fouikit
    hooks
    useInputFocus`

    const code = `
    const inputRef = useRef<HTMLInputElement>(null)
    const isFocused = useInputFocus(inputRef)

    <input ref={inputRef} className='w-full bg-zinc-600 text-white h-8 pl-2 rounded-lg outline-none' placeholder='Click me' />`


    const deps = [
        { name: "react", url: "https://www.npmjs.com/package/react" },
        { name: "react-dom", url: "https://www.npmjs.com/package/react-dom" }
    ]

    return (
        <PageWrapper requirements={deps} title="UseInputFocus">
            <h1 className="text-4xl font-bold">useInputFocus</h1>
            <span>useInputFocus is a hook that will display whether the input is focused or not</span>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>
            <CodeBlock code={code} language='javascript'/>

            <input ref={inputRef} className='w-full bg-zinc-50 text-black h-8 pl-2 rounded-lg outline-none' placeholder='Click me' />
            <span>Input Focus: <span className='capitalize '>{String(isFocused)}</span></span>
        </PageWrapper>
    )
}