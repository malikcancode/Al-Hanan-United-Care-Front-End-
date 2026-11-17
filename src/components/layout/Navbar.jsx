"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { NAV_LINKS } from "@/config/navigation";

export default function Navbar({ siteName }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo name={siteName} />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition hover:text-brand-600 ${
                pathname === link.href ? "text-brand-600" : "text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/book" className="btn-primary">
            Book online
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-brand-100 bg-white md:hidden" aria-label="Mobile">
          <div className="container-page flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink hover:bg-brand-50"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/book" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Book online
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
