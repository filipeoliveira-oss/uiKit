'use client'
import CodeBlock from "@/components/codeBlock"
import PageWrapper from "@/components/pageWrapper"
import c4 from '/public/card4.png'
import c2 from '/public/card2.jpg'
import c3 from '/public/card3.png'
import { Slide, Carousel } from "@/uiKit/components/carousel/carousel"
import { useState } from "react"
import ColorText from "@/components/colorText"
import { Dropdown } from "@/uiKit/components/dropdown/dropdown"

export default function CarouselPage() {
    const [currentType, setCurrentType] = useState('slide')

    const a = 
    `npx fouikit
components
carousel`

    const deps = [
        { name: "tailwind-variants", url: "https://www.npmjs.com/package/tailwind-variants" },
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
        { name: "framer-motion", url: "https://www.npmjs.com/package/framer-motion" },
        { name: "clsx", url: "https://www.npmjs.com/package/clsx" },
        { name: "lucide-react", url: "https://www.npmjs.com/package/lucide-react" },
    ]

    const code = 
    `<Carousel>
    <Slide alt="image1" slideSrc={c4} />
    <Slide alt="image2" slideSrc={c2} />
    <Slide alt="image3" slideSrc={c3} />
</Carousel>`

    return (
        <PageWrapper requirements={deps} title="Checkbox">
            <ColorText text="Carousel"/>
            <span>A custom Carousel and slide component</span>

            <CodeBlock code={a} />

            <h2 className=" text-lg">This component <span className="font-bold">MUST</span> be used in on the client side</h2>

            <span>This component exports two elements (Carousel and Slide) </span>

            <CodeBlock code={code} showLineNumbers={false} language="js" />


            <h2 className="text-3xl font-bold">Usage</h2>

            <div className="w-full h-96 shrink-0">
                <Carousel showDots={true} animationType={currentType as any}>
                    <Slide alt="image1" slideSrc={c4} label="This is the label" />
                    <Slide alt="image2" slideSrc={c2} />
                    <Slide alt="image3" slideSrc={c3} />
                </Carousel>
            </div>

            <div className="flex flex-col gap-2 w-full h-fit">
                <span>Select the animation type</span>
                <Dropdown content={['slide', 'globe', 'fade','none']} onChangeValue={(e) => setCurrentType(e)} value={currentType} className="bg-zinc-300 " />
            </div>

            <h2 className="text-3xl font-bold">Carousel parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">children*</span>
                <CodeBlock code="Slide" showLineNumbers={false} language="js" />
                <span>The Slide element</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">showDots</span>
                <CodeBlock code="Boolean" showLineNumbers={false} language="js" />
                <span>If it shows dots. False by default</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">showArrows</span>
                <CodeBlock code="Boolean" showLineNumbers={false} language="js" />
                <span>If it shows arrows. True by default</span>
            </div>


            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">animationDuration</span>
                <CodeBlock code="Seconds" showLineNumbers={false} language="js" />
                <span>The duration for each animation. 0.5s by default</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">animationType</span>
                <CodeBlock code="none | slide | fade | globe" showLineNumbers={false} />
                <span>Animation to execute. Slide by default</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">arrowBackground</span>
                <CodeBlock code="RGB | RGBA | HEX | HSL | HSLA | OKLCH | OKLAB | CMYK" showLineNumbers={false} language="js" />
                <span>Arrow background color. #9F9FA9 by default</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">arrowColor</span>
                <CodeBlock code="RGB | RGBA | HEX | HSL | HSLA | OKLCH | OKLAB | CMYK" showLineNumbers={false} language="js" />
                <span>Arrow color. #FFFFFF by default</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">activeDotColor</span>
                <CodeBlock code="RGB | RGBA | HEX | HSL | HSLA | OKLCH | OKLAB | CMYK" showLineNumbers={false} language="js" />
                <span>Active dot color. #00bcff by default</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">dotsColor</span>
                <CodeBlock code="RGB | RGBA | HEX | HSL | HSLA | OKLCH | OKLAB | CMYK" showLineNumbers={false} language="js" />
                <span>Inactive dots color. #d4d4d8 by default</span>
            </div>

            <h2 className="text-3xl font-bold">Slide parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">slideSrc*</span>
                <CodeBlock code="StaticImageData | String" showLineNumbers={false} language="js" />
                <span>The image to be displayed</span>
            </div>

             <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">width</span>
                <CodeBlock code="Number" showLineNumbers={false} language="js" />
                <span>The width to be set. REQUIRED if slideSrc is relative path</span>
            </div>

             <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">height</span>
                <CodeBlock code="Number" showLineNumbers={false} language="js" />
                <span>The height to be set. REQUIRED if slideSrc is relative path</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">alt*</span>
                <CodeBlock code="String" showLineNumbers={false} language="js" />
                <span>The image alternative text</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">label</span>
                <CodeBlock code="String" showLineNumbers={false} language="js" />
                <span>The label to be shown</span>
            </div>
        </PageWrapper>
    )
}