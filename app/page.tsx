// app/page.tsx
"use client";
import { useEffect, useState } from "react";
type Post = { id:number; title:string; status?:string; contents?:string; slug?:string; date_created?:string; };

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/posts", { cache: "no-store" });
        if (!res.ok) {
          const body = await res.text();
          setErr(`HTTP ${res.status}: ${body}`);
          setPosts([]);
        } else {
          const j = await res.json();
          setPosts(Array.isArray(j?.data) ? j.data : []);
        }
      } catch (e:any) {
        setErr(String(e));
        setPosts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <main className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">🪶 Blog from Directus</h1>
      {err && <pre className="mb-4 p-3 border border-red-600 rounded bg-black/30 whitespace-pre-wrap">{err}</pre>}
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map(p => (
            <li key={p.id} className="border border-gray-700 rounded-lg p-4">
              <h2 className="text-2xl font-semibold">{p.title}</h2>
              {p.status && <p className="text-sm opacity-60">status: {p.status}</p>}
              {p.contents && <div className="opacity-80 mt-2" dangerouslySetInnerHTML={{ __html: p.contents }} />}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

