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
  const session = await auth();

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
  returnTo?: string,
): Promise<PublicUserContext> {
  const user =
    await getCurrentPublicUser();

  if (!user) {
    const href = returnTo
      ? `/id/login?returnTo=${encodeURIComponent(returnTo)}`
      : "/id/login";

    return redirect({
      href,
      locale,
    });
  }

  return user;
}