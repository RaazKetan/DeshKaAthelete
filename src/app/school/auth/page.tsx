"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Award, Building2, ShieldCheck } from "lucide-react";

import AuthLayout from "@/components/AuthLayout";
import Alert from "@/components/Alert";
import { Button } from "@/components/ui/Button";
import { Field, Input, PrefixInput } from "@/components/ui/Field";
import { registerSchool, loginSchool } from "@/app/actions/schoolAuth";

const HIGHLIGHTS = [
  { icon: ShieldCheck, text: "Access 200+ KYC-verified Crests" },
  { icon: Award, text: "Zero financial risk via escrow" },
  { icon: Building2, text: "Trusted by 500+ schools across India" },
];

export default function SchoolAuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const router = useRouter();

  const side = (
    <div className="space-y-10 max-w-md">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-700">School portal</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.025em] leading-[1.1] text-slate-900">
          Bring the people who
          <br />
          <span className="text-emerald-600">earned the crest</span>
          <br />
          to your classrooms.
        </h1>
        <p className="mt-5 text-slate-600 leading-relaxed">
          Book Olympians and national champions today — with scientists, civil servants, and defence personnel coming next. Funds held in trust escrow until delivery.
        </p>
      </div>

      <ul className="space-y-3">
        {HIGHLIGHTS.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-sm text-slate-700">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white">
              <Icon className="h-3.5 w-3.5 text-emerald-600" />
            </span>
            {text}
          </li>
        ))}
      </ul>

      <figure className="rounded-xl border border-slate-200 bg-white p-5">
        <blockquote className="text-sm text-slate-700 leading-relaxed">
          “We invited an Asian Games medallist within a week — and the escrow workflow gave our finance team complete comfort.”
        </blockquote>
        <figcaption className="mt-4 flex items-center gap-3">
          <span className="h-8 w-8 rounded-full bg-slate-100 grid place-items-center text-xs font-semibold text-slate-700">RP</span>
          <div>
            <p className="text-sm font-medium text-slate-900">Ryan Principal</p>
            <p className="text-[11px] text-slate-500">Ryan International, Mumbai</p>
          </div>
        </figcaption>
      </figure>
    </div>
  );

  return (
    <AuthLayout side={side} tone="light">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {mode === "signup" ? "Register your institution" : "Welcome back"}
        </h2>
        <p className="mt-1.5 text-sm text-slate-500">
          {mode === "signup"
            ? "Join the network of 500+ schools booking verified Crests."
            : "Sign in to manage sessions and escrow."}
        </p>
      </div>

      <div className="grid grid-cols-2 rounded-lg bg-slate-100 p-1 mb-6 text-sm font-medium">
        <button
          onClick={() => setMode("signup")}
          className={`h-9 rounded-md transition-colors ${mode === "signup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
        >
          Register
        </button>
        <button
          onClick={() => setMode("login")}
          className={`h-9 rounded-md transition-colors ${mode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
        >
          Sign in
        </button>
      </div>

      {mode === "signup" ? <SignupCard router={router} /> : <LoginCard router={router} />}
    </AuthLayout>
  );
}

function SignupCard({ router }: { router: any }) {
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const strength = !password ? null : password.length < 8 ? "weak" : password.length < 12 ? "fair" : "strong";

  function validate(fd: FormData) {
    const e: Record<string, string> = {};
    const n = (fd.get("name") as string).trim();
    const c = (fd.get("city") as string).trim();
    const ph = fd.get("contact") as string;
    const pw = fd.get("password") as string;
    if (n.length < 2) e.name = "At least 2 characters.";
    if (c.length < 2) e.city = "Enter your city.";
    if (!/^\d{10}$/.test(ph.replace(/\s/g, ""))) e.contact = "Enter a 10-digit number.";
    if (pw.length < 8) e.password = "Use at least 8 characters.";
    return e;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errs = validate(fd);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setServerError(null);
    try {
      await registerSchool(fd);
      router.push("/school/dashboard");
    } catch (err: any) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {serverError && <Alert type="error" message={serverError} onClose={() => setServerError(null)} />}

      <Field label="Institution name" error={errors.name}>
        <Input
          name="name"
          required
          placeholder="e.g. Delhi Public School"
          onChange={() => setErrors((p) => ({ ...p, name: "" }))}
          invalid={!!errors.name}
        />
      </Field>

      <Field label="City" error={errors.city}>
        <Input
          name="city"
          required
          placeholder="e.g. Bangalore"
          onChange={() => setErrors((p) => ({ ...p, city: "" }))}
          invalid={!!errors.city}
        />
      </Field>

      <Field label="Contact number" hint="This will be your sign-in ID." error={errors.contact}>
        <PrefixInput
          name="contact"
          prefix="+91"
          required
          inputMode="numeric"
          value={contact}
          onChange={(e) => {
            setContact(e.target.value.replace(/\D/g, "").slice(0, 10));
            setErrors((p) => ({ ...p, contact: "" }));
          }}
          placeholder="9876543210"
          invalid={!!errors.contact}
        />
      </Field>

      <Field label="Password" error={errors.password}>
        <Input
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
          placeholder="At least 8 characters"
          invalid={!!errors.password}
        />
        {strength && (
          <div className="mt-2 flex items-center gap-1.5">
            {(["weak", "fair", "strong"] as const).map((level) => {
              const active =
                (strength === "weak" && level === "weak") ||
                (strength === "fair" && (level === "weak" || level === "fair")) ||
                strength === "strong";
              const color =
                strength === "weak" ? "bg-rose-400" :
                strength === "fair" ? "bg-amber-400" : "bg-emerald-500";
              return <span key={level} className={`h-1 flex-1 rounded-full ${active ? color : "bg-slate-200"}`} />;
            })}
            <span className="ml-1 text-[11px] font-medium text-slate-500 capitalize">{strength}</span>
          </div>
        )}
      </Field>

      <Button type="submit" size="lg" fullWidth disabled={loading} rightIcon={<ArrowRight className="h-4 w-4" />}>
        {loading ? "Creating account…" : "Register institution"}
      </Button>

      <p className="text-center text-[11px] text-slate-400">
        By registering, you agree to our Terms &amp; Privacy Policy.
      </p>
    </form>
  );
}

function LoginCard({ router }: { router: any }) {
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errs: Record<string, string> = {};
    if (!/^\d{10}$/.test((fd.get("contact") as string).replace(/\s/g, ""))) errs.contact = "Enter a 10-digit number.";
    if (!fd.get("password")) errs.password = "Password is required.";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setServerError(null);
    try {
      await loginSchool(fd);
      router.push("/school/dashboard");
    } catch (err: any) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {serverError && <Alert type="error" message={serverError} onClose={() => setServerError(null)} />}

      <Field label="Contact number" error={errors.contact}>
        <PrefixInput
          name="contact"
          prefix="+91"
          required
          inputMode="numeric"
          value={contact}
          onChange={(e) => {
            setContact(e.target.value.replace(/\D/g, "").slice(0, 10));
            setErrors((p) => ({ ...p, contact: "" }));
          }}
          placeholder="9876543210"
          invalid={!!errors.contact}
        />
      </Field>

      <Field label="Password" error={errors.password}>
        <Input
          name="password"
          type="password"
          required
          placeholder="••••••••"
          onChange={() => setErrors((p) => ({ ...p, password: "" }))}
          invalid={!!errors.password}
        />
      </Field>

      <Button type="submit" size="lg" variant="dark" fullWidth disabled={loading} rightIcon={<ArrowRight className="h-4 w-4" />}>
        {loading ? "Signing in…" : "Sign in to portal"}
      </Button>
    </form>
  );
}
