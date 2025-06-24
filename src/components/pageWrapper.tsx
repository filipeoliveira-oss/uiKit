'use client'
import useDocumentTitle from "@/uiKit/hooks/useDocumentTitle/useDocumentTitle";
import Link from "next/link";
import React from "react";

interface requirements {
    name: string,
    url: string
}


export default function PageWrapper({ children, requirements, showRequirements = true, title }: { children: React.ReactNode, requirements: Array<requirements>, showRequirements?: boolean, title:string }) {

    useDocumentTitle(`FOUIKIT | ${title}`)

    return (
        <div className="w-full h-full overflow-auto flex flex-col gap-8 pb-12 px-4">
            {showRequirements && (
                <>
                    <h2 className="text-2xl font-semibold">Requirements</h2>
                    <ul className="w-[80%] h-fit list-disc pl-4 ">
                        {requirements.map((each, index) => (
                            <li className="text-zinc-300" key={index}>
                                <Link href={each.url} className="underline" target="_blank">{each.name}</Link>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {children}
        </div>
    )
}