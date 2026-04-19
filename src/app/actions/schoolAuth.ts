"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function registerSchool(formData: FormData) {
  const name = formData.get("name") as string;
  const city = formData.get("city") as string;
  const contact = formData.get("contact") as string;

  if (!name || !city || !contact) {
    throw new Error("Missing required fields");
  }

  // Check if school already exists by contact
  const existing = await prisma.school.findFirst({
    where: { contact }
  });

  if (existing) {
    throw new Error("A school is already registered with this contact number.");
  }

  const school = await prisma.school.create({
    data: {
      name,
      city,
      contact
    }
  });

  const cookieStore = await cookies();
  cookieStore.set("auth_school_id", school.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/"
  });

  return { success: true };
}

export async function loginSchool(formData: FormData) {
  const contact = formData.get("contact") as string;

  if (!contact) {
    throw new Error("Contact number is required");
  }

  const school = await prisma.school.findFirst({
    where: { contact }
  });

  if (!school) {
    throw new Error("No school found with this contact number.");
  }

  const cookieStore = await cookies();
  cookieStore.set("auth_school_id", school.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, 
    path: "/"
  });

  return { success: true };
}

export async function logoutSchool() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_school_id");
  redirect("/");
}
