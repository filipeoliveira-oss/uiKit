'use client'
import CodeBlock from "@/components/codeBlock"
import ColorText from "@/components/colorText"
import PageWrapper from "@/components/pageWrapper"
import { BarLoader } from "@/uiKit/loaders/barLoader/barLoader"
import { BeatLoader } from "@/uiKit/loaders/beatLoader/beatLoader"
import { ClipLoader } from "@/uiKit/loaders/clipLoader/clipLoader"
import { DotLoader } from "@/uiKit/loaders/dotLoader/dotLoader"
import { FadeLoader } from "@/uiKit/loaders/fadeLoader/fadeLoader"
import { GridLoader } from "@/uiKit/loaders/gridLoader/gridLoader"
import { PropagateLoader } from "@/uiKit/loaders/propagateLoader/propagateLoader"
import { PuffLoader } from "@/uiKit/loaders/puffLoader/puffLoader"
import { PulseLoader } from "@/uiKit/loaders/pulseLoader/pulseLoader"
import { ScaleLoader } from "@/uiKit/loaders/scaleLoader/scaleLoader"
import { useState } from "react"

export default function LoadersPage() {
    const [selectedColor, setSelectedColor] = useState('#8e51ff')
    function LoaderCard({ children, title }: { children: React.ReactNode, title: string }) {
        return (
            <div className="w-full h-40 border border-zinc-400 rounded-4xl flex flex-col items-center py-4 gap-4">
                <span className="text-zinc-300">{title}</span>
                <div className="w-full h-full flex items-center justify-center">
                    {children}
                </div>
            </div>
        )
    }

    const a =
        `npx fouikit
loaders
{loaderName}`

    const deps = [
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "react", url: "https://www.npmjs.com/package/react" }
    ]
    return (

        <PageWrapper requirements={deps} title="Loaders">

            <ColorText text="Loaders"/>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>


            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Size</span>
                <CodeBlock code="String" showLineNumbers={false} />
                <span>Size of the element. A unit is expected to be passed in</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Color</span>
                <CodeBlock code="Color" showLineNumbers={false} />
                <span>Color that will be use</span>
            </div>

            <input value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} type="color" className="w-20 h-12 shrink-0"/>

            <div className="w-full h-fit" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gridAutoRows: '1fr', gap: '1rem' }}>
                <LoaderCard title="Bar Loader">
                    <BarLoader color={selectedColor}/>
                </LoaderCard>

                <LoaderCard title="Beat Loader">
                    <BeatLoader color={selectedColor}/>
                </LoaderCard>

                <LoaderCard title="Clip Loader">
                    <ClipLoader color={selectedColor}/>
                </LoaderCard>

                <LoaderCard title="Dot Loader">
                    <DotLoader color={selectedColor}/>
                </LoaderCard>

                <LoaderCard title="Fade Loader">
                    <FadeLoader color={selectedColor}/>
                </LoaderCard>

                <LoaderCard title="Grid Loader">
                    <GridLoader color={selectedColor}/>
                </LoaderCard>

                <LoaderCard title="Propagate Loader">
                    <PropagateLoader color={selectedColor}/>
                </LoaderCard>

                <LoaderCard title="Puff Loader">
                    <PuffLoader color={selectedColor}/>
                </LoaderCard>

                <LoaderCard title="Pulse Loader">
                    <PulseLoader color={selectedColor}/>
                </LoaderCard>

                <LoaderCard title="Scale Loader">
                    <ScaleLoader color={selectedColor}/>
                </LoaderCard>

            </div>
        </PageWrapper>

    )
}
