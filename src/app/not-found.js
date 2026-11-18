import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-canvas py-24 sm:py-32">
      <div className="container-page max-w-xl text-center">
        <p className="font-display text-6xl font-semibold text-brand-200 tabular-nums">404</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">We couldn’t find that page</h1>
        <p className="mt-3 text-lg text-muted">The link may be old, or the page may have moved.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/book" className="btn-secondary">
            Book appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
