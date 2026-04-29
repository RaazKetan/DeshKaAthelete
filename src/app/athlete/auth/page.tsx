"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Award, Lock, ShieldCheck, Wallet } from "lucide-react";

import AuthLayout from "@/components/AuthLayout";
import Alert from "@/components/Alert";
import { Button } from "@/components/ui/Button";
import { Field, Input, PrefixInput, Select } from "@/components/ui/Field";

const HIGHLIGHTS = [
  { icon: Wallet, text: "₹2 Cr+ paid to athletes already" },
  { icon: ShieldCheck, text: "Escrow-guaranteed before you arrive" },
  { icon: Award, text: "500+ partner schools, 12 cities" },
];

export default function AthleteAuthPage() {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("signup");
  const router = useRouter();

  const side = (
    <div className="space-y-10 max-w-md">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-400">Athlete · Crests by DeshKa</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.025em] leading-[1.1]">
          You earned the crest.
          <br />
          <span className="text-emerald-400">Now let it earn for you.</span>
        </h1>
        <p className="mt-5 text-slate-300 leading-relaxed">
          Join India's verified marketplace for national achievers. Set your fee, pick your dates, get paid 48 hours after every session.
        </p>
      </div>

      <ul className="space-y-3">
        {HIGHLIGHTS.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-sm text-slate-300">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5">
              <Icon className="h-3.5 w-3.5 text-emerald-400" />
            </span>
            {text}
          </li>
        ))}
      </ul>

      <figure className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <blockquote className="text-sm text-slate-300 leading-relaxed">
          “In three months I delivered 8 school sessions. Escrow meant I never chased a single payment.”
        </blockquote>
        <figcaption className="mt-4 flex items-center gap-3">
          <span className="h-8 w-8 rounded-full bg-emerald-500/20 grid place-items-center text-xs font-semibold text-emerald-300">RK</span>
          <div>
            <p className="text-sm font-medium text-white">Rohan Kumar</p>
            <p className="text-[11px] text-slate-500">National Kabaddi · Pune</p>
          </div>
        </figcaption>
      </figure>
    </div>
  );

  return (
    <AuthLayout side={side} tone="dark">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {mode === "signup" && "Create your athlete account"}
          {mode === "login" && "Welcome back"}
          {mode === "forgot" && "Reset your password"}
        </h2>
        <p className="mt-1.5 text-sm text-slate-500">
          {mode === "signup" && "Manual KYC. Only verified athletes are listed."}
          {mode === "login" && "Sign in to manage bookings and payouts."}
          {mode === "forgot" && "We'll send a 6-digit OTP to your registered mobile."}
        </p>
      </div>

      {mode !== "forgot" && (
        <div className="grid grid-cols-2 rounded-lg bg-slate-100 p-1 mb-6 text-sm font-medium">
          <button
            onClick={() => setMode("signup")}
            className={`h-9 rounded-md transition-colors ${mode === "signup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Sign up
          </button>
          <button
            onClick={() => setMode("login")}
            className={`h-9 rounded-md transition-colors ${mode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Log in
          </button>
        </div>
      )}

      {mode === "signup" && <SignupCard onContinue={() => router.push("/athlete/onboarding")} />}
      {mode === "login" && <LoginCard onLogin={() => router.push("/athlete/dashboard")} onForgot={() => setMode("forgot")} />}
      {mode === "forgot" && <ForgotPasswordCard onBack={() => setMode("login")} />}
    </AuthLayout>
  );
}

function validateName(v: string) { return v.trim().length >= 2 ? "" : "At least 2 characters."; }
function validatePhone(v: string) { return /^\d{10}$/.test(v.replace(/\s/g, "")) ? "" : "Enter a 10-digit mobile number."; }
function validatePassword(v: string) { return v.length < 8 ? "Use at least 8 characters." : ""; }

function SignupCard({ onContinue }: { onContinue: () => void }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [isTaken, setIsTaken] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const strength = !password ? null : password.length < 8 ? "weak" : password.length < 12 ? "fair" : "strong";

  async function handleUsernameBlur() {
    if (username.length < 3) return;
    setIsValidating(true);
    const { checkUsername } = await import("@/app/actions/athleteAuth");
    setIsTaken(await checkUsername(username));
    setIsValidating(false);
  }

  function validate(fd: FormData) {
    const e: Record<string, string> = {};
    const u = (fd.get("username") as string) ?? "";
    if (u.length < 3) e.username = "At least 3 characters.";
    const ne = validateName(fd.get("name") as string); if (ne) e.name = ne;
    const pe = validatePhone(fd.get("phone") as string); if (pe) e.phone = pe;
    const pwe = validatePassword(fd.get("password") as string); if (pwe) e.password = pwe;
    if (!fd.get("sport")) e.sport = "Select your primary sport.";
    return e;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isTaken || isValidating) return;
    const fd = new FormData(e.currentTarget);
    const errs = validate(fd);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    setServerError("");
    try {
      const { registerAthlete } = await import("@/app/actions/athleteAuth");
      await registerAthlete(fd);
      onContinue();
    } catch (err: any) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {isTaken && <Alert type="error" message={`Username @${username} is taken.`} onClose={() => setIsTaken(false)} />}
      {serverError && <Alert type="error" message={serverError} onClose={() => setServerError("")} />}

      <Field
        label="Username"
        hint="3+ chars · lowercase, numbers, underscores."
        error={errors.username || (isTaken ? "Username already taken." : undefined)}
      >
        <PrefixInput
          name="username"
          prefix="@"
          required
          value={username}
          onChange={(e) => {
            setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""));
            setErrors((p) => ({ ...p, username: "" }));
          }}
          onBlur={handleUsernameBlur}
          placeholder="your_username"
          invalid={!!errors.username || isTaken}
        />
      </Field>

      <Field label="Full name" hint="As per Aadhaar card" error={errors.name}>
        <Input
          name="name"
          required
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
          placeholder="e.g. Sunil Kumar"
          invalid={!!errors.name}
        />
      </Field>

      <Field label="Mobile number" error={errors.phone}>
        <PrefixInput
          name="phone"
          prefix="+91"
          required
          inputMode="numeric"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
            setErrors((p) => ({ ...p, phone: "" }));
          }}
          placeholder="9876543210"
          invalid={!!errors.phone}
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

      <Field label="Primary sport" error={errors.sport}>
        <Select name="sport" required onChange={() => setErrors((p) => ({ ...p, sport: "" }))} invalid={!!errors.sport} defaultValue="">
          <option value="" disabled>Select your sport</option>
          {["Cricket","Football","Hockey (Field)","Badminton","Athletics","Wrestling","Boxing","Kabaddi","Shooting","Archery","Table Tennis","Tennis","Weightlifting","Swimming","Gymnastics","Chess","Squash","Volleyball","Basketball","Other"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </Select>
      </Field>

      <Button
        type="submit"
        size="lg"
        fullWidth
        variant="dark"
        disabled={isValidating || isTaken || !username || submitting}
        rightIcon={<ArrowRight className="h-4 w-4" />}
      >
        {submitting ? "Creating account…" : "Continue to KYC"}
      </Button>

      <p className="text-center text-[11px] text-slate-400">
        By continuing, you agree to our Terms &amp; Privacy Policy.
      </p>
    </form>
  );
}

