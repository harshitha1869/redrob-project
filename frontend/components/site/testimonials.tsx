import { Reveal } from '@/components/site/reveal'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      'I went from zero callbacks to four interviews in two weeks. The skill-gap report told me exactly what to fix.',
    name: 'Priya Nair',
    role: 'Senior Frontend Engineer',
    initials: 'PN',
  },
  {
    quote:
      'The recruiter panel feedback felt eerily accurate. It caught weak bullet points I had read a hundred times.',
    name: 'David Okafor',
    role: 'Product Manager',
    initials: 'DO',
  },
  {
    quote:
      'Our outplacement team uses TalentMind for every candidate now. ATS scores jumped an average of 30 points.',
    name: 'Hannah Weiss',
    role: 'Career Coach',
    initials: 'HW',
  },
  {
    quote:
      'Semantic matching is the real deal — it understood my experience even when I used different wording.',
    name: 'Liam Carter',
    role: 'Data Scientist',
    initials: 'LC',
  },
]

export function Testimonials() {
  return (
    <section className="relative border-t border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-medium text-accent">Loved by job seekers</p>
          <h2 className="font-heading mt-3 max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Resumes that get read, candidates that get hired
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 fill-accent" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-pretty text-lg leading-relaxed">
                  {`"${t.quote}"`}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-secondary font-heading text-sm font-semibold">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
