'use client'
import CodeBlock from '@/components/codeBlock';
import ColorText from '@/components/colorText';
import PageWrapper from '@/components/pageWrapper';

export default function useDebouncePage() {

    const a =
        `npx fouikit
hooks
useDebounceCallback`


    const deps = [
        { name: "react", url: "https://www.npmjs.com/package/react" }
    ]

    const b = `const [value, setValue] = useState(defaultValue);

const debounced = useDebouncedCallback(
    // function
    (value) => {
      setValue(value);
    },
    // delay in ms
    1000
);

return (
    <div>
      <input
        defaultValue={defaultValue}
        onChange={(e) => debounced(e.target.value)}
      />
      <p>Debounced value: {value}</p>
    </div>
  );
`

    const c = `const [search, setSearch] = useState('');

useDebounceCallback(() => {
    console.log("User stopped typing!");
}, 300, [search]);
`

    return (
        <PageWrapper requirements={deps} title="useDebounceCallback">
            <ColorText text='useDebounceCallback' />
            <span>The useDebounce hook delays executing a callback until a certain amount of time has passed without changes.</span>

            <CodeBlock code={a} />


            <h2 className="text-3xl font-bold">Parameters</h2>
            <CodeBlock code={`useDebounceCallback(callback: () => void, delay: number, deps: any[] = []) `} language='js' />

            <h2 className="text-3xl font-bold">Usage</h2>
            <CodeBlock code={b} language='js' />

            <span>The useDebounce hook accepts an array of dependencies. So it can be used as the following</span>
            <CodeBlock code={c} language='js' />

        </PageWrapper>
    )
}