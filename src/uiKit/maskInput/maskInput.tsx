
import { forwardRef, type ComponentProps } from 'react'
import { InputMask, format } from "@react-input/mask";

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface inputInterface extends ComponentProps<'input'> {
    placeholder?: string,
    mask?: string,
    value: string,
    onChangeValue: (e:string) => void
}
export const MaskInput = forwardRef<HTMLInputElement, inputInterface>(
    ({ className,  placeholder, mask = "(__)_____-____",onChangeValue,value, ...props }, ref) => {

        function formtValue(value:string){
            const formated = format(value,{
                mask:mask, replacement:{_:/\d/}
            })

            return formated
        }

        return (
            <InputMask mask={mask} replacement={{ _: /\d/ }} className={cn("w-full h-10 rounded outline-none border border-[rgba(0,0,0,0.2)] pl-2 cursor-text text-base mt-2 text-black", className)}
                value={formtValue(value)}
                onChange={(e) => onChangeValue(e.target.value)}
                placeholder={placeholder}
                {...props}
            />
        );
    }
);

export default MaskInput