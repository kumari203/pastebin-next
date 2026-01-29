import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const paste = await prisma.paste.findUnique({
    where: { id },
  });

  // ❌ Missing paste
  if (!paste) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const now = new Date();

  // ❌ Expired by time
  if (paste.expiresAt && paste.expiresAt <= now) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // ❌ View limit exceeded
  if (
    paste.maxViews !== null &&
    paste.views >= paste.maxViews
  ) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // ✅ Count this as a view
  const updated = await prisma.paste.update({
    where: { id },
    data: {
      views: { increment: 1 },
    },
  });

  return NextResponse.json({
    content: updated.content,
    remaining_views:
      updated.maxViews === null
        ? null
        : Math.max(updated.maxViews - updated.views, 0),
    expires_at: updated.expiresAt,
  });
}
