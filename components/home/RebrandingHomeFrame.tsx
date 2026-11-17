"use client";

import { useEffect, useState, type ReactNode } from "react";
import Header from "../Header";

// 1 January 2027, 00:00 Europe/Berlin (CET).
const BANNER_END = Date.parse("2027-01-01T00:00:00+01:00");

export default function RebrandingHomeFrame({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const CHECK_INTERVAL = 24 * 60 * 60 * 1000;

    let timer: number | undefined;

    const checkExpiration = () => {
      const remaining = BANNER_END - Date.now();

      if (remaining <= 0) {
        setVisible(false);
        return;
      }

      setVisible(true);
      timer = window.setTimeout(
        checkExpiration,
        Math.min(remaining, CHECK_INTERVAL),
      );
    };

    checkExpiration();

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div style={{ "--rebranding-height": visible ? "36px" : "0px" } as React.CSSProperties}>
      <Header showRebrandingBanner={visible} />
      {children}
    </div>
  );
}
