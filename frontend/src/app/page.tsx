import Hero from "@/components/Hero";
import TransformationStory from "@/components/TransformationStory";
import ServicesPreview from "@/components/ServicesPreview";
import TechEcosystem from "@/components/TechEcosystem";

export default function Home() {
  return (
    <main>
      <Hero />
      <TransformationStory />
      <ServicesPreview />
      <TechEcosystem />
    </main>
  );
}