import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SchoolBookAthleteClient from "./client-page";

export const dynamic = "force-dynamic";

export default async function SchoolBookAthlete({
  params
}: {
  params: Promise<{ athleteId: string }>;
}) {
  const resolvedParams = await params;
  const athlete = await prisma.athlete.findUnique({ where: { id: resolvedParams.athleteId }, include: { achievements: true } });

  if (!athlete) {
    notFound();
  }

  return <SchoolBookAthleteClient athlete={athlete} />;
}
