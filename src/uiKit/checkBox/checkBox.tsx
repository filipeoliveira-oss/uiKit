import { ComponentProps, forwardRef } from "react"
import { tv, VariantProps } from "tailwind-variants"
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

interface props {
	value: boolean,
	setValue: (e: boolean | ((prev: boolean) => boolean)) => void,
	falseAccentColor?: colors ,
	trueAccentColor?: colors ,
	disabledAnimation?: boolean,
	animationDuration?: number,
	size?:number
}


const checkboxVariants = tv({
	base: ' border border-zinc-400 cursor-pointer flex flex-row gap-2 items-center justify-center',
	variants: {
		format: {
			square: 'rounded-md',
			rounded: 'rounded-full'
		}
	},

	defaultVariants: {
		format: 'square'
	}
})


type checkboxType = ComponentProps<'div'> & props & VariantProps<typeof checkboxVariants>


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

const Checkbox = forwardRef<HTMLDivElement, checkboxType>(
	({ className, setValue, value, format, falseAccentColor = '#FE0000', trueAccentColor = '#00CC44', disabledAnimation = false, animationDuration = 0.5, size=32 }, ref) => {


		const animation = {
			hidden: {
				pathLength: 0,
				opacity: 1,
				transition: {
					duration: disabledAnimation ? 0 : animationDuration
				}
			},
			show: {
				pathLength: 1,
				opacity: 1,
				transition: {
					duration: disabledAnimation ? 0 : animationDuration
				}
			}

		}

		function X() {
			return (
				<motion.svg xmlns="http://www.w3.org/2000/svg" width='80%' height='80%' viewBox="0 0 24 24" fill="none" stroke={isValidColor(falseAccentColor) ? falseAccentColor : '#FE0000'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<motion.path d="M18 6 6 18" variants={animation} initial='hidden' animate={value === false ? 'show' : 'hidden'} />
					<motion.path d="m6 6 12 12" variants={animation} initial='hidden' animate={value === false ? 'show' : 'hidden'} />
				</motion.svg>
			)
		}

		function Check() {
			return (
				<svg xmlns="http://www.w3.org/2000/svg" width='80%' height='80%' viewBox="0 0 24 24" fill="none" stroke={isValidColor(trueAccentColor) ? trueAccentColor : '#00CC44'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
					<motion.path d="M20 6 9 17l-5-5" variants={animation} initial='hidden' animate={value === true ? 'show' : 'hidden'} />
				</svg>
			)
		}

		const style = {
			width:`${size}px`,
			height:`${size}px`
		}

		return (
			<div ref={ref} className={checkboxVariants({ format, className:`${className}` })} onClick={() => setValue((prev: boolean) => !prev)} style={style}>
				{value === true ? <Check /> : <X />}
			</div>
		)
	}
)

export default Checkbox
