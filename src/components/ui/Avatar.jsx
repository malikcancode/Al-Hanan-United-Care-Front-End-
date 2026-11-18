const initials = (name = "") =>
  name
    .replace(/[^\p{L}\s]/gu, " ")
    .replace(/^\s*(dr|prof)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

// Portrait photo, or an initials tile when no photo has been uploaded.
export default function Avatar({ src, alt = "", className = "aspect-[4/5] w-full rounded-xl" }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} loading="lazy" className={`${className} bg-canvas object-cover`} />;
  }

  return (
    <span
      className={`${className} flex items-center justify-center bg-brand-50 font-display text-4xl font-semibold text-brand-700/70`}
      aria-hidden="true"
    >
      {initials(alt) || "Dr"}
    </span>
  );
}
