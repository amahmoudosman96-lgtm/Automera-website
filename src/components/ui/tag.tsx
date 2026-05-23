import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface TagProps extends HTMLAttributes<HTMLSpanElement> {}

export function Tag({ className, children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center bg-accent-light text-accent-text text-xs font-medium px-2.5 py-1 rounded-full',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
