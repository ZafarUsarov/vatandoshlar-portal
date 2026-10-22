import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { requirePublicUser } from "@/lib/auth/user";
import MessagesClient from "@/components/messaging/MessagesClient";

export const metadata: Metadata = {
  title: "Xabarlar | Nachrichten | Vatandoshlar.de",
  robots: { index: false, follow: false },
};

export default async function AccountMessagesPage() {
  const locale = (await getLocale()) === "de" ? "de" : "uz";
  const user = await requirePublicUser(locale, "/account/messages");
  const de = locale === "de";

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <MessagesClient userId={user.user.id} de={de} />
      </div>
    </main>
  );
}
