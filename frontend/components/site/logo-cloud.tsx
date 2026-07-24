const companies = ['Northwind', 'Lumen Labs', 'Hyperscale', 'Vertex', 'Quanta', 'Beacon', 'Helix', 'Cascade']

export function LogoCloud() {
  return (
    <section className="border-y border-border/60 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Trusted by candidates hired at world-class teams
        </p>
        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-14">
            {[...companies, ...companies].map((c, i) => (
              <span
                key={i}
                className="font-heading whitespace-nowrap text-xl font-semibold text-muted-foreground/70"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
