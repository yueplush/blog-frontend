import { NextResponse } from "next/server";

export async function GET() {
  const CMS = (process.env.NEXT_PUBLIC_CMS_URL || "http://192.168.2.108:8055").replace(/\/$/, "");
  const url = `${CMS}/items/posts?fields=id,title,status,contents,slug,date_created&sort=-date_created`;
  try {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) return new NextResponse(await r.text(), { status: r.status });
    return NextResponse.json(await r.json());
  } catch (e) {
    return new NextResponse(String(e), { status: 502 });
  }
}

