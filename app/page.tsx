"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [link, setLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function createPaste() {
    if (!text.trim()) {
      alert("Paste content cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/pastes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: text,
          ttl_seconds: 60,
          max_views: 5,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to create paste");
        setLoading(false);
        return;
      }

      const data = await res.json();

      // ✅ THIS LINE
      setLink(`/pastes/${data.id}`);
    } catch (e) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Next.js Pastebin</h1>

      <textarea
        className="w-full border p-2"
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="mt-4 px-4 py-2 bg-black text-white disabled:opacity-50"
        onClick={createPaste}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Paste"}
      </button>

      {link && (
        <p className="mt-4">
          Share:{" "}
          <a className="underline text-blue-600" href={link}>
            {link}
          </a>
        </p>
      )}
    </main>
  );
}



