import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function AccountLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="pt-20">{children}</div>
      <Footer />
    </>
  );
}
