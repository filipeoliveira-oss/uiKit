'use client'
import PageComponent from "@/components/componentsPage"


export default function ActionMenu() {
    const code = `const hello = "world";`
    
    return (
        <PageComponent
            ComponentType="Componentes"
            code={code}
            componentCodeName="ActionMenu"
            componentName="Action Menu"
            description="Menu de acao"
            preview={<span className="w-fit h-fit">teste</span>}
            props={[
                {default:'true', description:'description', propName:'prop name',type:'boolean'},
                {default:'true', description:'description', propName:'prop name',type:'boolean'},
                {default:'true', description:'description', propName:'prop name',type:'boolean'},
            ]}

        />
    )
}