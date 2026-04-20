"use client";

import { useState, Suspense } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileUp,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { onboardAthlete } from "@/app/actions/athlete";
import Link from "next/link";
import Alert from "@/components/Alert";

// Wrap in Suspense so Next.js can statically prerender the shell
export default function AthleteOnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <AthleteOnboarding />
    </Suspense>
  );
}


const SPORTS = [
  "Cricket", "Football", "Hockey (Field)", "Badminton", "Athletics",
  "Wrestling", "Boxing", "Kabaddi", "Shooting", "Archery",
  "Table Tennis", "Tennis", "Weightlifting", "Swimming", "Gymnastics",
  "Chess", "Squash", "Volleyball", "Basketball", "Judo",
  "Taekwondo", "Cycling", "Rowing", "Sailing", "Golf", "Other",
];

// Map sport → federation body for helpful hints
const FEDERATION_HINTS: Record<string, string> = {
  Cricket: "BCCI ID (e.g. MH/CR/4521)",
  Football: "AIFF Number (e.g. IN/FB/7823)",
  "Hockey (Field)": "Hockey India ID",
  Badminton: "BAI Registration Number",
  Athletics: "AFI Number (e.g. MH/1234/AFI)",
  Wrestling: "WFI Registration ID",
  Boxing: "BFI ID",
  Kabaddi: "Amateur Kabaddi Federation ID",
  Shooting: "NRAI License Number",
  Archery: "AAI Registration ID",
  "Table Tennis": "TTFI ID",
  Tennis: "AITA ID",
  Weightlifting: "IWLF ID",
  Swimming: "Swimming Federation of India ID",
  Gymnastics: "GFI ID",
};

const STEPS = [
  { label: "Identity" },
  { label: "Credentials" },
  { label: "Certificates" },
  { label: "Pricing" },
];

