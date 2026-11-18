export default function PageHeader({ title, description, children }) {
  return (
    <section className="border-b border-line bg-canvas">
      <div className="container-page py-12 sm:py-16 lg:py-20">
        <h1 className="max-w-3xl text-[2.25rem] font-semibold sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{description}</p>}
        {children}
      </div>
    </section>
  );
}
