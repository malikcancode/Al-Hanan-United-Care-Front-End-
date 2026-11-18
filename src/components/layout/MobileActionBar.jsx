"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/Icon";

// Keeps booking one tap away on phones. Hidden on the booking page itself.
export default function MobileActionBar({ whatsapp }) {
  const pathname = usePathname();
  if (pathname === "/book") return null;

  return (
    <>
      <div className="h-[calc(4.75rem+env(safe-area-inset-bottom))] sm:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-sm sm:hidden">
        <div className="flex gap-2.5">
          {whatsapp && (
            <a
              href={whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-14 shrink-0 !px-0"
              aria-label="Message us on WhatsApp"
            >
              <Icon name="message" className="h-5 w-5 text-brand-600" />
            </a>
          )}
          <Link href="/book" className="btn-primary flex-1">
            Book appointment
          </Link>
        </div>
      </div>
    </>
  );
}
