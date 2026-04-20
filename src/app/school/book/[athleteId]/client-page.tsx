"use client";

import { useState } from "react";
import { ArrowLeft, ShieldCheck, CreditCard, CalendarDays, Clock, Trophy, Users, Building2 } from "lucide-react";
import Link from "next/link";
import { createBooking } from "@/app/actions/booking";
import { useRouter } from "next/navigation";
import Alert from "@/components/Alert";

// Client Component to handle form submission
export default function SchoolBookAthleteClient({
  athlete
}: {
  athlete: any
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{type: "error" | "success" | "info", message: string} | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setAlertInfo(null);
    const formData = new FormData(event.currentTarget);
    try {
      await createBooking(formData, athlete.id);
      setAlertInfo({ type: "success", message: "Booking Request Sent to Escrow!" });
      setTimeout(() => {
        router.push("/school/dashboard");
      }, 1500);
    } catch (e: any) {
      console.error(e);
      setAlertInfo({ type: "error", message: e.message || "Failed to submit request." });
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 selection:bg-green-500/30">
      {alertInfo && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md shadow-2xl animate-in slide-in-from-top-4 fade-in duration-300">
          <Alert type={alertInfo.type} message={alertInfo.message} onClose={() => setAlertInfo(null)} />
        </div>
      )}
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-slate-50/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center">
          <Link href="/school/athletes" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-slate-600 hover:text-slate-900 font-medium">
            <ArrowLeft className="w-5 h-5" />
            Back to Directory
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-12 pb-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left Column: Form */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Request Session with {athlete.name}</h1>
          <p className="text-slate-500 mb-8">Fill out the details below so the athlete has context before accepting.</p>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            
            {/* Session Type */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700">Session Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="cursor-pointer">
                  <input type="radio" name="type" value="Talk" className="peer sr-only" defaultChecked />
                  <div className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50 peer-checked:border-green-500 peer-checked:bg-green-50 transition-all text-center">
                    <p className="font-semibold text-slate-900">Talk</p>
                    <p className="text-xs text-slate-500 mt-1">Motivation</p>
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" name="type" value="Workshop" className="peer sr-only" />
                  <div className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50 peer-checked:border-green-500 peer-checked:bg-green-50 transition-all text-center">
                    <p className="font-semibold text-slate-900">Workshop</p>
                    <p className="text-xs text-slate-500 mt-1">Interactive</p>
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" name="type" value="Training" className="peer sr-only" />
                  <div className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50 peer-checked:border-green-500 peer-checked:bg-green-50 transition-all text-center">
                    <p className="font-semibold text-slate-900">Training</p>
                    <p className="text-xs text-slate-500 mt-1">On-ground</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-slate-400" /> Proposed Date
                </label>
                <input type="date" name="date" required className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-700" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" /> Time (IST)
                </label>
                <input type="time" name="time" required className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-700" />
              </div>
            </div>

            {/* School Context (NEW FIELDS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400" /> School Type / Board
                </label>
                <select name="schoolType" required className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-700 bg-white">
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="State Board">State Board</option>
                  <option value="University">University/College</option>
                  <option value="Private Sports Academy">Private Sports Academy</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" /> Est. Audience Size
                </label>
                <input type="number" name="audienceSize" required placeholder="e.g. 500" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-700" />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <label className="block text-sm font-bold text-slate-700">Message to Athlete</label>
              <textarea 
                name="schoolNote"
                rows={4}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-700 placeholder:text-slate-400"
                placeholder="Give a brief overview of your school and what you expect from this session..."
              ></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className="bg-gradient-to-br from-green-600 to-green-500 text-white shadow-[0_4px_20px_rgba(22,163,74,0.3)] hover:shadow-[0_8px_30px_rgba(22,163,74,0.4)] transition-all hover:-translate-y-1 rounded-full font-bold w-full py-4 text-lg mt-4 flex items-center justify-center gap-2">
               {isSubmitting ? "Loading..." : "Deposit to Escrow & Request"}
            </button>
            <p className="text-xs text-center text-slate-500 mt-3 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Amount securely held in Trust Escrow until session is completed.
            </p>
          </form>
        </div>

        {/* Right Column: Summary Card */}
        <div>
          <div className="sticky top-28 bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-premium">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-2xl font-bold text-green-400">
                {athlete.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg">{athlete.name}</h3>
                <div className="flex items-center gap-1 text-sm bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full mt-1 border border-green-500/20 w-max">
                  <ShieldCheck className="w-3 h-3" /> Aadhaar Verified
                </div>
              </div>
            </div>

            <div className="mb-6 space-y-2">
               {athlete.achievements && athlete.achievements.map((ach: any, i: number) => (
                 <div key={ach.id ?? i} className="flex gap-2 items-start text-sm text-white/70">
                   <Trophy className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                   {ach.title ?? ach}
                 </div>
               ))}
            </div>

            <div className="border-t border-white/10 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Base Fee (60 mins)</span>
                <span className="font-medium">₹{Number(athlete.pricingSession).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-white/40 pt-2 border-t border-white/10">
                <span>GST (18%)</span>
                <span>₹{(Number(athlete.pricingSession) * 0.18).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                <span>Total to Escrow</span>
                <span className="text-green-400">₹{(Number(athlete.pricingSession) * 1.18).toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 bg-white/5 rounded-xl p-4 flex gap-3 border border-white/10">
              <CreditCard className="w-8 h-8 text-white/40 shrink-0" />
              <p className="text-xs text-white/60 leading-relaxed">
                By proceeding, you agree to our <span className="underline cursor-pointer text-white">Cancellation Policy</span>. Funds will be refunded if the athlete rejects or misses the event.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
