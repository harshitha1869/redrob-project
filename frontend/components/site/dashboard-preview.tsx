'use client'

import { Reveal } from '@/components/site/reveal'
import { ChartBox } from '@/components/site/chart-box'
import { TrendingUp, Target, AlertTriangle, CheckCircle2 } from 'lucide-react'
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Radar,
  RadarChart,
  PolarGrid,
  PolarRadiusAxis,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from 'recharts'

const COLORS = {
  primary: '#4b7bff',
  accent: '#34d6c6',
  success: '#34d68a',
  track: '#2a2f3d',
  border: 'rgba(255,255,255,0.12)',
  muted: '#9aa3b2',
}

const scoreData = [{ name: 'score', value: 87, fill: COLORS.primary }]

const radarData = [
  { skill: 'React', you: 90, role: 80 },
  { skill: 'TypeScript', you: 85, role: 90 },
  { skill: 'System Design', you: 60, role: 85 },
  { skill: 'Leadership', you: 75, role: 70 },
  { skill: 'Cloud', you: 55, role: 80 },
  { skill: 'Testing', you: 70, role: 65 },
]

const trendData = [
  { week: 'v1', score: 52 },
  { week: 'v2', score: 61 },
  { week: 'v3', score: 70 },
  { week: 'v4', score: 78 },
  { week: 'v5', score: 87 },
]

const cards = [
  { icon: Target, label: 'Match Score', value: '87%', sub: '+22% after fixes', accent: 'text-primary' },
  { icon: CheckCircle2, label: 'Skills Matched', value: '18 / 24', sub: 'Strong alignment', accent: 'text-success' },
  { icon: AlertTriangle, label: 'Missing Keywords', value: '6', sub: 'Add to boost score', accent: 'text-accent' },
  { icon: TrendingUp, label: 'Interview Odds', value: 'High', sub: 'Top 12% of applicants', accent: 'text-primary' },
]

export function DashboardPreview() {
  return (
    <section id="dashboard" className="relative border-t border-border/60 py-24">
      <div className="pointer-events-none absolute left-1/2 top-20 size-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[160px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-medium text-accent">Live Dashboard</p>
          <h2 className="font-heading mt-3 max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Your resume, fully decoded
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-card/60 p-4 backdrop-blur sm:p-6">
            {/* window chrome */}
            <div className="flex items-center gap-2 px-2 pb-4">
              <span className="size-3 rounded-full bg-destructive/70" />
              <span className="size-3 rounded-full bg-accent/70" />
              <span className="size-3 rounded-full bg-success/70" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">
                talentmind.ai/report/senior-frontend-engineer
              </span>
            </div>

            {/* stat cards */}
            <div className="grid gap-4 md:grid-cols-4">
              {cards.map((c) => (
                <div key={c.label} className="rounded-xl border border-border bg-background/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{c.label}</span>
                    <c.icon className={`size-4 ${c.accent}`} />
                  </div>
                  <p className="font-heading mt-3 text-2xl font-semibold">{c.value}</p>
                  <p className={`mt-1 text-xs ${c.accent}`}>{c.sub}</p>
                </div>
              ))}
            </div>

            {/* charts */}
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-background/60 p-5">
                <h3 className="text-sm font-medium">ATS Score</h3>
                <div className="relative mx-auto h-48 w-full">
                  <ChartBox height={192}>
                    {({ width, height }) => (
                      <RadialBarChart
                        width={width}
                        height={height}
                        innerRadius="72%"
                        outerRadius="100%"
                        data={scoreData}
                        startAngle={90}
                        endAngle={-270}
                      >
                        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                        <RadialBar background={{ fill: COLORS.track }} dataKey="value" cornerRadius={20} />
                      </RadialBarChart>
                    )}
                  </ChartBox>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-heading text-4xl font-semibold">87</span>
                    <span className="text-xs text-success">Excellent</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-background/60 p-5">
                <h3 className="text-sm font-medium">Skill Coverage vs Role</h3>
                <div className="h-48 w-full">
                  <ChartBox height={192}>
                    {({ width, height }) => (
                      <RadarChart width={width} height={height} data={radarData} outerRadius="72%">
                        <PolarGrid stroke={COLORS.border} />
                        <PolarAngleAxis dataKey="skill" tick={{ fill: COLORS.muted, fontSize: 10 }} />
                        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Role" dataKey="role" stroke={COLORS.accent} fill={COLORS.accent} fillOpacity={0.15} />
                        <Radar name="You" dataKey="you" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.4} />
                      </RadarChart>
                    )}
                  </ChartBox>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-background/60 p-5">
                <h3 className="text-sm font-medium">Score Improvement</h3>
                <div className="h-48 w-full">
                  <ChartBox height={192}>
                    {({ width, height }) => (
                      <AreaChart width={width} height={height} data={trendData} margin={{ top: 16, right: 8, left: 8, bottom: 0 }}>
                        <defs>
                          <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.5} />
                            <stop offset="100%" stopColor={COLORS.primary} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="week"
                          tick={{ fill: COLORS.muted, fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            background: '#161922',
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: 12,
                            color: '#fff',
                            fontSize: 12,
                          }}
                          cursor={{ stroke: COLORS.border }}
                        />
                        <Area
                          type="monotone"
                          dataKey="score"
                          stroke={COLORS.primary}
                          strokeWidth={2}
                          fill="url(#scoreFill)"
                        />
                      </AreaChart>
                    )}
                  </ChartBox>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
