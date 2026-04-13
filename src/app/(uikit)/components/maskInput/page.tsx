'use client'

import { useState } from "react"
import PageComponent from "@/components/componentsPage"
import MaskInput from "@/uiKit/components/maskInput/maskInput"

export default function MaskInputPage() {

    const [value, setValue] = useState('')

    const code =
`'use client'
import { forwardRef, type ComponentProps } from 'react'
import { InputMask, format } from "@react-input/mask";

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import React from 'react';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface inputInterface extends ComponentProps<'input'> {
    placeholder?: string,
    mask?: string,
    value: string,
    onChangeValue: (e: string) => void,
    label?:string,
    showMask?:boolean,
    type?:'string' | 'number' | 'all'
}
export const MaskInput = forwardRef<HTMLInputElement, inputInterface>(
    ({ className, placeholder, mask = "(__)_____-____", onChangeValue, value,label,showMask=false,type = 'all', ...props }, ref) => {

        const replacement = React.useMemo(() => {
            switch (type) {
                case 'all':
                    return /[a-zA-Z0-9]/
                case 'number':
                    return /[0-9]/
                case 'string':
                    return /[a-zA-Z]/
                default:
                    return /[a-zA-Z0-9]/
            }
        }, [type])

        function formtValue(value: string) {
            const formated = format(value, {
                mask: mask, replacement: { _: replacement }
            })

            return formated
        }

        return (
            <label htmlFor="maskInput">
                {label && <span className="text-zinc-500">{label}</span>}
                <InputMask mask={mask} replacement={{ _: replacement }} className={cn("w-full h-10 rounded outline-none border border-[rgba(0,0,0,0.2)] pl-2 cursor-text text-base mt-2 text-black appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance:textfield]", className)}
                    value={formtValue(value)}
                    onChange={(e) => onChangeValue(e.target.value)}
                    placeholder={placeholder}
                    showMask={showMask}
                    id='maskInput'
                    {...props}
                />
            </label>
        );
    }
);

export default MaskInput`

    return (
        <PageComponent
            ComponentType="Componentes"
            componentName="Mask Input"
            componentCodeName="maskInput"
            description="Input com suporte a máscara, permitindo controlar formatos de entrada como telefone, CPF, datas e outros padrões definidos."
            code={code}
            preview={<MaskInput onChangeValue={setValue} value={value}/>}
            props={[
                {
                    propName: "value",
                    type: "string",
                    default: "-",
                    description: "Valor atual do input",
                    required: true
                },
                {
                    propName: "onChangeValue",
                    type: "(e: string) => void",
                    default: "-",
                    description: "Função chamada sempre que o valor muda",
                    required: true
                },
                {
                    propName: "type",
                    type: "'string' | 'number' | 'all'",
                    default: "all",
                    description: "Define quais tipos de caracteres serão aceitos no input",
                    required: false
                },
                {
                    propName: "label",
                    type: "string",
                    default: "-",
                    description: "Label exibida acima do componente",
                    required: false
                },
                {
                    propName: "showMask",
                    type: "boolean",
                    default: "false",
                    description: "Define se a máscara deve ser exibida junto ao valor",
                    required: false
                },
                {
                    propName: "mask",
                    type: "string",
                    default: "-",
                    description: "Máscara utilizada no input, use '_' como caractere substituível",
                    required: false
                },
                {
                    propName: "placeholder",
                    type: "string",
                    default: "-",
                    description: "Placeholder exibido quando o input está vazio",
                    required: false
                }
            ]}
        />
    )
}