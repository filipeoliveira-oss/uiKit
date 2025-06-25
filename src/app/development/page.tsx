'use client'

import ComponentDisplay from "@/components/componentDisplay"
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

    useEffect(() => {
        const items = Array.from({ length: 500 }, (_, i) => ({
            item: `Item ${i + 1}`,
            price: Math.random(),
            item2: `Item ${i + 1}`,
            price2: Math.random(),
            item4: `Item ${i + 1}`,
            price4: Math.random(),
            item5: `Item ${i + 1}`,
            price5: Math.random()
        }))

        d(items)
        b(items[0])
    },[])

    return (
        <div className="w-screen h-screen items-center justify-center flex flex-col gap-8">
            <ComponentDisplay>
                <Dropdown onChangeValue={(e) => { b(e); console.log(e) }} value={a} options={c} itemTemplate={Item} filter filterKey="item" />
            </ComponentDisplay>
        </div>
    )
}