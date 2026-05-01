"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Topbar } from "@/components/crests/Topbar";
import { Footer } from "@/components/crests/Footer";
import { ChipGroup, ImageFrame, SearchInput, Verified } from "@/components/crests/atoms";
import {
  CATEGORIES,
  LANGUAGES,
  REGIONS,
  SPEAKERS,
  TOPICS,
  type Speaker,
} from "@/data/speakers";

type View = "grid" | "list";
type Mode = "any" | "inperson" | "virtual";

export default function BrowsePage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [topics, setTopics] = useState<string[]>([]);
  const [langs, setLangs] = useState<string[]>([]);
  const [mode, setMode] = useState<Mode>("any");
  const [sort, setSort] = useState("relevance");
  const [view, setView] = useState<View>("grid");

  const filtered = useMemo(() => {
    let r = SPEAKERS;
    if (cat !== "all") r = r.filter((s) => s.category === cat);
    if (q) {
      const Q = q.toLowerCase();
      r = r.filter(
        (s) =>
          s.name.toLowerCase().includes(Q) ||
          s.handle.toLowerCase().includes(Q) ||
          s.headline.toLowerCase().includes(Q) ||
          s.topics.some((t) => t.toLowerCase().includes(Q)),
      );
    }
    if (topics.length) r = r.filter((s) => topics.some((t) => s.topics.includes(t)));
    if (langs.length) r = r.filter((s) => langs.some((l) => s.languages.includes(l)));
    return r;
  }, [q, cat, topics, langs, mode]);

  return (
    <>
      <Topbar />
      <main>
        {/* Page head */}
        <section style={{ padding: "48px 0 24px", borderBottom: "1px solid var(--line)" }}>
          <div className="container-1320">
            <div className="eyebrow">The bureau</div>
            <h1
              className="serif"
              style={{
                fontSize: "clamp(40px, 5vw, 64px)",
                margin: "12px 0 24px",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {filtered.length} verified voices.
            </h1>
            <div style={{ display: "flex", gap: 12, alignItems: "center", maxWidth: 720 }}>
              <SearchInput
                value={q}
                onChange={setQ}
                size="lg"
                placeholder="Search by name, achievement, topic, language…"
              />
            </div>
          </div>
        </section>

        {/* Category chip bar */}
        <section
          style={{
            position: "sticky",
            top: 89,
            zIndex: 20,
            background: "oklch(0.97 0.008 80 / 0.92)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div className="container-1320" style={{ padding: "14px 32px" }}>
            <div
              style={{
                display: "flex",
                gap: 8,
                overflowX: "auto",
                alignItems: "center",
                paddingBottom: 2,
              }}
            >
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className={cat === c.id ? "chip active" : "chip"}
                >
                  {c.label}
                  <span style={{ opacity: 0.6, marginLeft: 6, fontSize: 11 }}>{c.count}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div
          className="container-1320"
          style={{
            padding: "32px 32px 80px",
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 36,
          }}
        >
          {/* Sidebar */}
          <aside>
            <FilterBlock label="Topic">
              <ChipGroup options={TOPICS.slice(0, 8)} value={topics} onChange={setTopics} multi />
            </FilterBlock>
            <FilterBlock label="Languages">
              <ChipGroup options={LANGUAGES.slice(0, 6)} value={langs} onChange={setLangs} multi />
            </FilterBlock>
            <FilterBlock label="Format">
              <ChipGroup
                options={["Keynote", "Workshop", "1:1", "Group"]}
                value={[]}
                onChange={() => {}}
                multi
              />
            </FilterBlock>
            <FilterBlock label="Mode">
              <div
                style={{
                  display: "flex",
                  gap: 0,
                  border: "1px solid var(--line-2)",
                  borderRadius: 999,
                  padding: 2,
                }}
              >
                {(
                  [
                    ["any", "Any"],
                    ["inperson", "In-person"],
                    ["virtual", "Virtual"],
                  ] as [Mode, string][]
                ).map(([v, l]) => (
                  <button
                    key={v}
                    onClick={() => setMode(v)}
                    style={{
                      flex: 1,
                      padding: "6px 10px",
                      border: 0,
                      borderRadius: 999,
                      fontSize: 11.5,
                      background: mode === v ? "var(--ink)" : "transparent",
                      color: mode === v ? "var(--paper)" : "var(--ink-2)",
                      cursor: "pointer",
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </FilterBlock>
            <FilterBlock label="Fee range">
              <div
                style={{
                  fontSize: 12,
                  color: "var(--ink-3)",
                  fontFamily: "var(--mono)",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span>₹1L</span>
                <span>₹10L+</span>
              </div>
              <input type="range" min={100000} max={1000000} defaultValue={500000} style={{ width: "100%" }} />
            </FilterBlock>
            <FilterBlock label="Region">
              <ChipGroup options={REGIONS} value={[]} onChange={() => {}} multi />
            </FilterBlock>
            <FilterBlock label="Verified only">
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12.5,
                  color: "var(--ink-2)",
                  cursor: "pointer",
                }}
              >
                <input type="checkbox" defaultChecked /> Federation-verified
              </label>
            </FilterBlock>
          </aside>

          {/* Results */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 13, color: "var(--ink-3)" }}>
                {filtered.length} of {SPEAKERS.length} · sorted by{" "}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={{
                    border: 0,
                    background: "transparent",
                    color: "var(--ink)",
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  <option value="relevance">relevance</option>
                  <option value="recent">recently joined</option>
                  <option value="rating">highest rated</option>
                  <option value="fee-asc">fee, low to high</option>
                </select>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 0,
                  border: "1px solid var(--line-2)",
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                {(["grid", "list"] as View[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    style={{
                      padding: "6px 10px",
                      border: 0,
                      background: view === v ? "var(--ink)" : "transparent",
                      color: view === v ? "var(--paper)" : "var(--ink-3)",
                      cursor: "pointer",
                    }}
                    aria-label={v}
                  >
                    {v === "grid" ? <GridIcon /> : <ListIcon />}
                  </button>
                ))}
              </div>
            </div>

            {view === "grid" ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 24,
                }}
              >
                {filtered.map((s) => (
                  <SpeakerGridCard key={s.id} speaker={s} />
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {filtered.map((s, i) => (
                  <SpeakerListRow key={s.id} speaker={s} index={i} />
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div style={{ padding: 80, textAlign: "center", color: "var(--ink-3)" }}>
                <div className="serif" style={{ fontSize: 28 }}>
                  No matches yet.
                </div>
                <div style={{ fontSize: 13, marginTop: 8 }}>
                  Try broadening your topic filter, or talk to the bureau team.
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function FilterBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--line)" }}>
      <div className="eyebrow" style={{ marginBottom: 12 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function GridIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <rect x="1" y="1" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
      <rect x="7" y="1" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1" y="7" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
      <rect x="7" y="7" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
function ListIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <line x1="1" y1="3" x2="11" y2="3" stroke="currentColor" strokeWidth="1.2" />
      <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.2" />
      <line x1="1" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function SpeakerGridCard({ speaker }: { speaker: Speaker }) {
  return (
    <Link
      href={`/speakers/${speaker.id}`}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div style={{ position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
        <ImageFrame seed={speaker.seed} ratio="4 / 5" label={speaker.name} accent={speaker.accent} />
      </div>
      <div style={{ padding: "14px 4px 4px", display: "flex", flexDirection: "column", gap: 6 }}>
        <div className="eyebrow" style={{ fontSize: 10 }}>
          {speaker.handle}
        </div>
        <div
          className="serif"
          style={{ fontSize: 20, lineHeight: 1.1, display: "flex", alignItems: "center", gap: 6 }}
        >
          {speaker.name} {speaker.verified && <Verified size={12} />}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
          {speaker.topics.slice(0, 2).map((t) => (
            <span key={t} style={{ fontSize: 11, color: "var(--ink-3)" }}>
              · {t}
            </span>
          ))}
        </div>
        <div
          style={{
            marginTop: 8,
            fontFamily: "var(--mono)",
            fontSize: 11,
            display: "flex",
            justifyContent: "space-between",
            color: "var(--ink-3)",
          }}
        >
          <span>{speaker.location.split("·")[0].trim()}</span>
          <span>{speaker.feeRange}</span>
        </div>
      </div>
    </Link>
  );
}

function SpeakerListRow({ speaker, index }: { speaker: Speaker; index: number }) {
  return (
    <Link
      href={`/speakers/${speaker.id}`}
      style={{
        display: "grid",
        gridTemplateColumns: "40px 80px 1.4fr 1fr 1fr 100px",
        alignItems: "center",
        gap: 20,
        padding: "20px 16px",
        borderTop: "1px solid var(--line)",
        textDecoration: "none",
        color: "inherit",
        background: "transparent",
      }}
    >
      <span className="mono" style={{ color: "var(--ink-3)", fontSize: 12 }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div style={{ width: 64, height: 80, borderRadius: 6, overflow: "hidden", position: "relative" }}>
        <ImageFrame seed={speaker.seed} ratio="64 / 80" label="" />
      </div>
      <div>
        <div
          className="serif"
          style={{ fontSize: 22, display: "flex", alignItems: "center", gap: 6 }}
        >
          {speaker.name} {speaker.verified && <Verified size={12} />}
        </div>
        <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>{speaker.handle}</div>
      </div>
      <div style={{ fontSize: 12, color: "var(--ink-3)" }}>
        {speaker.topics.slice(0, 3).join(" · ")}
      </div>
      <div style={{ fontSize: 12, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>
        {speaker.location.split("·")[0].trim()}
      </div>
      <div className="mono" style={{ fontSize: 12, color: "var(--ink)" }}>
        {speaker.feeRange}
      </div>
    </Link>
  );
}
