import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'text'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          // Sizes
          size === 'sm' && 'text-sm px-4 py-2 rounded-lg',
          size === 'md' && 'text-[15px] px-6 py-3 rounded-lg',
          size === 'lg' && 'text-base px-8 py-4 rounded-lg',
          // Variants
          variant === 'primary' && [
            'bg-accent text-white',
            'hover:bg-accent-hover hover:scale-[1.02]',
            'active:bg-accent-active active:scale-[1]',
          ],
          variant === 'ghost' && [
            'bg-transparent border border-border text-text-secondary',
            'hover:border-border-strong hover:text-text',
          ],
          variant === 'text' && [
            'bg-transparent text-accent p-0 rounded-none',
            'hover:underline',
          ],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
