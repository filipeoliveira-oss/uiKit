'use client'

import { useState } from "react"
import PageComponent from "@/components/componentsPage"
import CurrencyInput from "@/uiKit/components/currencyInput/currencyInput"

export default function CurrencyInputPage() {

    const [value, setValue] = useState('')
    const code =
`import React from "react";
import { NumberFormatValues, NumericFormat, NumericFormatProps } from "react-number-format";


import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface CurrencyInputProps extends NumericFormatProps {
    placeholder?: string;
    inputClassName?: string;
    className?: string;
    value: string | number | null | undefined;
    onChangeValue: (e: NumberFormatValues) => void,
    label?:string
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
    inputClassName,
    placeholder = "",
    value,
    onChangeValue,
    className,
    label,
    ...props
}) => {

    return (
        <label htmlFor="currencyInput">
            {label && <span className="text-zinc-500">{label}</span>}
            <div style={{ display: "flex", alignItems: "center" }} className={cn("shrink-0 w-full h-10 rounded outline-none border border-[rgba(0,0,0,0.2)] pl-2 cursor-text text-base mt-2 text-black", className)}>
                <span style={{ marginRight: 4 }}>R$</span>
                <NumericFormat
                    id="currencyInput"
                    value={value}
                    onValueChange={(values: any) => onChangeValue(values)}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale
                    allowNegative={false}
                    placeholder={placeholder}
                    displayType="input"
                    className={cn("w-full h-full outline-none border-none", inputClassName)}
                    {...props} // Spread remaining props to NumericFormat
                />
            </div>
        </label>
    )
};

export default CurrencyInput;
`

    return (
        <PageComponent
            ComponentType="Componentes"
            componentName="Currency Input"
            componentCodeName="CurrencyInput"
            description="Componente de input monetário com formatação automática de valores financeiros."
            code={code}
            preview={<CurrencyInput onChangeValue={(e) => setValue} value={value}/>}
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
                    type: "(value: NumberFormatValues) => void",
                    default: "-",
                    description: "Função chamada quando o valor muda",
                    required: true
                },
                {
                    propName: "label",
                    type: "string",
                    default: "-",
                    description: "Label exibido acima do input",
                    required: false
                },
                {
                    propName: "placeholder",
                    type: "string",
                    default: "-",
                    description: "Texto exibido quando o input está vazio",
                    required: false
                },
                {
                    propName: "inputClassName",
                    type: "string",
                    default: "-",
                    description: "Classe CSS aplicada ao input",
                    required: false
                },
                {
                    propName: "className",
                    type: "string",
                    default: "-",
                    description: "Classe CSS aplicada ao container",
                    required: false
                }
            ]}
        />
    )
}