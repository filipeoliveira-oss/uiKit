'use client'

import { useState } from "react"
import PageComponent from "@/components/componentsPage"
import Rating from "@/uiKit/components/rating/rating"

export default function RatingPage() {

    const [value, setValue] = useState(0)

    const code =
`interface IRating {
    value: number,
    setValue: (e: number) => void,
    cancel?: boolean,
    stars?: number,
    onIcon?: React.ReactNode
    offIcon?: React.ReactNode,
    cancelIcon?: React.ReactNode
    disabled?: boolean,
    strokeColor?: string,
    fillColor?: string,
}

export default function Rating({ value, setValue, cancel = true, disabled = false, offIcon, onIcon, stars = 5, fillColor = '#00bcff', strokeColor = '#9f9fa9', cancelIcon }: IRating) {
    return (
        <div className="w-fit h-fit flex flex-row gap-2 items-center justify-center" style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
            {cancel && (
                cancelIcon ?
                    <div className="cursor-pointer w-fit h-fit" onClick={() => setValue(0)}>
                        {cancelIcon}
                    </div>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={() => setValue(0)} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" >
                        <circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" />
                    </svg>
            )}
            {Array.from({ length: stars }, (_, i) =>
                <div key={i} className="text-sm cursor-pointer" onClick={() => setValue(i + 1)}>
                    {value - 1 >= i ? (
                        onIcon ?
                            onIcon :
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={fillColor} stroke={fillColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                            </svg>
                    ) : (
                        offIcon ?
                            offIcon :
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={'transparent'} stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                            </svg>
                    )}
                </div>
            )}
        </div>
    )
}`

    return (
        <PageComponent
            ComponentType="Componentes"
            componentName="Rating"
            componentCodeName="rating"
            description="Componente de avaliação com estrelas, permitindo selecionar uma nota com suporte a customização de ícones e cores."
            code={code}
            preview={<Rating value={value} setValue={setValue}/>}
            props={[
                {
                    propName: "value",
                    type: "number",
                    default: "0",
                    description: "Valor atual da avaliação",
                    required: true
                },
                {
                    propName: "setValue",
                    type: "(value: number) => void",
                    default: "-",
                    description: "Função chamada ao alterar o valor da avaliação",
                    required: true
                },
                {
                    propName: "cancel",
                    type: "boolean",
                    default: "false",
                    description: "Exibe um ícone para resetar o valor para 0",
                    required: false
                },
                {
                    propName: "stars",
                    type: "number",
                    default: "5",
                    description: "Quantidade de estrelas exibidas",
                    required: false
                },
                {
                    propName: "onIcon",
                    type: "React.ReactNode",
                    default: "-",
                    description: "Ícone exibido quando a estrela está ativa",
                    required: false
                },
                {
                    propName: "offIcon",
                    type: "React.ReactNode",
                    default: "-",
                    description: "Ícone exibido quando a estrela está inativa",
                    required: false
                },
                {
                    propName: "cancelIcon",
                    type: "React.ReactNode",
                    default: "-",
                    description: "Ícone exibido para ação de cancelar/resetar",
                    required: false
                },
                {
                    propName: "strokeColor",
                    type: "string",
                    default: "-",
                    description: "Cor da borda das estrelas quando inativas",
                    required: false
                },
                {
                    propName: "fillColor",
                    type: "string",
                    default: "-",
                    description: "Cor de preenchimento das estrelas ativas",
                    required: false
                },
                {
                    propName: "disabled",
                    type: "boolean",
                    default: "false",
                    description: "Desativa a interação com o componente",
                    required: false
                }
            ]}
        />
    )
}