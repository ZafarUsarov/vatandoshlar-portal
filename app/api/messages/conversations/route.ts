import { NextResponse } from "next/server";
import { getCurrentPublicUser } from "@/lib/auth/user";
import { listConversations, startConversation, validId } from "@/lib/messaging/messaging-repository";

export async function GET() {
  const user = await getCurrentPublicUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ conversations: await listConversations(user.user.id) }, { headers: { "Cache-Control": "no-store" } });
}
export async function POST(request: Request) {
  const user = await getCurrentPublicUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  const { kind, listingId } = body as Record<string, unknown>;
  if ((kind !== "market" && kind !== "travel") || typeof listingId !== "string" || !validId(listingId))
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  const id = await startConversation(user.user.id, kind, listingId);
  if (!id) return NextResponse.json({ error: "Listing unavailable" }, { status: 404 });
  return NextResponse.json({ id });
}
