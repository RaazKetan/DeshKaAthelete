"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, ChevronRight, ShieldCheck, Award, ArrowRight } from "lucide-react";
import { registerSchool, loginSchool } from "@/app/actions/schoolAuth";
import BackButton from "@/components/BackButton";
import Alert from "@/components/Alert";

const HIGHLIGHTS = [
  { icon: ShieldCheck, text: "Access 100+ KYC-verified athletes" },
  { icon: Award, text: "Zero financial risk with escrow" },
  { icon: Building2, text: "Join 500+ premium institutions" },
];

export default function SchoolAuth() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-white border-r border-slate-200 relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px]" />

        <Link href="/" className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-black text-lg text-white shadow-md shadow-indigo-500/20">
            DA
          </div>
          <span className="font-extrabold text-xl text-slate-900 tracking-tight">DeshKa Athlete</span>
        </Link>

        <div className="relative z-10 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
              <Building2 className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">School Portal</span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
              Bring India&apos;s greatest<br />
              <span className="text-indigo-600">to your classrooms.</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed max-w-md">
              Securely book Olympians and national champions backed by our 100% Escrow safe-guard.
            </p>
          </div>

          <div className="space-y-4">
            {HIGHLIGHTS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-indigo-600" />
                </div>
                <p className="text-slate-700 font-semibold text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="text-slate-600 text-sm italic leading-relaxed mb-3">
            &quot;The platform removed all guesswork. We instantly connected with an Asian Games medalist and the escrow system protected our budget.&quot;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 text-xs font-bold">
              RP
            </div>
            <div>
              <p className="text-slate-900 text-sm font-bold">Ryan Principal</p>
              <p className="text-slate-500 text-xs">Ryan International School</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Auth Panel */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 bg-slate-50">
        <div className="w-full max-w-md">
          <BackButton />
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-10 mt-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-black text-white">DA</div>
            <span className="font-bold text-lg text-slate-900">DeshKa Athlete</span>
          </Link>

          {/* Toggle */}
          <div className="flex bg-slate-200/50 rounded-xl p-1 mb-8">
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${mode === "signup" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Register School
            </button>
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${mode === "login" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              School Login
            </button>
          </div>

          {mode === "signup" ? <SignupCard router={router} /> : <LoginCard router={router} />}
        </div>
      </div>
    </div>
  );
}

function SignupCard({ router }: { router: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await registerSchool(new FormData(e.currentTarget));
      router.push("/school/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSignup} className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Register your Institution</h2>
        <p className="text-slate-500 text-sm">Join the network and book verified athletes safely.</p>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-slate-700">Institution Name</label>
          <input name="name" required type="text" placeholder="E.g., Delhi Public School"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-slate-700">City</label>
          <input name="city" required type="text" placeholder="E.g., Bangalore"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-slate-700">Contact Number</label>
          <div className="flex gap-2">
            <span className="border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-500 font-medium bg-slate-50">+91</span>
            <input name="contact" required type="tel" placeholder="9876543210"
              className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
          </div>
          <p className="text-xs text-slate-400">This will be your login ID.</p>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-slate-700">Password</label>
          <input name="password" required type="password" placeholder="Create a strong password"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
        </div>
      </div>

      <button type="submit" disabled={loading}
        className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all disabled:opacity-50">
        {loading ? "Creating Account..." : "Register Institution"} <ChevronRight className="w-4 h-4" />
      </button>
      <p className="text-center text-xs text-slate-400">By registering, you agree to DeshKa Athlete&apos;s Policy terms.</p>
    </form>
  );
}

function LoginCard({ router }: { router: any }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await loginSchool(new FormData(e.currentTarget));
      router.push("/school/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Welcome back</h2>
        <p className="text-slate-500 text-sm">Log in to your school portal to manage sessions and escrows.</p>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-slate-700">Contact Number</label>
          <div className="flex gap-2">
            <span className="border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-500 font-medium bg-slate-50">+91</span>
            <input name="contact" required type="tel" placeholder="9876543210"
              className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-slate-700">Password</label>
          <input name="password" required type="password" placeholder="Enter your password"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
        </div>
      </div>

      <button type="submit" disabled={loading}
        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50">
        {loading ? "Logging in..." : "Log In to Portal"} <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
