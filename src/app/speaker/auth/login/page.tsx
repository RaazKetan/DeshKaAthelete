"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AuthField,
  AuthInput,
  AuthShell,
  SpeakerSidePanel,
} from "@/components/crests/AuthShell";

export default function SpeakerLoginPage() {
  const router = useRouter();

  return (
    <AuthShell side={<SpeakerSidePanel mode="login" />}>
      <div
        className="stamp"
        style={{
          alignSelf: "flex-start",
          marginBottom: 28,
          borderColor: "var(--peacock)",
          color: "var(--peacock)",
          background: "var(--peacock-soft)",
        }}
      >
        For speakers
      </div>
      <h1
        className="serif"
        style={{
          fontSize: "clamp(40px, 5vw, 64px)",
          margin: 0,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 0.98,
        }}
      >
        Welcome <span style={{ color: "var(--peacock)" }}>back.</span>
      </h1>
      <p
        style={{
          fontSize: 16,
          color: "var(--ink-2)",
          marginTop: 16,
          marginBottom: 36,
          lineHeight: 1.55,
          maxWidth: 460,
        }}
      >
        Sign in to review requests, set availability, and update your profile.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/speaker/dashboard");
        }}
      >
        <AuthField label="Email or phone">
          <AuthInput
            type="text"
            placeholder="you@example.com or +91 98765 43210"
            required
            autoFocus
          />
        </AuthField>
        <AuthField
          label="Password"
          hint={
            <a href="#" style={{ color: "var(--peacock)", textDecoration: "none" }}>
              Forgot?
            </a>
          }
        >
          <AuthInput type="password" required />
        </AuthField>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            color: "var(--ink-2)",
            marginBottom: 24,
          }}
        >
          <input
            type="checkbox"
            id="speaker-remember"
            style={{ width: 16, height: 16, accentColor: "var(--peacock)" }}
          />
          <label htmlFor="speaker-remember">Remember this device for 30 days</label>
        </div>

        <button
          type="submit"
          className="btn lg"
          style={{
            width: "100%",
            justifyContent: "center",
            background: "var(--peacock)",
            borderColor: "var(--peacock)",
            color: "var(--paper)",
          }}
        >
          Sign in →
        </button>
      </form>

      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "28px 0" }}>
        <hr className="rule" style={{ flex: 1 }} />
        <span
          className="mono"
          style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em" }}
        >
          OR
        </span>
        <hr className="rule" style={{ flex: 1 }} />
      </div>

      <button
        type="button"
        style={{
          width: "100%",
          padding: "13px 16px",
          border: "1.5px solid var(--ink)",
          background: "var(--paper)",
          fontSize: 14,
          fontFamily: "var(--sans)",
          fontWeight: 500,
          color: "var(--ink)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            width: 18,
            height: 18,
            display: "inline-block",
            background: "var(--neem)",
            borderRadius: 2,
          }}
        />
        Sign in with OTP via WhatsApp
      </button>

      <div style={{ marginTop: 36, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          Want to join the bureau?
        </div>
        <div style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55 }}>
          Crests is invitation + application only. We accept ~12% of applicants.{" "}
          <Link
            href="/speaker/apply"
            style={{ color: "var(--peacock)", fontWeight: 600, textDecoration: "none" }}
          >
            Apply to join →
          </Link>
        </div>
      </div>
      <div style={{ marginTop: 16, fontSize: 13, color: "var(--ink-3)" }}>
        Are you an institution?{" "}
        <Link
          href="/booker/auth/login"
          style={{ color: "var(--ink-2)", textDecoration: "underline" }}
        >
          Sign in here
        </Link>
      </div>
    </AuthShell>
  );
}
