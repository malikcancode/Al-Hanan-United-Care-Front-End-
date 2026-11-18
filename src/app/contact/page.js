import Link from "next/link";
import PageHeader from "@/components/sections/PageHeader";
import ContactForm from "@/components/forms/ContactForm";
import Icon from "@/components/ui/Icon";
import { getSettings } from "@/services/settingService";
import { contactLinks } from "@/config/contact";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const links = contactLinks(await getSettings());

  const channels = [
    { icon: "message", label: "WhatsApp", item: links.whatsapp, external: true },
    { icon: "phone", label: "Phone", item: links.phone },
    { icon: "mail", label: "Email", item: links.email },
  ].filter((c) => c.item);

  return (
    <>
      <PageHeader
        title="Get in touch"
        description="Send us a message, reach us by phone or WhatsApp, or visit the clinic during opening hours."
      />

      <section className="bg-white py-10 sm:py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14 xl:grid-cols-[1fr_24rem] xl:gap-20">
          <ContactForm />

          <aside className="space-y-8 lg:pt-2">
            {channels.length > 0 && (
              <div>
                <h2 className="font-sans text-base font-semibold tracking-normal">Prefer to talk?</h2>
                <ul className="mt-3 border-t border-line">
                  {channels.map(({ icon, label, item, external }) => (
                    <li key={label} className="border-b border-line">
                      <a
                        href={item.href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center gap-4 py-4"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                          <Icon name={icon} className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm text-muted">{label}</span>
                          <span className="block truncate font-semibold tabular-nums group-hover:text-brand-700">{item.label}</span>
                        </span>
                        <Icon name="arrow" className="h-[1.125rem] w-[1.125rem] text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand-700" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-5">
              <div className="flex gap-3.5">
                <Icon name="pin" className="mt-0.5 h-5 w-5 text-brand-600" />
                <div>
                  <h3 className="font-sans text-base font-semibold tracking-normal">Address</h3>
                  <p className="mt-0.5 whitespace-pre-line text-muted">{links.address || "To be announced"}</p>
                </div>
              </div>
              <div className="flex gap-3.5">
                <Icon name="clock" className="mt-0.5 h-5 w-5 text-brand-600" />
                <div>
                  <h3 className="font-sans text-base font-semibold tracking-normal">Opening hours</h3>
                  <p className="mt-0.5 whitespace-pre-line text-muted">{links.hours || "To be announced"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-brand-900 p-6 text-white">
              <h2 className="text-xl font-semibold text-white">Want to see a doctor?</h2>
              <p className="mt-1.5 text-[0.9375rem] text-white/75">Skip the message and request an appointment directly.</p>
              <Link href="/book" className="btn-light mt-5 w-full">
                Book appointment
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
