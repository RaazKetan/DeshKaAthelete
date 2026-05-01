import { LogoMark } from "./atoms";

const COL_FOR_INSTITUTIONS = ["Browse speakers", "Bulk packages", "Verified network", "How booking works"];
const COL_FOR_SPEAKERS = ["Apply to join", "Verification", "Speaker terms", "Help center"];
const COL_CRESTS = ["About", "Press", "Privacy", "Contact"];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "2px solid var(--ink)",
        marginTop: 80,
        padding: "40px 32px 24px",
        background: "var(--ink)",
        color: "var(--paper)",
      }}
    >
      <div
        className="container-1320"
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40 }}
      >
        <div>
          <div className="logo" style={{ marginBottom: 12, color: "var(--paper)" }}>
            <LogoMark size={24} />
            <span style={{ fontSize: 22, color: "var(--paper)" }}>Crests</span>
          </div>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--marigold)",
              margin: "0 0 14px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            For India · By India · To India
          </p>
          <p style={{ color: "oklch(0.78 0.04 70)", fontSize: 13, maxWidth: 340, lineHeight: 1.6 }}>
            The bureau bringing India&apos;s Olympians, surgeons, founders, jawans, ambassadors, artists and authors into our classrooms and boardrooms.
          </p>
        </div>

        <FooterCol title="For institutions" items={COL_FOR_INSTITUTIONS} />
        <FooterCol title="For speakers" items={COL_FOR_SPEAKERS} />
        <FooterCol title="Crests" items={COL_CRESTS} />
      </div>

      <div
        className="container-1320"
        style={{
          marginTop: 40,
          paddingTop: 20,
          borderTop: "1px solid oklch(1 0 0 / 0.15)",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: "oklch(0.78 0.04 70)",
          fontFamily: "var(--mono)",
        }}
      >
        <span>© 2026 Crests · Built in India for India</span>
        <span>v1.0 · Verified by 11 federations</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 14, color: "var(--marigold)" }}>
        {title}
      </div>
      {items.map((x) => (
        <div
          key={x}
          style={{ fontSize: 13, color: "oklch(0.85 0.03 70)", padding: "4px 0", cursor: "pointer" }}
        >
          {x}
        </div>
      ))}
    </div>
  );
}
