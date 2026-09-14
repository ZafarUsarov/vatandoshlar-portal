import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";
import {
  getPublicUserContext,
} from "@/lib/users/user-repository";

import type {
  PublicUserContext,
  UserPreferredLocale,
} from "@/types/user";

export async function getCurrentPublicUser(): Promise<
  PublicUserContext | null
> {
  const session =
    await auth();

  if (
    !session?.user?.id ||
    session.user.role !== "user"
  ) {
    return null;
  }

  return getPublicUserContext(
    session.user.id,
  );
}

export async function requirePublicUser(
  locale: UserPreferredLocale,
): Promise<PublicUserContext> {
  const user =
    await getCurrentPublicUser();

  if (!user) {
    return redirect({
      href:
        "/id/login",
      locale,
    });
  }

  return user;
}
