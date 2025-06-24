import React from "react";
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
