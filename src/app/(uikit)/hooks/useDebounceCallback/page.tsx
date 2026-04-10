import PageComponent from "@/components/componentsPage"

export default function useDebounceCallbackPage() {

    const codePreview = 
`const [search, setSearch] = useState('');

useDebounceCallback(() =>{
    fetchData(search)
}, 300, [search])`

    const code = 
`import { useEffect } from "react";

export function useDebounceCallback(callback: () => void, delay: number, deps: any[] = []) {
    useEffect(() => {
        const handler = setTimeout(() => {
            callback();
        }, delay);

        return () => clearTimeout(handler);
    }, [delay, ...deps]);
}`

    return (
        <PageComponent
            ComponentType="Hooks"
            code={code}
            componentCodeName="useDebounceCallback"
            componentName="useDebounceCallback"
            description="Um hook que atrasa a execução de uma função (callback) até que as dependências parem de mudar por um determinado tempo."
            props={[
                {propName:'Callback', type:'function', default:'-', description:'Função a ser executada após as dependências pararem de mudar após o delay', required:true},
                {propName:'Delay', type:'number', default:'300', description:'Delay, em ms, para observar as dependências', required:true},
                {propName:'deps', type:'Array<any>', default:'-', description:'Dependências a serem observadas', required:true},
            ]}
            previewCode={codePreview}
        />        
    )
}