import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const ML_API_URL = process.env.ML_API_URL;

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const res = await fetch(`${ML_API_URL}/predict/pt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      specification: body.specification,
      burden: body.burden,
      class_type: body.class_type,
      bdv_oil: body.bdv_oil,
      primary_to_secondary: body.primary_to_secondary,
      primary_to_earth: body.primary_to_earth,
      secondary_to_earth: body.secondary_to_earth,
    }),
  });
  const data = await res.json();
  return NextResponse.json(data);
}