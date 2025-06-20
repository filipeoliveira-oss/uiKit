import { ComponentProps, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface ITextarea {
    label?: string,
    autoResize?:boolean,
    value:string,
    changeValue:(e:string) => void,
    cols?:number,
    rows?:number
}

type textareaType = ComponentProps<'textarea'> & ITextarea

export const InputTextArea = forwardRef<HTMLTextAreaElement, textareaType>(
    ({ className, label,autoResize=false,changeValue,value,cols=30,rows=5, ...props }, ref) => {

        return (
            <label className="w-fit h-fit flex flex-col gap-1">
                {label && <span className="text-zinc-500">{label}{props.required && ' *'}</span>}
                <textarea className={cn(`border border-zinc-400 outline-none rounded-sm mt-1 p-1 text-black ${props.disabled ? 'bg-zinc-50/10': ''} ${autoResize ? 'overflow-hidden resize-none' : ''}`, className)} 
                    value={value}
                    onChange={(e) => changeValue(e.target.value)}
                    onInput={(e) => {
                        if (autoResize) {
                            e.currentTarget.style.height = 'auto';
                            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
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

export default InputTextArea