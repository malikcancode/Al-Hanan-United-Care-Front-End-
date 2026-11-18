import Link from "next/link";
import AppointmentForm from "@/components/forms/AppointmentForm";
import Icon from "@/components/ui/Icon";

const POINTS = [
  "Video consultations from your phone or computer",
  "Digital prescriptions and lab test requests",
  "Your time confirmed by phone or WhatsApp",
];

function Highlight({ children }) {
  return <span className="text-mint">{children}</span>;
}

export default function Hero({ services, whatsapp }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-900 text-white">
      {/* Quiet texture: a field of small crosses, fading toward the form */}
      <svg
        className="absolute inset-0 -z-10 h-full w-full text-white/[0.06] [mask-image:linear-gradient(to_right,black,transparent_85%)]"
        aria-hidden="true"
      >
        <defs>
          <pattern id="hero-cross" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M14 9v10M9 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-cross)" />
      </svg>
      <div
        className="absolute -top-40 right-[-10%] -z-10 h-[36rem] w-[36rem] rounded-full bg-brand-600/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-page grid gap-x-16 gap-y-8 pt-8 pb-12 sm:pt-14 sm:pb-16 lg:grid-cols-[1fr_29rem] lg:grid-rows-[auto_1fr] lg:py-24 xl:gap-x-24">
        {/* Intro: always first */}
        <div className="max-w-xl lg:col-start-1 lg:row-start-1">
          <h1 className="text-[2.125rem] leading-[1.1] font-semibold text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.06]">
            See a doctor <Highlight>from home</Highlight>, with the care of your <Highlight>own clinic</Highlight>.
          </h1>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/75 sm:mt-5 sm:text-lg">
            Al Hanna United Care brings consultations, prescriptions and follow-ups online, so you can get medical
            advice without the travel or the waiting room.
          </p>
        </div>

        {/* Booking form: right after the intro on phones, beside it on desktop */}
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <AppointmentForm services={services} title="Book a consultation" />
        </div>

        {/* Supporting points and secondary actions */}
        <div className="max-w-xl lg:col-start-1 lg:row-start-2">
          <ul className="grid gap-3 sm:gap-3.5">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[0.9375rem] text-white/85 sm:text-base">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint">
                  <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-x-6">
            <Link href="/services" className="btn-ghost-light">
              Explore services
            </Link>
            {whatsapp && (
              <a
                href={whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 font-semibold text-mint underline-offset-4 hover:underline sm:justify-start"
              >
                <Icon name="message" className="h-5 w-5" />
                Ask a question on WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
