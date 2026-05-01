"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Topbar } from "@/components/crests/Topbar";
import { Footer } from "@/components/crests/Footer";
import { ChipGroup, ImageFrame, Verified } from "@/components/crests/atoms";
import { SPEAKERS, formatFee, type Speaker } from "@/data/speakers";

type Tab = "story" | "achievements" | "topics" | "reviews" | "availability";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const speaker = SPEAKERS.find((s) => s.id === id) ?? SPEAKERS[0];
  const [tab, setTab] = useState<Tab>("story");

  return (
    <>
      <Topbar />
      <main>
        {/* Breadcrumb */}
        <div className="container-1320" style={{ padding: "20px 32px 0" }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
            <Link href="/" style={{ color: "inherit" }}>CRESTS</Link>
            {" / "}
            <Link href="/browse" style={{ color: "inherit" }}>{speaker.category.toUpperCase()}S</Link>
            {" / "}
            <span style={{ color: "var(--ink)" }}>{speaker.name.toUpperCase()}</span>
          </div>
        </div>

        {/* Hero */}
        <section style={{ padding: "32px 0 48px" }}>
          <div
            className="container-1320"
            style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 56, alignItems: "start" }}
          >
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", position: "relative" }}>
                <ImageFrame seed={speaker.seed} ratio="4 / 5" label={speaker.name} accent={speaker.accent} />
              </div>
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                <KV k="RATING" v={`★ ${speaker.rating} · ${speaker.sessions} sessions`} />
                <KV k="BASED IN" v={speaker.location} />
                <KV k="SPEAKS" v={speaker.languages.join(", ")} />
                <KV k="FEE" v={speaker.feeRange} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <div className="eyebrow">{speaker.handle}</div>
                {speaker.verified && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "3px 10px",
                      background: "var(--neem-soft)",
                      color: "var(--neem)",
                      borderRadius: 999,
                      fontSize: 11,
                      fontFamily: "var(--mono)",
                    }}
                  >
                    <Verified size={11} /> Federation-verified
                  </span>
                )}
              </div>
              <h1
                className="serif"
                style={{
                  fontSize: "clamp(48px, 5.6vw, 76px)",
                  margin: 0,
                  fontWeight: 400,
                  lineHeight: 0.98,
                  letterSpacing: "-0.025em",
                }}
              >
                {speaker.name}
              </h1>
              <p
                className="serif"
                style={{
                  fontSize: 26,
                  fontStyle: "italic",
                  color: "var(--ink-2)",
                  margin: "24px 0 0",
                  lineHeight: 1.3,
                  textWrap: "pretty",
                }}
              >
                {speaker.headline}
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
                <Link href={`/book/${speaker.id}`} className="btn lg saffron">
                  Request a session
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7 H12 M8 3 L12 7 L8 11"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <button className="btn lg ghost" onClick={() => setTab("availability")}>
                  Check availability
                </button>
                <button className="btn lg ghost">Save to shortlist</button>
              </div>

              <div
                style={{
                  marginTop: 40,
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 24,
                  paddingTop: 32,
                  borderTop: "1px solid var(--line)",
                }}
              >
                {[
                  ["Formats", speaker.formats.join(" · ")],
                  ["Topics", speaker.topics.slice(0, 3).join(" · ")],
                  ["Audience", "50 – 1,500"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="eyebrow" style={{ fontSize: 10, marginBottom: 8 }}>
                      {k}
                    </div>
                    <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.4 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <div className="container-1320" style={{ display: "flex", gap: 32, padding: "0 32px" }}>
            {(["story", "achievements", "topics", "reviews", "availability"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "18px 0",
                  background: "transparent",
                  border: 0,
                  fontSize: 13,
                  color: tab === t ? "var(--ink)" : "var(--ink-3)",
                  fontWeight: tab === t ? 500 : 400,
                  cursor: "pointer",
                  borderBottom: tab === t ? "2px solid var(--saffron-deep)" : "2px solid transparent",
                  marginBottom: -1,
                  textTransform: "capitalize",
                  letterSpacing: "-0.005em",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content + sticky aside */}
        <section style={{ padding: "60px 0" }}>
          <div
            className="container-1320"
            style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 56 }}
          >
            <div>
              {tab === "story" && <StoryTab speaker={speaker} />}
              {tab === "achievements" && <AchievementsTab speaker={speaker} />}
              {tab === "topics" && <TopicsTab speaker={speaker} />}
              {tab === "reviews" && <ReviewsTab speaker={speaker} />}
              {tab === "availability" && <AvailabilityTab speaker={speaker} />}
            </div>

            <aside style={{ position: "sticky", top: 100, height: "fit-content" }}>
              <div
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius-lg)",
                  padding: 28,
                  background: "var(--paper)",
                }}
              >
                <div className="eyebrow">Starting from</div>
                <div className="serif" style={{ fontSize: 40, margin: "6px 0 4px", fontWeight: 400 }}>
                  {formatFee(speaker.fee)}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>
                  per session · varies by format and travel
                </div>
                <div style={{ height: 1, background: "var(--line)", margin: "24px 0" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  {[
                    ["Earliest available", "Aug 14, 2026"],
                    ["Typical response", "Within 48 hours"],
                    ["Travel from", speaker.location.split("·")[0].trim()],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}
                    >
                      <span style={{ color: "var(--ink-3)" }}>{k}</span>
                      <span
                        style={{
                          color: "var(--ink)",
                          fontFamily: "var(--mono)",
                          fontSize: 12,
                        }}
                      >
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/book/${speaker.id}`}
                  className="btn saffron"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Request a session
                </Link>
                <button
                  className="btn ghost"
                  style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
                >
                  Message via bureau team
                </button>
                <div
                  style={{
                    marginTop: 20,
                    padding: 14,
                    background: "var(--paper-2)",
                    borderRadius: 6,
                    fontSize: 12,
                    color: "var(--ink-3)",
                    lineHeight: 1.55,
                  }}
                >
                  Crests holds the fee in escrow until 24 hours after the session. Cancel up to 14
                  days before for a full refund.
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
        color: "var(--ink-3)",
        fontFamily: "var(--mono)",
      }}
    >
      <span>{k}</span>
      <span style={{ color: "var(--ink)" }}>{v}</span>
    </div>
  );
}

function StoryTab({ speaker }: { speaker: Speaker }) {
  return (
    <div>
      <div className="eyebrow">The journey</div>
      <h2 className="serif" style={{ fontSize: 36, margin: "12px 0 28px", fontWeight: 400, lineHeight: 1.1 }}>
        In their words
      </h2>
      <p
        className="serif"
        style={{
          fontSize: 22,
          lineHeight: 1.55,
          color: "var(--ink-2)",
          margin: 0,
          fontStyle: "italic",
          textWrap: "pretty",
        }}
      >
        {speaker.story}
      </p>

      <div style={{ marginTop: 48 }}>
        <div className="eyebrow" style={{ marginBottom: 16 }}>
          What audiences walk away with
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            "A view from inside the moments that defined a national career.",
            "Concrete frameworks for handling pressure, failure, and the long middle.",
            "A 25-minute moderated Q&A tailored to your audience's questions.",
          ].map((p, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: 16,
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.55,
              }}
            >
              <span className="mono" style={{ color: "var(--saffron-deep)", flexShrink: 0 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ textWrap: "pretty" }}>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          marginTop: 48,
          padding: 32,
          background: "var(--paper-2)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          From a recent host
        </div>
        <p
          className="serif"
          style={{
            fontSize: 20,
            fontStyle: "italic",
            color: "var(--ink-2)",
            margin: 0,
            lineHeight: 1.45,
          }}
        >
          &ldquo;{speaker.name.split(" ")[0]} stayed for two hours after the keynote talking to
          students. We&apos;ve never seen our auditorium that quiet, then that loud.&rdquo;
        </p>
        <div
          style={{
            marginTop: 16,
            fontSize: 12,
            color: "var(--ink-3)",
            fontFamily: "var(--mono)",
          }}
        >
          — DEAN OF STUDENT LIFE, IIM BANGALORE · MAR 2026
        </div>
      </div>
    </div>
  );
}

function AchievementsTab({ speaker }: { speaker: Speaker }) {
  return (
    <div>
      <div className="eyebrow">National service</div>
      <h2 className="serif" style={{ fontSize: 36, margin: "12px 0 32px", fontWeight: 400 }}>
        Verified milestones
      </h2>
      <div>
        {speaker.achievements.map((a, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "90px 1fr 24px",
              alignItems: "center",
              gap: 24,
              padding: "24px 0",
              borderTop: "1px solid var(--line)",
            }}
          >
            <div className="serif" style={{ fontSize: 28, color: "var(--saffron-deep)" }}>
              {a.year}
            </div>
            <div className="serif" style={{ fontSize: 20, color: "var(--ink)" }}>
              {a.label}
            </div>
            <Verified size={14} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TopicsTab({ speaker }: { speaker: Speaker }) {
  return (
    <div>
      <div className="eyebrow">Talk topics</div>
      <h2 className="serif" style={{ fontSize: 36, margin: "12px 0 32px", fontWeight: 400 }}>
        What {speaker.name.split(" ")[0]} speaks about
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {speaker.topics.map((t, i) => (
          <div
            key={t}
            style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", padding: 22 }}
          >
            <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
              TOPIC {String(i + 1).padStart(2, "0")}
            </div>
            <div className="serif" style={{ fontSize: 20, margin: "8px 0 8px" }}>
              {t}
            </div>
            <p style={{ fontSize: 13, color: "var(--ink-3)", margin: 0, lineHeight: 1.55 }}>
              45–60 min keynote with stories and frameworks. Available as a workshop variant for 25–60
              attendees.
            </p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 36 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Available formats
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <ChipGroup options={speaker.formats} value={[]} onChange={() => {}} multi />
        </div>
      </div>
    </div>
  );
}

function ReviewsTab({ speaker }: { speaker: Speaker }) {
  const reviews = [
    {
      stars: 5,
      host: "BITS Pilani",
      when: "Mar 2026",
      body:
        "Brought a quiet honesty most keynote speakers never get to. Our students remembered the talk into placement season.",
    },
    {
      stars: 5,
      host: "TVS Motor Co.",
      when: "Feb 2026",
      body:
        "A masterclass in calm under pressure — exactly what our leadership cohort needed before the AGM.",
    },
    {
      stars: 4,
      host: "Welham Boys School",
      when: "Jan 2026",
      body:
        "The Q&A ran 40 minutes longer than scheduled. Worth every rupee of the bulk-package savings.",
    },
  ];
  return (
    <div>
      <div className="eyebrow">Past engagements</div>
      <h2 className="serif" style={{ fontSize: 36, margin: "12px 0 32px", fontWeight: 400 }}>
        {speaker.sessions} sessions · ★ {speaker.rating} average
      </h2>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {reviews.map((r, i) => (
          <div key={i} style={{ padding: "28px 0", borderTop: "1px solid var(--line)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div className="mono" style={{ fontSize: 12, color: "var(--ink-2)" }}>
                {"★".repeat(r.stars)}
                <span style={{ color: "var(--ink-3)" }}>{"★".repeat(5 - r.stars)}</span>
                <span style={{ marginLeft: 12 }}>{r.host}</span>
              </div>
              <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>
                {r.when}
              </div>
            </div>
            <p
              className="serif"
              style={{
                fontSize: 20,
                fontStyle: "italic",
                color: "var(--ink-2)",
                margin: 0,
                lineHeight: 1.45,
              }}
            >
              &ldquo;{r.body}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AvailabilityTab({ speaker }: { speaker: Speaker }) {
  const months = ["Jul", "Aug", "Sep", "Oct"];
  return (
    <div>
      <div className="eyebrow">Calendar</div>
      <h2 className="serif" style={{ fontSize: 36, margin: "12px 0 32px", fontWeight: 400 }}>
        Dates {speaker.name.split(" ")[0]} can hold
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        {months.map((m, mi) => (
          <div
            key={m}
            style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", padding: 18 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <div className="serif" style={{ fontSize: 18 }}>
                {m} 2026
              </div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>
                5 SLOTS
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
              {Array.from({ length: 30 }).map((_, i) => {
                const open = (i + mi) % 5 === 0 || (i + mi) % 7 === 0;
                const booked = (i + mi) % 11 === 0;
                return (
                  <div
                    key={i}
                    style={{
                      aspectRatio: "1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontFamily: "var(--mono)",
                      background: booked
                        ? "var(--paper-3)"
                        : open
                          ? "var(--saffron-soft)"
                          : "transparent",
                      color: booked
                        ? "var(--ink-3)"
                        : open
                          ? "var(--saffron-deep)"
                          : "var(--ink-3)",
                      borderRadius: 4,
                      cursor: open ? "pointer" : "default",
                      textDecoration: booked ? "line-through" : "none",
                    }}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
