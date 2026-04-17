'use client'

import { useState } from "react"
import PageComponent from "@/components/componentsPage"
import RadioGroup from "@/uiKit/components/radioGroup/radioGroup"

export default function RadioGroupPage() {

    const [value, setValue] = useState('')

    const code =
`interface IRadioGroup {
    value: string,
    changeValue: (e: string) => void,
    options: Array<string>,
    name: string,
    selectedColor?: string,
    disabled?: boolean
}

export default function RadioGroup({ changeValue, options, value, selectedColor = '#00bcff', name, disabled = false }: IRadioGroup) {
    return (
        <>
            <div className={\`w-fit h-fit flex flex-col gap-2 text-black \${disabled ? 'pointer-events-none' : ''}\`}>
                {options.map((option, i) => {
                    const isSelected = option === value;
                    return (
                        <div
                            key={i}
                            className="flex flex-row gap-2 items-center cursor-pointer select-none"
                            onClick={() => changeValue(option)}
                        >
                            <input
                                type="radio"
                                id={option}
                                name={name}
                                value={option}
                                checked={isSelected}
                                className="hidden"
                                readOnly
                            />
                            <div className={\`h-4 w-4 rounded-full border-2 transition-transform duration-200 ease-out relative\`} style={isSelected ? { borderColor: selectedColor, scale: '125%' } : { borderColor: ' #9f9fa9', scale: '100%' }} />
                            <label htmlFor={option} className="cursor-pointer">
                                {option}
                            </label>
                        </div>
                    );
                })}
            </div>
        </>
    )
}`

    return (
        <PageComponent
            ComponentType="Componentes"
            componentName="Radio Group"
            componentCodeName="radioGroup"
            description="Grupo de botões de rádio estilizados, permitindo selecionar uma única opção entre várias com suporte a customização visual."
            code={code}
            preview={<RadioGroup changeValue={setValue} value={value} name="teste" options={['Opção 1', 'Opção 2', 'Opção 3']}/>}
            props={[
                {
                    propName: "value",
                    type: "string",
                    default: "-",
                    description: "Valor atualmente selecionado",
                    required: true
                },
                {
                    propName: "changeValue",
                    type: "(e: string) => void",
                    default: "-",
                    description: "Função chamada ao alterar o valor selecionado",
                    required: true
                },
                {
                    propName: "options",
                    type: "Array<string>",
                    default: "-",
                    description: "Lista de opções disponíveis",
                    required: true
                },
                {
                    propName: "name",
                    type: "string",
                    default: "-",
                    description: "Identificador do grupo de radio buttons",
                    required: true
                },
                {
                    propName: "selectedColor",
                    type: "string",
                    default: "-",
                    description: "Cor aplicada ao item selecionado",
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