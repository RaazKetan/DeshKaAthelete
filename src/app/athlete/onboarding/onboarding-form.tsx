"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileUp,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";

import { onboardAthlete } from "@/app/actions/athlete";
import Alert from "@/components/Alert";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { Card, CardBody } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

const SPORTS = [
  "Cricket","Football","Hockey (Field)","Badminton","Athletics","Wrestling","Boxing","Kabaddi","Shooting","Archery",
  "Table Tennis","Tennis","Weightlifting","Swimming","Gymnastics","Chess","Squash","Volleyball","Basketball","Judo",
  "Taekwondo","Cycling","Rowing","Sailing","Golf","Other",
];

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

interface Props {
  initialName: string;
  initialSport: string;
  initialPricing: number;
}

function validateStep1(d: { name: string; sport: string; aadhaarLastFour: string }) {
  const e: Record<string, string> = {};
  if (!d.name.trim() || d.name.trim().length < 2) e.name = "At least 2 characters.";
  if (!d.sport) e.sport = "Select your primary sport.";
  if (d.aadhaarLastFour && !/^\d{4}$/.test(d.aadhaarLastFour)) e.aadhaarLastFour = "Must be exactly 4 digits.";
  return e;
}

function validateStep4(d: { pricingSession: string }) {
  const e: Record<string, string> = {};
  const v = parseInt(d.pricingSession);
  if (isNaN(v) || v < 5000) e.pricingSession = "Minimum session fee is ₹5,000.";
  else if (v > 200000) e.pricingSession = "Maximum session fee is ₹2,00,000.";
  return e;
}

