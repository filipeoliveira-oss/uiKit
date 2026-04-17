'use client'

import { useState } from "react"
import PageComponent from "@/components/componentsPage"
import AutoComplete from "@/uiKit/components/autoComplete/autoComplete"

export default function AutoCompletePage() {

    const [value, setValue] = useState('')


    const code =
`import { motion } from 'framer-motion';
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
                    className={cn(\`mt-1 w-full h-10 rounded outline-none border border-zinc-300 pl-2 text-base text-black  bg-transparent flex  items-center relative \${disabled ? 'cursor-auto opacity-85' : 'cursor-text'}\`)}>

                    <input {...props} style={!value ? { color: '#757575' } : {}} value={value || placeholder || ''} onChange={(e) => onChangeValue(e.target.value)} className={cn('w-full h-full outline-none border-none text-base text-black', inputClassName)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} ref={ref} />

                    <motion.div className="w-full h-fit max-h-56 bg-white absolute top-full left-0 overflow-y-auto overflow-x-hidden text-black border border-zinc-300 rounded-sm shadow-2xl" variants={list} initial='closed' animate={isFocused ? 'open' : 'closed'} style={contentMaxHeight ? { maxHeight: contentMaxHeight } : {}}>

                        {filteredOptions.map((content, i: number) => {
                            return (
                                <div
                                    className={\`w-full h-fit px-2 py-1  relative hover:bg-zinc-100 \${value === content ? 'bg-zinc-300  cursor-auto pointer-events-none' : 'bg-white text-black cursor-pointer'}\`}
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


export default AutoComplete`

    return (
        <PageComponent
            ComponentType="Componentes"
            componentName="Auto complete"
            componentCodeName="AutoComplete"
            description="AutoComplete é um componente de input que exibe sugestões em tempo real enquanto o usuário digita."
            code={code}
            preview={<AutoComplete onChangeValue={(e) =>{setValue(e)}} suggestions={['Filipe', 'Munique', 'Lucas', 'Rhayssa', 'André', 'Larissa']} value={value}/>}
            props={[
                {
                    propName: "suggestions",
                    type: "string[]",
                    default: "-",
                    description: "Lista de sugestões exibidas no autocomplete",
                    required: true
                },
                {
                    propName: "value",
                    type: "string",
                    default: "-",
                    description: "Valor atual do input",
                    required: true
                },
                {
                    propName: "onChangeValue",
                    type: "(value: string) => void",
                    default: "-",
                    description: "Função chamada sempre que o valor muda",
                    required: true
                },
                {
                    propName: "label",
                    type: "string",
                    default: "-",
                    description: "Label do campo",
                    required: false
                },
                {
                    propName: "placeholder",
                    type: "string",
                    default: "-",
                    description: "Texto exibido quando não há valor selecionado",
                    required: false
                },
                {
                    propName: "disabled",
                    type: "boolean",
                    default: "false",
                    description: "Desabilita a interação com o input",
                    required: false
                },
                {
                    propName: "contentMaxHeight",
                    type: "string",
                    default: "-",
                    description: "Altura máxima da lista de sugestões (deve incluir unidade, ex: px, rem)",
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