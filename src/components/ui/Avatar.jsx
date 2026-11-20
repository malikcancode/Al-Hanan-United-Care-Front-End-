const initials = (name = "") =>
  name
    .replace(/[^\p{L}\s]/gu, " ")
    .replace(/^\s*(dr|prof)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

// Circular photo, or a quiet initials mark when no photo has been uploaded.
export default function Avatar({ src, alt = "", className = "h-24 w-24 sm:h-28 sm:w-28" }) {
  const base = `${className} shrink-0 overflow-hidden rounded-full`;

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`${base} bg-canvas object-cover ring-1 ring-line`}
      />
    );
  }

  return (
    <span
      className={`${base} flex items-center justify-center bg-canvas font-sans text-sm font-medium tracking-wide text-muted ring-1 ring-line`}
      aria-hidden="true"
    >
      {initials(alt) || "Dr"}
    </span>
  );
}
