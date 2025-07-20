import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();
  await inngest.send({
    name: "solana/event.received",
    data: {
      body,
    },
  });

  return NextResponse.json({ status: 200, message: "Event queued." });
}
