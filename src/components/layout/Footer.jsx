import Link from "next/link";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import { NAV_LINKS } from "@/config/navigation";

export default function Footer({ siteName, links = {} }) {
  const contact = [
    links.phone && { icon: "phone", ...links.phone },
    links.whatsapp && { icon: "message", ...links.whatsapp, external: true },
    links.email && { icon: "mail", ...links.email },
  ].filter(Boolean);

  return (
    <footer className="bg-brand-900 text-white/75">
      <div className="container-page grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10 lg:py-16">
        <div className="max-w-sm sm:col-span-2 lg:col-span-1">
          <Logo name={siteName} tone="light" size={64} />
          <p className="mt-5 text-[0.9375rem] leading-relaxed">
            Consultations, prescriptions and follow-ups with our doctors, from wherever you are.
          </p>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold text-white">Clinic</h2>
          <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book" className="hover:text-white hover:underline">
                Book appointment
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold text-white">Contact</h2>
          {contact.length ? (
            <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
              {contact.map((c) => (
                <li key={c.icon}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-2.5 [overflow-wrap:anywhere] hover:text-white hover:underline"
                  >
                    <Icon name={c.icon} className="h-4 w-4 text-brand-200" />
                    <span className="tabular-nums">{c.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-[0.9375rem]">Contact details coming soon.</p>
          )}
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold text-white">Visit &amp; hours</h2>
          <ul className="mt-4 space-y-3 text-[0.9375rem]">
            {links.address && (
              <li className="flex gap-2.5">
                <Icon name="pin" className="mt-1 h-4 w-4 text-brand-200" />
                <span className="whitespace-pre-line">{links.address}</span>
              </li>
            )}
            {links.hours && (
              <li className="flex gap-2.5">
                <Icon name="clock" className="mt-1 h-4 w-4 text-brand-200" />
                <span className="whitespace-pre-line">{links.hours}</span>
              </li>
            )}
            {!links.address && !links.hours && <li>Opening hours coming soon.</li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p className="flex items-start gap-2">
            <Icon name="alert" className="mt-0.5 h-4 w-4 text-white/70" />
            Online consultations are not for emergencies. In an emergency, go to the nearest hospital or call
            your local emergency number.
          </p>
          <p className="shrink-0">
            © {siteName}
          </p>
        </div>
      </div>
    </footer>
  );
}