export default function AthleteOnboardingForm({ initialName, initialSport, initialPricing }: Props) {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const [data, setData] = useState({
    name: initialName,
    sport: initialSport,
    aadhaarLastFour: "",
    federationId: "",
    kheloIndiaId: "",
    pricingSession: String(initialPricing || 15000),
    availableDays: [] as string[],
    city: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const toggleDay = (day: string) => {
    setData((d) => ({
      ...d,
      availableDays: d.availableDays.includes(day)
        ? d.availableDays.filter((x) => x !== day)
        : [...d.availableDays, day],
    }));
  };

  function next() {
    let e: Record<string, string> = {};
    if (step === 1) e = validateStep1(data);
    if (step === 4) e = validateStep4(data);
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setStep((s) => s + 1);
  }

  function back() {
    setErrors({});
    setStep((s) => s - 1);
  }

  async function submit() {
    const e = validateStep4(data);
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSubmitting(true);
    setErrorMsg("");
    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("sport", data.sport);
    fd.append("aadhaarLastFour", data.aadhaarLastFour);
    fd.append("federationId", data.federationId);
    fd.append("kheloIndiaId", data.kheloIndiaId);
    fd.append("pricingSession", data.pricingSession);
    try {
      await onboardAthlete(fd);
      router.push("/athlete/dashboard");
    } catch (err: any) {
      setErrorMsg(err.message || "Error submitting profile.");
    } finally {
      setSubmitting(false);
    }
  }

  const federationHint = FEDERATION_HINTS[data.sport] || "Your national federation registration ID";
  const pricingNum = parseInt(data.pricingSession || "15000");
  const payout = Math.round(pricingNum * 0.88);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {errorMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-md shadow-lg">
          <Alert type="error" message={errorMsg} onClose={() => setErrorMsg("")} />
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200">
        <Container size="sm" className="flex h-14 items-center justify-between">
          <Logo />
          <p className="text-xs font-medium text-slate-500">
            Step {step} of {STEPS.length}
          </p>
        </Container>
      </header>

      {/* Progress */}
      <div className="bg-white border-b border-slate-200">
        <Container size="sm" className="py-5">
          <div className="flex items-center gap-3">
            {STEPS.map((s, i) => {
              const num = i + 1;
              const status: "done" | "active" | "pending" = num < step ? "done" : num === step ? "active" : "pending";
              return (
                <div key={s.label} className="flex items-center gap-3 flex-1">
                  <span className={`step-dot ${status} shrink-0`}>
                    {status === "done" ? "✓" : num}
                  </span>
                  <p className={`text-xs font-medium hidden sm:block ${status === "active" ? "text-slate-900" : status === "done" ? "text-emerald-600" : "text-slate-400"}`}>
                    {s.label}
                  </p>
                  {i < STEPS.length - 1 && (
                    <span className={`hidden sm:block flex-1 h-px ${status === "done" ? "bg-emerald-500" : "bg-slate-200"}`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="sm:hidden mt-3 h-1 rounded-full bg-slate-200 overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }} />
          </div>
        </Container>
      </div>

      <Container size="sm" className="pt-12 max-w-xl">
        {step === 1 && (
          <div className="space-y-8 animate-rise-in">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.02em] text-slate-900">Confirm your identity</h1>
              <p className="mt-2 text-slate-500">
                We pre-filled your name and sport from sign-up. Update if needed, then add Aadhaar details.
              </p>
            </div>

            <Card>
              <CardBody className="space-y-5">
                <Field label="Full name" hint="As per Aadhaar card" error={errors.name}>
                  <Input
                    value={data.name}
                    onChange={(e) => { setData({ ...data, name: e.target.value }); if (errors.name) setErrors((p) => ({ ...p, name: "" })); }}
                    placeholder="e.g. Sunil Kumar"
                    invalid={!!errors.name}
                  />
                </Field>

                <Field label="Primary sport" error={errors.sport}>
                  <Select
                    value={data.sport}
                    onChange={(e) => { setData({ ...data, sport: e.target.value }); if (errors.sport) setErrors((p) => ({ ...p, sport: "" })); }}
                    invalid={!!errors.sport}
                  >
                    <option value="">— Select your sport —</option>
                    {SPORTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </Field>

                <Field
                  label="Aadhaar — last 4 digits"
                  optional
                  hint="Used for identity verification only. Never displayed publicly."
                  error={errors.aadhaarLastFour}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-slate-400 tracking-widest">XXXX-XXXX-</span>
                    <Input
                      inputMode="numeric"
                      maxLength={4}
                      value={data.aadhaarLastFour}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                        setData({ ...data, aadhaarLastFour: v });
                        if (errors.aadhaarLastFour) setErrors((p) => ({ ...p, aadhaarLastFour: "" }));
                      }}
                      placeholder="1234"
                      className="font-mono tracking-widest"
                      invalid={!!errors.aadhaarLastFour}
                    />
                  </div>
                </Field>

                <Field label="City / state" optional>
                  <Input
                    value={data.city}
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                    placeholder="e.g. Pune, Maharashtra"
                  />
                </Field>
              </CardBody>
            </Card>

            <Button onClick={next} size="lg" variant="dark" fullWidth rightIcon={<ArrowRight className="h-4 w-4" />}>
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-rise-in">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.02em] text-slate-900">Your credentials</h1>
              <p className="mt-2 text-slate-500">
                Federation IDs fast-track your verification — they're what makes you trustworthy to schools.
              </p>
            </div>

            <Card>
              <CardBody className="space-y-5">
                <Field
                  label="Federation registration ID"
                  hint={`e.g. ${federationHint}`}
                  rightSlot={
                    data.sport ? (
                      <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        {data.sport}
                      </span>
                    ) : null
                  }
                >
                  <Input
                    value={data.federationId}
                    onChange={(e) => setData({ ...data, federationId: e.target.value })}
                    placeholder={federationHint}
                  />
                </Field>

                <Field label="Khelo India ID" optional>
                  <Input
                    value={data.kheloIndiaId}
                    onChange={(e) => setData({ ...data, kheloIndiaId: e.target.value })}
                    placeholder="e.g. KI/2021/890"
                  />
                </Field>
              </CardBody>
            </Card>

            <div className="flex items-start gap-3 rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-600">
              <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
              <p>
                Providing Federation and Khelo India IDs cuts verification from 5–7 days to 24–48 hours.
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={back} variant="outline" size="lg" leftIcon={<ArrowLeft className="h-4 w-4" />}>
                Back
              </Button>
              <Button onClick={next} variant="dark" size="lg" fullWidth rightIcon={<ArrowRight className="h-4 w-4" />}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-rise-in">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.02em] text-slate-900">Upload certificates</h1>
              <p className="mt-2 text-slate-500">
                Upload your highest sporting achievement — National Games medal, SAI letter, or international participation certificate.
              </p>
            </div>

            <label htmlFor="cert-upload" className="block">
              <div className="rounded-xl border-2 border-dashed border-slate-300 bg-white px-8 py-12 text-center hover:border-emerald-400 hover:bg-emerald-50/30 transition cursor-pointer">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <FileUp className="h-5 w-5 text-slate-500" />
                </span>
                <p className="mt-4 text-sm font-medium text-slate-900">Click to upload PDF or image</p>
                <p className="mt-1 text-xs text-slate-500">Official certificates only · Max 5MB</p>
                <input id="cert-upload" type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
              </div>
            </label>

            <Card>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-900">National_Certificate_2023.pdf</p>
                    <p className="text-xs text-slate-500">1.4 MB · Uploaded</p>
                  </div>
                </div>
                <button className="text-xs font-medium text-rose-600 hover:text-rose-700">Remove</button>
              </div>
            </Card>

            <div className="flex items-start gap-3 rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-600">
              <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
              <p>
                Documents are used only for manual KYC by the Crests team.
                <strong className="text-slate-900"> Never shared publicly or with schools.</strong>
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={back} variant="outline" size="lg" leftIcon={<ArrowLeft className="h-4 w-4" />}>
                Back
              </Button>
              <Button onClick={next} variant="dark" size="lg" fullWidth rightIcon={<ArrowRight className="h-4 w-4" />}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8 animate-rise-in">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.02em] text-slate-900">Pricing &amp; availability</h1>
              <p className="mt-2 text-slate-500">
                Set your fee and tell schools when you're available. You can edit this anytime from your profile.
              </p>
            </div>

            <Card>
              <CardBody className="space-y-6">
                <Field
                  label="Session fee"
                  hint={`Platform suggests ₹${pricingNum.toLocaleString("en-IN")} for ${data.sport || "your sport"}. Min ₹5,000 · Max ₹2,00,000`}
                  error={errors.pricingSession}
                >
                  <div className={`flex items-center rounded-lg border bg-white px-3 ${errors.pricingSession ? "border-rose-300" : "border-slate-200"}`}>
                    <IndianRupee className="h-4 w-4 text-slate-400 shrink-0" />
                    <input
                      type="number"
                      inputMode="numeric"
                      min={5000}
                      max={200000}
                      step={1000}
                      value={data.pricingSession}
                      onChange={(e) => {
                        setData({ ...data, pricingSession: e.target.value });
                        if (errors.pricingSession) setErrors((p) => ({ ...p, pricingSession: "" }));
                      }}
                      className="flex-1 h-11 px-2 text-base font-medium text-slate-900 bg-transparent focus:outline-none"
                    />
                    <span className="text-xs font-medium text-slate-500 ml-2">INR / 60 min</span>
                  </div>
                </Field>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <p className="text-sm font-medium text-slate-700">Available days</p>
                  <div className="flex flex-wrap gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                      const active = data.availableDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          className={`px-3.5 h-9 rounded-md text-xs font-semibold border transition-colors ${
                            active
                              ? "bg-slate-900 text-white border-slate-900"
                              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardBody>
            </Card>

            <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-5 py-4">
              <p className="text-sm font-medium text-emerald-900">How payments work</p>
              <p className="mt-1 text-sm text-emerald-800/90 leading-relaxed">
                Schools pay the full fee into escrow on booking. We deduct a 12% platform fee and release the rest to you within 48 hours of session completion.
              </p>
              <p className="mt-3 text-sm font-semibold text-emerald-900">
                Your payout: ₹{payout.toLocaleString("en-IN")} per session
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={back} variant="outline" size="lg" disabled={submitting} leftIcon={<ArrowLeft className="h-4 w-4" />}>
                Back
              </Button>
              <Button onClick={submit} size="lg" fullWidth disabled={submitting}>
                {submitting ? "Submitting…" : "Submit profile"}
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