function AthleteOnboarding() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const usernameParam = searchParams.get("username") || "";

  const [formData, setFormData] = useState({
    username: usernameParam,
    name: "",
    sport: "",
    aadhaarLastFour: "",
    federationId: "",
    kheloIndiaId: "",
    pricingSession: "15000",
    availableDays: [] as string[],
    city: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const toggleDay = (day: string) => {
    setFormData((f) => ({
      ...f,
      availableDays: f.availableDays.includes(day)
        ? f.availableDays.filter((d) => d !== day)
        : [...f.availableDays, day],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMsg("");
    const data = new FormData();
    data.append("username", formData.username);
    data.append("name", formData.name);
    data.append("sport", formData.sport);
    data.append("aadhaarLastFour", formData.aadhaarLastFour);
    data.append("federationId", formData.federationId);
    data.append("kheloIndiaId", formData.kheloIndiaId);
    data.append("pricingSession", formData.pricingSession);
    try {
      await onboardAthlete(data);
      router.push("/athlete/dashboard");
    } catch (e: any) {
      console.error(e);
      setErrorMsg(e.message || "Error submitting profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const federationHint =
    FEDERATION_HINTS[formData.sport] || "Your national federation registration ID";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 selection:bg-green-500/30">
      {errorMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md shadow-2xl">
          <Alert type="error" message={errorMsg} onClose={() => setErrorMsg("")} />
        </div>
      )}
      {/* Top Nav */}
      <nav className="sticky top-0 w-full z-50 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold tracking-tight text-slate-900 text-sm">
            DeshKa Athlete
          </Link>
          <div className="text-sm font-semibold text-slate-400">
            Step {step} of {STEPS.length}
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-100 pb-4 pt-4">
        <div className="max-w-3xl mx-auto px-6">
          {/* Step dots */}
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => {
              const num = i + 1;
              const status = num < step ? "done" : num === step ? "active" : "pending";
              return (
                <div key={s.label} className="flex items-center gap-2 flex-1">
                  <div className={`step-dot ${status} shrink-0`}>
                    {status === "done" ? "✓" : num}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-xs font-bold hidden sm:block ${
                        status === "active"
                          ? "text-slate-900"
                          : status === "done"
                          ? "text-green-600"
                          : "text-slate-400"
                      }`}
                    >
                      {s.label}
                    </p>
                    {i < STEPS.length - 1 && (
                      <div className="h-0.5 mt-1 rounded-full bg-slate-200 hidden sm:block">
                        <div
                          className="h-full rounded-full bg-slate-900 transition-all duration-500"
                          style={{ width: status === "done" ? "100%" : "0%" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Full progress bar for mobile */}
          <div className="mt-3 sm:hidden h-1.5 bg-slate-200 rounded-full">
            <div
              className="h-full bg-green-600 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 pt-10 pb-8">

        {/* ─── Step 1: Identity ─── */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Your identity</h1>
              <p className="text-slate-500">
                Tell us who you are and what sport you play. This is the foundation of your verified profile.
              </p>
            </div>

            <div className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">
                  Full Name <span className="text-slate-400 font-normal">(as per Aadhaar)</span>
                </label>
                <input
                  id="onboard-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sunil Kumar"
                  className="w-full border-b-2 border-slate-200 bg-transparent px-2 py-3 focus:outline-none focus:border-slate-900 text-slate-900 font-medium transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Primary Sport</label>
                <select
                  id="onboard-sport"
                  value={formData.sport}
                  onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                  className="w-full border-b-2 border-slate-200 bg-transparent px-2 py-3 focus:outline-none focus:border-slate-900 text-slate-900 font-medium transition-colors"
                >
                  <option value="">— Select your sport —</option>
                  {SPORTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Aadhaar Last 4 Digits</label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 font-mono tracking-widest text-sm">
                    XXXX-XXXX-
                  </span>
                  <input
                    id="onboard-aadhaar"
                    type="text"
                    maxLength={4}
                    value={formData.aadhaarLastFour}
                    onChange={(e) => setFormData({ ...formData, aadhaarLastFour: e.target.value })}
                    placeholder="1234"
                    className="w-full border-b-2 border-slate-200 bg-transparent pl-32 pr-2 py-3 focus:outline-none focus:border-slate-900 text-slate-900 font-medium font-mono tracking-widest transition-colors"
                  />
                </div>
                <p className="text-xs text-slate-400">Used for identity verification only. Never displayed publicly.</p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">City / State</label>
                <input
                  id="onboard-city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Pune, Maharashtra"
                  className="w-full border-b-2 border-slate-200 bg-transparent px-2 py-3 focus:outline-none focus:border-slate-900 text-slate-900 font-medium transition-colors"
                />
              </div>
            </div>

            <button
              id="onboard-step1-next"
              onClick={handleNext}
              disabled={!formData.name || !formData.sport}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-40 transition-colors"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ─── Step 2: Credentials ─── */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Your credentials</h1>
              <p className="text-slate-500">
                Federation IDs help us fast-track your verification. This is what makes you trustworthy to schools.
              </p>
            </div>

            <div className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">
                  Federation Registration ID
                  {formData.sport && (
                    <span className="ml-2 text-xs font-normal text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      {formData.sport}
                    </span>
                  )}
                </label>
                <input
                  id="onboard-federation"
                  type="text"
                  value={formData.federationId}
                  onChange={(e) => setFormData({ ...formData, federationId: e.target.value })}
                  placeholder={federationHint}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900 font-medium transition-all"
                />
                <p className="text-xs text-slate-500">e.g. {federationHint}</p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <label className="block text-sm font-bold text-slate-700">
                  Khelo India ID{" "}
                  <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="onboard-khelo"
                  type="text"
                  value={formData.kheloIndiaId}
                  onChange={(e) => setFormData({ ...formData, kheloIndiaId: e.target.value })}
                  placeholder="e.g. KI/2021/890"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900 font-medium transition-all"
                />
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-sm text-blue-800">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  Providing your Federation ID and Khelo India ID significantly speeds up verification
                  (typically 24–48 hours vs. 5–7 days for manual review).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                id="onboard-step2-back"
                onClick={handleBack}
                className="w-1/3 bg-slate-100 text-slate-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                id="onboard-step2-next"
                onClick={handleNext}
                className="w-2/3 bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 3: Certificates ─── */}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Upload certificates</h1>
              <p className="text-slate-500">
                Upload your highest sporting achievement — National Games medal, SAI letter, or international
                participation certificate. This is what schools look at.
              </p>
            </div>

            <div className="space-y-5">
              {/* Upload Zone */}
              <label
                htmlFor="cert-upload"
                className="border-2 border-dashed border-slate-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-green-300 transition-all cursor-pointer bg-white group"
              >
                <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-50 transition-colors">
                  <FileUp className="w-7 h-7 text-slate-400 group-hover:text-green-600 transition-colors" />
                </div>
                <p className="font-bold text-slate-700 mb-1">Click to upload PDF or Image</p>
                <p className="text-sm text-slate-400">Official certificates only. Max 5MB per file.</p>
                <input id="cert-upload" type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
              </label>

              {/* Mock uploaded file */}
              <div className="bg-white p-4 rounded-xl border border-green-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">National_Certificate_2023.pdf</p>
                    <p className="text-xs text-slate-400">1.4 MB · Uploaded</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors">
                  Remove
                </button>
              </div>

              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-3 text-sm text-blue-800">
                <ShieldCheck className="w-5 h-5 shrink-0 text-blue-600" />
                <p>
                  Documents are strictly used for manual KYC by the DeshKa Athlete team and{" "}
                  <strong>are never shared publicly or with schools</strong>.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                id="onboard-step3-back"
                onClick={handleBack}
                className="w-1/3 bg-slate-100 text-slate-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                id="onboard-step3-next"
                onClick={handleNext}
                className="w-2/3 bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 4: Pricing & Availability ─── */}
        {step === 4 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Pricing & availability</h1>
              <p className="text-slate-500">
                Set your session fee and tell schools when you&apos;re available. You can always edit this later from your profile.
              </p>
            </div>

            <div className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              {/* Pricing slider */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700">
                  Session Fee <span className="text-slate-400 font-normal">(per 60-min session)</span>
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-slate-400" />
                    <input
                      id="onboard-pricing"
                      type="number"
                      min={5000}
                      max={200000}
                      step={1000}
                      value={formData.pricingSession}
                      onChange={(e) => setFormData({ ...formData, pricingSession: e.target.value })}
                      className="bg-transparent flex-1 focus:outline-none font-bold text-slate-900 text-lg"
                    />
                  </div>
                  <span className="text-sm text-slate-500 font-medium shrink-0">INR</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Min: ₹5,000</span>
                  <span className="text-green-600 font-semibold">
                    Platform suggests ₹{parseInt(formData.pricingSession || "15000").toLocaleString()} for {formData.sport || "your sport"}
                  </span>
                  <span>Max: ₹2,00,000</span>
                </div>
              </div>

              {/* Available days */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-sm font-bold text-slate-700">
                  Available Days <span className="text-slate-400 font-normal">(schools will see this)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <button
                      key={day}
                      id={`day-${day}`}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                        formData.availableDays.includes(day)
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform fee note */}
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-sm text-green-900 space-y-1">
                <p className="font-bold">How payments work</p>
                <p className="text-green-700">
                  Schools pay the full session fee into escrow when booking. DeshKa Athlete deducts a 12%
                  platform fee and releases the rest to you within 48 hours of session completion.
                </p>
                <p className="font-bold text-green-700 mt-2">
                  Your payout: ₹{Math.round(parseInt(formData.pricingSession || "15000") * 0.88).toLocaleString()} per session
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                id="onboard-step4-back"
                onClick={handleBack}
                disabled={isSubmitting}
                className="w-1/3 bg-slate-100 text-slate-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 disabled:opacity-40 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                id="onboard-submit-btn"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-2/3 bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 disabled:opacity-40 transition-colors shadow-md shadow-green-600/20"
              >
                {isSubmitting ? "Submitting..." : "Submit Profile →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
