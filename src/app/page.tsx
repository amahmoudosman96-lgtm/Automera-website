import { Hero } from '@/components/sections/hero'
import { Logos } from '@/components/sections/logos'
import { Services } from '@/components/sections/services'
import { Process } from '@/components/sections/process'
import { CasesPreview } from '@/components/sections/cases-preview'
import { Why } from '@/components/sections/why'
import { Team } from '@/components/sections/team'
import { Testimonials } from '@/components/sections/testimonials'
import { Faq } from '@/components/sections/faq'
import { Cta } from '@/components/sections/cta'
import { ContactForm } from '@/components/sections/contact-form'

export default function Home() {
  return (
    <>
      <Hero />
      <Logos />
      <Services />
      <Process />
      <CasesPreview />
      <Why />
      <Team />
      <Testimonials />
      <Faq />
      <Cta />
      <ContactForm />
    </>
  )
}
