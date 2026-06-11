import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const ML_API_URL = process.env.ML_API_URL;

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const res = await fetch(`${ML_API_URL}/predict/ct`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      specification: body.specification,
      ct_ratio_num: body.ct_ratio_num,
      burden: body.burden,
      stc: body.stc,
      bdv_oil: body.bdv_oil,
      primary_to_secondary: body.primary_to_secondary,
      primary_to_earth: body.primary_to_earth,
      secondary_to_earth: body.secondary_to_earth,
      type_encoded: body.type_encoded ?? 1.0,
    }),
  });
  const data = await res.json();
  return NextResponse.json(data);
}