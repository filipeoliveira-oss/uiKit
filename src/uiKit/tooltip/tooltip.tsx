import { ComponentProps, forwardRef, useState,useRef } from "react";
import { tv, type VariantProps } from 'tailwind-variants'
import { motion } from 'framer-motion'

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type HSL = `hsl(${number}, ${number}%, ${number}%)`;
type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`;
type OKLCH = `oklch(${number} ${number} ${number})`;
type OKLAB = `oklab(${number} ${number} ${number})`;
type CMYK = `cmyk(${number}%, ${number}%, ${number}%, ${number}%)`;

type colors = RGB | RGBA | HEX | HSL | HSLA | OKLCH | OKLAB | CMYK ;

interface Itooltip {
    children: React.ReactNode,
    content: string,
    offset?: number,
    delayOpen?: number,
    delayHide?: number,
    backgroundColor?:colors
}


const TooltipVariant = tv({
    base: 'flex items-center justify-center w-fit h-fit absolute bg-white shadow-lg p-1 rounded-sm z-50',

    variants: {
        placement: {
            "top-start": "bottom-full left-0 -translate-y-[7px]",
            "top": 'bottom-full left-1/2 -translate-y-[7px]',
            "top-end": 'bottom-full right-0 -translate-y-[7px]',
            "bottom-start": 'top-full left-0 translate-y-[7px]',
            "bottom": 'top-full left-1/2 translate-y-[7px]',
            "bottom-end": 'top-full right-0 translate-y-[7px]',
            "left-start": 'right-full top-0 -translate-x-[7px]',
            "left": 'right-full top-1/2 -translate-y-1/2 -translate-x-[7px]',
            "left-end": 'right-full bottom-0 -translate-x-[7px]',
            "right-start": 'left-full top-0 translate-x-[7px]',
            "right": 'left-full top-1/2 -translate-y-1/2 translate-x-[7px]',
            "right-end": 'left-full bottom-0 translate-x-[7px]',
        },

    },

    defaultVariants: {
        placement: 'top-start',
    },
})

type TooltipType = ComponentProps<'div'> & Itooltip & VariantProps<typeof TooltipVariant>

const isValidColor = (color: string): boolean => {
	// Regex patterns for different color formats
	const hexPattern = /^#([0-9A-Fa-f]{3,8})$/;
	const rgbPattern = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
	const rgbaPattern = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0(\.\d+)?|1(\.0+)?)\s*\)$/;
	const hslPattern = /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/;
	const hslaPattern = /^hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*(0(\.\d+)?|1(\.0+)?)\s*\)$/;
	const oklchPattern = /^oklch\(\s*\d+(\.\d+)?\s+\d+(\.\d+)?\s+\d+(\.\d+)?\s*\)$/;
	const oklabPattern = /^oklab\(\s*\d+(\.\d+)?\s+\d+(\.\d+)?\s+\d+(\.\d+)?\s*\)$/;
	const cmykPattern = /^cmyk\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*\)$/;
	// Validate color
	return (
	  hexPattern.test(color) ||
	  rgbPattern.test(color) ||
	  rgbaPattern.test(color) ||
	  hslPattern.test(color) ||
	  hslaPattern.test(color) ||
	  oklchPattern.test(color) ||
	  oklabPattern.test(color) ||
	  cmykPattern.test(color) 
	);
  };

export const Tooltip = forwardRef<HTMLDivElement, TooltipType>(
    ({ className, children, placement = 'top-start', delayOpen = 150, delayHide = 150, content,backgroundColor='#ffffff', ...props }, ref) => {

        const [showTooltip, setShowTooltip] = useState(false)

        const timerRef = useRef<number | null>(null);

        const tooltip = {
            closed: { display: 'none', opacity: 0, translateY:'20px' },
            open: {
                display: 'block',
                opacity: 1,
                translateY:'0px',
                transition: {
                    duration: .250,
                }
            }
        }

        const handleMouseEnter = () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                setShowTooltip(true);
            }, delayOpen);
        };

        const handleMouseLeave = () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                setShowTooltip(false);
            }, delayHide);
        };



        return (
            <div ref={ref} className={"flex items-center justify-center w-full h-full relative "} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {children}

                <motion.div className={TooltipVariant({ placement, className })} style={{backgroundColor:isValidColor(backgroundColor) ? backgroundColor : '#ffffff'}} variants={tooltip} initial='closed' animate={showTooltip ? 'open' : 'closed'}>
                    <span className="whitespace-nowrap">{content}</span>
                </motion.div>
            </div>
        )
    }
)