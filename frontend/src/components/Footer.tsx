import Link from "next/link";

const columns: [string, [string, string][]][] = [
  [
    "Services",
    [
      ["Web Development", "/services/web-development"],
      ["App Development", "/services/app-development"],
      ["Digital Marketing", "/services/digital-marketing"],
      ["AR / VR", "/services/ar-vr"],
      ["3D Modeling", "/services/3d-modeling"],
      ["UI/UX Design", "/services/ui-ux-design"],
    ],
  ],
  [
    "Company",
    [
      ["About", "/about"],
      ["Portfolio", "/portfolio"],
      ["Blog", "/blog"],
      ["Careers", "/careers"],
      ["Contact", "/contact"],
    ],
  ],
  [
    "Free resources",
    [
      ["Business Health Checkup", "/business-health-checkup"],
      ["Software Project Planning Guide", "/software-project-planning-guide"],
    ],
  ],
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-14">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <p className="text-lg font-bold tracking-wide text-gold">RIYADVI</p>
          <p className="mt-3 text-sm text-white/60">
            Technology and digital solutions partner.
          </p>
        </div>
        {columns.map(([title, links]) => (
          <div key={title}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              {title}
            </h3>
            <ul className="space-y-2 text-sm text-white/60">
              {links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition hover:text-gold">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-12 text-center text-sm text-white/40">
        &copy; 2026 Riyadvi Software Technologies. All rights reserved.
      </p>
    </footer>
  );
}