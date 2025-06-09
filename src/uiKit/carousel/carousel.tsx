'use client'
import React, { ComponentProps, forwardRef, useEffect, useState } from "react"
import {  motion } from 'framer-motion'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Image from "next/image"

import type { StaticImageData } from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type HSL = `hsl(${number}, ${number}%, ${number}%)`;
type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`;
type OKLCH = `oklch(${number} ${number} ${number})`;
type OKLAB = `oklab(${number} ${number} ${number})`;
type CMYK = `cmyk(${number}%, ${number}%, ${number}%, ${number}%)`;

const BRAND_KEY = '_fouikit_is_slide'
type colors = RGB | RGBA | HEX | HSL | HSLA | OKLCH | OKLAB | CMYK;

interface props {
    showDots?: boolean,
    showArrows?: boolean,
    animationDuration?: number,
    children: React.ReactNode,

    animationType?: 'none' | 'slide' | 'fade' | 'globe';
    arrowBackground?: colors
    arrowColor?: colors
    activeDotColor?: colors
    dotsColor?: colors
}

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}



type CarouselProps = Pick<ComponentProps<'div'>, 'className'> & props

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
    ({ className, showArrows = true, showDots = false, animationDuration = .5, children, arrowBackground = '#9f9fa9', arrowColor = '#ffffff', animationType = 'slide', activeDotColor = '#00bcff', dotsColor = '#d4d4d8', ...props }, ref) => {
        const [validChildren, setValidChildren] = useState<React.ReactNode[]>([])
        const [currentSlide, setCurrentSlide] = useState(0)
        const [direction, setDirection] = useState(0);
        const [previous, setPrevious] = useState(0)
        
        const handleNextSlide = (i?: number) => {
            setDirection(1)
            setPrevious(currentSlide)
            const next = (currentSlide + 1) % validChildren.length;

            setCurrentSlide(i ?? next)
        }

        const handlePreviousSlide = (i?: number) => {
            setDirection(-1)
            setPrevious(currentSlide)

            const prev = (currentSlide - 1 + validChildren.length) % validChildren.length;

            setCurrentSlide(i ?? prev)
        }

        useEffect(() => {
            const valid = React.Children.toArray(children).filter(
                (child): child is React.ReactElement => {
                    console.log(child)
                    return (
                        React.isValidElement(child) &&
                        Boolean((child.type as any)[BRAND_KEY])
                    )
                }
            )
            
            setValidChildren(valid)
        }, [children])


        // EFFECTS
        function SetSlider() {
            switch (animationType) {
                case 'none':
                    return <motion.div className="w-full h-full absolute flex items-center justify-center">{validChildren[currentSlide]}</motion.div>
                case 'globe':
                    const getWrappedIndex = (index: number) => {
                        const total = validChildren.length;
                        return ((index % total) + total) % total;
                    };

                    const visibleSlots = ['left', 'left1', 'center', 'right1', 'right'];

                    const globeVariants = {
                        center: { x: '0%', scale: 1, zIndex: 10, rotateY: '0deg', opacity: 1 },
                        left1: { x: '-50%', scale: 0.75, zIndex: 5, rotateY: '-10deg', opacity: 0.7 },
                        left: { x: '-100%', scale: 0.5, zIndex: 1, rotateY: '-60deg', opacity: 0.4 },
                        right1: { x: '50%', scale: 0.75, zIndex: 5, rotateY: '30deg', opacity: 0.7 },
                        right: { x: '100%', scale: 0.5, zIndex: 1, rotateY: '40deg', opacity: 0.4 },
                    };

                    return visibleSlots.map((slot, offset) => {
                        const index = getWrappedIndex(currentSlide + offset - 2); // -2: left, +2: right
                        const child = validChildren[index];

                        return (
                            <motion.div
                                key={`${index}-${slot}`}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                initial={visibleSlots[offset + 1]}
                                animate={slot}
                                variants={globeVariants}
                                transition={{ duration: animationDuration, ease: 'easeInOut' }}
                                style={{ perspective: 1000, }}
                            >
                                {child}
                            </motion.div>
                        );
                    });
                case 'fade':
                    const fadeVariant = {
                        prev: {
                            opacity: 0, width: '100%'
                        },
                        active: { opacity: 1, width: '100%' },

                    }
                    return (
                        validChildren.map((child, i) => (
                            <div className="w-full h-full absolute flex items-center justify-center">
                                <motion.div key={i} initial='prev' variants={fadeVariant} animate={i === currentSlide ? 'active' : 'prev'} transition={{ duration: animationDuration, ease: 'easeInOut' }} >
                                    {validChildren[currentSlide]}
                                </motion.div>
                            </div>
                        ))
                    )
                case 'slide':

                    return (
                        <div className="relative w-full h-full">
                            <motion.div
                                custom={direction}
                                initial={{ x: `${direction * 100}%` }}
                                animate={{ x: '0%' }}
                                exit={{ x: `${-direction * 100}%` }}
                                transition={{ duration: 0.5 }}
                                className="absolute w-full h-full flex items-center justify-center text-white text-2xl z-20"
                            >
                                {validChildren[currentSlide]}
                            </motion.div>
                            <motion.div className="absolute top-0 left-0 z-10 w-full h-full" custom={direction}
                                animate={{ x: `${direction * -1 * 100}%` }}
                                initial={{ x: '0%' }}
                                transition={{ duration: 0.5 }}>{validChildren[previous]}</motion.div>
                        </div>
                    )

            }
        }

        return (
            <div {...props} className={cn('w-full h-full flex flex-row relative overflow-hidden', className)} id="fouikitcarouselcontainerslider">
                {/* overflow-hidden aqui em cima */}
                <button onClick={() => handlePreviousSlide()} className={`z-50 absolute top-1/2 -translate-y-1/2 left-2 bg-[${arrowBackground}] rounded-full cursor-pointer flex items-center justify-center`}><ChevronLeft color={arrowColor} /></button>
                <div className="absolute flex flex-row gap-0 w-full h-full top-0 left-0 overflow-hidden" >
                    {/* overflow-hidden aqui em cima */}
                    <SetSlider />
                </div>
                <button onClick={() => handleNextSlide()} className={`z-50 absolute top-1/2 -translate-y-1/2 right-2 bg-[${arrowBackground}] rounded-full cursor-pointer flex items-center justify-center`}><ChevronRight color={arrowColor} /></button>
                {showDots && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2  w-fit h-fit flex flex-row gap-2 z-50">
                        {validChildren.map((child, i) => (
                            <div key={i} className={`w-3 h-3 cursor-pointer ${currentSlide === i ? `bg-[${activeDotColor}]` : `bg-[${dotsColor}]`} rounded-full`} onClick={() => i < currentSlide ? handlePreviousSlide(i) : handleNextSlide(i)}></div>
                        ))}
                    </div>
                )}
            </div>
        )
    })



type ISlide = relativePath | staticImage
type relativePath = {slideSrc: string; alt: string, label?: string, width:number, height:number}
type staticImage = {slideSrc: StaticImageData; alt: string, label?: string}

type SlideProps = Pick<ComponentProps<'img'>, 'className'> & ISlide

interface SlideComponent extends React.ForwardRefExoticComponent<SlideProps & React.RefAttributes<HTMLImageElement>> {
    _fouikit_is_slide: true;
}

const Slide = forwardRef<HTMLImageElement, SlideProps>(
    ({ className, slideSrc, alt, label, ...props }, ref) => {
        return (
            <div className="w-full h-full shrink-0 relative">
                <Image
                    ref={ref}
                    className={cn('w-full h-full shrink-0', className)}
                    src={slideSrc}
                    alt={alt}
                    data-slider-id='fouikitslider'
                    {...props}
                />
                {label && (
                    <span className="absolute bottom-0 left-0 w-full max-h-24 min-h-12 px-2 py-1 bg-black/70 z-50 overflow-hidden line-clamp-3">
                        {label}
                    </span>
                )}
            </div>
        )
    }
) as SlideComponent;



Slide.displayName = 'FouikitSlide';
(Slide as any)[BRAND_KEY] = true;

export { Carousel, Slide }