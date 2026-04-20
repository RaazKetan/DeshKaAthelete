"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ─── Check if a username is already taken (queries User table) ───────────────
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
  const username = formData.get("username") as string;
  const phone    = formData.get("phone")    as string;
  const password = formData.get("password") as string;
  const name     = formData.get("name")     as string;
  const sport    = formData.get("sport")    as string;

  if (!username || !phone || !password || !name || !sport) {
    throw new Error("All registration fields are required.");
  }

  const existing = await prisma.user.findFirst({
    where: { OR: [{ username }, { phone }] },
    select: { id: true },
  });

  if (existing) {
    throw new Error("Username or phone number is already registered.");
  }

  const user = await prisma.user.create({
    data: {
      username,
      phone,
      password,
      role: "ATHLETE",
      athlete: {
        create: {
          name,
          sport,
          isVerified: false,
        },
      },
    },
    include: { athlete: true },
  });

  const cookieStore = await cookies();
  cookieStore.set("auth_athlete_id", user.athlete!.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return { success: true };
}

// ─── Login an existing Athlete ───────────────────────────────────────────────
export async function loginAthlete(formData: FormData) {
  const usernameOrPhone = formData.get("usernameOrPhone") as string;
  const password        = formData.get("password")        as string;

  if (!usernameOrPhone || !password) {
    throw new Error("Username/phone and password are required.");
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: usernameOrPhone },
        { phone:    usernameOrPhone },
      ],
      role: "ATHLETE",
    },
    include: { athlete: true },
  });

  if (!user || !user.athlete) {
    throw new Error("No player found with this username or mobile number.");
  }

  if (user.password !== password) {
    throw new Error("Incorrect password.");
  }

  const cookieStore = await cookies();
  cookieStore.set("auth_athlete_id", user.athlete.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return { success: true };
}

// ─── Send OTP for password reset ─────────────────────────────────────────────
export async function sendPasswordResetOtp(phone: string) {
  if (!phone) throw new Error("Phone number is required.");

  const user = await prisma.user.findUnique({
    where: { phone },
    select: { id: true, role: true },
  });

  if (!user || user.role !== "ATHLETE") {
    throw new Error("No athlete registered with this phone number.");
  }

  const otp    = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  await prisma.user.update({
    where: { phone },
    data: { resetOtp: otp, resetOtpExpiry: expiry },
  });

  // MOCK: print to server console until real SMS gateway is configured
  console.log(`[SMS Mock] OTP for ${phone}: ${otp}`);

  return { success: true, message: "OTP sent to your mobile number." };
}

// ─── Reset password after verifying OTP ──────────────────────────────────────
export async function resetPasswordWithOtp(formData: FormData) {
  const phone       = formData.get("phone")       as string;
  const otp         = formData.get("otp")         as string;
  const newPassword = formData.get("newPassword") as string;

  if (!phone || !otp || !newPassword) {
    throw new Error("Phone, OTP, and new password are required.");
  }

  if (newPassword.length < 6) {
    throw new Error("New password must be at least 6 characters.");
  }

  const user = await prisma.user.findUnique({
    where: { phone },
    select: { id: true, role: true, resetOtp: true, resetOtpExpiry: true },
  });

  if (!user || user.role !== "ATHLETE") throw new Error("Player not found.");
  if (!user.resetOtp || user.resetOtp !== otp) throw new Error("Invalid OTP.");
  if (!user.resetOtpExpiry || user.resetOtpExpiry < new Date()) throw new Error("OTP has expired.");

  await prisma.user.update({
    where: { phone },
    data: {
      password:       newPassword,
      resetOtp:       null,
      resetOtpExpiry: null,
    },
  });

  return { success: true, message: "Password reset successfully! You can now log in." };
}

// ─── Logout ──────────────────────────────────────────────────────────────────
export async function logoutAthlete() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_athlete_id");
  redirect("/");
}
