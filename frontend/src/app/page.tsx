import Hero from "@/components/Hero";
import TransformationStory from "@/components/TransformationStory";
import ServicesPreview from "@/components/ServicesPreview";
import TechEcosystem from "@/components/TechEcosystem";
import WhyRiyadvi from "@/components/WhyRiyadvi";
import FreeResources from "@/components/FreeResources";

export default function Home() {
  return (
    <main>
      <Hero />
      <TransformationStory />
      <ServicesPreview />
      <TechEcosystem />
      <WhyRiyadvi />
      <FreeResources />
    </main>
  );
}