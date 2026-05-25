import { cn } from '@/lib/utils'

type Props = {
  className?: string
  ariaLabel?: string
}

export function AutomeraLogo({ className, ariaLabel = 'Automera' }: Props) {
  return (
    <svg
      viewBox="0 0 300 104"
      role="img"
      aria-label={ariaLabel}
      className={cn('h-14 w-auto', className)}
    >
      <title>Automera</title>
      <g
        className="motion-safe:group-hover:[animation:orbit-spin-once_700ms_ease-in-out_1]"
        style={{ transformBox: 'view-box', transformOrigin: '52px 52px' }}
      >
        <path
          d="M63.66 70.66A22 22 0 1 1 73.99 52.77"
          fill="none"
          stroke="#2563EB"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path d="M82.6 50.07L73.61 63.76L65.61 49.47Z" fill="#2563EB" />
        <circle cx="52" cy="52" r="6" fill="#1E3A8A" />
      </g>
      <line
        x1="110"
        y1="30"
        x2="110"
        y2="74"
        stroke="#E5E7EB"
        strokeWidth="1.5"
      />
      <text
        x="198"
        y="47"
        textAnchor="middle"
        fontFamily="var(--font-display), var(--font-inter), system-ui, sans-serif"
        fontSize="27"
        fontWeight="500"
        letterSpacing="-0.5"
        fill="#111827"
      >
        automera
      </text>
      <text
        x="198"
        y="79"
        textAnchor="middle"
        fontFamily="var(--font-cairo), Segoe UI, sans-serif"
        fontSize="23"
        fontWeight="500"
        fill="#374151"
      >
        أوتوميرا
      </text>
    </svg>
  )
}
