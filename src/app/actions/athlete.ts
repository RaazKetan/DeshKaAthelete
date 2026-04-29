"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { onboardingSchema, parseFormData } from "@/lib/validation";

function firstError(errors: Record<string, string>): string {
  const key = Object.keys(errors)[0];
  return errors[key] ?? "Validation failed.";
}

export async function onboardAthlete(formData: FormData) {
  const cookieStore = await cookies();
  const athleteId = cookieStore.get("auth_athlete_id")?.value;

  if (!athleteId) {
    throw new Error("Unauthorized. Please sign up or log in first.");
  }

  const parsed = parseFormData(onboardingSchema, formData);
  if (!parsed.ok) throw new Error(firstError(parsed.errors));
  const { name, sport, aadhaarLastFour, federationId, kheloIndiaId, pricingSession } = parsed.data;

  const athlete = await prisma.athlete.update({
    where: { id: athleteId },
    data: {
      name,
      sport,
      aadhaarLastFour: aadhaarLastFour || null,
      federationId: federationId || null,
      kheloIndiaId: kheloIndiaId || null,
      pricingSession,
      isVerified: true, // Auto-verified for demo
      verificationDocs: ["https://mock-s3-bucket/kyc.pdf"],
    },
  });

  revalidatePath("/school/athletes");
  revalidatePath("/athlete/dashboard");

  return athlete;
}
