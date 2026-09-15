import { signOut } from "@/auth";
import { getPathname } from "@/i18n/navigation";

type Props = Readonly<{
  locale: "uz" | "de";
}>;

export default function AccountSignOutButton({ locale }: Props) {
  const label = locale === "de" ? "Abmelden" : "Chiqish";

  return (
    <form
      action={async () => {
        "use server";
        await signOut({
          redirectTo: getPathname({ locale, href: "/" }),
        });
      }}
    >
      <button
        type="submit"
        className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-rose-200 bg-white px-4 text-sm font-bold text-rose-600 transition duration-150 hover:border-rose-300 hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 motion-reduce:transition-none dark:border-rose-900/70 dark:bg-slate-900 dark:text-rose-300 dark:hover:bg-rose-950/30 dark:focus-visible:ring-offset-slate-950"
      >
        {label}
      </button>
    </form>
  );
}
