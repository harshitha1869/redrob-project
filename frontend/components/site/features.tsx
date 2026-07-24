import { Reveal } from '@/components/site/reveal'
import { Gauge, Network, UserSearch, GitCompareArrows, Wand2, KeyRound } from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: Gauge,
    title: 'ATS Compatibility Scoring',
    desc: 'Get a precise 0–100 score modeled on real applicant tracking systems, with line-by-line parse diagnostics.',
    className: 'lg:col-span-2',
    accent: 'primary',
  },
  {
    icon: Network,
    title: 'Semantic Matching',
    desc: 'Embedding-based comparison of your resume against the job description — beyond simple keyword overlap.',
    accent: 'accent',
  },
  {
    icon: UserSearch,
    title: 'Recruiter Insights',
    desc: 'See how a hiring manager reads your profile in the first 7 seconds.',
    accent: 'success',
  },
  {
    icon: GitCompareArrows,
    title: 'Skill-Gap Analysis',
    desc: 'Identify the exact missing skills and certifications standing between you and the role.',
    accent: 'primary',
  },
  {
    icon: Wand2,
    title: 'AI Improvement Recommendations',
    desc: 'One-click rewrites for bullet points, summaries and impact statements — tuned to the target job.',
    className: 'lg:col-span-2',
    accent: 'accent',
  },
]

const accentMap: Record<string, string> = {
  primary: 'text-primary bg-primary/10 ring-primary/20',
  accent: 'text-accent bg-accent/10 ring-accent/20',
  success: 'text-success bg-success/10 ring-success/20',
}

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-medium text-accent">Capabilities</p>
          <h2 className="font-heading mt-3 max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything you need to beat the bots and impress humans
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
            A complete intelligence layer that reads your resume the way both machines and recruiters do.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06} className={cn(f.className)}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
                <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div
                  className={cn(
                    'inline-flex size-11 items-center justify-center rounded-xl ring-1',
                    accentMap[f.accent],
                  )}
                >
                  <f.icon className="size-5" />
                </div>
                <h3 className="font-heading mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-border bg-secondary/30 p-6">
              <div
                className={cn(
                  'inline-flex size-11 items-center justify-center rounded-xl ring-1',
                  accentMap.success,
                )}
              >
                <KeyRound className="size-5" />
              </div>
              <div className="mt-5">
                <h3 className="font-heading text-lg font-semibold">Keyword Optimization</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Surface the high-signal keywords recruiters filter for, ranked by impact.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
