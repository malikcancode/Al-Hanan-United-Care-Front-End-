import Link from "next/link";

export default function Logo({ name = "Al Hanna United Care" }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-display text-base font-bold text-ink">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </span>
      {name}
    </Link>
  );
}
