"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";

export async function onboardAthlete(formData: FormData) {
  const cookieStore = await cookies();
  const athleteId = cookieStore.get("auth_athlete_id")?.value;

  if (!athleteId) {
    throw new Error("Unauthorized. Please sign up or log in first.");
  }

  const name = formData.get("name") as string;
  const sport = formData.get("sport") as string;
  const aadhaarLastFour = formData.get("aadhaarLastFour") as string | null;
  const federationId = formData.get("federationId") as string | null;
  const kheloIndiaId = formData.get("kheloIndiaId") as string | null;
  const pricingSession = formData.get("pricingSession") as string | null;

  if (!name || !sport) {
    throw new Error("Name and Sport are required.");
  }

  const athlete = await prisma.athlete.update({
    where: { id: athleteId },
    data: {
      name,
      sport,
      aadhaarLastFour: aadhaarLastFour || null,
      federationId: federationId || null,
      kheloIndiaId: kheloIndiaId || null,
      pricingSession: pricingSession ? parseInt(pricingSession) : 15000,
      isVerified: true, // Auto-verified for demo
      verificationDocs: ["https://mock-s3-bucket/kyc.pdf"],
    },
  });

  revalidatePath("/school/athletes");
  revalidatePath("/athlete/dashboard");

  return athlete;
}
