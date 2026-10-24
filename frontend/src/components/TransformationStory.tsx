"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  ["Business Challenge", "We start by understanding where your business is stuck."],
  ["Strategy", "A clear roadmap tied to your growth goals."],
  ["Design", "Interfaces that look premium and convert."],
  ["Technology", "Scalable, secure engineering built to last."],
  ["Launch", "Tested, optimized, and live with confidence."],
  ["Growth", "Continuous improvement driven by real data."],
];

export default function TransformationStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".step");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${steps.length * 80}%`,
          scrub: true,
          pin: true,
        },
      });
      tl.fromTo(
        ".progress",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", duration: items.length },
        0
      );
      items.forEach((el, i) =>
        tl.fromTo(
          el,
          { opacity: 0.15, y: 40, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          i
        )
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="flex min-h-screen flex-col justify-center px-6 pt-24">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="mb-4 text-3xl font-bold md:text-5xl">
          From challenge to <span className="text-gold">growth</span>
        </h2>
        <p className="mb-12 max-w-xl text-white/60">
          Our digital transformation approach, step by step.
        </p>
        <div className="mb-10 h-px w-full bg-white/15">
          <div className="progress h-px origin-left bg-gold" />
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-6">
          {steps.map(([title, text], i) => (
            <div
              key={title}
              className="step rounded-xl border border-gold/30 bg-white/5 p-5 backdrop-blur"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-gold font-bold text-black">
                {i + 1}
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-white/60">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}