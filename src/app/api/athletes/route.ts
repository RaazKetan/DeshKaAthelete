import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// This is part of your Node.js Backend!
// It runs securely on the server and connects to the database.

// GET /api/athletes - Fetch all athletes for the marketplace
export async function GET() {
  try {
    const athletes = await prisma.athlete.findMany({
      where: {
        isVerified: true, // Only show verified athletes to schools
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
    
    return NextResponse.json(athletes);
  } catch (error) {
    console.error("Failed to fetch athletes:", error);
    return NextResponse.json({ error: "Failed to fetch athletes" }, { status: 500 });
  }
}

// POST /api/athletes - Onboard a new athlete (Admin or Athlete themselves)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, sport, bio, pricingSession } = body;

    const newAthlete = await prisma.athlete.create({
      data: {
        name,
        sport,
        bio,
        pricingSession: pricingSession ?? 10000,
        isVerified: false, // Must be verified by admin later
      }
    });

    return NextResponse.json(newAthlete, { status: 201 });
  } catch (error) {
    console.error("Failed to create athlete:", error);
    return NextResponse.json({ error: "Failed to create athlete" }, { status: 500 });
  }
}
