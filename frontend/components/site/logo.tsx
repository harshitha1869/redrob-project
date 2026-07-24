export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 2.5 27.5 9v14L16 29.5 4.5 23V9L16 2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.35"
      />
      <circle cx="16" cy="16" r="3" fill="currentColor" />
      <circle cx="16" cy="7.5" r="1.7" fill="currentColor" />
      <circle cx="23.5" cy="20" r="1.7" fill="currentColor" />
      <circle cx="8.5" cy="20" r="1.7" fill="currentColor" />
      <path
        d="M16 16 16 7.5M16 16l7.5 4M16 16l-7.5 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
