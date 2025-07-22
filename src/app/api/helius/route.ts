import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const authHeader = req.headers.get("authorization");
  const expected = process.env.HELIUS_WEBHOOK_TOKEN;

  if (authHeader !== expected) {
    console.log("Unauthorized");
    return NextResponse.json(
      { status: 401, message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!Array.isArray(body)) {
    return NextResponse.json({ status: 400, message: "Invalid body format" });
  }
  console.log("authorized");
  await inngest.send({
    name: "solana/batch.received",
    data: { body },
  });

  return NextResponse.json({
    status: 200,
    message: "Batch queued to Inngest.",
  });
}
