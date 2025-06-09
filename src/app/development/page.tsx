'use client'
import {Carousel, Slide} from "@/uiKit/carousel/carousel";
import c4 from '../../../public/card4.png'
import c2 from '../../../public/card2.jpg'
import c3 from '../../../public/card3.png'

export default function Component(){
    return(
        <div className="w-full h-full">
            <Carousel className=" w-full h-full" animationType="none" showDots>
                <Slide slideSrc={c4} alt="teste" label="t123his is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tilethis is the tile"></Slide>
                <Slide slideSrc={c2} alt="teste"></Slide>
                <Slide slideSrc={c3} alt="teste"></Slide>
            </Carousel>
        </div>
    )
}