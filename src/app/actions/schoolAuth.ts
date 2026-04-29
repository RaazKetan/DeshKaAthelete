"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export async function registerSchool(formData: FormData) {
  const name     = formData.get("name")     as string;
  const city     = formData.get("city")     as string;
  const contact  = formData.get("contact")  as string;
  const password = formData.get("password") as string;

  if (!name || !city || !contact || !password) {
    throw new Error("All fields are required.");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const existing = await prisma.user.findFirst({
    where: { phone: contact },
  });

  if (existing) {
    throw new Error("A school is already registered with this contact number.");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      phone: contact,
      password: hashedPassword,
      role: "SCHOOL",
      school: {
        create: {
          name,
          city,
          contact,
        },
      },
    },
    include: { school: true },
  });

  const cookieStore = await cookies();
  cookieStore.set("auth_school_id", user.school!.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return { success: true };
}

export async function loginSchool(formData: FormData) {
  const contact  = formData.get("contact")  as string;
  const password = formData.get("password") as string;

  if (!contact || !password) {
    throw new Error("Contact number and password are required.");
  }

  const user = await prisma.user.findFirst({
    where: { phone: contact, role: "SCHOOL", deletedAt: null },
    include: { school: true },
  });

  if (!user || !user.school || !user.password) {
    throw new Error("No school found with this contact number.");
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    throw new Error("Incorrect password.");
  }

  const cookieStore = await cookies();
  cookieStore.set("auth_school_id", user.school.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return { success: true };
}

export async function logoutSchool() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_school_id");
  redirect("/");
}
