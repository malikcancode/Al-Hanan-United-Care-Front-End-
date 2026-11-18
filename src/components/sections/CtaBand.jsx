import Link from "next/link";
import Icon from "@/components/ui/Icon";

export default function CtaBand({ title = "Ready to speak with a doctor?", whatsapp }) {
  return (
    <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-brand-800 px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-14 lg:py-14">
          <div className="max-w-xl">
            <h2 className="text-[1.75rem] font-semibold text-white sm:text-4xl">{title}</h2>
            <p className="mt-3 text-lg text-white/75">
              Send a request and we will confirm your appointment by phone or WhatsApp.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <Link href="/book" className="btn-light">
              Book appointment <Icon name="arrow" className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} />
            </Link>
            {whatsapp && (
              <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" className="btn-ghost-light">
                <Icon name="message" className="h-5 w-5" /> WhatsApp us
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
