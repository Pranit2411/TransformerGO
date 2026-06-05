import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (!username || !password)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing)
    return NextResponse.json({ error: "Username taken" }, { status: 409 });

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { username, password: hashed } });
  return NextResponse.json({ success: true }, { status: 201 });
}