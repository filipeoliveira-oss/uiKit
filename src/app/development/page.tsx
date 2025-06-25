'use client'

import ComponentDisplay from "@/components/componentDisplay"
import AutoComplete from "@/uiKit/components/autoComplete/autoComplete"
import  CodeBlock  from "@/uiKit/components/codeBlock/codeBlock"
import Dropdown from "@/uiKit/components/dropdown/dropdown"
import { useEffect, useState } from "react"


interface teste {
    name: string,
    price: string
}
export default function Component() {
    const [a, b] = useState<any>()
    const [c, d] = useState<{ item: string; price: number }[]>([])
    const optionsString = ['Filipe', 'Munique', 'Cubas', 'filipinhoo']


    const Item = (item: any) => {
        return (
            <span>{item.item}</span>
        )
    }


    return (
        <div className="w-screen h-screen items-center justify-center flex flex-col gap-8">
            <ComponentDisplay>
                <CodeBlock code={`const [a, b] = useState<any>()
const [c, d] = useState<{ item: string; price: number }[]>([])
const optionsString = ['Filipe', 'Munique', 'Cubas', 'filipinhoo']`}/>
            </ComponentDisplay>

        </div>
    )
}