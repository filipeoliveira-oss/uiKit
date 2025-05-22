import { forwardRef, type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'


const button =  tv({
  base: 'flex items-center justify-center gap-2 rounded-lg text-sm font-medium tracking-tight outline-none ring-offset-2 ring-offset-black focus-visible:ring-2',

  variants: {
    variant: {
      primary:
        ' text-white hover:opacity-95 min-w-28 bg-purple-500 hover:bg-purple-400',
      secondary: 'bg-zinc-400 hover:bg-zinc-300 text-mauve11  min-w-28',
    },

    size: {
      default: 'px-4 py-2.5 text-base h-[44px]',
      sm: 'px-3 h-8',
    },

    active:{
      disabled:'opacity-60 pointer-events-none cursor-auto',
      enabled:'cursor-pointer'
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
    active:'enabled'
  },
})

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type HSL = `hsl(${number}, ${number}%, ${number}%)`;
type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`;
type OKLCH = `oklch(${number} ${number} ${number})`;
type OKLAB = `oklab(${number} ${number} ${number})`;
type CMYK = `cmyk(${number}%, ${number}%, ${number}%, ${number}%)`;

interface props{
  backgroundColor?: RGB | RGBA | HEX | HSL | HSLA | OKLCH | OKLAB | CMYK ;
}

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button> & props

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, active, type = 'button', ...props }, ref) => {

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


    return (
      <button
        {...props}
        type={type || 'button'}
        ref={ref}
        className={button({ variant, size, className, active })}
      />
    )
  }
)

Button.displayName = 'Button'
