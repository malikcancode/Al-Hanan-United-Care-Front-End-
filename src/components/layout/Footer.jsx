export default function Footer({ settings }) {
  const s = settings || {};

  return (
    <footer id="contact" className="border-t border-brand-100 bg-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div className="max-w-xs">
          <h2 className="text-base font-bold">{s.clinicName || "Al Hanna United Care"}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Online consultations are not for emergencies. In an emergency, go to the nearest
            hospital or call your local emergency number.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="mt-3 space-y-1 text-sm text-muted">
            <li>Phone: {s.phone || "—"}</li>
            <li>WhatsApp: {s.whatsapp || "—"}</li>
            <li>Email: {s.email || "—"}</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Visit &amp; hours</h3>
          <ul className="mt-3 space-y-1 whitespace-pre-line text-sm text-muted">
            <li>{s.address || "—"}</li>
            <li>{s.hours || "—"}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-100 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} {s.clinicName || "Al Hanna United Care"}. All rights reserved.
      </div>
    </footer>
  );
}
