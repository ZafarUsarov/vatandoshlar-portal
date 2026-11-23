"use client";

import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import type { PremiumContext } from "@/lib/premium/config";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { context: PremiumContext };

export default function PremiumEntryLink({ context, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      href="/premium"
      onClick={(event) => {
        if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
          try { sessionStorage.setItem("uzde-premium-entry-context", context); } catch { /* Storage may be unavailable. */ }
        }
        onClick?.(event);
      }}
    />
  );
}
