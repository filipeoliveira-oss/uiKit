'use client'
import CodeBlock from "@/components/codeBlock"
import ColorText from "@/components/colorText"
import ComponentDisplay from "@/components/componentDisplay"
import PageWrapper from "@/components/pageWrapper"
import DataView from "@/uiKit/dataView/dataView"
import { ShoppingBag, Tag } from "lucide-react"
import Image from "next/image"
import React from "react"

export default function DataViewPage() {

    const elements = React.useMemo(() => {
        const tags = ['tech', 'fashion', 'home', 'sports', 'books'];
        const photos = [
            'https://picsum.photos/seed/pic1/300',
            'https://picsum.photos/seed/pic2/300',
            'https://picsum.photos/seed/pic3/300',
            'https://picsum.photos/seed/pic4/300',
            'https://picsum.photos/seed/pic5/300',
            'https://picsum.photos/seed/pic6/300',
            'https://picsum.photos/seed/pic7/300',
            'https://picsum.photos/seed/pic8/300',
            'https://picsum.photos/seed/pic9/300',
            'https://picsum.photos/seed/pic10/300'
        ];

        const items = [];

        for (let i = 1; i <= 10; i++) {
            items.push({
                name: `Item ${i}`,
                price: parseFloat((Math.random() * 100).toFixed(2)), // price between 0 and 100
                photo: photos[i - 1],
                tag: tags[Math.floor(Math.random() * tags.length)]
            });
        }

        return items;
    }, [])

    const a =
        `npx fouikit
components
Data view`


    const deps = [
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
    ]

    const Item = (item: any) => {
        return (
            <div className="w-fit h-fit flex flex-row items-center justify-between p-4">
                <div className="w-fit h-fit shrink-0">
                    <Image src={item.photo} alt="Photo" height={100} width={100} className="rounded-2xl shadow shrink-0"/>
                </div>
                <div className="w-40 h-full flex flex-col justify-between ml-8">
                    <span className="font-bold">{item.name}</span>
                    <span className="flex flex-row gap-2 items-center justify-center w-fit h-fit"><Tag size={16}/> {item.tag}</span>
                </div>

                <div className="w-fit h-full flex flex-col justify-between  ml-8">
                    <span className="font-bold">R${item.price}</span>
                    <button className=" cursor-pointer w-12 h-12 rounded-full bg-sky-500 items-center justify-center flex"><ShoppingBag color="white"/></button>
                </div>
            </div>
        )
    }

    return (
        <PageWrapper requirements={deps} title="Data view">
            <ColorText text="Data View" />
            <span>DataView displays data in grid or list layout with pagination and sorting features.</span>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

                <DataView itemTemplate={Item} values={elements} />
           

            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">values*</span>
                <CodeBlock code="Array<any>" language="ts" showLineNumbers={false} />
                <span>Array of elements that will be displayed</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">itemTemplate*</span>
                <CodeBlock code="(item: any) => React.ReactNode" language="ts" showLineNumbers={false} />
                <span>Node that receives the object in the collection to return content</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">pagination</span>
                <CodeBlock code="bool" language="ts" showLineNumbers={false} />
                <span>Pagination is enabled with the paginator and rows properties</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">rows</span>
                <CodeBlock code="number" language="ts" showLineNumbers={false} />
                <span>Number of rows that will be displayed per page. Default to 10 </span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">header</span>
                <CodeBlock code="React.ReactNode" language="ts" showLineNumbers={false} />
                <span>Header element that will be shown</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">maxVisiblePages</span>
                <CodeBlock code="number" language="ts" showLineNumbers={false} />
                <span>Number of pages that will be displayed before shifting</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">showItemBorder</span>
                <CodeBlock code="bool" language="ts" showLineNumbers={false} />
                <span>If there will be a border between the items. Default to true</span>
            </div>

        </PageWrapper>
    )
}