"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function checkUsername(username: string) {
  if (!username) return false;
  
  const existingAthlete = await prisma.athlete.findUnique({
    where: { username }
  });
  
  return !!existingAthlete;
}

export async function registerAthlete(formData: FormData) {
  const username = formData.get("username") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const sport = formData.get("sport") as string;

  if (!username || !phone || !password || !name || !sport) {
    throw new Error("All registration fields are required.");
  }

  const existing = await prisma.athlete.findFirst({
    where: { OR: [{ username }, { phone }] }
  });

  if (existing) {
    throw new Error("Username or phone number is already registered.");
  }

  const athlete = await prisma.athlete.create({
    data: {
      username,
      phone,
      password,
      name,
      sport,
      isVerified: false // Needs KYC boarding
    }
  });

  // Set the session cookie
  const cookieStore = await cookies();
  cookieStore.set("auth_athlete_id", athlete.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/"
  });

  return { success: true };
}

export async function loginAthlete(formData: FormData) {
  const usernameOrPhone = formData.get("usernameOrPhone") as string;
  const password = formData.get("password") as string;
  
  if (!usernameOrPhone || !password) {
    throw new Error("Username/phone and password are required.");
  }

  const athlete = await prisma.athlete.findFirst({
    where: {
      OR: [
        { username: usernameOrPhone },
        { phone: usernameOrPhone }
      ]
    }
  });

  if (!athlete) {
    throw new Error("No player found with this username or mobile number.");
  }

  // Simplified password validation for MVP (no bcrypt just direct compare)
  if (athlete.password !== password) {
    throw new Error("Incorrect password.");
  }

  // Set the session cookie
  const cookieStore = await cookies();
  cookieStore.set("auth_athlete_id", athlete.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/"
  });

  return { success: true };
}

export async function sendPasswordResetOtp(phone: string) {
  if (!phone) throw new Error("Phone number is required.");

  const athlete = await prisma.athlete.findUnique({
    where: { phone }
  });

  if (!athlete) throw new Error("No athlete registered with this phone number.");

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  await prisma.athlete.update({
    where: { phone },
    data: { resetOtp: otp, resetOtpExpiry: expiry }
  });

  // MOCK SMS SENDING: Print securely to server console
  console.log(`[Twilio Mock] MOCK OTP FOR ATHLETE ${phone} is: ${otp}`);

  return { success: true, message: "OTP sent securely to your mobile number." };
}

export async function resetPasswordWithOtp(formData: FormData) {
  const phone = formData.get("phone") as string;
  const otp = formData.get("otp") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!phone || !otp || !newPassword) {
    throw new Error("Phone, OTP, and New Password are required.");
  }

  if (newPassword.length < 6) {
    throw new Error("New password must be at least 6 characters.");
  }

  const athlete = await prisma.athlete.findUnique({
    where: { phone }
  });

  if (!athlete) throw new Error("Player not found.");

  if (!athlete.resetOtp || athlete.resetOtp !== otp) {
    throw new Error("Invalid OTP.");
  }

  if (!athlete.resetOtpExpiry || athlete.resetOtpExpiry < new Date()) {
    throw new Error("OTP has expired.");
  }

  // OTP matches and is valid, reset password
  await prisma.athlete.update({
    where: { phone },
    data: {
      password: newPassword,
      resetOtp: null,
      resetOtpExpiry: null
    }
  });

  return { success: true, message: "Password reset correctly! You can now log in." };
}

export async function logoutAthlete() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_athlete_id");
  redirect("/");
}
