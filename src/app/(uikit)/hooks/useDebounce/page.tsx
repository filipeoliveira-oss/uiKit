'use client'
import CodeBlock from '@/components/codeBlock';
import ColorText from '@/components/colorText';
import PageWrapper from '@/components/pageWrapper';

export default function useDebouncePage() {

    const a =
        `npx fouikit
hooks
useDebounce`


    const deps = [
        { name: "react", url: "https://www.npmjs.com/package/react" }
    ]

    return (
        <PageWrapper requirements={deps} title="useDebounce">
            <ColorText text='useDebounce' />
            <span>The useDebounce hook delays updating a value until a certain amount of time has passed without changes.</span>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>
            <CodeBlock code={`const [search, setSearch] = useState('')
const debounceSearch = useDebounce(search, 250)`} language='js' />

            <h2 className="text-3xl font-bold">Parameters</h2>
                <CodeBlock code={`useDebounce<T>(value: T, delay: number = 300)`} language='js' />

        </PageWrapper>
    )
}