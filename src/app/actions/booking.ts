"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBooking(formData: FormData, athleteId: string) {
  const type = formData.get("type") as string;
  const dateStr = formData.get("date") as string;
  const timeStr = formData.get("time") as string;
  const schoolType = formData.get("schoolType") as string;
  const audienceSizeStr = formData.get("audienceSize") as string;
  const schoolNote = formData.get("schoolNote") as string;

  if (!type || !dateStr || !timeStr || !athleteId) {
    throw new Error("Missing required fields");
  }

  const dateTime = new Date(`${dateStr}T${timeStr}`);

  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const schoolId = cookieStore.get("auth_school_id")?.value;

  if (!schoolId) {
    throw new Error("You must be logged in as a school to book an athlete.");
  }

  const school = await prisma.school.findUnique({
    where: { id: schoolId }
  });

  if (!school) {
    throw new Error("Invalid school session.");
  }

  // Create a session
  const session = await prisma.session.create({
    data: {
      title: `${type} with Athlete`,
      description: schoolNote || "",
      type: type,
    }
  });

  // Create the booking
  const booking = await prisma.booking.create({
    data: {
      athleteId,
      schoolId: school.id,
      sessionId: session.id,
      date: dateTime,
      audienceSize: audienceSizeStr ? parseInt(audienceSizeStr) : null,
      schoolType,
      schoolNote,
      status: "PENDING"
    }
  });

  revalidatePath("/athlete/requests");
  revalidatePath("/school/dashboard");

  return booking;
}

export async function acceptBooking(bookingId: string) {
  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CONFIRMED" },
  });
  revalidatePath("/athlete/requests");
  revalidatePath("/athlete/sessions");
  revalidatePath("/athlete/dashboard");
}

export async function declineBooking(bookingId: string) {
  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });
  revalidatePath("/athlete/requests");
  revalidatePath("/athlete/dashboard");
}

export async function markSessionComplete(bookingId: string) {
  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "COMPLETED" },
  });
  revalidatePath("/athlete/sessions");
  revalidatePath("/athlete/earnings");
  revalidatePath("/athlete/dashboard");
}
