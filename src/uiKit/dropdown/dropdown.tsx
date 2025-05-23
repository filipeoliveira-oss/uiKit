import { Check, ChevronDown, Search } from "lucide-react";
import { ComponentProps, forwardRef, useRef, useState } from "react"
import { motion } from 'framer-motion'
import { useOnClickOutside } from "usehooks-ts";

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface IDropdown{
    value: string | number | null;
    onChangeValue: (e: string) => void;
    placeholder?: string,
    disabled?: boolean,
    filter?: boolean,
    content: any, 
    labelKey?: string
}

type dropdownProps = ComponentProps<'div'>  & IDropdown

export const Dropdown = forwardRef<HTMLDivElement, dropdownProps>(
    ({ className, onChangeValue, value, placeholder, disabled = false, filter = false, content = [], labelKey='', ...props }, ref) => {



        const [isOpen, setIsOpen] = useState(false)
        const dropdownRef = useRef(null)
        const [search, setSearch] = useState<string>('')

        const handleClickOutside = () => {
            if (isOpen) {
                setIsOpen(false)
            }
        }

        //@ts-ignore
        useOnClickOutside(dropdownRef, handleClickOutside)

        const icon = {
            closed: { rotate: '0deg' },
            open: {
                rotate: '180deg',
                transition: {
                    duration: .250,
                }
            }
        }

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

        return (
            <div {...props} className={cn(`shrink-0 w-full h-10 rounded outline-none border border-[rgba(0,0,0,0.2)] pl-2 text-base mt-2 text-black  bg-transparent flex items-center relative ${disabled ? 'cursor-auto opacity-85' : 'cursor-pointer'}`, className)} onClick={() => !disabled && setIsOpen(!isOpen)} ref={dropdownRef}>
                <span className={`text-base ${!value ? 'text-[#757575]' : ''}`}>{value ? ((typeof value === 'string' || typeof value === 'number') ? String(value) : String(value[labelKey])) : placeholder}</span>
                <motion.div className={`absolute right-[2%] ${isOpen ? 'rotate-180' : ''}`} variants={icon} initial='closed' animate={isOpen ? 'open' : 'closed'}>
                    {!disabled && <ChevronDown />}
                </motion.div>

                <motion.div className="w-full h-fit max-h-56 bg-white absolute top-[100%]  left-0 overflow-auto text-black border border-zinc-300 shadow-md" variants={list} initial='closed' animate={isOpen ? 'open' : 'closed'} >
                    {filter &&
                        <div className="w-[99%] h-fit ml-[0.5%] relative flex items-center justify-center">
                            <input
                                type="text"
                                className="w-full h-10 rounded outline-none border-l border-t border-r border-b-4 border-[rgba(0,0,0,0.2)] pl-2 cursor-text text-base mt-2 text-black capitalize"
                                placeholder="Busque por um valor"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                autoFocus
                            />
                            <Search size={24} color="rgba(0,0,0,0.5)" className="absolute right-4 top-[50%] -translate-y-1/2" />
                        </div>
                    }
                    {
                        content.filter((item:any) => {
                            const text = (typeof item === "string" || typeof item === "number") ? String(item) : String(item[labelKey])
                            
                            return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
                        }).map((item:any, i: number) => {
                            const text = (typeof item === "string" || typeof item === "number") ? String(item) : String(item[labelKey])

                            return (
                                <div
                                    className={`w-full h-fit  py-1 px-2  hover:bg-zinc-200  flex flex-row ${value === text ? 'bg-zinc-200  cursor-auto pointer-events-none' : 'bg-white text-black cursor-pointer'}`}
                                    key={String(text + i)}
                                    onClick={(e) => onChangeValue(item)}
                                >
                                    {text}
                                    {value === text && <Check className="absolute right-4" />}
                                </div>
                            )
                        })
                    }
                </motion.div>
            </div>
        )
    }
)