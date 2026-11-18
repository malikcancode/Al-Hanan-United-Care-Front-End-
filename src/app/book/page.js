import PageHeader from "@/components/sections/PageHeader";
import AppointmentForm from "@/components/forms/AppointmentForm";
import Icon from "@/components/ui/Icon";
import { getServices } from "@/services/serviceService";
import { getSettings } from "@/services/settingService";
import { contactLinks } from "@/config/contact";
import { STEPS } from "@/config/navigation";

export const metadata = { title: "Book online" };

export default async function BookPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);
  const links = contactLinks(settings);

  return (
    <>
      <PageHeader
        title="Request an appointment"
        description="Fill in your details and we will confirm your time by phone or WhatsApp."
      />
      <section className="bg-white py-10 sm:py-14 lg:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_30rem] lg:gap-16 xl:gap-24">
          {/* Form first on phones, beside the steps on desktop */}
          <div className="lg:order-2">
            <AppointmentForm services={services} title="Your details" />
          </div>

          <div className="lg:order-1 lg:pt-2">
            <h2 className="text-2xl font-semibold sm:text-[1.75rem]">What happens next</h2>
            <ol className="mt-8 space-y-0">
              {STEPS.map((step, i) => (
                <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < STEPS.length - 1 && (
                    <span className="absolute top-10 bottom-0 left-5 w-px bg-line-strong" aria-hidden="true" />
                  )}
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-white font-display text-lg font-semibold text-brand-700 tabular-nums">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="font-sans text-lg font-semibold tracking-normal">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            {(links.whatsapp || links.phone) && (
              <div className="mt-10 border-t border-line pt-8">
                <p className="font-semibold">Rather talk to someone?</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {links.whatsapp && (
                    <a href={links.whatsapp.href} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                      <Icon name="message" className="h-5 w-5 text-brand-600" /> WhatsApp
                    </a>
                  )}
                  {links.phone && (
                    <a href={links.phone.href} className="btn-secondary">
                      <Icon name="phone" className="h-5 w-5 text-brand-600" />
                      <span className="tabular-nums">{links.phone.label}</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="mt-10 flex gap-3 rounded-xl border border-warn-line bg-warn-bg p-4 text-[0.9375rem] text-warn-ink">
              <Icon name="alert" className="mt-0.5 h-5 w-5" />
              <p>
                Online consultations are not for emergencies. In an emergency, go to the nearest hospital or call
                your local emergency number.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
