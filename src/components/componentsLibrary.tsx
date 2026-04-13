'use client'

import { IUikitElements } from '@/lib/uiKitElements'
import { useDebounce } from '@/uiKit/hooks/useDebounce/useDebounce'
import Link from 'next/link'
import { useMemo, useState } from 'react'


interface IComponentsLibrary {
    data: IUikitElements[], 
    category:"Componentes" | "Loaders" | "Hooks" | "Utilitários"
}

export default function ComponentsLibrary({ data,category }: IComponentsLibrary) {
    const [search, setSearch] = useState('')
    const [filtered, setFiltered] = useState<IUikitElements[]>([])
    const debouncedSearch = useDebounce(search, 250)

    useMemo(() =>{
        setFiltered(data.filter((each) => each.title.toLowerCase().includes(debouncedSearch.toLowerCase())))
    },[debouncedSearch, data])


    return (
        <div className="w-full h-full p-6">
            
            <div className="flex flex-col gap-4 mb-6">
                <h1 className="text-2xl font-semibold">Biblioteca de {category}</h1>

                <input
                    type="text"
                    placeholder="Buscar componente..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg  border border-border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
                {filtered.map((item, index) => {
                    const Component = item.component;
                    return (
                        <Link
                            key={index}
                            href={item.url}
                            className="group cursor-pointer rounded-2xl border border-border p-4 hover:border-blue-500 transition-all duration-200 hover:-translate-y-1"
                        >
                            
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-xs px-2 py-1 rounded ">
                                    {category}
                                </span>
                            </div>

                            
                            <div className="h-24 mb-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-xs text-zinc-400">
                                <Component/>
                            </div>

                            <h2 className="font-medium mb-1">{item.title}</h2>
                            <p className="text-sm text-zinc-400 line-clamp-2">
                                {item.description}
                            </p>
                        </Link>
                    )
                })}
            </div>

            {/* EMPTY STATE */}
            {filtered.length === 0 && (
                <div className="text-center text-zinc-500 mt-10">
                    Nenhum componente encontrado
                </div>
            )}
        </div>
    )
}