import Link from "next/link";
import { Topbar } from "@/components/crests/Topbar";
import { Footer } from "@/components/crests/Footer";
import { ImageFrame, Motif, Verified } from "@/components/crests/atoms";
import { SPEAKERS, CATEGORIES, type Speaker, type Category } from "@/data/speakers";

const TRUST_LOGOS = [
  "IIT Bombay", "Ashoka University", "IIM Bangalore", "Doon School", "Tata Steel",
  "Infosys", "BITS Pilani", "Reliance", "AIIMS", "NIIT", "ISB", "Welham",
];

const HERO_STATS: [string, string][] = [
  ["11", "Federations partnered"],
  ["340+", "Sessions delivered"],
  ["96%", "Renewal rate"],
  ["28", "Cities served"],
];

const HOW_IT_WORKS: [string, string, string][] = [
  ["01", "Browse",
    "Filter by topic, language, region, format. Every profile verified by federation or institution."],
  ["02", "Request",
    "Send the speaker your date, audience, format, budget. They see it in their dashboard immediately."],
  ["03", "Confirm",
    "Most speakers respond in 48h. We handle travel, paperwork, and rider."],
  ["04", "Host",
    "Speaker arrives. We follow up with a recap deck and reusable clips for your alumni."],
];

const BULK_PACKAGES: [string, string, string][] = [
  ["8 sessions", "Termly", "₹14L"],
  ["16 sessions", "Year-round · save 12%", "₹26L"],
  ["24 sessions", "Multi-campus · save 28%", "₹36L"],
];

