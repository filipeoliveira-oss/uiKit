'use client'

import { useState } from "react"
import { Carousel, Slide } from "@/uiKit/components/carousel/carousel"
import PageComponent from "@/components/componentsPage"
import Image from "next/image"
import card1 from '../../../../../public/card1.jpg'
import card2 from '../../../../../public/card2.jpg'
import card3 from '../../../../../public/card3.png'
import card4 from '../../../../../public/card4.png'


export default function CarouselPage() {

    const [animationType, setAnimationType] = useState('slide')

    const codePreview =
`<Carousel animationType="slide" showDots>
  <Slide slideSrc="/card1.jpg" alt="image1" />
  <Slide slideSrc="/card2.jpg" alt="image2" />
  <Slide slideSrc="/card3.jpg" alt="image3" />
</Carousel>`

    const code =
`import { Carousel, Slide } from "@/uiKit/components/carousel/carousel"

type CarouselProps = {
  children: React.ReactNode
  showDots?: boolean
  showArrows?: boolean
  animationDuration?: number
  animationType?: "none" | "slide" | "fade" | "globe"
  arrowBackground?: string
  arrowColor?: string
  activeDotColor?: string
  dotsColor?: string
}

type SlideProps = {
  slideSrc: StaticImageData | string
  width?: number
  height?: number
  alt: string
  label?: string
}

export default function Carousel(props: CarouselProps) {
  // component implementation
}

export function Slide(props: SlideProps) {
  // component implementation
}`

    return (
        <PageComponent
            ComponentType="Componentes"
            componentName="Carousel"
            componentCodeName="Carousel"
            description="Componente de carrossel de imagens com suporte a múltiplas animações e slides customizáveis."
            code={code}
            preview={<Carousel>
                <Slide>
                    <Image src={card1} alt="image 1"/>
                </Slide>
                <Slide>
                    <Image src={card2} alt="image 2"/>
                </Slide>
                <Slide>
                    <Image src={card3} alt="image 3"/>
                </Slide>
                <Slide>
                    <Image src={card4} alt="image 4"/>
                </Slide>
            </Carousel>}
            props={[
                {
                    propName: "children",
                    type: "Slide",
                    default: "-",
                    description: "Elementos Slide que compõem o carrossel",
                    required: true
                },
                {
                    propName: "showDots",
                    type: "boolean",
                    default: "false",
                    description: "Exibe indicadores (dots) de navegação",
                    required: false
                },
                {
                    propName: "showArrows",
                    type: "boolean",
                    default: "true",
                    description: "Exibe setas de navegação",
                    required: false
                },
                {
                    propName: "animationDuration",
                    type: "number",
                    default: "0.5",
                    description: "Duração da animação em segundos",
                    required: false
                },
                {
                    propName: "animationType",
                    type: "'none' | 'slide' | 'fade' | 'globe'",
                    default: "slide",
                    description: "Tipo de animação do carrossel",
                    required: false
                },
                {
                    propName: "arrowBackground",
                    type: "string",
                    default: "#9F9FA9",
                    description: "Cor de fundo das setas",
                    required: false
                },
                {
                    propName: "arrowColor",
                    type: "string",
                    default: "#FFFFFF",
                    description: "Cor das setas",
                    required: false
                },
                {
                    propName: "activeDotColor",
                    type: "string",
                    default: "#00bcff",
                    description: "Cor do dot ativo",
                    required: false
                },
                {
                    propName: "dotsColor",
                    type: "string",
                    default: "#d4d4d8",
                    description: "Cor dos dots inativos",
                    required: false
                }
            ]}
        />
    )
}