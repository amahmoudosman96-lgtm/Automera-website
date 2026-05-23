import { SectionHeader } from '@/components/ui/section-header'

const team = [
  {
    name: 'Ali Osman',
    role: 'Founder & Lead Engineer',
    bio: 'Builds AI and automation systems for SMB teams. Previously scaled ops at a Series B startup.',
  },
  {
    name: 'Team Member',
    role: 'Automation Specialist',
    bio: 'Expert in no-code and low-code tooling. Obsessed with shaving minutes off repetitive workflows.',
  },
  {
    name: 'Team Member',
    role: 'Data Engineer',
    bio: 'Designs and ships data pipelines from prototype to production. Strong opinions about schema design.',
  },
]

export function Team() {
  return (
    <section id="team" className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1140px] mx-auto flex flex-col gap-12">
        <SectionHeader
          eyebrow="The team"
          heading="People who actually build it"
          subtext="A small, focused team. Everyone who talks to you also writes the code."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div
              key={member.name + member.role}
              className="flex flex-col gap-4"
            >
              {/* Avatar placeholder */}
              <div
                className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="text-2xl font-bold text-muted">
                  {member.name.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold text-text">{member.name}</h3>
                <p className="text-sm font-medium text-accent">{member.role}</p>
                <p className="text-sm text-muted leading-relaxed mt-1">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
