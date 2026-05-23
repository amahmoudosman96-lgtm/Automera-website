import { cn } from '@/lib/utils'

interface ProcessStepProps {
  number: number
  title: string
  description: string
  isLast?: boolean
  className?: string
}

export function ProcessStep({ number, title, description, isLast = false, className }: ProcessStepProps) {
  return (
    <div className={cn('flex flex-col md:flex-row gap-4 md:gap-6 items-start', className)}>
      {/* Number + connector */}
      <div className="flex flex-row md:flex-col items-center gap-2 md:gap-0 shrink-0">
        <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0">
          {number}
        </div>
        {!isLast && (
          <div className="flex-1 md:hidden h-px w-12 bg-border" />
        )}
        {!isLast && (
          <div className="hidden md:block w-px h-8 bg-border mt-2 mx-auto" />
        )}
      </div>
      {/* Content */}
      <div className="flex flex-col gap-1 pb-8 md:pb-0">
        <h3 className="text-xl font-semibold text-text">{title}</h3>
        <p className="text-base text-muted leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
