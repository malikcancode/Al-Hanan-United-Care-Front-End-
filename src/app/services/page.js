import PageHeader from "@/components/sections/PageHeader";
import ServicesSection from "@/components/sections/ServicesSection";
import CtaBand from "@/components/sections/CtaBand";
import { getServices } from "@/services/serviceService";
import { getSettings } from "@/services/settingService";
import { contactLinks } from "@/config/contact";

export const metadata = { title: "Services" };

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);

  return (
    <>
      <PageHeader
        title="Care you can reach from anywhere"
        description="Everything you need for everyday care, delivered through your phone or computer."
      />
      <ServicesSection services={services} showHeading={false} />
      <CtaBand title="Ready to speak with a doctor?" whatsapp={contactLinks(settings).whatsapp} />
    </>
  );
}
