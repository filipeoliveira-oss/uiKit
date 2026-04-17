'use client'
import PageComponent from "@/components/componentsPage"

export default function useDebouncePage() {

    const codePreview = 
`const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 300);

useEffect(() => {
  fetchData(debouncedSearch);
}, [debouncedSearch]);`

    const code = 
`import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 300): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced;
}`

    return (
        <PageComponent
            ComponentType="Hooks"
            code={code}
            componentCodeName="useDebounce"
            componentName="useDebounce"
            description="Um hook que retarda a atualização de um valor até que ele pare de mudar por um determinado tempo."
            props={[
                {propName:'Value', type:'any', default:'-', description:'Valor que o hook vai observar', required:true},
                {propName:'Delay', type:'number', default:'300', description:'Atraso, em ms, antes de atualizar o valor', required:true},
            ]}
            previewCode={codePreview}
        />        
    )
}