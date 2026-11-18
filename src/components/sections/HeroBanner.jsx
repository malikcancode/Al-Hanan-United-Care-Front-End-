"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";

const BANNERS = [
  {
    src: "/hero-banner.jpg",
    alt: "Al Hanaa United Home Healthcare Services, licence no. 2024/27032 – Your health, our priority. Compassionate care in the comfort of your home: home healthcare, professional nurses, personalized care and trusted services.",
  },
  {
    src: "/hero-banner-2.jpg",
    alt: "Why choose Al Hanaa United Home Healthcare Services: qualified and trained staff, compassionate approach, 24/7 support, reliable and affordable. Because you deserve the best care.",
  },
];

const INTERVAL = 6000;

// Banner content sits in the middle ~55% of each image; capping the height at width/1.9
// keeps that area uncropped on tall screens, while the plain edges fill the width.
export default function HeroBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (next) => setIndex((next + BANNERS.length) % BANNERS.length);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % BANNERS.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Al Hanaa United Home Healthcare"
      className="relative w-full overflow-hidden bg-brand-50 h-[min(calc(100svh-4rem),calc(100vw/1.9))] lg:h-[min(calc(100svh-6.75rem),calc(100vw/1.9))]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {BANNERS.map((banner, i) => (
        <div
          key={banner.src}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${BANNERS.length}`}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={banner.src}
            alt={banner.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            quality={95}
            className="object-cover object-center"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous banner"
        className="absolute top-1/2 left-3 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-soft backdrop-blur-sm transition hover:bg-white sm:flex lg:left-6"
      >
        <Icon name="arrow" className="h-5 w-5 rotate-180" strokeWidth={2} />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next banner"
        className="absolute top-1/2 right-3 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-soft backdrop-blur-sm transition hover:bg-white sm:flex lg:right-6"
      >
        <Icon name="arrow" className="h-5 w-5" strokeWidth={2} />
      </button>

      <div className="absolute right-3 bottom-2 z-10 flex gap-1 sm:right-5 sm:bottom-4 lg:right-8">
        {BANNERS.map((banner, i) => (
          <button
            key={banner.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show banner ${i + 1}`}
            aria-current={i === index}
            className="flex h-6 items-center px-1"
          >
            <span
              className={`block h-2 rounded-full shadow-[0_0_0_1px_rgb(0_0_0/0.15)] transition-all duration-300 ${
                i === index ? "w-7 bg-white" : "w-2 bg-white/60 hover:bg-white/90"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
