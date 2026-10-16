"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function DesktopMarketFilterForm({ children, className }: Readonly<{ children: ReactNode; className: string }>) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onCitySelected = () => formRef.current?.requestSubmit();
    window.addEventListener("market-desktop-city-selected", onCitySelected);
    return () => window.removeEventListener("market-desktop-city-selected", onCitySelected);
  }, []);

  return (
    <form ref={formRef} method="get" className={className} onChange={event => {
      if (event.target instanceof HTMLSelectElement) formRef.current?.requestSubmit();
    }}>
      {children}
    </form>
  );
}
