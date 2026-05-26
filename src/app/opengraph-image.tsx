import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Automera — AI automation, built to ship.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#FFFFFF',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle grid backdrop */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            opacity: 0.35,
          }}
        />

        {/* Top row: orbit mark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, zIndex: 1 }}>
          <svg width="80" height="80" viewBox="0 0 104 104">
            <path
              d="M63.66 70.66A22 22 0 1 1 73.99 52.77"
              fill="none"
              stroke="#2563EB"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path d="M82.6 50.07L73.61 63.76L65.61 49.47Z" fill="#2563EB" />
            <circle cx="52" cy="52" r="6" fill="#1E3A8A" />
          </svg>
          <span style={{ fontSize: 56, fontWeight: 600, color: '#111827', letterSpacing: -1 }}>
            automera
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, zIndex: 1 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              color: '#111827',
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            AI automation,{' '}
            <span style={{ color: '#2563EB' }}>built to ship.</span>
          </div>
          <div style={{ fontSize: 30, color: '#6B7280', maxWidth: 900 }}>
            Custom AI workflows, agents, and data pipelines for SMB teams. You own the code.
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
            fontSize: 22,
            color: '#6B7280',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          <span>automera.co</span>
          <span>UK · MENA</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
