import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AthleteOnboardingForm from "./onboarding-form";

export const dynamic = "force-dynamic";

export default async function AthleteOnboardingPage() {
  const cookieStore = await cookies();
  const athleteId = cookieStore.get("auth_athlete_id")?.value;

  if (!athleteId) redirect("/athlete/auth");

  const athlete = await prisma.athlete.findUnique({
    where: { id: athleteId, deletedAt: null },
    select: { name: true, sport: true, isVerified: true, pricingSession: true },
  });

  if (!athlete) redirect("/athlete/auth");

  // Already completed onboarding — go straight to dashboard
  if (athlete.isVerified) redirect("/athlete/dashboard");

  return (
    <AthleteOnboardingForm
      initialName={athlete.name}
      initialSport={athlete.sport}
      initialPricing={Number(athlete.pricingSession)}
    />
  );
}
