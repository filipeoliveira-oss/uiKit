'use client'
import { Check, ChevronDown, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react"
import { motion } from 'framer-motion'

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface IDropdown {
    value: string | number | Record<string, any> | null;
    onChangeValue: (e: any) => void;
    options: Array<string> | Array<Record<string, any>>,
    
    placeholder?: string,
    disabled?: boolean,
    filter?: boolean,
    filterKey?: string,
    className?: string,
    itemTemplate?: (item: any) => React.ReactNode
}


export default function Dropdown({ onChangeValue, options, value, disabled, filter, placeholder, className, filterKey, itemTemplate }: IDropdown) {

    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        console.log(value)
        function handleClickOutside(event: any) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

    function deepEqual(a: any, b: any, seen = new WeakMap()): boolean {

        // Strict equality (covers primitives and reference equality)
        if (a === b) return true;

        // Handle null
        if (a === null || b === null) return a === b;

        // Handle Date
        if (a instanceof Date && b instanceof Date)
            return a.getTime() === b.getTime();

        // Handle RegExp
        if (a instanceof RegExp && b instanceof RegExp)
            return a.source === b.source && a.flags === b.flags;

        // Handle ArrayBuffer and TypedArrays
        if (
            ArrayBuffer.isView(a) && ArrayBuffer.isView(b) &&
            Object.getPrototypeOf(a).constructor === Object.getPrototypeOf(b).constructor
        ) {
            return a.byteLength === b.byteLength && new Uint8Array(a.buffer).every((val, i) => val === new Uint8Array(b.buffer)[i]);
        }

        if (a instanceof ArrayBuffer && b instanceof ArrayBuffer) {
            if (a.byteLength !== b.byteLength) return false;
            const viewA = new Uint8Array(a);
            const viewB = new Uint8Array(b);
            return viewA.every((val, i) => val === viewB[i]);
        }

        // Handle Set
        if (a instanceof Set && b instanceof Set) {
            if (a.size !== b.size) return false;
            return [...a].every(valA =>
                [...b].some(valB => deepEqual(valA, valB, seen))
            );
        }

        // Handle Map
        if (a instanceof Map && b instanceof Map) {
            if (a.size !== b.size) return false;
            for (const [key, valA] of a.entries()) {
                if (!b.has(key)) return false;
                const valB = b.get(key);
                if (!deepEqual(valA, valB, seen)) return false;
            }
            return true;
        }

        // If not both are objects, return false
        if (typeof a !== 'object' || typeof b !== 'object') return false;

        // Handle circular references
        if (seen.has(a)) return seen.get(a) === b;
        seen.set(a, b);

        // Compare own property keys including symbols
        const keysA = Reflect.ownKeys(a);
        const keysB = Reflect.ownKeys(b);

        if (keysA.length !== keysB.length) return false;
        for (const key of keysA) {
            if (!keysB.includes(key)) return false;
            if (!deepEqual(a[key], b[key], seen)) return false;
        }

        return true;
    }

    return (
        <div className={cn(`shrink-0 w-full h-10 rounded outline-none border border-zinc-400 pl-2 text-base mt-2 text-black  bg-transparent flex items-center relative ${disabled ? 'cursor-auto opacity-85' : 'cursor-pointer'}`, className)} onClick={() => !disabled && setIsOpen(!isOpen)} ref={dropdownRef}>

            {/* EXHIBITION */}
            <div className={`text-base ${!value ? 'text-[#757575]' : ''}`}>
                {value
                    ? (React.isValidElement(value)
                        ? value
                        : typeof value === 'object'
                            ? (itemTemplate
                                ? itemTemplate(value)
                                : <span>{JSON.stringify(value)}</span>)
                            : <span>{value}</span>)
                    : <span>{placeholder}</span>}
            </div>

            <motion.div className={`absolute right-[2%] `} variants={icon} initial='closed' animate={isOpen ? 'open' : 'closed'}>
                {!disabled && <ChevronDown />}
            </motion.div>

            <motion.div className="w-full h-fit bg-white absolute top-[100%]  left-0 overflow-hidden text-black border border-zinc-300 shadow-md" variants={list} initial='closed' animate={isOpen ? 'open' : 'closed'} >

                {/* FILTER DISPLAY */}
                {filter &&
                    <div className="w-full h-fit relative flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
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


                {/* CONTENT DISPLAY */}
                <div className="w-full h-fit max-h-52 overflow-x-hidden overflow-y-auto relative">
                    {
                        options.filter((item: string | Record<string, any>) => {
                            const text = typeof item === "object" ? item[filterKey ?? ''] : item
                            
                            return String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
                        }).map((item: string | Record<string, any>, index: number) => (
                            <div key={index} onClick={() => onChangeValue(item)} className={`min-w-full w-fit h-fit py-1 px-2 hover:bg-zinc-200 flex flex-row ${deepEqual(item, value) ? 'bg-zinc-200 pointer-events-none' : 'bg-transparent cursor-pointer'}`}>
                                {typeof item === "object" ? (itemTemplate ? itemTemplate(item) : <span>{JSON.stringify(item)}</span>) : <span>{item}</span>}
                                <span>{JSON.stringify(value)}</span>
                                <span>{JSON.stringify(item)}</span>

                                {deepEqual(item, value) && <Check className="absolute right-4" />}
                            </div>
                        ))
                    }
                </div>
            </motion.div>
        </div>
    )
}