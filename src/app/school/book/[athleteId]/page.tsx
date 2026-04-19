import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SchoolBookAthleteClient from "./client-page";

export default async function SchoolBookAthlete({
  params
}: {
  params: Promise<{ athleteId: string }>;
}) {
  const resolvedParams = await params;
  const athlete = await prisma.athlete.findUnique({ where: { id: resolvedParams.athleteId } });

  if (!athlete) {
    notFound();
  }

  return <SchoolBookAthleteClient athlete={athlete} />;
}
