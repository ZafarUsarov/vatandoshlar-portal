import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";
import {
  findActiveAdminById,
  type AdminAccount,
} from "@/lib/auth/admin-repository";

type AppLocale = "uz" | "de";

export async function getCurrentAdmin(): Promise<
  AdminAccount | null
> {
  const session = await auth();

  if (
    !session?.user?.id ||
    session.user.role !== "admin"
  ) {
    return null;
  }

  return findActiveAdminById(
    session.user.id,
  );
}

export async function requireAdmin(
  locale: AppLocale,
): Promise<AdminAccount> {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return redirect({
      href: "/login",
      locale,
    });
  }

  return admin;
}
