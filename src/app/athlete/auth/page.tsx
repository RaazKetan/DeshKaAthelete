"use client";

import { ArrowRight, Medal, ShieldCheck, Star, Trophy, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HIGHLIGHTS = [
  { icon: Zap, text: "₹2 Cr+ paid to players" },
  { icon: ShieldCheck, text: "Escrow-guaranteed payments" },
  { icon: Star, text: "500+ partner schools" },
  { icon: Trophy, text: "15+ sports covered" },
];

export default function AthleteAuth() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative flex-col justify-between p-12 overflow-hidden">
        {/* Glows */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]" />

        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-600 to-green-400 flex items-center justify-center font-bold text-lg text-white">
            DA
          </div>
          <span className="font-bold text-xl text-white tracking-tight">DeshKa Athlete</span>
        </Link>

        {/* Center content */}
        <div className="relative z-10 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/25 mb-6">
              <Medal className="w-4 h-4 text-green-400" />
              <span className="text-xs font-bold text-green-400 uppercase tracking-wide">Player Portal</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Your game built your reputation.
              <br />
              <span className="gradient-text">Let it earn too.</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Join India&apos;s first verified marketplace connecting elite sports players — 
              cricketers, footballers, kabaddi stars, and more — with schools for sessions and mentorship.
            </p>
          </div>

          <div className="space-y-3">
            {HIGHLIGHTS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-slate-300 font-semibold text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom testimonial */}
        <div className="relative z-10 bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 backdrop-blur-sm">
          <p className="text-slate-300 text-sm italic leading-relaxed mb-3">
            &ldquo;In just 3 months, I&apos;ve done 8 school sessions. The escrow system means I never chase payments.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">
              RK
            </div>
            <div>
              <p className="text-white text-sm font-bold">Rohan Kumar</p>
              <p className="text-slate-500 text-xs">National-level Kabaddi player · Pune</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Auth Panel */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-green-600 to-green-400 flex items-center justify-center font-bold text-white">
            DA
          </div>
          <span className="font-bold text-lg text-slate-900">DeshKa Athlete</span>
        </Link>

        <div className="w-full max-w-md">
          {/* Toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-8">
            <button
              id="auth-signup-tab"
              onClick={() => setMode("signup")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                mode === "signup"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Create Account
            </button>
            <button
              id="auth-login-tab"
              onClick={() => setMode("login")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                mode === "login"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Log In
            </button>
          </div>

          {mode === "signup" ? (
            <SignupCard onContinue={() => router.push("/athlete/onboarding")} />
          ) : (
            <LoginCard onLogin={() => router.push("/athlete/dashboard")} />
          )}
        </div>
      </div>
    </div>
  );
}

function SignupCard({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Join as a Player</h2>
        <p className="text-slate-500 text-sm">It takes 5 minutes. Manual KYC ensures only verified players get listed.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-slate-700">Full Name</label>
          <input
            id="signup-name"
            type="text"
            placeholder="As per Aadhaar card"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all font-medium"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-slate-700">Mobile Number</label>
          <div className="flex gap-2">
            <span className="border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-500 font-medium bg-slate-50">+91</span>
            <input
              id="signup-phone"
              type="tel"
              placeholder="9876543210"
              className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all font-medium"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-slate-700">Primary Sport</label>
          <select
            id="signup-sport"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all font-medium bg-white"
          >
            <option value="">Select your primary sport</option>
            <option>Cricket</option>
            <option>Football</option>
            <option>Hockey (Field)</option>
            <option>Badminton</option>
            <option>Athletics</option>
            <option>Wrestling</option>
            <option>Boxing</option>
            <option>Kabaddi</option>
            <option>Shooting</option>
            <option>Archery</option>
            <option>Table Tennis</option>
            <option>Tennis</option>
            <option>Weightlifting</option>
            <option>Swimming</option>
            <option>Gymnastics</option>
            <option>Chess</option>
            <option>Squash</option>
            <option>Volleyball</option>
            <option>Basketball</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <button
        id="signup-continue-btn"
        onClick={onContinue}
        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
      >
        Continue to KYC Onboarding <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-center text-xs text-slate-400">
        By continuing, you agree to DeshKa Athlete&apos;s Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}

function LoginCard({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Welcome back</h2>
        <p className="text-slate-500 text-sm">
          Log in to your player dashboard to manage bookings and earnings.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-slate-700">Mobile Number</label>
          <div className="flex gap-2">
            <span className="border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-500 font-medium bg-slate-50">+91</span>
            <input
              id="login-phone"
              type="tel"
              placeholder="9876543210"
              className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all font-medium"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-slate-700">OTP / Password</label>
          <input
            id="login-otp"
            type="password"
            placeholder="Enter OTP"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all font-medium"
          />
        </div>
      </div>

      <button
        id="login-btn"
        onClick={onLogin}
        className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
      >
        Log In to Dashboard <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-center text-xs text-slate-400">
        Don&apos;t have an account?{" "}
        <button className="text-green-600 font-bold hover:underline">Sign up as a player</button>
      </p>
    </div>
  );
}
