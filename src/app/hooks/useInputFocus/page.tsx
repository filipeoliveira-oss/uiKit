'use client'
import CodeBlock from '@/components/codeBlock';
import useInputFocus from '@/uiKit/useInputFocus/useInputFocus';
import { useRef } from 'react';

export default function UseInputFocus() {

    const inputRef = useRef<HTMLInputElement>(null)
    const isFocused = useInputFocus(inputRef)

    const code = `
    npx fouikit
    hooks
    useInputFocus`

    return (
        <div className="w-full h-full overflow-auto flex flex-col gap-8  pb-12">
            <h1 className="text-4xl font-bold">useInputFocus</h1>
            <span>useInputFocus is a hook that will display whether the input is focused or not</span>

            <CodeBlock code={code}/>

            <h2 className="text-3xl font-bold">Usage</h2>
            <input ref={inputRef} className='w-full bg-zinc-600 text-white h-8 pl-2 rounded-lg outline-none' placeholder='Click me' />
            <span>Input Focus: <span className='capitalize '>{String(isFocused)}</span></span>
        </div>
    )
}