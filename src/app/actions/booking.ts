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

  // Create or get a dummy school
  let school = await prisma.school.findFirst({
    where: { name: "Delhi Public School, Bangalore South" }
  });

  if (!school) {
    school = await prisma.school.create({
      data: {
        name: "Delhi Public School, Bangalore South",
        city: "Bangalore"
      }
    });
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
