import { Reveal } from '@/components/site/reveal'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/forever',
    desc: 'Try the core analysis on a single resume.',
    features: ['1 resume analysis', 'ATS compatibility score', 'Basic keyword check', 'PDF report'],
    cta: 'Get started',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    desc: 'For active job seekers who want every edge.',
    features: [
      'Unlimited analyses',
      'Semantic matching engine',
      'AI recruiter panel',
      'Skill-gap analysis',
      'One-click AI rewrites',
      'Priority report export',
    ],
    cta: 'Start 7-day trial',
    featured: true,
  },
  {
    name: 'Teams',
    price: '$49',
    period: '/seat',
    desc: 'For coaches and career-services teams.',
    features: ['Everything in Pro', 'Up to 25 seats', 'Shared candidate workspace', 'Analytics dashboard', 'Dedicated support'],
    cta: 'Contact sales',
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="relative border-t border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-medium text-accent">Pricing</p>
            <h2 className="font-heading mx-auto mt-3 max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Simple plans that pay for themselves
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
              One interview is worth far more than a month of TalentMind. Cancel anytime.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div
                className={cn(
                  'relative flex h-full flex-col rounded-2xl border p-6',
                  p.featured ? 'glow-primary border-primary/50 bg-card' : 'border-border bg-card',
                )}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most popular
                  </span>
                )}
                <h3 className="font-heading text-lg font-semibold">{p.name}</h3>
                <div className="mt-4 flex items-end gap-1">
                  <span className="font-heading text-4xl font-semibold">{p.price}</span>
                  <span className="mb-1 text-sm text-muted-foreground">{p.period}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                <Button
                  className={cn('mt-6 w-full', !p.featured && 'bg-secondary text-secondary-foreground hover:bg-secondary/80')}
                >
                  {p.cta}
                </Button>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
