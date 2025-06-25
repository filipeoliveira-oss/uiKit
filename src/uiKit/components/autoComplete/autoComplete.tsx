import { motion } from 'framer-motion';
import { Check } from "lucide-react";
import { ComponentProps, forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface IAutoComplete {
    suggestions: Array<string>,
    value: string,
    onChangeValue: (e: string) => void,
    placeholder?: string,
    label?: string,
    disabled?: boolean,
    contentMaxHeight?: string,
    inputClassName?: string
}

type autoCompleteProps = ComponentProps<'input'> & IAutoComplete

export const AutoComplete = forwardRef<HTMLInputElement, autoCompleteProps>(
    ({ className, onChangeValue, value='', placeholder, disabled = false, suggestions = [], label, required, contentMaxHeight, inputClassName, ...props }, ref) => {

        const [isFocused, setIsFocused] = useState(false)

        const list = {
            closed: { opacity: 0, display: 'none', zIndex: 99999, },
            open: {
                opacity: 1,
                display: 'block',
                zIndex: 99999,
                transition: {
                    duration: .300,
                }
            }
        }
        const debouncedSearch = useDebounce(value, 250);

        const filteredOptions = useMemo(() => {
            return suggestions.filter((item) => {
                return String(item)
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .includes(debouncedSearch.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
            });
        }, [suggestions, debouncedSearch]);

        function useDebounce<T>(value: T, delay: number = 300): T {
            const [debounced, setDebounced] = useState(value);

            useEffect(() => {
                const handler = setTimeout(() => setDebounced(value), delay);

                return () => clearTimeout(handler);
            }, [value, delay]);

            return debounced;
        }

        return (
            <div className={cn('w-full h-fit flex flex-col', className)}>
                <span className="text-black/60">{label} {required ? '*' : ''}</span>
                <div
                    className={cn(`mt-1 w-full h-10 rounded outline-none border border-zinc-300 pl-2 text-base text-black  bg-transparent flex  items-center relative ${disabled ? 'cursor-auto opacity-85' : 'cursor-text'}`)}>

                    <input {...props} style={!value ? { color: '#757575' } : {}} value={value || placeholder || ''} onChange={(e) => onChangeValue(e.target.value)} className={cn('w-full h-full outline-none border-none text-base text-black', inputClassName)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} ref={ref} />

                    <motion.div className="w-full h-fit max-h-56 bg-white absolute top-full left-0 overflow-y-auto overflow-x-hidden text-black border border-zinc-300 rounded-sm shadow-2xl" variants={list} initial='closed' animate={isFocused ? 'open' : 'closed'} style={contentMaxHeight ? { maxHeight: contentMaxHeight } : {}}>

                        {filteredOptions.map((content, i: number) => {
                            return (
                                <div
                                    className={`w-full h-fit px-2 py-1  relative hover:bg-zinc-100 ${value === content ? 'bg-zinc-300  cursor-auto pointer-events-none' : 'bg-white text-black cursor-pointer'}`}
                                    key={String(content + i)}
                                    onClick={() => onChangeValue(content)}
                                >
                                    <span >{content}</span>
                                    {value === content && <Check className=" absolute right-8 top-[50%] translate-y-[-50%] text-lighterBlue" />}
                                </div>
                            )
                        })}
                    </motion.div>
                </div>


            </div>
        )
    }
)


export default AutoComplete