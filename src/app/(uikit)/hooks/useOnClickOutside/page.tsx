
import PageComponent from "@/components/componentsPage"

export default function useOnClickOutsidePage() {

    const codePreview = 
`const ref = useRef<HTMLElement>(null)

useOnClickOutside(ref, () =>{
        setProperty(true)
})`

    const code = 
`import { RefObject, useEffect, useLayoutEffect, useRef } from "react";

const isomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

type EventType =
    | 'mousedown'
    | 'mouseup'
    | 'touchstart'
    | 'touchend'
    | 'focusin'
    | 'focusout'


export default function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T | null> | RefObject<T | null>[] | null ,
    handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
    eventType: EventType = 'mousedown',
    eventListenerOptions: AddEventListenerOptions = {},
): void {
    if(ref === null) return;

    useEventListener(
        eventType,
        event => {
            const target = event.target as Node

            if (!target || !target.isConnected) {
                return
            }

            const isOutside = Array.isArray(ref)
                ? ref
                    .filter(r => Boolean(r.current))
                    .every(r => r.current && !r.current.contains(target))
                : ref.current && !ref.current.contains(target)

            if (isOutside) {
                if (
                    event instanceof MouseEvent ||
                    event instanceof TouchEvent ||
                    event instanceof FocusEvent
                ) {
                    handler(event)
                }
            }
        },
        undefined,
        eventListenerOptions,
    )

}

function useEventListener<
    KW extends keyof WindowEventMap,
    KH extends keyof HTMLElementEventMap & keyof SVGElementEventMap,
    KM extends keyof MediaQueryListEventMap,
    T extends HTMLElement | SVGAElement | MediaQueryList = HTMLElement,
>(
    eventName: KW | KH | KM,
    handler: (
        event:
            | WindowEventMap[KW]
            | HTMLElementEventMap[KH]
            | SVGElementEventMap[KH]
            | MediaQueryListEventMap[KM]
            | Event,
    ) => void,
    element?: RefObject<T>,
    options?: boolean | AddEventListenerOptions,
) {
    // Create a ref that stores handler
    const savedHandler = useRef(handler)

    isomorphicLayoutEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(() => {
        // Define the listening target
        const targetElement: T | Window = element?.current ?? window

        if (!(targetElement && targetElement.addEventListener)) return

        // Create event listener that calls handler function stored in ref
        const listener: typeof handler = event => {
            savedHandler.current(event)
        }

        targetElement.addEventListener(eventName, listener, options)

        // Remove event listener on cleanup
        return () => {
            targetElement.removeEventListener(eventName, listener, options)
        }
    }, [eventName, element, options])
}`

    return (
        <PageComponent
            ComponentType="Hooks"
            code={code}
            componentCodeName="useOnClickOutside"
            componentName="useOnClickOutside"
            description="Um hook que executa uma função caso você clique fora de uma ref."
            props={[
                {propName:'ref ', type:'RefObject<T | null> | RefObject<T | null>[] | null', default:'-', description:'Referência a ser observada', required:true},
                {propName:'handler ', type:'(event: MouseEvent | TouchEvent | FocusEvent) => void', default:'-', description:'Função a ser executada quando clicado fora da referência (Recebe o evento de clique)', required:true},
                {propName:'eventType ', type:'mousedown | mouseup | touchstart | touchend | focusin | focusout', default:'mousedown', description:'Evento a ser observado', required:false},
                {propName:'eventListenerOptions ', type:'AddEventListenerOptions', default:'-', description:'Parâmetros adicionais do evento', required:false},
            ]}
            previewCode={codePreview}
        />        
    )
}