import * as Accordion from '@radix-ui/react-accordion';

export function FaqAccordion(props: { items: Array<{ question: string; answer: string }> }) {
  return (
    <Accordion.Root type="single" collapsible className="space-y-3">
      {props.items.map((x, idx) => (
        <Accordion.Item
          key={x.question}
          value={String(idx)}
          className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/35 shadow-[0_16px_48px_-42px_rgba(24,24,27,0.45)] ring-1 ring-black/[0.025] transition-colors data-[state=open]:border-emerald-200/60 data-[state=open]:bg-white data-[state=open]:shadow-[0_22px_65px_-38px_rgba(24,24,27,0.22)] data-[state=open]:ring-emerald-500/12"
        >
          <Accordion.Header className="m-0">
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-emerald-500/[0.04]">
              <span className="text-sm font-semibold leading-snug text-zinc-900">{x.question}</span>
              <span
                aria-hidden
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-zinc-200/90 bg-white text-zinc-600 shadow-[0_8px_22px_-18px_rgba(24,24,27,0.45)] transition-all group-data-[state=open]:rotate-45 group-data-[state=open]:border-emerald-200/65 group-data-[state=open]:bg-emerald-50/50 group-data-[state=open]:text-emerald-900"
              >
                +
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="border-t border-zinc-100/90 px-6 pb-6 pt-4 text-sm leading-relaxed text-zinc-600">
              {x.answer}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

