import { useEffect, useLayoutEffect, useRef } from 'react'

const isomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

type UseDocumentTitleOptions = {
  preserveTitleOnUnmount?: boolean
}

export default function useDocumentTitle(title:string, options:UseDocumentTitleOptions = {}) : void{

    const { preserveTitleOnUnmount = true } = options
    const defaultTitle = useRef<string | null>(null)

    isomorphicLayoutEffect(() =>{
        defaultTitle.current = window.document.title
    },[])

    isomorphicLayoutEffect(() =>{
        window.document.title = title
    },[title])

    useEffect(() =>{
        return () => {
            if(!preserveTitleOnUnmount && defaultTitle.current){
                window.document.title = defaultTitle.current
            }
        }
    },[])
}