function LoginCard({ onLogin, onForgot }: { onLogin: () => void; onForgot: () => void }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const fd = new FormData(e.currentTarget);
      const { loginAthlete } = await import("@/app/actions/athleteAuth");
      await loginAthlete(fd);
      onLogin();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && <Alert type="error" message={error} onClose={() => setError("")} />}

      <Field label="Username or mobile">
        <Input name="usernameOrPhone" required placeholder="@username or 9876543210" />
      </Field>

      <Field
        label="Password"
        rightSlot={
          <button type="button" onClick={onForgot} className="text-xs font-medium text-emerald-600 hover:text-emerald-700">
            Forgot?
          </button>
        }
      >
        <Input name="password" type="password" required placeholder="••••••••" />
      </Field>

      <Button type="submit" size="lg" fullWidth disabled={loading} rightIcon={<ArrowRight className="h-4 w-4" />}>
        {loading ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}

function ForgotPasswordCard({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { sendPasswordResetOtp } = await import("@/app/actions/athleteAuth");
      const res = await sendPasswordResetOtp(phone);
      if (res.success) {
        setStep(2);
        setSuccess(res.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function reset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const fd = new FormData(e.currentTarget);
      fd.append("phone", phone);
      const { resetPasswordWithOtp } = await import("@/app/actions/athleteAuth");
      const res = await resetPasswordWithOtp(fd);
      if (res.success) {
        alert("Password reset successfully. You can now sign in.");
        onBack();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (step === 1) {
    return (
      <form onSubmit={sendOtp} className="space-y-5">
        {error && <Alert type="error" message={error} onClose={() => setError("")} />}

        <Field label="Mobile number">
          <PrefixInput
            prefix="+91"
            required
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="9876543210"
          />
        </Field>

        <Button type="submit" size="lg" variant="dark" fullWidth disabled={loading || !phone}>
          {loading ? "Sending…" : "Send OTP"}
        </Button>
        <button type="button" onClick={onBack} className="block w-full text-center text-sm text-slate-500 hover:text-slate-900">
          Back to sign in
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={reset} className="space-y-5">
      {error && <Alert type="error" message={error} onClose={() => setError("")} />}
      {success && <Alert type="info" message={success} onClose={() => setSuccess("")} />}

      <Field label="6-digit OTP">
        <Input name="otp" required placeholder="123456" className="tracking-[0.4em] text-center font-mono" />
      </Field>
      <Field label="New password">
        <Input name="newPassword" type="password" required placeholder="At least 8 characters" />
      </Field>

      <Button type="submit" size="lg" fullWidth disabled={loading}>
        {loading ? "Resetting…" : "Reset password"}
      </Button>
      <button type="button" onClick={onBack} className="block w-full text-center text-sm text-slate-500 hover:text-slate-900">
        Back to sign in
      </button>
    </form>
  );
}
