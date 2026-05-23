'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes } from 'react'

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? 'automera'

interface CalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function CalButton({ className, variant = 'primary', size = 'md', children, ...props }: CalButtonProps) {
  return (
    <button
      data-cal-link={CAL_LINK}
      data-cal-namespace="automera"
      data-cal-config='{"layout":"month_view"}'
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        size === 'sm' && 'text-sm px-4 py-2 rounded-lg',
        size === 'md' && 'text-[15px] px-6 py-3 rounded-lg',
        size === 'lg' && 'text-base px-8 py-4 rounded-lg',
        variant === 'primary' && 'bg-accent text-white hover:bg-accent-hover hover:scale-[1.02] active:bg-accent-active',
        variant === 'ghost' && 'bg-transparent border border-border text-text-secondary hover:border-border-strong hover:text-text',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
