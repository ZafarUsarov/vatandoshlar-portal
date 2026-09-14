import {
  signOut,
} from "@/auth";
import {
  getPathname,
} from "@/i18n/navigation";

type PublicSignOutButtonProps = Readonly<{
  locale:
    | "uz"
    | "de";
}>;

export default function PublicSignOutButton({
  locale,
}: PublicSignOutButtonProps) {
  const label =
    locale === "de"
      ? "Abmelden"
      : "Chiqish";

  return (
    <form
      action={async () => {
        "use server";

        await signOut({
          redirectTo:
            getPathname({
              locale,
              href:
                "/",
            }),
        });
      }}
    >
      <button
        type="submit"
        className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-red-200 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/10 dark:focus-visible:ring-offset-slate-900"
      >
        {label}
      </button>
    </form>
  );
}
