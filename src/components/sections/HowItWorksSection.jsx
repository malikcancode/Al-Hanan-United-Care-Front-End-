import { STEPS } from "@/config/navigation";

export default function HowItWorksSection({ showHeading = true }) {
  return (
    <section id="how-it-works" className="section bg-sand">
      <div className="container-page">
        {showHeading && (
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">How an online visit works</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              No travel and no waiting room. Three steps from request to care plan.
            </p>
          </div>
        )}

        <ol className={`relative grid gap-10 md:grid-cols-3 md:gap-8 ${showHeading ? "mt-12 lg:mt-16" : ""}`}>
          {/* Connecting rule between the step markers */}
          <span
            className="absolute top-5 right-[16%] left-[16%] hidden h-px bg-line-strong md:block"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 md:block md:text-center">
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-white font-display text-lg font-semibold text-brand-700 tabular-nums md:mx-auto">
                {i + 1}
              </span>
              <div>
                <h3 className="font-sans text-lg font-semibold tracking-normal md:mt-5">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted md:mx-auto md:max-w-[17rem]">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
