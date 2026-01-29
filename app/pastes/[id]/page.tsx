import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ REQUIRED IN NEXT.JS 16
  const { id } = await params;

  if (!id) notFound();

  const paste = await prisma.paste.findUnique({
    where: { id },
  });

  if (!paste) notFound();

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Paste Content</h1>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
        {paste.content}
      </pre>

      {paste.expiresAt && (
        <p className="mt-2 text-sm text-gray-500">
          Expires at: {paste.expiresAt.toLocaleString()}
        </p>
      )}

      {paste.maxViews && (
        <p className="mt-1 text-sm text-gray-500">
          Max views: {paste.maxViews}
        </p>
      )}
    </main>
  );
}



