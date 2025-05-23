'use client'
import CodeBlock from '@/components/codeBlock';
import PageWrapper from '@/components/pageWrapper';
import useDocumentTitle from '@/uiKit/useDocumentTitle/useDocumentTitle';
import { useState } from 'react';

export default function useDocumentTitlePage() {

    const [title, setTitle] = useState(`FOUIKIT | UseDocumentTitle`)
    useDocumentTitle(title)

    const a = `
    npx fouikit
    hooks
    useDocumentTitle`

    const code = `useDocumentTitle('${title}')`

    const deps = [
        { name: "react", url: "https://www.npmjs.com/package/react" },
        { name: "react-dom", url: "https://www.npmjs.com/package/react-dom" }
    ]

    return (
        <PageWrapper requirements={deps} title="UseDocumentTitle">
            <h1 className="text-4xl font-bold">useDocumentTitle</h1>
            <span>useInputFocus is a hook that will change the window document title</span>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>
            <CodeBlock code={code} language='javascript'/>

            <span>Change the document title bellow</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className='w-full bg-zinc-50 text-black h-8 pl-2 rounded-lg outline-none' placeholder='Change the document title' />

        </PageWrapper>
    )
}