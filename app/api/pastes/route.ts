import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: any;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { content, ttl_seconds, max_views } = body;

  if (!content || typeof content !== "string" || content.trim() === "") {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  const expiresAt = ttl_seconds ? new Date(Date.now() + ttl_seconds * 1000) : null;

  const paste = await prisma.paste.create({
    data: {
      content,
      expiresAt,
      maxViews: max_views ?? null,
    },
  });

  return NextResponse.json({
    id: paste.id,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/pastes/${paste.id}`,
  });
}


