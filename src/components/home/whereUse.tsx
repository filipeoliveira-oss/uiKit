import Marquee from "react-fast-marquee";
import blitz from '/public/landingPage/frameworks/blitz.png';
import gatsby from '/public/landingPage/frameworks/gatsby.png';
import nextjs from '/public/landingPage/frameworks/nextjs.png';
import razzle from '/public/landingPage/frameworks/razzle.png';
import redwood from '/public/landingPage/frameworks/redwood.png';
import remix from '/public/landingPage/frameworks/remix.png';
import Image from "next/image";
import Link from "next/link";


export default function WhereUse() {
    return (
        <div className="w-full h-fit bg-black/10 flex items-center justify-center flex-col gap-24">
            <div className="w-fit h-fit flex flex-col gap-2 text-center">
                <h2 className="text-3xl font-bold">Components libraries</h2>
                <span>FOUIKIT is built with React at its core, ensuring seamless compatibility with any framework based on React</span>
            </div>

            <Marquee pauseOnHover speed={100} className="bg-white/20 py-4" >
                <div className="w-fit h-fit px-8"><Link href={'https://blitzjs.com/'} target="_blank"><Image src={blitz} alt="Blitz framework" height={100} /></Link></div>
                <div className="w-fit h-fit px-8"><Link href={'https://nextjs.org/'} target="_blank"><Image src={nextjs} alt="nextjs framework" height={100} /></Link></div>
                <div className="w-fit h-fit px-8"><Link href={'https://www.gatsbyjs.com/'} target="_blank"><Image src={gatsby} alt="gatsby framework" height={100} /></Link></div>
                <div className="w-fit h-fit px-8"><Link href={'https://razzlejs.org/'} target="_blank"><Image src={razzle} alt="razzle framework" height={100} /></Link></div>
                <div className="w-fit h-fit px-8"><Link href={'https://rwsdk.com/'} target="_blank"><Image src={redwood} alt="redwood framework" height={100} /></Link></div>
                <div className="w-fit h-fit px-8"><Link href={'https://remix.run/'} target="_blank"><Image src={remix} alt="remix framework" height={100} /></Link></div>
            </Marquee>
        </div>
    )
}