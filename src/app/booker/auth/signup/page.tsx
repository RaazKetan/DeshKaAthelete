"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AuthField,
  AuthInput,
  AuthSelect,
  AuthShell,
  BookerSidePanel,
} from "@/components/crests/AuthShell";

interface Data {
  type: "school" | "college" | "company" | "nonprofit";
  name: string;
  udise: string;
  city: string;
  role: string;
  fullName: string;
  email: string;
  phone: string;
  pw: string;
}

export default function BookerSignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [data, setData] = useState<Data>({
    type: "school",
    name: "",
    udise: "",
    city: "",
    role: "",
    fullName: "",
    email: "",
    phone: "",
    pw: "",
  });
  const update = <K extends keyof Data>(k: K, v: Data[K]) => setData((d) => ({ ...d, [k]: v }));

  return (
    <AuthShell side={<BookerSidePanel mode="signup" />}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <div className="stamp">Register · {step}/2</div>
        {step > 1 && (
          <button
            onClick={() => setStep(1)}
            style={{
              background: "none",
              border: 0,
              fontSize: 13,
              color: "var(--ink-2)",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
        )}
      </div>

      <h1
        className="serif"
        style={{
          fontSize: "clamp(36px, 4.6vw, 56px)",
          margin: 0,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 1,
        }}
      >
        {step === 1 ? (
          <>
            Tell us about your <span style={{ color: "var(--kumkum)" }}>institution.</span>
          </>
        ) : (
          <>
            Now let&apos;s set up your <span style={{ color: "var(--kumkum)" }}>account.</span>
          </>
        )}
      </h1>
      <p
        style={{
          fontSize: 16,
          color: "var(--ink-2)",
          marginTop: 14,
          marginBottom: 32,
          lineHeight: 1.55,
          maxWidth: 480,
        }}
      >
        {step === 1
          ? "Crests verifies every institution before unlocking direct speaker contact. This takes about a day."
          : "You can invite teammates after you verify your email."}
      </p>

      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
        >
          <AuthField label="Institution type">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {([
                { v: "school", l: "School" },
                { v: "college", l: "College / Univ." },
                { v: "company", l: "Company" },
                { v: "nonprofit", l: "Non-profit" },
              ] as { v: Data["type"]; l: string }[]).map((o) => (
                <button
                  key={o.v}
                  type="button"
                  onClick={() => update("type", o.v)}
                  style={{
                    padding: "14px 8px",
                    border: `1.5px solid ${data.type === o.v ? "var(--ink)" : "var(--line-2)"}`,
                    background: data.type === o.v ? "var(--ink)" : "var(--paper)",
                    color: data.type === o.v ? "var(--paper)" : "var(--ink)",
                    fontSize: 13,
                    fontFamily: "var(--sans)",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </AuthField>

          <AuthField label="Institution name">
            <AuthInput
              value={data.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder={
                data.type === "school"
                  ? "Doon School"
                  : data.type === "college"
                    ? "Ashoka University"
                    : "Tata Steel Ltd."
              }
              required
              autoFocus
            />
          </AuthField>

          {(data.type === "school" || data.type === "college") && (
            <AuthField
              label={data.type === "school" ? "UDISE code" : "AISHE / accreditation no."}
              hint="We use this to verify with the registry"
            >
              <AuthInput
                value={data.udise}
                onChange={(e) => update("udise", e.target.value)}
                placeholder={data.type === "school" ? "07123456789" : "C-12345"}
              />
            </AuthField>
          )}

          {(data.type === "company" || data.type === "nonprofit") && (
            <AuthField label="GSTIN or registration no." hint="Optional but speeds up verification">
              <AuthInput
                value={data.udise}
                onChange={(e) => update("udise", e.target.value)}
                placeholder="29AAACT2727Q1ZW"
              />
            </AuthField>
          )}

          <AuthField label="City">
            <AuthSelect
              value={data.city}
              onChange={(e) => update("city", e.target.value)}
              required
            >
              <option value="">Select city…</option>
              {["Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Kochi", "Jaipur", "Lucknow", "Indore", "Other"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </AuthSelect>
          </AuthField>

          <button
            type="submit"
            className="btn lg saffron"
            style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
          >
            Continue →
          </button>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/booker/auth/verify");
          }}
        >
          <AuthField label="Your full name">
            <AuthInput
              value={data.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="Pranjal Mehta"
              required
              autoFocus
            />
          </AuthField>

          <AuthField label="Your role at the institution">
            <AuthSelect
              value={data.role}
              onChange={(e) => update("role", e.target.value)}
              required
            >
              <option value="">Select role…</option>
              {[
                "Principal / Head of School",
                "Dean / Director",
                "Head of Events",
                "Programme Coordinator",
                "HR / People & Culture",
                "Marketing / Brand",
                "Founder / CEO",
                "Other",
              ].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </AuthSelect>
          </AuthField>

          <AuthField label="Work email" hint="Must match institution domain">
            <AuthInput
              type="email"
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="pranjal@doon.edu.in"
              required
            />
          </AuthField>

          <AuthField label="Mobile (for confirmations)">
            <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 8 }}>
              <AuthInput
                value="+91"
                readOnly
                style={{ background: "var(--paper-2)", textAlign: "center" }}
              />
              <AuthInput
                type="tel"
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="98765 43210"
                required
              />
            </div>
          </AuthField>

          <AuthField label="Set a password" hint="8+ characters">
            <AuthInput
              type="password"
              value={data.pw}
              onChange={(e) => update("pw", e.target.value)}
              required
              minLength={8}
            />
          </AuthField>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: 13,
              color: "var(--ink-2)",
              marginBottom: 24,
              lineHeight: 1.5,
            }}
          >
            <input
              type="checkbox"
              id="tos"
              required
              style={{ width: 16, height: 16, marginTop: 2, accentColor: "var(--kumkum)", flexShrink: 0 }}
            />
            <label htmlFor="tos">
              I agree to the{" "}
              <a href="#" style={{ color: "var(--kumkum)" }}>Crests Terms</a> and confirm I&apos;m
              authorised to book on behalf of {data.name || "the institution"}.
            </label>
          </div>

          <button
            type="submit"
            className="btn lg saffron"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Create account →
          </button>
        </form>
      )}

      <div
        style={{
          marginTop: 32,
          paddingTop: 24,
          borderTop: "1px solid var(--line)",
          fontSize: 14,
          color: "var(--ink-2)",
        }}
      >
        Already with us?{" "}
        <Link
          href="/booker/auth/login"
          style={{ color: "var(--kumkum)", fontWeight: 600, textDecoration: "none" }}
        >
          Sign in →
        </Link>
      </div>
    </AuthShell>
  );
}
