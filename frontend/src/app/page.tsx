import Hero from "@/components/Hero";
import TransformationStory from "@/components/TransformationStory";
import ServicesPreview from "@/components/ServicesPreview";
import TechEcosystem from "@/components/TechEcosystem";
import WhyRiyadvi from "@/components/WhyRiyadvi";
import FreeResources from "@/components/FreeResources";
import { getServices } from "@/lib/content";

export default async function Home() {
  const services = await getServices();
  return (
    <main>
      <Hero />
      <TransformationStory />
      <ServicesPreview services={services} />
      <TechEcosystem />
      <WhyRiyadvi />
      <FreeResources />
    </main>
  );
}