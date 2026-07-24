import { Logo } from '@/components/site/logo'

const groups = [
  {
    title: 'Product',
    links: ['Features', 'Dashboard', 'Pricing', 'Changelog', 'Integrations'],
  },
  {
    title: 'Resources',
    links: ['Resume guide', 'ATS tips', 'Blog', 'Help center', 'API docs'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Privacy', 'Terms', 'Contact'],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5">
              <Logo className="size-7 text-primary" />
              <span className="font-heading text-lg font-semibold tracking-tight">TalentMind AI</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              AI-powered resume intelligence that helps you beat the bots and impress recruiters.
            </p>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="text-sm font-semibold">{g.title}</h3>
              <ul className="mt-4 space-y-3">
                {g.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} TalentMind AI, Inc. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Built for job seekers, everywhere.</p>
        </div>
      </div>
    </footer>
  )
}
