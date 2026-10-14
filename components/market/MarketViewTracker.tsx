"use client";
import { useEffect } from "react";
/** Anonymous browser-session views. One count per listing per tab session. */
export default function MarketViewTracker({ listingId }: { listingId: string }) {
  useEffect(() => {
    try {
      const key = `market-view:${listingId}`;
      let token = sessionStorage.getItem(key);
      if (!token) { token = crypto.randomUUID(); sessionStorage.setItem(key, token); }
      void fetch("/api/market/views", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, token }), credentials: "same-origin" }).catch(() => {});
    } catch { /* Storage may be disabled; viewing the listing still works. */ }
  }, [listingId]);
  return null;
}
