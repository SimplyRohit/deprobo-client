import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!Array.isArray(body)) {
    return NextResponse.json({ status: 400, message: "Invalid body format" });
  }

  await inngest.send({
    name: "solana/batch.received",
    data: { body },
  });

  return NextResponse.json({
    status: 200,
    message: "Batch queued to Inngest.",
  });
}
