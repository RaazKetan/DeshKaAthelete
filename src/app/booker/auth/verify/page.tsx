import Link from "next/link";
import { AuthShell, BookerSidePanel } from "@/components/crests/AuthShell";

export default function BookerVerifyPage() {
  return (
    <AuthShell side={<BookerSidePanel mode="verify" />}>
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
        ✓ Account created
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
        Check your <span style={{ color: "var(--kumkum)" }}>inbox.</span>
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
        We&apos;ve sent a verification link to{" "}
        <strong style={{ color: "var(--ink)" }}>pranjal@doon.edu.in</strong>. Click it to confirm
        your email — then our team will verify your institution within one business day.
      </p>

      <div
        style={{
          background: "var(--paper-2)",
          border: "1.5px solid var(--ink)",
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          marginBottom: 28,
        }}
      >
        <div className="eyebrow">What happens next</div>
        {(
          [
            ["Now", "Email verification", "Click the link in your inbox."],
            ["~1 day", "Institution check", "We verify your registry/GSTIN and dial your switchboard."],
            ["Day 2", "Bureau contact assigned", "A named bureau partner reaches out with your dashboard tour."],
            ["Day 2", "Browse opens", "Direct chat with speakers unlocks once verification clears."],
          ] as [string, string, string][]
        ).map(([when, what, why], i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "70px 1fr",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--kumkum)",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                paddingTop: 2,
              }}
            >
              {when}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{what}</div>
              <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 2, lineHeight: 1.5 }}>
                {why}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Link href="/" className="btn lg saffron" style={{ justifyContent: "center" }}>
          Browse speakers →
        </Link>
        <button className="btn lg ghost" style={{ justifyContent: "center" }}>
          Resend email
        </button>
      </div>
    </AuthShell>
  );
}
