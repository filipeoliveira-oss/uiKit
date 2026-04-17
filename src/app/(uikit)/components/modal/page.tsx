'use client'

import { useState } from "react"
import PageComponent from "@/components/componentsPage"
import { Button } from "@/uiKit/components/button/button"
import Modal from "@/uiKit/components/modal/modal"

export default function ModalPage() {

    const [open, setOpen] = useState(false)

    const code =
`import { ComponentProps, forwardRef, useEffect } from "react"
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
    ({ className, isOpen, onClose, children, disableAnimation = false, animationDuration = .150, overlayClassName,title, openHeight='fit-content', openWidth='50%', ...props }, ref) => {

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
                document.body.style.top = \`-\${scrollY}px\`;
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


export default Modal`

    return (
        <PageComponent
            ComponentType="Componentes"
            componentName="Modal"
            componentCodeName="modal"
            description="Componente de modal para exibição de conteúdo em sobreposição, com suporte a animação, título e controle de abertura/fechamento."
            code={code}
            preview={<>
                <Button onClick={() => setOpen(true)}>Abrir modal</Button>
                <Modal isOpen={open} onClose={() => setOpen(false)}>
                    <span>Isso é um modal</span>
                </Modal>
            </>}
            props={[
                {
                    propName: "isOpen",
                    type: "boolean",
                    default: "false",
                    description: "Controla se o modal está aberto ou fechado",
                    required: true
                },
                {
                    propName: "onClose",
                    type: "() => void",
                    default: "-",
                    description: "Função chamada ao fechar o modal",
                    required: false
                },
                {
                    propName: "children",
                    type: "React.ReactNode",
                    default: "-",
                    description: "Conteúdo exibido dentro do modal",
                    required: true
                },
                {
                    propName: "disableAnimation",
                    type: "boolean",
                    default: "false",
                    description: "Desativa as animações de entrada e saída do modal",
                    required: false
                },
                {
                    propName: "animationDuration",
                    type: "number",
                    default: "0.2",
                    description: "Duração da animação em segundos",
                    required: false
                },
                {
                    propName: "title",
                    type: "string",
                    default: "-",
                    description: "Título exibido no topo do modal",
                    required: false
                },
                {
                    propName: "openWidth",
                    type: "string",
                    default: "50%",
                    description: "Largura do modal quando aberto",
                    required: false
                },
                {
                    propName: "openHeight",
                    type: "string",
                    default: "66%",
                    description: "Altura do modal quando aberto",
                    required: false
                },
                {
                    propName: "overlayClassName",
                    type: "string",
                    default: "-",
                    description: "Classe CSS aplicada ao overlay do modal",
                    required: false
                }
            ]}
        />
    )
}