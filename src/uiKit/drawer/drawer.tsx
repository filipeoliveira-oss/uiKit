import { ComponentProps, forwardRef } from "react"
import { createPortal } from "react-dom"
import { tv, type VariantProps } from 'tailwind-variants'
import { X } from "lucide-react"
import { motion } from 'framer-motion'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

interface props {
    /** Controls whether the component is open */
    isOpen: boolean,

    /** Function to be executed when the close button is clicked*/
    onClose?: Function,
    children?: React.ReactNode,
    /** This will disable opening animation*/
    disableAnimation?: boolean,
    /** Opening animation duration in SECONDS. 
     * Default duration .150*/
    animationDuration?: number,
    overlayClassName?: string,
    title?:string,
    openWidth?:string
}

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }

const drawer = tv({
    base: "bg-white w-1/2 h-screen rounded-tl-lg rounded-bl-lg shadow-md p-2 relative flex flex-col absolute top-0 right-0"
})

type DrawerProps = ComponentProps<'div'> & VariantProps<typeof drawer> & props

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
    ({ className, isOpen, onClose, children, disableAnimation = false, animationDuration = .200, overlayClassName,title,openWidth='40%', ...props }, ref) => {

        const drawerAnimation = {
            closed: { width: '0px'},
            open: {
                width: openWidth,
                zIndex: 999,
                transition: {
                    duration: animationDuration,
                }
            }
        }

        return (
            isOpen && (
                createPortal(
                    <div className={cn("w-dvw h-dvh  absolute top-0 left-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center", overlayClassName)} ref={ref} {...props}>
                        <motion.div className={drawer({ className })} variants={disableAnimation === false ? drawerAnimation : {}} initial='closed' animate={isOpen ? 'open' : 'closed'}>
                            <div className="w-full h-12  flex items-center">
                                <span className="text-lg font-semibold w-fit h-fit">{title}</span>
                            </div>
                            <div className="w-full flex-1 overflow-hidden">
                                {children}
                            </div>

                            {onClose && (
                                <X className=" h-8 absolute top-8 -translate-y-1/2 right-4 cursor-pointer" onClick={() => onClose()} />
                            )}
                        </motion.div>

                    </div>
                    , document.body)
            )
        )
    })


export default Drawer