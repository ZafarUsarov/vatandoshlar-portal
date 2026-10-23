"use client";

type Props = {
  cityName: string;
  stateName: string;
  latitude: number;
  longitude: number;
  locale: string;
};

export default function MyCityMapLoader({
  cityName,
  stateName,
  latitude,
  longitude,
  locale,
}: Props) {
  const query = encodeURIComponent(`${latitude},${longitude}`);

  const mapUrl =
    `https://www.google.com/maps?q=${query}&z=12&output=embed`;

  const externalUrl =
    `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <iframe
        title={`${cityName}, ${stateName} — Google Maps`}
        src={mapUrl}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="block h-[220px] w-full border-0 sm:h-[260px]"
      />

      <div className="flex items-center justify-between gap-3 px-4 py-3 text-xs text-slate-600 dark:text-slate-300">
        <span>
          {locale === "de" ? "Stadtkarte" : "Shahringiz xaritasi"}
        </span>

        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
        >
          {locale === "de"
            ? "In Google Maps öffnen ↗"
            : "Google Maps’da ochish ↗"}
        </a>
      </div>
    </div>
  );
}
