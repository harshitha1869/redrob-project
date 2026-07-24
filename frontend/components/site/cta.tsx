import { Reveal } from '@/components/site/reveal'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Cta() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center sm:px-12">
            <div className="absolute inset-0 grid-bg opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <div className="pointer-events-none absolute left-1/2 top-0 size-[400px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
            <div className="relative">
              <h2 className="font-heading mx-auto max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Stop guessing. Start getting interviews.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
                Run your first analysis free and see exactly how to make your resume impossible to ignore.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" className="glow-primary group h-12 px-6 text-base">
                  Analyze my resume
                  <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="secondary" className="h-12 px-6 text-base">
                  Book a demo
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
