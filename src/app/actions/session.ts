"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

// Returns the currently authenticated athlete from the session cookie.
// Returns null if the cookie is missing or the athlete no longer exists.
export async function getAthleteSession() {
  const cookieStore = await cookies();
  const athleteId = cookieStore.get("auth_athlete_id")?.value;
  if (!athleteId) return null;

  return prisma.athlete.findUnique({
    where: { id: athleteId, deletedAt: null },
  });
}

// Keep the old export name so existing imports don't break.
export { getAthleteSession as getMockSession };
