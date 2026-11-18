import PageHeader from "@/components/sections/PageHeader";
import DoctorsSection from "@/components/sections/DoctorsSection";
import CtaBand from "@/components/sections/CtaBand";
import { getDoctors } from "@/services/doctorService";
import { getSettings } from "@/services/settingService";
import { contactLinks } from "@/config/contact";

export const metadata = { title: "Doctors" };

export default async function DoctorsPage() {
  const [doctors, settings] = await Promise.all([getDoctors(), getSettings()]);

  return (
    <>
      <PageHeader
        title="Meet our doctors"
        description="Qualified doctors and specialists who will look after you and your family online."
      />
      <DoctorsSection doctors={doctors} showHeading={false} />
      <CtaBand title="Book a consultation with our team" whatsapp={contactLinks(settings).whatsapp} />
    </>
  );
}
