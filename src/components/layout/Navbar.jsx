"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import { NAV_LINKS } from "@/config/navigation";

export default function Navbar({ siteName, links = {} }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll and listen for Escape while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
    <header
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-sm transition-shadow duration-200 supports-[backdrop-filter]:bg-white/85 ${
        scrolled || open ? "shadow-[0_1px_0_var(--color-line)]" : ""
      }`}
    >
      {(links.phone || links.hours) && (
        <div className="hidden border-b border-line bg-canvas text-[0.8125rem] text-muted lg:block">
          <div className="container-page flex h-9 items-center justify-between">
            <p>Online consultations are not for emergencies.</p>
            <div className="flex items-center gap-6">
              {links.hours && (
                <span className="flex items-center gap-1.5">
                  <Icon name="clock" className="h-3.5 w-3.5" /> {links.hours.split("\n")[0]}
                </span>
              )}
              {links.phone && (
                <a href={links.phone.href} className="flex items-center gap-1.5 font-medium text-ink-soft hover:text-brand-700">
                  <Icon name="phone" className="h-3.5 w-3.5" />
                  <span className="tabular-nums">{links.phone.label}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Logo name={siteName} onClick={() => setOpen(false)} />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`relative rounded-md px-3 py-2 text-[0.9375rem] font-medium transition-colors lg:px-3.5 ${
                isActive(link.href) ? "text-brand-700" : "text-ink-soft hover:text-ink"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-brand-600 lg:-bottom-[17px] lg:inset-x-3.5" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {links.whatsapp && (
            <a
              href={links.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary hidden !min-h-11 lg:inline-flex"
            >
              <Icon name="message" className="h-[1.125rem] w-[1.125rem] text-brand-600" />
              WhatsApp
            </a>
          )}
          <Link href="/book" className="btn-primary hidden !min-h-11 sm:inline-flex">
            Book appointment
          </Link>

          <button
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-ink hover:bg-canvas md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>

      {/* Sibling of the header: a backdrop-filter parent would trap this fixed panel */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white transition-[opacity,visibility] duration-200 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-page flex flex-col py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`flex items-center justify-between border-b border-line py-4 text-lg font-medium ${
                isActive(link.href) ? "text-brand-700" : "text-ink"
              }`}
            >
              {link.label}
              <Icon name="arrow" className="h-5 w-5 text-muted" />
            </Link>
          ))}

          <div className="mt-6 grid gap-3">
            <Link href="/book" onClick={() => setOpen(false)} className="btn-primary w-full">
              Book appointment
            </Link>
            {links.whatsapp && (
              <a href={links.whatsapp.href} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full">
                <Icon name="message" className="h-5 w-5 text-brand-600" /> Message on WhatsApp
              </a>
            )}
            {links.phone && (
              <a href={links.phone.href} className="btn-secondary w-full">
                <Icon name="phone" className="h-5 w-5 text-brand-600" /> Call {links.phone.label}
              </a>
            )}
          </div>

          <p className="mt-8 text-sm text-muted">
            Online consultations are not for emergencies. In an emergency, go to the nearest hospital.
          </p>
        </nav>
      </div>
    </>
  );
}
