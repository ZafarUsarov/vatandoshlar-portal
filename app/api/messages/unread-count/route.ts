import { NextResponse } from "next/server";
import { getCurrentPublicUser } from "@/lib/auth/user";
import { countUnreadMessages } from "@/lib/messaging/messaging-repository";

export async function GET() {
  const user = await getCurrentPublicUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  const unreadCount = await countUnreadMessages(user.user.id);
  return NextResponse.json({ unreadCount }, { headers: { "Cache-Control": "no-store" } });
}
