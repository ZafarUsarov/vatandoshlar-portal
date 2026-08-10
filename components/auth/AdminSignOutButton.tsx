import { getPathname } from "@/i18n/navigation";
import { signOut } from "@/auth";

type AdminSignOutButtonProps = {
  locale: "uz" | "de";
};

export default function AdminSignOutButton({
  locale,
}: AdminSignOutButtonProps) {
  const label =
    locale === "de"
      ? "Abmelden"
      : "Chiqish";

  return (
    <form
      action={async () => {
        "use server";

        await signOut({
          redirectTo: getPathname({
            locale,
            href: "/",
          }),
        });
      }}
    >
      <button
        type="submit"
        className="
          inline-flex h-10 items-center
          justify-center rounded-xl
          border border-slate-200
          bg-white px-4
          text-sm font-bold text-slate-700
          transition
          hover:border-slate-300
          hover:bg-slate-50
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-emerald-500
          focus-visible:ring-offset-2
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-200
          dark:hover:bg-slate-800
          dark:focus-visible:ring-offset-slate-950
        "
      >
        {label}
      </button>
    </form>
  );
}
