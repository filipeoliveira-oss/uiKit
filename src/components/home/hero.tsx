'use client'
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import codeSnippetBig from '/public/landingPage/codeSnippetBig.webp'
import codeSnippetSmall from '/public/landingPage/codeSnippetSmall.webp'
import { componentsList, hooksList } from "@/lib/uiKitElements";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/src/SplitText";

gsap.registerPlugin(SplitText)

export default function Hero() {
    const componentsRef = useRef<HTMLSpanElement>(null)
    const hooksRef = useRef<HTMLSpanElement>(null)
    const loadersRef = useRef<HTMLSpanElement>(null)
    const snippetBig = useRef(null)
    const snippetSmall = useRef(null)
    const wordsRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const components = { val: 0 };
        const hooks = { val: 0 };
        const loaders = { val: 0 };

        const totalComponents = componentsList.length
        const totalHooks = hooksList.length

        const tl = gsap.timeline({
            defaults: {
                ease: 'power2.out'
            }
        })

        document.fonts.ready.then(() => {
            SplitText.create('#tagline', {
                type: 'words',
                mask: 'words',
                onSplit: (self) => {
                    gsap.set(wordsRef.current,{
                        opacity:1
                    })

                    gsap.from(self.words, {
                        y: 100,
                        autoAlpha: 0,
                        stagger: 0.1,
                        onComplete: () => {
                            self.revert()
                        }
                    })
                }
            })

            gsap.to(components, {
                val: totalComponents,
                duration: 1,
                ease: "power1.out",
                onUpdate: () => {
                    if (componentsRef.current) {
                        componentsRef.current.textContent = Math.floor(components.val).toString();
                    }
                },
            });

            gsap.to(hooks, {
                val: totalHooks,
                duration: 1,
                ease: "power1.out",
                onUpdate: () => {
                    if (hooksRef.current) {
                        hooksRef.current.textContent = Math.floor(hooks.val).toString();
                    }
                },
            });

            gsap.to(loaders, {
                val: 10,
                duration: 1,
                ease: "power1.out",
                onUpdate: () => {
                    if (loadersRef.current) {
                        loadersRef.current.textContent = Math.floor(loaders.val).toString();
                    }
                },
            });

            gsap.set(snippetBig.current,{
                opacity:1
            })

             gsap.set(snippetSmall.current,{
                opacity:1
            })

            tl.from(snippetBig.current, {
                x: 2000,
                duration: 1,
            }).from(snippetSmall.current, {
                x: 2000,
                duration: 1,
            })
        })


    }, [])


    return (
        <div className="w-full h-dvh flex justify-center relative" style={{ backgroundImage: 'url(/landingPage/pattern.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="w-defaultWidth h-full flex items-center justify-between gap-2">
                <div className="flex flex-col w-[40%] h-fit">
                    <h1 className="text-6xl font-bold bg-gradient-to-br from-lighterteal to-reactblue bg-clip-text text-transparent">FOUIKIT</h1>

                    <div className="flex flex-col w-full h-fit mt-4">
                        <h2 className="font-bold text-3xl">Accelerate development with <br /> ready-to-use React UI code snippets</h2>
                        <span className="text-2xl text-zinc-300 opacity-0" ref={wordsRef} id="tagline">Define it. Adapt it. Reuse it.</span>
                    </div>

                    <Link href={'/docs/introduction'} className="mt-11 w-fit h-fit">
                        <button className="hover:shadow-[0_0_12px_#00ffffaa] w-fit px-6 py-3 cursor-pointer rounded-lg bg-gradient-to-r from-lighterteal to-reactblue flex flex-row items-center justify-between">
                            <span>Get started</span>
                            <ArrowRight />
                        </button>
                    </Link>
                </div>

                <div className="flex flex-col w-[60%] h-[60%] relative">
                    <Image src={codeSnippetBig} alt="Hook Code Snippet" className="absolute top-0 left-30 opacity-0" ref={snippetBig} />
                    <Image src={codeSnippetSmall} alt="Hook Code Snippet" className="absolute top-[25%] left-0 opacity-0" ref={snippetSmall} />
                </div>
            </div>

            <div className="absolute w-full h-fit bottom-12 left-0 flex justify-center">
                <div className="w-defaultWidth h-fit flex flex-row gap-16">
                    <div className="w-fit h-fit flex flex-col gap-4">
                        <h3 className="text-lg font-medium">Components</h3>
                        <span className="text-3xl font-bold" ref={componentsRef}>0</span>
                    </div>

                    <div className="w-fit h-fit flex flex-col gap-4">
                        <h3 className="text-lg font-medium">Hooks</h3>
                        <span className="text-3xl font-bold" ref={hooksRef}>0</span>
                    </div>

                    <div className="w-fit h-fit flex flex-col gap-4">
                        <h3 className="text-lg font-medium">Loaders</h3>
                        <span className="text-3xl font-bold" ref={loadersRef}>0</span>
                    </div>
                </div>
            </div>
        </div>
    )
}