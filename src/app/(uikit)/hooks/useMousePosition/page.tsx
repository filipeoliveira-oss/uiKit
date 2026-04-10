import PageComponent from "@/components/componentsPage"

export default function useIsMobilePage() {

    const codePreview = 
`const {x, y} = useMousePosition();`

    const code = 
`import { useEffect, useState } from "react"

export default function useMousePosition(){
    
    const [mousePosition, setMousePosition] = useState({x:0, y:0})

    const updateMousePosition = (e:any) =>{
        setMousePosition({x:e.clientX, y:e.clientY})
    }

    useEffect(() =>{
        window.addEventListener('mousemove', updateMousePosition)

        return () =>{
            window.removeEventListener('mousemove', updateMousePosition)
        }
    },[])
 
 
    return mousePosition
}`

    return (
        <PageComponent
            ComponentType="Hooks"
            code={code}
            componentCodeName="useMousePosition"
            componentName="useMousePosition"
            description="Um hook retorna a posição atual do mouse."
            props={[]}
            previewCode={codePreview}
        />        
    )
}