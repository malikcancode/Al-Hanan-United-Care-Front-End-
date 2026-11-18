import PageHeader from "@/components/sections/PageHeader";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import CtaBand from "@/components/sections/CtaBand";
import { getSettings } from "@/services/settingService";
import { contactLinks } from "@/config/contact";

export const metadata = { title: "How it works" };

export default async function HowItWorksPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        title="Three steps to your online consultation"
        description="No travel and no waiting room. Here is how a visit with Al Hanna United Care works."
      />
      <HowItWorksSection showHeading={false} />
      <div className="pt-16 sm:pt-20 lg:pt-24" />
      <CtaBand title="Start with step one today" whatsapp={contactLinks(settings).whatsapp} />
    </>
  );
}
