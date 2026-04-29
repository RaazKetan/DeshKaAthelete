"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

import {
  athleteSignupSchema,
  athleteLoginSchema,
  passwordResetRequestSchema,
  passwordResetCompleteSchema,
  parseFormData,
  parseObject,
} from "@/lib/validation";

const SALT_ROUNDS = 12;

function firstError(errors: Record<string, string>): string {
  const key = Object.keys(errors)[0];
  return errors[key] ?? "Validation failed.";
}

// ─── Check if a username is already taken ────────────────────────────────────
export async function checkUsername(username: string) {
  if (!username) return false;
  const existing = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });
  return !!existing;
}

// ─── Register a new Athlete (creates User + linked Athlete) ──────────────────
export async function registerAthlete(formData: FormData) {
  const parsed = parseFormData(athleteSignupSchema, formData);
  if (!parsed.ok) throw new Error(firstError(parsed.errors));
  const { username, name, phone, password, sport } = parsed.data;

  const existing = await prisma.user.findFirst({
    where: { OR: [{ username }, { phone }] },
    select: { id: true },
  });
  if (existing) throw new Error("Username or phone number is already registered.");

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      username,
      phone,
      password: hashedPassword,
      role: "ATHLETE",
      athlete: {
        create: { name, sport, isVerified: false },
      },
    },
    include: { athlete: true },
  });

  const cookieStore = await cookies();
  cookieStore.set("auth_athlete_id", user.athlete!.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return { success: true };
}

// ─── Login an existing Athlete ───────────────────────────────────────────────
export async function loginAthlete(formData: FormData) {
  const parsed = parseFormData(athleteLoginSchema, formData);
  if (!parsed.ok) throw new Error(firstError(parsed.errors));
  const { usernameOrPhone, password } = parsed.data;

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: usernameOrPhone }, { phone: usernameOrPhone }],
      role: "ATHLETE",
      deletedAt: null,
    },
    include: { athlete: true },
  });

  if (!user || !user.athlete || !user.password) {
    throw new Error("No athlete found with this username or mobile number.");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Incorrect password.");

  const cookieStore = await cookies();
  cookieStore.set("auth_athlete_id", user.athlete.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return { success: true };
}

// ─── Send OTP for password reset ─────────────────────────────────────────────
export async function sendPasswordResetOtp(phone: string) {
  const parsed = parseObject(passwordResetRequestSchema, { phone });
  if (!parsed.ok) throw new Error(firstError(parsed.errors));
  const validPhone = parsed.data.phone;

  const user = await prisma.user.findUnique({
    where: { phone: validPhone },
    select: { id: true, role: true },
  });
  if (!user || user.role !== "ATHLETE") {
    throw new Error("No athlete registered with this phone number.");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  await prisma.user.update({
    where: { phone: validPhone },
    data: { resetOtp: otp, resetOtpExpiry: expiry },
  });

  // TODO: Replace with real SMS gateway (Twilio/MSG91)
  console.log(`[SMS Mock] OTP for ${validPhone}: ${otp}`);

  return { success: true, message: "OTP sent to your mobile number." };
}

// ─── Reset password after verifying OTP ──────────────────────────────────────
export async function resetPasswordWithOtp(formData: FormData) {
  const parsed = parseFormData(passwordResetCompleteSchema, formData);
  if (!parsed.ok) throw new Error(firstError(parsed.errors));
  const { phone, otp, newPassword } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { phone },
    select: { id: true, role: true, resetOtp: true, resetOtpExpiry: true },
  });

  if (!user || user.role !== "ATHLETE") throw new Error("Athlete not found.");
  if (!user.resetOtp || user.resetOtp !== otp) throw new Error("Invalid OTP.");
  if (!user.resetOtpExpiry || user.resetOtpExpiry < new Date()) {
    throw new Error("OTP has expired.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

  await prisma.user.update({
    where: { phone },
    data: {
      password: hashedPassword,
      resetOtp: null,
      resetOtpExpiry: null,
    },
  });

  return { success: true, message: "Password reset successfully." };
}

// ─── Logout ──────────────────────────────────────────────────────────────────
export async function logoutAthlete() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_athlete_id");
  redirect("/");
}
