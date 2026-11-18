// Helpers that turn backend settings into usable contact links.
// Admin placeholders like "[phone]" are treated as empty.
const clean = (v) => (typeof v === "string" && v.trim() && !v.trim().startsWith("[") ? v.trim() : "");

export function contactLinks(settings) {
  const s = settings || {};
  const phone = clean(s.phone);
  const whatsapp = clean(s.whatsapp);
  const email = clean(s.email);

  return {
    phone: phone && { label: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` },
    whatsapp: whatsapp && { label: whatsapp, href: `https://wa.me/${whatsapp.replace(/\D/g, "")}` },
    email: email && { label: email, href: `mailto:${email}` },
    address: clean(s.address),
    hours: clean(s.hours),
  };
}
