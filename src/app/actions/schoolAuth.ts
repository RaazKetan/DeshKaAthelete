"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

import {
  schoolSignupSchema,
  schoolLoginSchema,
  parseFormData,
} from "@/lib/validation";
import { signupLimit, authLimit, enforce, getClientIp } from "@/lib/rate-limit";

const SALT_ROUNDS = 12;

function firstError(errors: Record<string, string>): string {
  const key = Object.keys(errors)[0];
  return errors[key] ?? "Validation failed.";
}

export async function registerSchool(formData: FormData) {
  await enforce(signupLimit, await getClientIp());

  const parsed = parseFormData(schoolSignupSchema, formData);
  if (!parsed.ok) throw new Error(firstError(parsed.errors));
  const { name, city, contact, password } = parsed.data;

  const existing = await prisma.user.findFirst({ where: { phone: contact } });
  if (existing) {
    throw new Error("A school is already registered with this contact number.");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      phone: contact,
      password: hashedPassword,
      role: "SCHOOL",
      school: { create: { name, city, contact } },
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
  await enforce(authLimit, await getClientIp());

  const parsed = parseFormData(schoolLoginSchema, formData);
  if (!parsed.ok) throw new Error(firstError(parsed.errors));
  const { contact, password } = parsed.data;

  const user = await prisma.user.findFirst({
    where: { phone: contact, role: "SCHOOL", deletedAt: null },
    include: { school: true },
  });

  if (!user || !user.school || !user.password) {
    throw new Error("No school found with this contact number.");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Incorrect password.");

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
