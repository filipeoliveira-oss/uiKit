'use client'
import { ComponentProps, forwardRef, useRef, useState } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Ellipsis } from "lucide-react";
import { motion } from "framer-motion"
import useOnClickOutside from "../useOnClickOutside/useOnClickOutside";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface props {
    buttonClassName?: string,
    children: React.ReactNode,
    icon?: React.ReactNode
}

const actionsMenu = tv({
    base: "w-fit h-fit flex flex-col bg-white absolute cursor-pointer overflow-auto text-black border border-zinc-300 px-2 py-2 rounded-md shadow-md text-wrap",
    variants:{
        position:{
            topLeft:'bottom-0 right-full',
            topRight:'bottom-0 left-full',
            top:'bottom-0',
            bottomLeft:'top-full right-full',
            bottomRight:'top-full left-full',
            bottom:'top-full'
        }
    },

    defaultVariants:{
        position:"bottomRight"
    }
})

type ActionsMenuProps = ComponentProps<'div'> & VariantProps<typeof actionsMenu> & props

const ActionsMenu = forwardRef<HTMLDivElement, ActionsMenuProps>(
    ({ buttonClassName, icon = <Ellipsis color="#000"/>,children,position,className, ...props}, ref) => {

        const dropdownRef = useRef(null)
        const [isOpen, setIsOpen] = useState(false)

        const handleClickOutside = () => {
            if (isOpen) {
                setIsOpen(false)
            }
        }
        
        //@ts-ignore
        useOnClickOutside(dropdownRef, handleClickOutside)

        const list = {
            closed: { opacity: 0, display: 'none' },
            open: {
                opacity: 1,
                display: 'flex',
                zIndex: 999,
                transition: {
                    duration: .300,
                }
            }
        }
        
        return (
            <div className="relative flex  w-fit h-auto" ref={ref} {...props}>
                <button ref={dropdownRef} className={cn('bg-white border border-zinc-200 w-fit min-w-12 h-8 flex items-center justify-center cursor-pointer', buttonClassName)} onClick={() => setIsOpen(!isOpen)}>{icon}</button>
                <motion.div className={actionsMenu({position, className})} variants={list} initial='closed' animate={isOpen ? 'open' : 'closed'}>
                    {children}
                </motion.div>
            </div>
        )
    }
)

export default ActionsMenu