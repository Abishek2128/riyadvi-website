"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print rounded-full bg-gold px-6 py-2.5 font-semibold text-black transition hover:bg-gold-soft"
    >
      Save as PDF
    </button>
  );
}