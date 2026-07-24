import { Reveal } from '@/components/site/reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'How does the ATS score work?',
    a: 'We parse your resume the same way real applicant tracking systems do, checking structure, headings, formatting and keyword density, then return a 0–100 compatibility score with specific fixes.',
  },
  {
    q: 'Is my resume data private?',
    a: 'Yes. Your documents are encrypted in transit and at rest, never sold, and never used to train AI models. You can permanently delete your data at any time.',
  },
  {
    q: 'What is semantic matching?',
    a: 'Instead of only counting exact keywords, we use embeddings to understand the meaning behind your experience and the job description, surfacing matches even when the wording differs.',
  },
  {
    q: 'Which file formats are supported?',
    a: 'You can upload PDF and DOCX files. We preserve your structure and flag any elements that ATS software typically struggles to parse.',
  },
  {
    q: 'Can I use TalentMind for multiple jobs?',
    a: 'Absolutely. On the Pro plan you can run unlimited analyses and tailor your resume to each job description for the best possible match.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Pro comes with a 7-day free trial. If you are not satisfied within the first 14 days of a paid plan, contact us for a full refund.',
  },
]

export function Faq() {
  return (
    <section id="faq" className="relative border-t border-border/60 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-medium text-accent">FAQ</p>
            <h2 className="font-heading mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Questions, answered
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion className="mt-12 w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
