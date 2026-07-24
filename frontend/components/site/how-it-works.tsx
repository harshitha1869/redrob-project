import { Reveal } from '@/components/site/reveal'
import { Upload, ClipboardPaste, BrainCircuit, Users, FileDown } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    step: 'Step 1',
    title: 'Upload Resume',
    desc: 'Drop in your PDF or DOCX. We parse structure, sections and formatting instantly.',
  },
  {
    icon: ClipboardPaste,
    step: 'Step 2',
    title: 'Paste Job Description',
    desc: 'Add the target role. TalentMind aligns your profile to its exact requirements.',
  },
  {
    icon: BrainCircuit,
    step: 'Step 3',
    title: 'AI Analysis',
    desc: 'Our engine scores ATS compatibility, semantic match and skill gaps in seconds.',
  },
  {
    icon: Users,
    step: 'Step 4',
    title: 'Recruiter Evaluation',
    desc: 'A panel of AI recruiters reviews your resume and returns candid, role-specific feedback.',
  },
  {
    icon: FileDown,
    step: 'Step 5',
    title: 'Download Report',
    desc: 'Export a polished report with scores, fixes and an optimized resume draft.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="relative border-t border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-medium text-accent">Workflow</p>
          <h2 className="font-heading mt-3 max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            From upload to offer-ready in five steps
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="relative">
                  <div className="relative z-10 inline-flex size-14 items-center justify-center rounded-2xl border border-border bg-card text-primary shadow-lg shadow-primary/5">
                    <s.icon className="size-6" />
                    <span className="absolute -right-2 -top-2 inline-flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {i + 1}
                    </span>
                  </div>
                  <p className="mt-5 text-xs font-medium uppercase tracking-wider text-accent">{s.step}</p>
                  <h3 className="font-heading mt-1 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
