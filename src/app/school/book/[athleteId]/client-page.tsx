"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  CalendarDays,
  Clock,
  Trophy,
  Users,
  Building2,
} from "lucide-react";

import { createBooking } from "@/app/actions/booking";
import Alert from "@/components/Alert";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { Card, CardBody } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

function validate(fd: FormData) {
  const errors: Record<string, string> = {};

  const dateStr = fd.get("date") as string;
  const timeStr = fd.get("time") as string;
  const note    = (fd.get("schoolNote") as string).trim();
  const size    = fd.get("audienceSize") as string;

  if (!dateStr) {
    errors.date = "Select a date.";
  } else {
    const selected = new Date(`${dateStr}T00:00:00`);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (selected < today) errors.date = "Booking date must be today or later.";
  }
  if (!timeStr) errors.time = "Select a time.";
  if (!size || parseInt(size) < 1) errors.audienceSize = "Audience must be at least 1.";
  else if (parseInt(size) > 10000) errors.audienceSize = "Audience size seems too large.";
  if (note.length < 10) errors.schoolNote = "Add at least a brief message (10+ characters).";

  return errors;
}

export default function SchoolBookAthleteClient({ athlete }: { athlete: any }) {
  const [submitting, setSubmitting] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{ type: "error" | "success" | "info"; message: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAlertInfo(null);

    const fd = new FormData(e.currentTarget);
    const errs = validate(fd);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const first = Object.keys(errs)[0];
      document.getElementById(`field-${first}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const { checkoutUrl } = await createBooking(fd, athlete.id);
      window.location.href = checkoutUrl;
    } catch (err: any) {
      console.error(err);
      setAlertInfo({ type: "error", message: err.message || "Failed to submit request." });
      setSubmitting(false);
    }
  }

  const base = Number(athlete.pricingSession);
  const gst = Math.round(base * 0.18);
  const total = base + gst;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {alertInfo && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-md shadow-lg">
          <Alert type={alertInfo.type} message={alertInfo.message} onClose={() => setAlertInfo(null)} />
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200">
        <Container className="flex h-14 items-center">
          <Link href="/school/athletes" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to directory
          </Link>
        </Container>
      </header>

      <Container size="lg" className="pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-semibold tracking-[-0.02em] text-slate-900">
              Request a session with {athlete.name}
            </h1>
            <p className="mt-2 text-slate-500">
              Fill in the details so the athlete has full context before accepting.
            </p>

            <form onSubmit={onSubmit} className="mt-10 space-y-6" noValidate>
              <Card>
                <CardBody className="space-y-6">
                  <Field label="Session type">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "Talk", title: "Talk", sub: "Motivation" },
                        { value: "Workshop", title: "Workshop", sub: "Interactive" },
                        { value: "Training", title: "Training", sub: "On-ground" },
                      ].map((opt, i) => (
                        <label key={opt.value} className="cursor-pointer">
                          <input
                            type="radio"
                            name="type"
                            value={opt.value}
                            className="peer sr-only"
                            defaultChecked={i === 0}
                          />
                          <div className="rounded-lg border border-slate-200 bg-white p-3.5 text-center transition peer-checked:border-emerald-500 peer-checked:bg-emerald-50/60 hover:border-slate-300">
                            <p className="text-sm font-semibold text-slate-900">{opt.title}</p>
                            <p className="mt-0.5 text-[11px] text-slate-500">{opt.sub}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </Field>

                  <div id="field-date" className="grid grid-cols-2 gap-4">
                    <Field
                      label="Proposed date"
                      error={errors.date}
                      rightSlot={<CalendarDays className="h-3.5 w-3.5 text-slate-400" />}
                    >
                      <Input
                        type="date"
                        name="date"
                        min={new Date().toISOString().split("T")[0]}
                        onChange={() => setErrors((p) => ({ ...p, date: "" }))}
                        invalid={!!errors.date}
                      />
                    </Field>
                    <Field
                      label="Time (IST)"
                      error={errors.time}
                      rightSlot={<Clock className="h-3.5 w-3.5 text-slate-400" />}
                    >
                      <Input
                        type="time"
                        name="time"
                        id="field-time"
                        onChange={() => setErrors((p) => ({ ...p, time: "" }))}
                        invalid={!!errors.time}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      label="School type / board"
                      rightSlot={<Building2 className="h-3.5 w-3.5 text-slate-400" />}
                    >
                      <Select name="schoolType" required defaultValue="CBSE">
                        <option value="CBSE">CBSE</option>
                        <option value="ICSE">ICSE</option>
                        <option value="State Board">State Board</option>
                        <option value="University">University / College</option>
                        <option value="Private Sports Academy">Private Sports Academy</option>
                      </Select>
                    </Field>
                    <Field
                      label="Audience size (est.)"
                      error={errors.audienceSize}
                      rightSlot={<Users className="h-3.5 w-3.5 text-slate-400" />}
                    >
                      <Input
                        type="number"
                        name="audienceSize"
                        id="field-audienceSize"
                        inputMode="numeric"
                        placeholder="e.g. 500"
                        min={1}
                        onChange={() => setErrors((p) => ({ ...p, audienceSize: "" }))}
                        invalid={!!errors.audienceSize}
                      />
                    </Field>
                  </div>

                  <Field
                    label="Message to athlete"
                    error={errors.schoolNote}
                    hint="Brief context about your school and what you'd love from this session."
                  >
                    <Textarea
                      name="schoolNote"
                      id="field-schoolNote"
                      rows={4}
                      placeholder="A quick overview of your school and what you'd love from this session…"
                      onChange={() => setErrors((p) => ({ ...p, schoolNote: "" }))}
                      invalid={!!errors.schoolNote}
                    />
                  </Field>
                </CardBody>
              </Card>

              <Button type="submit" size="lg" fullWidth disabled={submitting}>
                {submitting ? "Redirecting to payment…" : `Pay ₹${total.toLocaleString("en-IN")} & request session`}
              </Button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Funds held in trust escrow until session is confirmed delivered.
              </p>
            </form>
          </div>

          {/* Summary */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-slate-950 text-white border border-slate-800 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span className="h-12 w-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 grid place-items-center text-base font-semibold text-emerald-300">
                    {athlete.name.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-base font-semibold truncate">{athlete.name}</p>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                      <ShieldCheck className="h-3 w-3" /> Aadhaar verified
                    </p>
                  </div>
                </div>

                {athlete.achievements?.length ? (
                  <ul className="mt-5 space-y-2">
                    {athlete.achievements.map((a: any, i: number) => (
                      <li key={a.id ?? i} className="flex items-start gap-2 text-sm text-slate-300">
                        <Trophy className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{a.title ?? a}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="border-t border-white/10 p-6 space-y-2.5 text-sm">
                <Row label="Base fee (60 min)" value={`₹${base.toLocaleString("en-IN")}`} />
                <Row label="GST (18%)" value={`₹${gst.toLocaleString("en-IN")}`} muted />
                <div className="my-3 h-px bg-white/10" />
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-white/70">Total to escrow</span>
                  <span className="text-xl font-semibold text-emerald-400">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="border-t border-white/10 p-6 flex items-start gap-3 text-[12px] leading-relaxed text-slate-400">
                <CreditCard className="h-4 w-4 shrink-0 mt-0.5 text-slate-400" />
                <p>
                  By proceeding, you accept our cancellation policy. Funds are refunded if the athlete declines or doesn't show up.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between ${muted ? "text-white/50" : "text-white/80"}`}>
      <span className="text-sm">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
