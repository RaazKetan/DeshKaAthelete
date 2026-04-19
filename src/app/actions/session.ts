"use server";

import { prisma } from "@/lib/prisma";

// Mock Auth Session: We will just return the most recently created athlete
// so we don't have to build a full authentication system right now.
export async function getMockSession() {
  const athlete = await prisma.athlete.findFirst({
    orderBy: { createdAt: "desc" },
  });
  
  return athlete; // Returns null if no athletes exist in DB yet
}
