import { signOut } from "@/auth";
import { getPathname } from "@/i18n/navigation";
import AccountSignOutConfirm from "@/components/account/AccountSignOutConfirm";

type Props = Readonly<{
  locale: "uz" | "de";
}>;

export default function AccountSignOutButton({ locale }: Props) {
  const label = locale === "de" ? "Abmelden" : "Chiqish";

  return (
    <form
      id="account-signout-form"
      action={async () => {
        "use server";
        await signOut({
          redirectTo: getPathname({ locale, href: "/" }),
        });
      }}
    >
      <AccountSignOutConfirm locale={locale} label={label} />
    </form>
  );
}
