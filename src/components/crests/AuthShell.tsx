import type { CSSProperties, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { LogoMark } from "./atoms";

export function AuthShell({ side, children }: { side: ReactNode; children: ReactNode }) {
  return (
    <>
      <style>{`
        @media (max-width: 920px) {
          .auth-shell { grid-template-columns: 1fr !important; }
          .auth-shell > .auth-side { display: none; }
        }
      `}</style>
      <div
        className="auth-shell"
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          background: "var(--paper)",
        }}
      >
        <div
          className="auth-side"
          style={{
            background: "var(--ink)",
            color: "var(--paper)",
            padding: "64px 56px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
            borderRight: "2px solid var(--ink)",
          }}
        >
          {side}
        </div>
        <div
          style={{
            padding: "64px 56px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: 560,
            width: "100%",
            margin: "0 auto",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export function AuthField({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label style={{ display: "block", marginBottom: 18 }}>
      <div
        style={{
          fontSize: 12,
          fontFamily: "var(--mono)",
          letterSpacing: "0.08em",
          color: "var(--ink-2)",
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 8,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{label}</span>
        {hint && (
          <span style={{ color: "var(--ink-3)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
            {hint}
          </span>
        )}
      </div>
      {children}
      {error && <div style={{ fontSize: 12, color: "var(--kumkum)", marginTop: 6 }}>{error}</div>}
    </label>
  );
}

export function AuthInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
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
        ...(props.style as CSSProperties),
      }}
    />
  );
}

export function AuthSelect({
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select
      {...props}
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
        appearance: "none",
        backgroundImage:
          'url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27 width%3D%2710%27 height%3D%276%27 viewBox%3D%270 0 10 6%27%3E%3Cpath d%3D%27M1 1l4 4 4-4%27 stroke%3D%27black%27 stroke-width%3D%271.5%27 fill%3D%27none%27 stroke-linecap%3D%27round%27%2F%3E%3C%2Fsvg%3E")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 14px center",
        paddingRight: 36,
        ...(props.style as CSSProperties),
      }}
    >
      {children}
    </select>
  );
}

export function BookerSidePanel({ mode }: { mode: "login" | "signup" | "verify" }) {
  return (
    <>
      <div>
        <div className="logo" style={{ color: "var(--paper)", marginBottom: 48 }}>
          <LogoMark size={28} />
          <span style={{ fontSize: 24, color: "var(--paper)" }}>Crests</span>
        </div>
        <div className="eyebrow" style={{ color: "var(--marigold)", marginBottom: 24 }}>
          For schools, colleges &amp; firms
        </div>
        <h2
          className="serif"
          style={{
            fontSize: "clamp(36px, 3.4vw, 52px)",
            margin: 0,
            color: "var(--paper)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
          }}
        >
          {mode === "login" && (
            <>
              The bureau that brings <em style={{ color: "var(--marigold)", fontStyle: "italic" }}>India&apos;s best</em> to your room.
            </>
          )}
          {mode === "signup" && (
            <>
              Verified speakers. <em style={{ color: "var(--marigold)", fontStyle: "italic" }}>One</em> direct line.
            </>
          )}
          {mode === "verify" && (
            <>
              Almost there. <em style={{ color: "var(--marigold)", fontStyle: "italic" }}>One</em> click in your inbox.
            </>
          )}
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          marginTop: 48,
          borderTop: "1px solid oklch(1 0 0 / 0.15)",
          paddingTop: 28,
        }}
      >
        {([
          ["124", "Verified speakers"],
          ["340+", "Sessions delivered"],
          ["11", "Federations partnered"],
          ["96%", "Renewal rate"],
        ] as [string, string][]).map(([n, l], i) => (
          <div
            key={l}
            style={{
              padding: "14px 16px 14px 0",
              borderRight: i % 2 === 0 ? "1px solid oklch(1 0 0 / 0.15)" : 0,
              paddingLeft: i % 2 === 1 ? 16 : 0,
              borderBottom: i < 2 ? "1px solid oklch(1 0 0 / 0.15)" : 0,
            }}
          >
            <div
              className="serif"
              style={{
                fontSize: 38,
                fontWeight: 700,
                color: "var(--paper)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {n}
            </div>
            <div className="eyebrow" style={{ color: "oklch(0.78 0.04 70)", marginTop: 6 }}>
              {l}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 32,
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.1em",
          color: "oklch(0.78 0.04 70)",
        }}
      >
        ASHOKA UNIVERSITY · IIT BOMBAY · DOON SCHOOL · TATA STEEL · INFOSYS · BITS PILANI
      </div>
    </>
  );
}

export function SpeakerSidePanel({ mode }: { mode: "login" | "apply" | "pending" }) {
  const items =
    mode === "apply"
      ? [
          ["Verified national service", "Olympics, Padma series, IFS, military honours, federation captaincy, peer-recognised craft."],
          ["A reason to teach", "Beyond fees. We screen for genuine investment in the next generation."],
          ["Reachable witnesses", "Coaches, COs, deans, founders who can vouch — by phone if needed."],
        ]
      : [
          ["One contract, one calendar", "No more 11 different school WhatsApp groups asking for dates."],
          ["Full payments, on time", "Bureau pays you within 7 days of session, regardless of school cycle."],
          ["Choose your audience", "Government school, IIT, multinational — your filter, your call."],
        ];

  return (
    <>
      <div>
        <div className="logo" style={{ color: "var(--paper)", marginBottom: 48 }}>
          <LogoMark size={28} />
          <span style={{ fontSize: 24, color: "var(--paper)" }}>Crests</span>
        </div>
        <div className="eyebrow" style={{ color: "var(--marigold)", marginBottom: 24 }}>
          For India&apos;s national-level voices
        </div>
        <h2
          className="serif"
          style={{
            fontSize: "clamp(36px, 3.4vw, 52px)",
            margin: 0,
            color: "var(--paper)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
          }}
        >
          {mode === "login" && (
            <>
              The bureau that takes <em style={{ color: "var(--marigold)", fontStyle: "italic" }}>your</em> calendar seriously.
            </>
          )}
          {mode === "apply" && (
            <>
              Selective by <em style={{ color: "var(--marigold)", fontStyle: "italic" }}>design.</em> Vetted by humans.
            </>
          )}
          {mode === "pending" && (
            <>
              One of two reviewers will <em style={{ color: "var(--marigold)", fontStyle: "italic" }}>respond personally.</em>
            </>
          )}
        </h2>
      </div>

      <div style={{ marginTop: 48, paddingTop: 28, borderTop: "1px solid oklch(1 0 0 / 0.15)" }}>
        <div className="eyebrow" style={{ color: "var(--marigold)", marginBottom: 18 }}>
          {mode === "apply" ? "What we look for" : "Why speakers stay"}
        </div>
        {items.map(([h, p], i) => (
          <div key={i} style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 14, color: "var(--paper)", fontWeight: 600, marginBottom: 4 }}>
              {h}
            </div>
            <div style={{ fontSize: 13, color: "oklch(0.78 0.04 70)", lineHeight: 1.5 }}>{p}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export function SSOButton({ provider }: { provider: string }) {
  return (
    <button
      type="button"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: "12px 16px",
        border: "1.5px solid var(--ink)",
        background: "var(--paper)",
        fontSize: 14,
        fontFamily: "var(--sans)",
        fontWeight: 500,
        color: "var(--ink)",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          display: "inline-block",
          background: "var(--ink)",
          borderRadius: 2,
        }}
      />
      Continue with {provider}
    </button>
  );
}
