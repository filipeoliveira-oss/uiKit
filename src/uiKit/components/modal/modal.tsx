import { ComponentProps, forwardRef, useEffect } from "react"
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
    openHeight?:string,
    openWidth?:string
}

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }

const modal = tv({
    base: "bg-white w-1/2 h-2/3 rounded-lg shadow-md p-2 relative flex flex-col"
})

type ModalProps = ComponentProps<'div'> & VariantProps<typeof modal> & props

const Modal = forwardRef<HTMLDivElement, ModalProps>(
    ({ className, isOpen, onClose, children, disableAnimation = false, animationDuration = .150, overlayClassName,title, openHeight='66%', openWidth='50%', ...props }, ref) => {

        const modalAnimation = {
            closed: { width: '0px', height: '0px' },
            open: {
                width: openWidth,
                height: openHeight,
                zIndex: 999,
                transition: {
                    duration: animationDuration,
                }
            }
        }

        
        useEffect(() => {
            if (isOpen) {
                const scrollY = window.scrollY;
                document.body.style.position = 'fixed';
                document.body.style.top = `-${scrollY}px`;
                document.body.style.left = '0';
                document.body.style.right = '0';
                document.body.style.width = '100%';

                return () => {
                    document.body.style.position = '';
                    document.body.style.top = '';
                    document.body.style.left = '';
                    document.body.style.right = '';
                    document.body.style.width = '';

                    window.scrollTo(0, scrollY);
                };
            }
        }, [isOpen]);

        if (typeof window === "undefined") return null;

        return (
            isOpen && (
                createPortal(
                    <div className={cn("w-dvw h-dvh fixed top-0 left-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center z-[999999]", overlayClassName)} ref={ref} {...props}>
                        <motion.div className={modal({ className })} variants={disableAnimation === false ? modalAnimation : {}} initial='closed' animate={isOpen ? 'open' : 'closed'}>
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


export default Modal