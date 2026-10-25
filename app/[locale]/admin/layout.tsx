import type { ReactNode } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Header />
      {/* The shared Header is fixed and needs its own layout space. */}
      <div aria-hidden="true" className="h-20 shrink-0" />
      {children}
      <Footer />
    </>
  );
}
