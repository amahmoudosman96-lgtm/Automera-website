import { Hero } from '@/components/sections/hero'
import { Services } from '@/components/sections/services'
import { Process } from '@/components/sections/process'
import { CasesPreview } from '@/components/sections/cases-preview'
import { Why } from '@/components/sections/why'
import { Testimonials } from '@/components/sections/testimonials'
import { Faq } from '@/components/sections/faq'
import { Cta } from '@/components/sections/cta'
import { ContactForm } from '@/components/sections/contact-form'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <CasesPreview />
      <Why />
      <Testimonials />
      <Faq />
      <Cta />
      <ContactForm />
    </>
  )
}
