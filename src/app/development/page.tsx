'use client'

import { Carousel, Slide } from "@/uiKit/components/carousel/carousel"
import { useEffect, useState } from "react"
import {  toast as toastify } from "react-toastify"
import card1 from '../../../public/card1.jpg'
import card2 from '../../../public/card4.png'
import card3 from '../../../public/card3.png'
import Image from "next/image"


export default function Component() {

    return (
        <div className="w-screen h-screen items-center justify-center flex flex-col gap-8">
            <Carousel>
                <Slide label="imagem 1">
                    <Image src={card1} alt="teste" className="w-full h-full"/>
                </Slide>

                <Slide label="imagem 2">
                    <Image src={card1} alt="teste" className="w-full h-full"/>
                </Slide>

                <Slide label="imagem 3">
                    <Image src={card1} alt="teste" className="w-full h-full"/>
                </Slide>
            </Carousel>
        </div>
    )
}