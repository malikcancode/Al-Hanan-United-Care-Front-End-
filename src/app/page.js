import HeroBanner from "@/components/sections/HeroBanner";
import Hero from "@/components/sections/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import DoctorsSection from "@/components/sections/DoctorsSection";
import CtaBand from "@/components/sections/CtaBand";
import { getServices } from "@/services/serviceService";
import { getDoctors } from "@/services/doctorService";
import { getSettings } from "@/services/settingService";
import { contactLinks } from "@/config/contact";

export default async function HomePage() {
  const [services, doctors, settings] = await Promise.all([getServices(), getDoctors(), getSettings()]);
  const { whatsapp } = contactLinks(settings);

  return (
    <>
      <HeroBanner />
      <Hero services={services} whatsapp={whatsapp} />
      <ServicesSection services={services} />
      <HowItWorksSection />
      <DoctorsSection doctors={doctors} limit={4} />
      <CtaBand whatsapp={whatsapp} />
    </>
  );
}
