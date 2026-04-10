import PageComponent from "@/components/componentsPage"

export default function useDocumentTitlePage() {

    const codePreview = 
`useDocumentTitle('FOUIKIT | Hooks | useDocumentTitle');`

    const code = 
`import { useEffect, useLayoutEffect, useRef } from 'react'

const isomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

type UseDocumentTitleOptions = {
  preserveTitleOnUnmount?: boolean
}

export default function useDocumentTitle(title:string, options:UseDocumentTitleOptions = {}) : void{

    const { preserveTitleOnUnmount = true } = options
    const defaultTitle = useRef<string | null>(null)

    isomorphicLayoutEffect(() =>{
        defaultTitle.current = window.document.title
    },[])

    isomorphicLayoutEffect(() =>{
        window.document.title = title
    },[title])

    useEffect(() =>{
        return () => {
            if(!preserveTitleOnUnmount && defaultTitle.current){
                window.document.title = defaultTitle.current
            }
        }
    },[])
}`

    return (
        <PageComponent
            ComponentType="Hooks"
            code={code}
            componentCodeName="useDocumentTitle"
            componentName="useDocumentTitle"
            description="Um hook que altera o título da página."
            props={[
                {propName:'title', type:'string', default:'-', description:'Título a ser dado à página', required:true},
                {propName:'options', type:'{preserveTitleOnUnmount}', default:'true', description:'Preserva o título da página caso ela seja desmontada', required:false},
            ]}
            previewCode={codePreview}
        />        
    )
}