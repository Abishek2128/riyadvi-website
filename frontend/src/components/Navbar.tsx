"use client";
import Link from "next/link";
import { useState } from "react";

const links = [
  ["Services", "/#services"],
  ["Portfolio", "/portfolio"],
  ["About", "/about"],
  ["Blog", "/blog"],
  ["Careers", "/careers"],
  ["Contact", "/contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold tracking-wide text-gold">
          RIYADVI
        </Link>
        <ul className="hidden gap-8 text-sm text-white/80 md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="transition hover:text-gold">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="hidden rounded-full bg-gold px-5 py-2 text-sm font-semibold text-black md:block"
        >
          Book a Consultation
        </Link>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          ☰
        </button>
      </nav>
      {open && (
        <ul className="space-y-4 border-t border-white/10 bg-black px-6 py-4 md:hidden">
          {links.map(([label, href]) => (
            <li key={href}>
              <Link href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}