import { Public_Sans, Source_Serif_4 } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import { getSettings } from "@/services/settingService";
import { contactLinks } from "@/config/contact";
import "./globals.css";

const publicSans = Public_Sans({ variable: "--font-public-sans", subsets: ["latin"], display: "swap" });
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Al Hanna United Care";

export const metadata = {
  title: { default: `${siteName} – Online Medical Services`, template: `%s | ${siteName}` },
  description:
    "See a doctor from home. Online consultations, specialist care, lab tests, digital prescriptions and follow-ups.",
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const settings = await getSettings();
  const name = settings?.clinicName || siteName;
  const links = contactLinks(settings);

  return (
    <html lang="en" className={`${publicSans.variable} ${sourceSerif.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lift"
        >
          Skip to content
        </a>
        <Navbar siteName={name} links={links} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer siteName={name} links={links} />
        <MobileActionBar whatsapp={links.whatsapp} />
      </body>
    </html>
  );
}
