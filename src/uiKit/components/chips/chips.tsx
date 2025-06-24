'use client'
import React from 'react'
import { forwardRef, SetStateAction, useState, type ComponentProps } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
};



interface props {
    label?: string,
    value: Array<string>,
    changeValue: (e:Array<string>) => void,
    separator?: string,
    disabled?: boolean,
    template?: (chip: string) => React.ReactNode,
    keyFilter?: 'number' | 'letter' | 'any',
    inputClassName?:ClassValue,
}

type chipsProps = ComponentProps<'input'> &  props;

export const Chips = forwardRef<HTMLInputElement, chipsProps>(
    ({ className, changeValue, value, separator = ';', label, disabled = false, template, keyFilter = 'any',inputClassName, ...props }, ref) => {

        const [currentItem, setCurrentItem] = useState('');

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const item = e.target.value;
            const lastChar = item[item.length - 1];

            
            if (lastChar === separator) {
                const aux = value
                aux.push(currentItem.replace(separator, ''))
                changeValue(aux);
                setCurrentItem('');
                return;
            }

            
            if (lastChar === undefined) {
                setCurrentItem(item); 
                return;
            }

            
            if (keyFilter === 'any') {
                setCurrentItem(item);
            }else{
                if(charType(lastChar) === keyFilter){
                    setCurrentItem(item)
                }
            }
        }

        const handleRemoveItem = (removeIndex: number) => {
            const aux = value.filter((each, index) => {
                return index !== removeIndex
            })

            changeValue(aux)
        }

        function X() {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width='12' height='12' viewBox="0 0 24 24" stroke='#000' fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                </svg>
            )
        }

        function charType(char: string) {
            if (/^\d$/.test(char)) return 'number';
            if (/^[a-zA-Z]$/.test(char)) return 'letter';
            return 'any';
        }

        return (
            <label className={`w-full h-fit ${disabled ? 'pointer-events-none ' : ''}`}>
                {label && <span className="text-zinc-500">{label}</span>}
                <div className={cn(`w-full flex flex-wrap items-start gap-2 h-fit p-1 rounded-sm border border-[rgba(0,0,0,0.2)] ${disabled ? 'bg-zinc-50' : ''}`, className)}>
                    {/* Chips container */}
                    <div className="flex flex-wrap w-fit min-h-0 shrink-0 gap-2 " >
                        {value.map((chip, index) => (
                            <div key={index} className="bg-zinc-200 text-black px-2 py-1 rounded-full flex flex-row items-center gap-2">
                                {/* <span>{chip}</span> */}
                                {template ? template(chip) : <span>{chip}</span>}
                                <div className='border rounded-full p-[1px] cursor-pointer' onClick={() => handleRemoveItem(index)}>
                                    <X />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Element container */}
                    <div className="min-w-[100px] h-8 flex-1 rounded">
                        <input className={cn('w-full h-full outline-none rounded-sm px-1 text-black', inputClassName)} value={currentItem} onChange={(e) => handleChange(e)} {...props} />
                    </div>
                </div>
            </label>
        )
    }
)