export default function Home() {
  const featured = SPEAKERS.slice(0, 4);

  return (
    <>
      <Topbar />

      <main>
        {/* ── HERO ── */}
        <section style={{ padding: "40px 0 60px", position: "relative", overflow: "hidden" }}>
          <div className="container-1320" style={{ position: "relative" }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 28, flexWrap: "wrap" }}>
              <span className="stamp">EST. 2026 · NEW DELHI</span>
              <span style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink-3)", letterSpacing: "0.08em" }}>
                A BUREAU FOR INDIA&apos;S NATIONAL ICONS
              </span>
            </div>

            <h1
              className="serif"
              style={{
                fontSize: "clamp(56px, 9vw, 140px)",
                lineHeight: 0.92,
                margin: 0,
                fontWeight: 700,
                letterSpacing: "-0.035em",
                textWrap: "balance",
                color: "var(--ink)",
              }}
            >
              India&apos;s <span style={{ color: "var(--kumkum)" }}>finest,</span>
              <br />
              on{" "}
              <span style={{ fontStyle: "italic", color: "var(--marigold-deep)", fontWeight: 500 }}>
                your
              </span>{" "}
              stage.
            </h1>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: 60,
                alignItems: "end",
                marginTop: 40,
              }}
            >
              <p
                style={{
                  fontSize: 19,
                  lineHeight: 1.5,
                  color: "var(--ink-2)",
                  maxWidth: 620,
                  textWrap: "pretty",
                  margin: 0,
                }}
              >
                Olympians from Haryana. Surgeons from AIIMS. Founders from Indore.
                Jawans from Pune. Authors from Jaipur.{" "}
                <span style={{ background: "var(--marigold-soft)", padding: "2px 6px", fontWeight: 500 }}>
                  Crests
                </span>{" "}
                is the verified bureau that gets them to your school assembly, college fest, or
                all-hands — without the WhatsApp circus.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
                <Link href="/browse" className="btn lg saffron">
                  Browse 124 speakers →
                </Link>
                <Link href="/booker/auth/signup" className="btn lg ghost">
                  Talk to bureau
                </Link>
              </div>
            </div>

            {/* Trust strip */}
            <div
              style={{
                marginTop: 64,
                padding: "24px 0",
                borderTop: "2px solid var(--ink)",
                borderBottom: "2px solid var(--ink)",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 32,
              }}
            >
              {HERO_STATS.map(([n, label], i) => (
                <div
                  key={label}
                  style={{
                    borderRight: i < 3 ? "1px solid var(--line-2)" : 0,
                    paddingLeft: i ? 20 : 0,
                  }}
                >
                  <div
                    className="serif"
                    style={{
                      fontSize: 56,
                      lineHeight: 1,
                      color: "var(--ink)",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {n}
                  </div>
                  <div className="eyebrow" style={{ marginTop: 10, color: "var(--ink-3)" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section style={{ padding: "40px 0 60px", background: "var(--paper-2)" }}>
          <div className="container-1320">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 32,
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div className="eyebrow">Categories</div>
                <h2
                  className="serif"
                  style={{
                    fontSize: "clamp(36px, 4.5vw, 56px)",
                    margin: "12px 0 0",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Pick the <span style={{ color: "var(--kumkum)" }}>journey</span>.
                </h2>
              </div>
              <Link href="/browse" className="btn ghost">
                See all categories →
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {CATEGORIES.slice(1).map((c, i) => (
                <CategoryBlock key={c.id} category={c} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED ── */}
        <section style={{ padding: "80px 0 40px" }}>
          <div className="container-1320">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: 48,
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <div style={{ maxWidth: 640 }}>
                <div className="eyebrow">This month</div>
                <h2
                  className="serif"
                  style={{
                    fontSize: "clamp(36px, 4.5vw, 56px)",
                    margin: "12px 0 0",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Featured{" "}
                  <span style={{ fontStyle: "italic", color: "var(--marigold-deep)" }}>
                    journeys.
                  </span>
                </h2>
              </div>
              <Motif size={50} color="var(--kumkum)" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
              <FeaturedSpeakerCard speaker={featured[0]} large />
              <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 24 }}>
                <FeaturedSpeakerCard speaker={featured[1]} />
                <FeaturedSpeakerCard speaker={featured[2]} />
              </div>
            </div>
          </div>
        </section>

        {/* ── QUOTE STRIP ── */}
        <section
          style={{
            padding: "60px 0",
            background: "var(--ink)",
            color: "var(--paper)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="container-1320"
            style={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 16,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div className="eyebrow" style={{ color: "var(--marigold)" }}>
              The premise
            </div>
            <div
              className="serif"
              style={{
                fontSize: "clamp(28px, 3.4vw, 44px)",
                lineHeight: 1.25,
                fontWeight: 500,
                maxWidth: 920,
                margin: "0 auto",
                letterSpacing: "-0.015em",
              }}
            >
              &ldquo;The people who carried India&apos;s name on their chest, sitting three feet
              away from the children who&apos;ll carry it next.&rdquo;
            </div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.15em",
                color: "var(--ink-4)",
                marginTop: 8,
                textTransform: "uppercase",
              }}
            >
              — Crests · Founding note
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ padding: "80px 0" }}>
          <div className="container-1320">
            <div className="eyebrow">How it works</div>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(36px, 4.5vw, 56px)",
                margin: "12px 0 48px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Request to room —{" "}
              <span style={{ color: "var(--peacock)" }}>days, not months.</span>
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 0,
                border: "2px solid var(--ink)",
              }}
            >
              {HOW_IT_WORKS.map(([num, h, t], i) => (
                <div
                  key={num}
                  style={{
                    padding: "32px 28px",
                    borderRight: i < 3 ? "2px solid var(--ink)" : 0,
                    background: i % 2 === 0 ? "var(--paper)" : "var(--paper-2)",
                    minHeight: 240,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
                    <span
                      className="mono"
                      style={{
                        fontSize: 13,
                        color: "var(--kumkum)",
                        letterSpacing: "0.08em",
                        fontWeight: 600,
                      }}
                    >
                      STEP {num}
                    </span>
                  </div>
                  <h3
                    className="serif"
                    style={{
                      fontSize: 28,
                      margin: "0 0 12px",
                      fontWeight: 700,
                      color: "var(--ink)",
                    }}
                  >
                    {h}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--ink-2)",
                      lineHeight: 1.55,
                      margin: 0,
                      textWrap: "pretty",
                    }}
                  >
                    {t}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUST LOGOS ── */}
        <section style={{ padding: "40px 0 20px" }}>
          <div className="container-1320">
            <div className="dot-row" style={{ color: "var(--ink-3)", marginBottom: 32 }}>
              <span className="eyebrow" style={{ padding: "0 16px", color: "var(--ink-3)" }}>
                Trusted by
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 0 }}>
              {TRUST_LOGOS.map((name) => (
                <div
                  key={name}
                  style={{
                    padding: "28px 16px",
                    textAlign: "center",
                    borderTop: "1px solid var(--line)",
                    borderRight: "1px solid var(--line)",
                    fontFamily: "var(--display)",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "var(--ink-3)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BULK CTA ── */}
        <section style={{ padding: "80px 0" }}>
          <div className="container-1320">
            <div
              style={{
                border: "2px solid var(--ink)",
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                background: "var(--marigold)",
                color: "var(--ink)",
              }}
            >
              <div style={{ padding: 48, borderRight: "2px solid var(--ink)" }}>
                <div className="eyebrow" style={{ color: "var(--ink)" }}>
                  Bulk packages
                </div>
                <h2
                  className="serif"
                  style={{
                    fontSize: "clamp(36px, 4.5vw, 56px)",
                    margin: "14px 0 14px",
                    fontWeight: 700,
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                  }}
                >
                  A speaker every Friday for your school year.
                </h2>
                <p
                  style={{
                    color: "var(--ink-2)",
                    maxWidth: 540,
                    fontSize: 16,
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  Build an annual program with 8–24 speakers across categories. Lock in dates a year
                  ahead, save up to 28%, and let your alumni team co-host with the bureau.
                </p>
                <Link
                  href="/booker/auth/signup"
                  className="btn lg"
                  style={{
                    marginTop: 28,
                    background: "var(--ink)",
                    color: "var(--paper)",
                    borderColor: "var(--ink)",
                  }}
                >
                  Design my year-long program →
                </Link>
              </div>

              <div style={{ padding: 48 }}>
                {BULK_PACKAGES.map(([title, desc, fee], i) => (
                  <div
                    key={title}
                    style={{
                      padding: "20px 0",
                      borderTop: i ? "1.5px solid var(--ink)" : 0,
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: 16,
                      alignItems: "baseline",
                    }}
                  >
                    <div>
                      <div className="serif" style={{ fontSize: 26, color: "var(--ink)", fontWeight: 700 }}>
                        {title}
                      </div>
                      <div className="mono" style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 4 }}>
                        {desc}
                      </div>
                    </div>
                    <div className="serif" style={{ fontSize: 28, fontWeight: 700 }}>
                      {fee}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function CategoryBlock({ category, index }: { category: Category; index: number }) {
  const colors: { bg: string; fg: string }[] = [
    { bg: "var(--kumkum)",  fg: "var(--paper)" },
    { bg: "var(--peacock)", fg: "var(--paper)" },
    { bg: "var(--marigold)", fg: "var(--ink)" },
    { bg: "var(--neem)",    fg: "var(--paper)" },
    { bg: "var(--indigo)",  fg: "var(--paper)" },
    { bg: "var(--ink)",     fg: "var(--marigold)" },
    { bg: "var(--gold)",    fg: "var(--ink)" },
    { bg: "var(--paper-3)", fg: "var(--ink)" },
  ];
  const c = colors[index % colors.length];
  return (
    <Link
      href={`/browse?category=${encodeURIComponent(category.id)}`}
      style={{
        background: c.bg,
        color: c.fg,
        border: "2px solid var(--ink)",
        padding: "28px 22px",
        textAlign: "left",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        minHeight: 180,
        fontFamily: "inherit",
        textDecoration: "none",
        transition: "transform 0.15s, box-shadow 0.15s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="mono" style={{ fontSize: 11, opacity: 0.8 }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span style={{ fontSize: 11, fontFamily: "var(--mono)", opacity: 0.7 }}>
          {category.count}
        </span>
      </div>
      <div className="serif" style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.05 }}>
        {category.label}
      </div>
    </Link>
  );
}

function FeaturedSpeakerCard({ speaker, large }: { speaker: Speaker; large?: boolean }) {
  return (
    <Link
      href={`/speakers/${speaker.id}`}
      style={{
        border: "2px solid var(--ink)",
        overflow: "hidden",
        cursor: "pointer",
        background: "var(--paper)",
        display: "grid",
        gridTemplateColumns: large ? "1fr" : "0.85fr 1fr",
        height: large ? "auto" : "100%",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          position: "relative",
          borderRight: large ? 0 : "2px solid var(--ink)",
          borderBottom: large ? "2px solid var(--ink)" : 0,
        }}
      >
        <ImageFrame
          seed={speaker.seed}
          ratio={large ? "16/10" : "1/1"}
          label={speaker.name}
          accent={speaker.accent}
        />
      </div>
      <div
        style={{
          padding: large ? "28px 32px 32px" : "20px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div className="eyebrow">{speaker.handle}</div>
        <h3
          className="serif"
          style={{
            margin: 0,
            fontSize: large ? 38 : 24,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {speaker.name} {speaker.verified && <Verified size={14} />}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: large ? 16 : 13.5,
            color: "var(--ink-2)",
            lineHeight: 1.5,
            textWrap: "pretty",
            fontStyle: "italic",
          }}
        >
          &ldquo;{speaker.story.split(".")[0]}.&rdquo;
        </p>
        <div
          style={{
            marginTop: "auto",
            paddingTop: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12,
            color: "var(--ink-3)",
            fontFamily: "var(--mono)",
            borderTop: "1px solid var(--line)",
          }}
        >
          <span>{speaker.location.split("·")[0].trim()}</span>
          <span style={{ color: "var(--kumkum)", fontWeight: 600 }}>{speaker.feeRange}</span>
        </div>
      </div>
    </Link>
  );
}
