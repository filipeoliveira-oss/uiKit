'use client'

import { useState } from "react"
import PageComponent from "@/components/componentsPage"
import InputTextArea from "@/uiKit/components/inputTextArea/inputTextArea"

export default function InputTextAreaPage() {

    const [value, setValue] = useState('')

    const codePreview =
`const [value, setValue] = useState('');

<InputTextArea value={value} changeValue={setValue} />`

    const code =
`import { ComponentProps, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface ITextarea {
    value:string,
    changeValue:(e:string) => void,
    label?: string,
    autoResize?:boolean,
    cols?:number,
    rows?:number
}

type textareaType = ComponentProps<'textarea'> & ITextarea

export const InputTextArea = forwardRef<HTMLTextAreaElement, textareaType>(
    ({ className, label,autoResize=false,changeValue,value,cols=30,rows=5, ...props }, ref) => {

        return (
            <label className="w-fit h-fit flex flex-col gap-1">
                {label && <span className="text-zinc-500">{label}{props.required && ' *'}</span>}
                <textarea className={cn(\`border border-zinc-400 outline-none rounded-sm mt-1 p-1 text-black \${props.disabled ? 'bg-zinc-50/10': ''} \${autoResize ? 'overflow-hidden resize-none' : ''}\`, className)} 
                    value={value}
                    onChange={(e) => changeValue(e.target.value)}
                    onInput={(e) => {
                        if (autoResize) {
                            e.currentTarget.style.height = 'auto';
                            e.currentTarget.style.height = \`\${e.currentTarget.scrollHeight}px\`;
                        }
                    }} 
                    ref={ref}
                    rows={rows}
                    cols={cols} 
                    {...props}
                    />
            </label>
        )
    }
)

export default InputTextArea`

    return (
        <PageComponent
            ComponentType="Componentes"
            componentName="Input Text Area"
            componentCodeName="inputTextArea"
            description="Componente de textarea estilizado com suporte a auto redimensionamento conforme o conteúdo digitado."
            code={code}
            preview={<InputTextArea changeValue={setValue} value={value} />}
            props={[
                {
                    propName: "value",
                    type: "string",
                    default: "-",
                    description: "Valor atual do textarea",
                    required: true
                },
                {
                    propName: "changeValue",
                    type: "(e: string) => void",
                    default: "-",
                    description: "Função chamada quando o valor muda",
                    required: true
                },
                {
                    propName: "label",
                    type: "string",
                    default: "-",
                    description: "Label exibida acima do componente",
                    required: false
                },
                {
                    propName: "autoResize",
                    type: "boolean",
                    default: "false",
                    description: "Faz o textarea aumentar automaticamente de altura conforme o conteúdo",
                    required: false
                },
                {
                    propName: "cols",
                    type: "number",
                    default: "30",
                    description: "Número de colunas do textarea",
                    required: false
                },
                {
                    propName: "rows",
                    type: "number",
                    default: "5",
                    description: "Número de linhas do textarea",
                    required: false
                }
            ]}
        />
    )
}