type Props = {
  name?: string | null;
  avatarUrl?: string | null;
  size?: "sm" | "md";
};

function initials(name?: string | null): string {
  const parts = (name ?? "").trim().split(/\\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return parts[0]?.slice(0, 2).toUpperCase() || "ID";
}

export default function PublicUserAvatar({
  name,
  avatarUrl,
  size = "sm",
}: Props) {
  const dimensions = size === "md" ? "h-12 w-12 text-sm" : "h-9 w-9 text-xs";
  return (
    <span
      aria-hidden="true"
      className={`flex ${dimensions} shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200`}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover"
        />
      ) : (
        initials(name)
      )}
    </span>
  );
}
