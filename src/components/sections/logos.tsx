// Placeholder client logos — swap with real SVG logos later
const logos = [
  { name: 'Acme Corp', width: 80 },
  { name: 'NovaTech', width: 90 },
  { name: 'FlowOps', width: 70 },
  { name: 'DataBridge', width: 95 },
  { name: 'Synapse', width: 75 },
]

export function Logos() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 border-y border-border">
      <div className="max-w-[1140px] mx-auto">
        <p className="text-xs font-semibold tracking-[0.08em] uppercase text-muted text-center mb-8">
          Trusted by teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="opacity-60 hover:opacity-100 transition-opacity duration-200 grayscale"
              style={{ width: logo.width }}
            >
              {/* Placeholder logo — grey pill with name */}
              <div className="h-7 bg-border rounded flex items-center justify-center px-3">
                <span className="text-xs font-semibold text-muted tracking-wide">{logo.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
