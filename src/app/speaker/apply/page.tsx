"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AuthField,
  AuthInput,
  AuthSelect,
  AuthShell,
  SpeakerSidePanel,
} from "@/components/crests/AuthShell";

interface Data {
  fullName: string;
  title: string;
  field: string;
  email: string;
  phone: string;
  location: string;
  representedSince: string;
  achievements: [string, string, string];
  federation: string;
  refName: string;
  refOrg: string;
  refEmail: string;
  why: string;
  formats: string[];
  feeRange: string;
  pw: string;
}

const STEPS = [
  { n: 1, label: "Your story" },
  { n: 2, label: "National credentials" },
  { n: 3, label: "How you speak" },
  { n: 4, label: "Account" },
];

export default function SpeakerApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Data>({
    fullName: "",
    title: "",
    field: "",
    email: "",
    phone: "",
    location: "",
    representedSince: "",
    achievements: ["", "", ""],
    federation: "",
    refName: "",
    refOrg: "",
    refEmail: "",
    why: "",
    formats: [],
    feeRange: "",
    pw: "",
  });

  const update = <K extends keyof Data>(k: K, v: Data[K]) => setData((d) => ({ ...d, [k]: v }));
  const updateAch = (i: number, v: string) =>
    setData((d) => {
      const a = [...d.achievements] as [string, string, string];
      a[i] = v;
      return { ...d, achievements: a };
    });
  const toggleFormat = (f: string) =>
    setData((d) => ({
      ...d,
      formats: d.formats.includes(f) ? d.formats.filter((x) => x !== f) : [...d.formats, f],
    }));

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <AuthShell side={<SpeakerSidePanel mode="apply" />}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div
          className="stamp"
          style={{
            borderColor: "var(--peacock)",
            color: "var(--peacock)",
            background: "var(--peacock-soft)",
          }}
        >
          Application · {step}/4
        </div>
        {step > 1 && (
          <button
            onClick={back}
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 4,
          marginBottom: 32,
        }}
      >
        {STEPS.map((s) => (
          <div key={s.n}>
            <div
              style={{
                height: 4,
                background: step >= s.n ? "var(--peacock)" : "var(--line)",
                marginBottom: 8,
              }}
            />
            <div
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: step >= s.n ? "var(--ink)" : "var(--ink-3)",
                fontWeight: step === s.n ? 600 : 400,
              }}
            >
              {String(s.n).padStart(2, "0")} · {s.label}
            </div>
          </div>
        ))}
      </div>

      {step === 1 && (
        <>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              margin: 0,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            First, the <span style={{ color: "var(--peacock)" }}>basics.</span>
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "var(--ink-2)",
              marginTop: 14,
              marginBottom: 28,
              lineHeight: 1.55,
            }}
          >
            Tell us who you are and how to reach you.
          </p>

          <AuthField label="Full name (as it appears on your records)">
            <AuthInput
              value={data.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="Maj. Suman Gawani"
              required
              autoFocus
            />
          </AuthField>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <AuthField label="Title / honour" hint="Optional">
              <AuthInput
                value={data.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Maj. · Dr. · Padma Shri"
              />
            </AuthField>
            <AuthField label="Primary field">
              <AuthSelect
                value={data.field}
                onChange={(e) => update("field", e.target.value)}
                required
              >
                <option value="">Select…</option>
                {[
                  "Sport — Olympic / Asian Games",
                  "Sport — National team",
                  "Defence",
                  "Medicine / Public health",
                  "Science / Research",
                  "Business / Founder",
                  "Civil services / Diplomacy",
                  "Arts / Music / Literature",
                  "Cinema / Journalism",
                  "Activism / Public service",
                ].map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </AuthSelect>
            </AuthField>
          </div>

          <AuthField label="City of residence">
            <AuthInput
              value={data.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="Pune, Maharashtra"
              required
            />
          </AuthField>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <AuthField label="Email">
              <AuthInput
                type="email"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="suman@example.com"
                required
              />
            </AuthField>
            <AuthField label="Mobile">
              <AuthInput
                type="tel"
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+91 98765 43210"
                required
              />
            </AuthField>
          </div>

          <button
            onClick={next}
            className="btn lg"
            style={{
              width: "100%",
              justifyContent: "center",
              background: "var(--peacock)",
              borderColor: "var(--peacock)",
              color: "var(--paper)",
              marginTop: 8,
            }}
          >
            Continue →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              margin: 0,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            How have you represented{" "}
            <span style={{ color: "var(--peacock)" }}>India?</span>
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "var(--ink-2)",
              marginTop: 14,
              marginBottom: 28,
              lineHeight: 1.55,
            }}
          >
            We verify every credential with the relevant federation, body, or registry. Be specific.
          </p>

          <AuthField label="Year you first represented India">
            <AuthInput
              type="number"
              min={1950}
              max={2026}
              value={data.representedSince}
              onChange={(e) => update("representedSince", e.target.value)}
              placeholder="2014"
              required
            />
          </AuthField>

          <AuthField
            label="Top three credentials (most recent first)"
            hint="Year + body + outcome"
          >
            {data.achievements.map((a, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <AuthInput
                  value={a}
                  onChange={(e) => updateAch(i, e.target.value)}
                  placeholder={
                    [
                      "2024 · Asian Games — Gold",
                      "2021 · Tokyo Olympics — Bronze",
                      "2018 · Padma Shri",
                    ][i]
                  }
                  required={i === 0}
                />
              </div>
            ))}
          </AuthField>

          <AuthField label="Verifying federation / body / employer">
            <AuthInput
              value={data.federation}
              onChange={(e) => update("federation", e.target.value)}
              placeholder="Hockey India · ISRO · AIIMS · Indian Foreign Service"
              required
            />
          </AuthField>

          <div
            style={{
              background: "var(--paper-2)",
              border: "1.5px dashed var(--line-2)",
              padding: 22,
              marginBottom: 24,
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              Reference contact
            </div>
            <p style={{ fontSize: 13, color: "var(--ink-2)", margin: "0 0 14px", lineHeight: 1.5 }}>
              Someone the bureau can email to confirm your credentials. A coach, commanding officer,
              dean, federation secretary, or co-founder.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <AuthInput
                value={data.refName}
                onChange={(e) => update("refName", e.target.value)}
                placeholder="Reference name"
                required
              />
              <AuthInput
                value={data.refOrg}
                onChange={(e) => update("refOrg", e.target.value)}
                placeholder="Their org / role"
                required
              />
            </div>
            <AuthInput
              style={{ marginTop: 10 }}
              type="email"
              value={data.refEmail}
              onChange={(e) => update("refEmail", e.target.value)}
              placeholder="reference@org.in"
              required
            />
          </div>

          <button
            onClick={next}
            className="btn lg"
            style={{
              width: "100%",
              justifyContent: "center",
              background: "var(--peacock)",
              borderColor: "var(--peacock)",
              color: "var(--paper)",
            }}
          >
            Continue →
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              margin: 0,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            And how do you <span style={{ color: "var(--peacock)" }}>show up?</span>
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "var(--ink-2)",
              marginTop: 14,
              marginBottom: 28,
              lineHeight: 1.55,
            }}
          >
            This is what bookers will see. You can refine it after we approve.
          </p>

          <AuthField label="Why you want to do this" hint="3–4 sentences. The bureau reads every one.">
            <textarea
              value={data.why}
              onChange={(e) => update("why", e.target.value)}
              rows={5}
              placeholder="The reason you'd cancel a sponsorship to make a school assembly. The story you wish someone had told you at fourteen."
              style={{
                width: "100%",
                padding: "13px 14px",
                border: "1.5px solid var(--ink)",
                background: "var(--paper)",
                fontSize: 14,
                fontFamily: "var(--sans)",
                color: "var(--ink)",
                outline: "none",
                borderRadius: 0,
                resize: "vertical",
                lineHeight: 1.5,
              }}
              required
            />
          </AuthField>

          <AuthField label="Formats you're open to" hint="Pick all that apply">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Keynote", "Workshop", "1:1 Mentoring", "Group session", "Fireside chat", "Panel", "Q&A only"].map(
                (f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => toggleFormat(f)}
                    style={{
                      padding: "8px 14px",
                      border: `1.5px solid ${data.formats.includes(f) ? "var(--ink)" : "var(--line-2)"}`,
                      background: data.formats.includes(f) ? "var(--ink)" : "var(--paper)",
                      color: data.formats.includes(f) ? "var(--paper)" : "var(--ink)",
                      borderRadius: 999,
                      fontSize: 13,
                      fontFamily: "var(--sans)",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    {f}
                  </button>
                ),
              )}
            </div>
          </AuthField>

          <AuthField
            label="Your fee range"
            hint="The bureau will help calibrate. Honoraria are encouraged for govt schools."
          >
            <AuthSelect
              value={data.feeRange}
              onChange={(e) => update("feeRange", e.target.value)}
              required
            >
              <option value="">Select range…</option>
              <option value="honorarium">Honorarium only (govt schools, NGOs)</option>
              <option value="50-150">₹50,000 – ₹1.5L</option>
              <option value="150-300">₹1.5L – ₹3L</option>
              <option value="300-500">₹3L – ₹5L</option>
              <option value="500-1000">₹5L – ₹10L</option>
              <option value="1000+">₹10L+ / case-by-case</option>
            </AuthSelect>
          </AuthField>

          <button
            onClick={next}
            className="btn lg"
            style={{
              width: "100%",
              justifyContent: "center",
              background: "var(--peacock)",
              borderColor: "var(--peacock)",
              color: "var(--paper)",
            }}
          >
            Continue →
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              margin: 0,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            Last step — your <span style={{ color: "var(--peacock)" }}>account.</span>
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "var(--ink-2)",
              marginTop: 14,
              marginBottom: 28,
              lineHeight: 1.55,
            }}
          >
            We&apos;ll create a holding account so you can track your application status. Profile
            goes live only after approval.
          </p>

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
              background: "var(--paper-2)",
              border: "1.5px solid var(--ink)",
              padding: 22,
              marginBottom: 22,
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 12 }}>
              What happens after you submit
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {(
                [
                  ["~3 days", "We email your reference."],
                  ["~5 days", "Bureau panel reviews your application."],
                  ["~10 days", "A 30-min video call with a partner."],
                  ["~14 days", "Decision + onboarding, or detailed feedback."],
                ] as [string, string][]
              ).map(([when, what], i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "90px 1fr",
                    gap: 12,
                    fontSize: 13,
                  }}
                >
                  <div
                    className="mono"
                    style={{
                      color: "var(--peacock)",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {when}
                  </div>
                  <div style={{ color: "var(--ink-2)" }}>{what}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: 13,
              color: "var(--ink-2)",
              marginBottom: 22,
              lineHeight: 1.5,
            }}
          >
            <input
              type="checkbox"
              id="speaker-tos"
              required
              style={{
                width: 16,
                height: 16,
                marginTop: 2,
                accentColor: "var(--peacock)",
                flexShrink: 0,
              }}
            />
            <label htmlFor="speaker-tos">
              I confirm everything above is true and accept the{" "}
              <a href="#" style={{ color: "var(--peacock)" }}>
                Speaker Code
              </a>{" "}
              — including the bureau&apos;s right to decline or remove a profile.
            </label>
          </div>

          <button
            onClick={() => router.push("/speaker/auth/pending")}
            className="btn lg"
            style={{
              width: "100%",
              justifyContent: "center",
              background: "var(--peacock)",
              borderColor: "var(--peacock)",
              color: "var(--paper)",
            }}
          >
            Submit application →
          </button>
        </>
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
        Already applied?{" "}
        <Link
          href="/speaker/auth/login"
          style={{ color: "var(--peacock)", fontWeight: 600, textDecoration: "none" }}
        >
          Sign in →
        </Link>
      </div>
    </AuthShell>
  );
}
