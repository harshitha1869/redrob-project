'use client'

import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, FileText, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import Link from "next/link";

const HeroScene = dynamic(() => import('@/components/site/hero-scene').then((m) => m.HeroScene), {
  ssr: false,
})

const stats = [
  { value: '98%', label: 'ATS pass rate' },
  { value: '2.4x', label: 'More interviews' },
  { value: '40k+', label: 'Resumes analyzed' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-28 sm:pt-36">
      {/* background layers */}
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-40 size-[420px] rounded-full bg-accent/15 blur-[120px]" />

      {/* 3D scene */}
      <div className="pointer-events-none absolute right-[-10%] top-10 hidden h-[560px] w-[680px] opacity-90 lg:block">
        <HeroScene />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <Sparkles className="size-3.5 text-accent" />
            AI Resume Intelligence Engine v3
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-heading mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient">AI-Powered Resume Intelligence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            Upload your resume and a job description to receive ATS scoring, semantic matching, recruiter
            insights, skill-gap analysis and AI-powered improvement recommendations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/analyze">
  <Button size="lg" className="glow-primary group h-12 px-6 text-base">
    Analyze my resume
    <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
  </Button>
</Link>
            <Button size="lg" variant="secondary" className="h-12 px-6 text-base">
              <FileText className="mr-1 size-4" />
              See a sample report
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <ShieldCheck className="size-4 text-success" />
            Private &amp; encrypted — your data is never used to train models.
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 grid max-w-md grid-cols-3 gap-6"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-heading text-3xl font-semibold text-foreground">{s.value}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  )
}
