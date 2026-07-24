import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { LogoCloud } from '@/components/site/logo-cloud'
import { Features } from '@/components/site/features'
import { HowItWorks } from '@/components/site/how-it-works'
import { DashboardPreview } from '@/components/site/dashboard-preview'
import { RecruiterPanel } from '@/components/site/recruiter-panel'
import { Testimonials } from '@/components/site/testimonials'
import { Pricing } from '@/components/site/pricing'
import { Faq } from '@/components/site/faq'
import { Cta } from '@/components/site/cta'
import { Footer } from '@/components/site/footer'

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <Hero />
      <LogoCloud />
      <Features />
      <HowItWorks />
      <DashboardPreview />
      <RecruiterPanel />
      <Testimonials />
      <Pricing />
      <Faq />
      <Cta />
      <Footer />
    </main>
  )
}
