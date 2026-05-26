import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  subtext?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  eyebrow,
  heading,
  subtext,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs font-medium tracking-[0.08em] uppercase text-muted font-mono">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-text tracking-tight leading-tight">
        {heading}
      </h2>
      {subtext && (
        <p
          className={cn(
            'text-lg text-muted leading-relaxed',
            align === 'center' ? 'max-w-[560px]' : 'max-w-[560px]'
          )}
        >
          {subtext}
        </p>
      )}
    </div>
  )
}
