'use client'

import { useState } from "react"
import PageComponent from "@/components/componentsPage"
import { Button } from "@/uiKit/components/button/button"
import Drawer from "@/uiKit/components/drawer/drawer"

export default function DrawerPage() {

    const [open, setOpen] = useState(false)

    const codePreview =
`const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>
  Open drawer
</Button>

<Drawer isOpen={open} onClose={() => setOpen(false)}>
  Content here
</Drawer>`

    const code =
`import { ReactNode } from "react"

type DrawerProps = {
  isOpen: boolean
  onClose?: () => void
  children: ReactNode
  disableAnimation?: boolean
  animationDuration?: number
  title?: string
  openWidth?: string
  overlayClassName?: string
}

export default function Drawer(props: DrawerProps) {
  // component implementation
}`

    return (
        <PageComponent
            ComponentType="Componentes"
            componentName="Drawer"
            componentCodeName="Drawer"
            description="Componente de drawer (painel lateral) usado para exibir conteúdo sobreposto à interface principal."
            code={code}
            preview={<>
                <Button onClick={() => setOpen(true)}>Abrir drawer</Button>
                <Drawer isOpen={open} onClose={() => setOpen(false)}>
                    <span>Isso é um drawer</span>
                </Drawer>
            </>}
            props={[
                {
                    propName: "isOpen",
                    type: "boolean",
                    default: "-",
                    description: "Controla se o drawer está aberto ou fechado",
                    required: true
                },
                {
                    propName: "onClose",
                    type: "() => void",
                    default: "-",
                    description: "Função chamada ao fechar o drawer",
                    required: false
                },
                {
                    propName: "children",
                    type: "React.ReactNode",
                    default: "-",
                    description: "Conteúdo exibido dentro do drawer",
                    required: true
                },
                {
                    propName: "disableAnimation",
                    type: "boolean",
                    default: "false",
                    description: "Desativa animações do drawer",
                    required: false
                },
                {
                    propName: "animationDuration",
                    type: "number",
                    default: "0.2",
                    description: "Duração da animação em segundos",
                    required: false
                },
                {
                    propName: "title",
                    type: "string",
                    default: "-",
                    description: "Título exibido no drawer",
                    required: false
                },
                {
                    propName: "openWidth",
                    type: "string",
                    default: "40%",
                    description: "Largura do drawer quando aberto",
                    required: false
                },
                {
                    propName: "overlayClassName",
                    type: "string",
                    default: "-",
                    description: "Classe CSS aplicada ao overlay de fundo",
                    required: false
                }
            ]}
        />
    )
}