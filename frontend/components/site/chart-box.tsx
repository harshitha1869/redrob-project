'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Measures its own box with a ResizeObserver and only renders children
 * once it has a positive width/height. This avoids Recharts'
 * "width(-1) and height(-1)" warnings that occur when ResponsiveContainer
 * tries to measure before layout has settled.
 */
export function ChartBox({
  height = 192,
  children,
}: {
  height?: number
  children: (size: { width: number; height: number }) => ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0
      setWidth(w)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={ref} className="w-full" style={{ height }}>
      {width > 0 ? children({ width, height }) : null}
    </div>
  )
}
