export default function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  return (
    <div data-reveal className="mb-14 max-w-3xl">
      <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-subtle">
        <span className="text-accent">{index}</span>
        <span className="draw-line h-px w-10 bg-gradient-to-r from-accent to-line-strong" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl">
        {title} {accent && <span className="font-serif font-normal italic text-gradient">{accent}</span>}
      </h2>
      {description && <p className="mt-5 text-base leading-7 text-muted sm:text-lg">{description}</p>}
    </div>
  );
}
