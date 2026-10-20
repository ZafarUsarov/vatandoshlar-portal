import { NextResponse } from "next/server";
import { getCurrentPublicUser } from "@/lib/auth/user";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const context = await getCurrentPublicUser();

    if (!context || context.user.status !== "active") {
      return NextResponse.json(
        { error: "Unauthorized" },
        {
          status: 401,
          headers: { "Cache-Control": "no-store" },
        },
      );
    }

    return NextResponse.json(
      {
        displayName: context.profile?.displayName ?? null,
        email: context.user.email,
        avatarUrl: context.profile?.avatarUrl ?? null,
      },
      {
        headers: { "Cache-Control": "private, no-store" },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to load account" },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}
