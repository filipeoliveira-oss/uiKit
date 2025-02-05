import { forwardRef, type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'


const button = tv({
  base: 'flex items-center justify-center gap-2 rounded-lg text-sm font-medium tracking-tight outline-none ring-offset-2 ring-offset-black focus-visible:ring-2',

  variants: {
    variant: {
      primary:
        'bg-violet-500 text-white hover:opacity-90 min-w-28 ',
      secondary: 'bg-mauve4 text-mauve11 hover:bg-mauve5 bg-mauve4 min-w-28',
    },

    size: {
      default: 'px-4 py-2.5 text-base min-h-[44px]',
      sm: 'px-3 h-8',
    },

    active:{
      disabled:'bg-violet-500/50 opacity-60 pointer-events-none',
      enabled:''
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
    active:'enabled'
  },
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, active, type = 'button', ...props }, ref) => {
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
