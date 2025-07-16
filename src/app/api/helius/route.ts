import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";

async function handler(req: NextRequest) {
  if (req.method === "GET") {
    console.log("[Helius Webhook] This is a GET request");
    return NextResponse.json(
      { message: "This was a GET request" },
      { status: 200 }
    );
  }

  if (req.method === "POST") {
    try {
      const body = await req.json();
      console.log("[Helius Webhook] This is a POST request");
      console.log("[Helius Webhook] Payload:", body);

      return NextResponse.json({ status: "ok" }, { status: 200 });
    } catch (err) {
      console.error("[Helius Webhook] Error:", err);
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }
  }

  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

export const GET = handler;
export const POST = handler;
