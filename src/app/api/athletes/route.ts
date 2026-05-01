import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminLimit, getClientIp, RateLimitError } from "@/lib/rate-limit";

// GET /api/athletes — public marketplace listing (verified athletes only)
export async function GET() {
  try {
    const athletes = await prisma.athlete.findMany({
      where: { isVerified: true, deletedAt: null },
      select: {
        id: true,
        name: true,
        sport: true,
        bio: true,
        pricingSession: true,
        currency: true,
        avatarUrl: true,
        achievements: { select: { id: true, title: true, year: true }, take: 3 },
      },
      orderBy: { createdAt: "desc" },
      take: 50, // pagination guard
    });

    return NextResponse.json(athletes);
  } catch (error) {
    console.error("Failed to fetch athletes:", error);
    return NextResponse.json({ error: "Failed to fetch athletes" }, { status: 500 });
  }
}

// POST /api/athletes — admin-only athlete creation
// Requires the request to carry a valid admin API key in the Authorization header.
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  const adminKey   = process.env.ADMIN_API_KEY;

  if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limit = await adminLimit.limit(await getClientIp());
  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "retry-after": String(Math.ceil((limit.reset - Date.now()) / 1000)) } },
    );
  }

  try {
    const body = await request.json();
    const { name, sport, bio, pricingSession } = body;

    if (!name || !sport) {
      return NextResponse.json({ error: "name and sport are required" }, { status: 400 });
    }

    const newAthlete = await prisma.athlete.create({
      data: {
        name,
        sport,
        bio,
        pricingSession: pricingSession ?? 10000,
        isVerified: false,
      },
    });

    return NextResponse.json(newAthlete, { status: 201 });
  } catch (error) {
    console.error("Failed to create athlete:", error);
    return NextResponse.json({ error: "Failed to create athlete" }, { status: 500 });
  }
}
