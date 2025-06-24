'use client'
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

export default MaskInput