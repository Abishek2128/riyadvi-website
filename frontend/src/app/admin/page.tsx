import type { Metadata } from "next";
import AdminApp from "@/components/AdminApp";

export const metadata: Metadata = {
  title: "Admin | Riyadvi",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-32">
      <AdminApp />
    </main>
  );
}