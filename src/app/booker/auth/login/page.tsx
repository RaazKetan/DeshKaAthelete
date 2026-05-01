"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AuthField,
  AuthInput,
  AuthShell,
  BookerSidePanel,
  SSOButton,
} from "@/components/crests/AuthShell";

export default function BookerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  return (
    <AuthShell side={<BookerSidePanel mode="login" />}>
      <div className="stamp" style={{ alignSelf: "flex-start", marginBottom: 28 }}>
        For institutions
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
        Welcome <span style={{ color: "var(--kumkum)" }}>back.</span>
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
        Sign in to manage requests, calendar holds, and your bureau contact.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/");
        }}
      >
        <AuthField label="Work email">
          <AuthInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@ashoka.edu.in"
            required
            autoFocus
          />
        </AuthField>
        <AuthField
          label="Password"
          hint={
            <a href="#" style={{ color: "var(--kumkum)", textDecoration: "none" }}>
              Forgot?
            </a>
          }
        >
          <AuthInput type="password" value={pw} onChange={(e) => setPw(e.target.value)} required />
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
            id="remember"
            style={{ width: 16, height: 16, accentColor: "var(--kumkum)" }}
          />
          <label htmlFor="remember">Keep me signed in on this device</label>
        </div>

        <button
          type="submit"
          className="btn lg saffron"
          style={{ width: "100%", justifyContent: "center" }}
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

      <div style={{ display: "grid", gap: 10 }}>
        <SSOButton provider="Google Workspace" />
        <SSOButton provider="Microsoft 365" />
      </div>

      <div
        style={{
          marginTop: 36,
          paddingTop: 24,
          borderTop: "1px solid var(--line)",
          fontSize: 14,
          color: "var(--ink-2)",
        }}
      >
        New to Crests?{" "}
        <Link
          href="/booker/auth/signup"
          style={{ color: "var(--kumkum)", fontWeight: 600, textDecoration: "none" }}
        >
          Register your institution →
        </Link>
      </div>
      <div style={{ marginTop: 16, fontSize: 13, color: "var(--ink-3)" }}>
        Are you a speaker?{" "}
        <Link
          href="/speaker/auth/login"
          style={{ color: "var(--ink-2)", textDecoration: "underline" }}
        >
          Sign in here
        </Link>
      </div>
    </AuthShell>
  );
}
