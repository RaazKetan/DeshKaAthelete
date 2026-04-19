import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SchoolBookAthleteClient from "./client-page";

export default async function SchoolBookAthlete({
  params
}: {
  params: { athleteId: string };
}) {
  const athlete = await prisma.athlete.findUnique({ where: { id: params.athleteId } });

  if (!athlete) {
    notFound();
  }

  return <SchoolBookAthleteClient athlete={athlete} />;
}
