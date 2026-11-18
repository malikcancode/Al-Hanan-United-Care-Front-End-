import Image from "next/image";
import Link from "next/link";

export default function Logo({ name = "Al Hanna United Care", tone = "dark", size = 48, onClick }) {
  const light = tone === "light";

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`flex min-w-0 items-center gap-3 font-display text-lg leading-tight font-semibold ${
        light ? "text-white" : "text-ink"
      }`}
    >
      <Image
        src="/logo.jpeg"
        alt=""
        width={size}
        height={size}
        priority={!light}
        className={`shrink-0 rounded-full bg-white ${light ? "ring-2 ring-white/20" : "ring-1 ring-line"}`}
      />
      <span className="truncate">{name}</span>
    </Link>
  );
}
