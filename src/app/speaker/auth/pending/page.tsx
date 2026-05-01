import Link from "next/link";
import { AuthShell, SpeakerSidePanel } from "@/components/crests/AuthShell";

export default function SpeakerPendingPage() {
  return (
    <AuthShell side={<SpeakerSidePanel mode="pending" />}>
      <div
        className="stamp"
        style={{
          alignSelf: "flex-start",
          marginBottom: 28,
          borderColor: "var(--neem)",
          color: "var(--neem)",
          background: "var(--neem-soft)",
        }}
      >
        ✓ Application received
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
        Thank you. We&apos;ll <span style={{ color: "var(--peacock)" }}>read it.</span>
      </h1>
      <p
        style={{
          fontSize: 17,
          color: "var(--ink-2)",
          marginTop: 16,
          marginBottom: 32,
          lineHeight: 1.6,
          maxWidth: 480,
        }}
      >
        Every Crests application is read by two partners and one independent advisor. We aim to
        respond within fourteen days — even if it&apos;s a no.
      </p>

      <div
        style={{
          background: "var(--paper-2)",
          border: "1.5px solid var(--ink)",
          padding: 28,
          marginBottom: 28,
        }}
      >
        <div className="eyebrow" style={{ marginBottom: 14, color: "var(--peacock)" }}>
          Application APP-2604-1138
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {(
            [
              ["STATUS", "Awaiting reference reply"],
              ["REVIEWER", "Aanya Krishnamurthy · Founding partner"],
              ["NEXT UPDATE", "Within 5 working days"],
              ["ESTIMATE", "14 days to decision"],
            ] as [string, string][]
          ).map(([k, v], i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                fontSize: 13,
                gap: 12,
              }}
            >
              <div
                className="mono"
                style={{
                  color: "var(--ink-3)",
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                }}
              >
                {k}
              </div>
              <div style={{ color: "var(--ink)", fontWeight: 500 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Link
          href="/speaker/auth/login"
          className="btn lg"
          style={{
            background: "var(--peacock)",
            borderColor: "var(--peacock)",
            color: "var(--paper)",
            justifyContent: "center",
          }}
        >
          Track application
        </Link>
        <Link href="/" className="btn lg ghost" style={{ justifyContent: "center" }}>
          Back to Crests
        </Link>
      </div>
    </AuthShell>
  );
}
