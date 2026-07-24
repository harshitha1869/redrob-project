'use client'

import { Reveal } from '@/components/site/reveal'
import { motion } from 'motion/react'
import { CheckCircle2, MessageSquareText } from 'lucide-react'

const recruiters = [
  {
    name: 'Ava Chen',
    role: 'Tech Recruiter · FAANG',
    initials: 'AC',
    verdict: 'Strong fit',
    score: 91,
    note: 'Impact metrics are clear and the React depth maps directly to the role. Recommend interview.',
    color: 'var(--chart-1)',
  },
  {
    name: 'Marcus Reed',
    role: 'Engineering Manager',
    initials: 'MR',
    verdict: 'Promising',
    score: 78,
    note: 'Solid breadth. Would like to see more system-design ownership at scale highlighted up top.',
    color: 'var(--chart-2)',
  },
  {
    name: 'Sofia Alvarez',
    role: 'Talent Partner · Startup',
    initials: 'SA',
    verdict: 'Strong fit',
    score: 88,
    note: 'Great narrative and quantified results. Add the missing cloud keywords and this is a top pick.',
    color: 'var(--chart-3)',
  },
]

export function RecruiterPanel() {
  return (
    <section className="relative border-t border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-medium text-accent">AI Recruiter Panel</p>
          <h2 className="font-heading mt-3 max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            A panel of AI recruiters evaluates your resume
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
            Each persona reviews your profile from a different hiring lens and returns candid, role-specific
            feedback — just like a real hiring committee.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {recruiters.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex size-11 items-center justify-center rounded-full font-heading text-sm font-semibold text-background"
                    style={{ background: r.color }}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.role}</p>
                  </div>
                  <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                    <CheckCircle2 className="size-3.5" />
                    {r.verdict}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Evaluation score</span>
                    <span className="font-medium">{r.score}/100</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: r.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${r.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex gap-2 rounded-xl border border-border bg-background/50 p-3">
                  <MessageSquareText className="size-4 shrink-0 text-accent" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{r.note}</p>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="flex gap-1">
                    <motion.span
                      className="size-1.5 rounded-full bg-accent"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                    />
                    <motion.span
                      className="size-1.5 rounded-full bg-accent"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.span
                      className="size-1.5 rounded-full bg-accent"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                    />
                  </span>
                  Analysis complete
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
