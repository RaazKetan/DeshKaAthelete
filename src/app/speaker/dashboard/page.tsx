"use client";

import { useState } from "react";
import { Topbar } from "@/components/crests/Topbar";
import { Footer } from "@/components/crests/Footer";
import { Verified } from "@/components/crests/atoms";
import { SPEAKERS, formatFee } from "@/data/speakers";

type Status = "pending" | "confirmed" | "declined" | "all";

interface Request {
  id: string;
  org: string;
  orgKind: string;
  speakerId: string;
  requester: string;
  date: string;
  time: string;
  format: string;
  audience: number;
  venue: string;
  mode: string;
  fee: number;
  note: string;
  status: "pending" | "confirmed" | "declined";
  received: string;
}

const REQUESTS: Request[] = [
  {
    id: "r-001",
    org: "IIT Bombay",
    orgKind: "Institute · 12,400 students",
    speakerId: "meera-rajaram",
    requester: "Pranjal Khurana, Dean of Student Life",
    date: "2026-08-14",
    time: "11:00 — 12:30 IST",
    format: "Keynote + Q&A",
    audience: 600,
    venue: "Convocation Hall, Powai",
    mode: "In-person",
    fee: 280000,
    note:
      'Independence Day week. Theme: "Service before self." Looking for a 35-min talk + 25-min moderated Q&A from sports captains.',
    status: "pending",
    received: "2 days ago",
  },
  {
    id: "r-002",
    org: "Ashoka University",
    orgKind: "University · 3,100 students",
    speakerId: "meera-rajaram",
    requester: "Vinita Rao, Head of Athletics",
    date: "2026-09-03",
    time: "17:30 — 19:00 IST",
    format: "Workshop",
    audience: 80,
    venue: "Sonepat Campus",
    mode: "In-person",
    fee: 220000,
    note: "Closed workshop with women's hockey team and SU board. Travel covered.",
    status: "pending",
    received: "6 hours ago",
  },
  {
    id: "r-003",
    org: "Tata Steel — Jamshedpur",
    orgKind: "Enterprise · L&D",
    speakerId: "meera-rajaram",
    requester: "Aditya Banerjee, CHRO Office",
    date: "2026-10-21",
    time: "10:00 — 11:00 IST",
    format: "Fireside chat",
    audience: 1200,
    venue: "Virtual",
    mode: "Virtual",
    fee: 180000,
    note: "Diwali off-site fireside with our CHRO. Theme: leading through transitions.",
    status: "confirmed",
    received: "1 week ago",
  },
  {
    id: "r-004",
    org: "Shiv Nadar School",
    orgKind: "School · K-12 · 2,100 students",
    speakerId: "meera-rajaram",
    requester: "Anjali Sharma, Principal",
    date: "2026-07-28",
    time: "09:00 — 10:00 IST",
    format: "Group session",
    audience: 350,
    venue: "Noida campus",
    mode: "In-person",
    fee: 120000,
    note: "Senior school assembly. Bulk-package as part of 3-school annual circuit.",
    status: "declined",
    received: "5 days ago",
  },
  {
    id: "r-005",
    org: "Indian School of Business",
    orgKind: "Business school",
    speakerId: "meera-rajaram",
    requester: "Nikhil Bhalla, Speaker Series Lead",
    date: "2026-11-09",
    time: "18:00 — 19:30 IST",
    format: "Keynote",
    audience: 450,
    venue: "Hyderabad Campus",
    mode: "In-person",
    fee: 320000,
    note: "Annual leadership summit. Co-keynote with Amb. Sanjay Iyer.",
    status: "pending",
    received: "Just now",
  },
];

export default function SpeakerDashboardPage() {
  const [filter, setFilter] = useState<Status>("pending");
  const speaker = SPEAKERS[0];
  const reqs = REQUESTS.filter((r) => filter === "all" || r.status === filter);
  const [selected, setSelected] = useState(REQUESTS[0].id);
  const sel = REQUESTS.find((r) => r.id === selected) ?? REQUESTS[0];

  const counts = {
    pending: REQUESTS.filter((r) => r.status === "pending").length,
    confirmed: REQUESTS.filter((r) => r.status === "confirmed").length,
    declined: REQUESTS.filter((r) => r.status === "declined").length,
    all: REQUESTS.length,
  };

  return (
    <>
      <Topbar />
      <main>
        <div className="container-1320" style={{ padding: "40px 32px 24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <div className="eyebrow">Speaker dashboard · {speaker.name}</div>
              <h1
                className="serif"
                style={{
                  fontSize: "clamp(36px, 4.6vw, 56px)",
                  margin: "12px 0 0",
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {counts.pending} requests await your call.
              </h1>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Stat k="THIS YEAR" v="14" sub="sessions delivered" />
              <Stat k="EARNED" v="₹38.4 L" sub="net of fees" />
              <Stat k="NEXT" v="Aug 14" sub="IIT Bombay · keynote" />
            </div>
          </div>
        </div>

        <div className="container-1320" style={{ padding: "0 32px" }}>
          <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--line)", marginTop: 24 }}>
            {(
              [
                ["pending", "Pending", counts.pending],
                ["confirmed", "Confirmed", counts.confirmed],
                ["declined", "Declined", counts.declined],
                ["all", "All requests", counts.all],
              ] as [Status, string, number][]
            ).map(([v, l, c]) => (
              <button
                key={v}
                onClick={() => {
                  setFilter(v);
                  const first = REQUESTS.find((r) => v === "all" || r.status === v);
                  if (first) setSelected(first.id);
                }}
                style={{
                  padding: "14px 20px",
                  background: "transparent",
                  border: 0,
                  fontSize: 13.5,
                  color: filter === v ? "var(--ink)" : "var(--ink-3)",
                  fontWeight: filter === v ? 500 : 400,
                  borderBottom: filter === v ? "2px solid var(--saffron-deep)" : "2px solid transparent",
                  marginBottom: -1,
                  cursor: "pointer",
                }}
              >
                {l}{" "}
                <span
                  style={{
                    marginLeft: 6,
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--ink-3)",
                  }}
                >
                  {c}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div
          className="container-1320"
          style={{
            padding: "24px 32px 80px",
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {reqs.map((r) => (
              <RequestRow
                key={r.id}
                req={r}
                active={r.id === selected}
                onClick={() => setSelected(r.id)}
              />
            ))}
            {reqs.length === 0 && (
              <div
                style={{
                  padding: 60,
                  textAlign: "center",
                  color: "var(--ink-3)",
                  border: "1px dashed var(--line-2)",
                  borderRadius: 8,
                }}
              >
                No requests in this bucket.
              </div>
            )}
          </div>

          <RequestDetail req={sel} />
        </div>
      </main>
      <Footer />
    </>
  );
}

function Stat({ k, v, sub }: { k: string; v: string; sub: string }) {
  return (
    <div style={{ minWidth: 120 }}>
      <div className="eyebrow" style={{ fontSize: 10 }}>
        {k}
      </div>
      <div className="serif" style={{ fontSize: 28, lineHeight: 1.1, marginTop: 4 }}>
        {v}
      </div>
      <div style={{ fontSize: 11.5, color: "var(--ink-3)", marginTop: 2 }}>{sub}</div>
    </div>
  );
}

function RequestRow({ req, active, onClick }: { req: Request; active: boolean; onClick: () => void }) {
  const statusColor =
    req.status === "confirmed"
      ? "var(--neem)"
      : req.status === "declined"
        ? "var(--ink-4)"
        : "var(--saffron-deep)";
  const statusBg =
    req.status === "confirmed"
      ? "var(--neem-soft)"
      : req.status === "declined"
        ? "var(--paper-2)"
        : "var(--saffron-soft)";
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left",
        cursor: "pointer",
        padding: "20px 22px",
        border: "1px solid",
        borderColor: active ? "var(--ink)" : "var(--line)",
        borderRadius: "var(--radius-lg)",
        background: "var(--paper)",
        marginBottom: 8,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        transition: "all 0.15s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div className="serif" style={{ fontSize: 18, lineHeight: 1.1 }}>
          {req.org}
        </div>
        <span
          style={{
            fontSize: 10,
            fontFamily: "var(--mono)",
            padding: "3px 8px",
            borderRadius: 999,
            background: statusBg,
            color: statusColor,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {req.status}
        </span>
      </div>
      <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{req.orgKind}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6,
          fontSize: 12,
          fontFamily: "var(--mono)",
          color: "var(--ink-2)",
        }}
      >
        <span>
          {req.date} · {req.format}
        </span>
        <span>{formatFee(req.fee)}</span>
      </div>
      <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>
        Received {req.received}
      </div>
    </button>
  );
}

function RequestDetail({ req }: { req: Request }) {
  return (
    <div
      style={{
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-lg)",
        padding: 32,
        background: "var(--paper)",
      }}
    >
      <div className="eyebrow">Booking #{req.id.toUpperCase()}</div>
      <h2
        className="serif"
        style={{ fontSize: 32, margin: "12px 0 8px", fontWeight: 400, lineHeight: 1.1 }}
      >
        {req.org}
      </h2>
      <div style={{ fontSize: 13, color: "var(--ink-3)" }}>
        {req.orgKind} · {req.requester}
      </div>

      <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <DetailField k="Date" v={req.date} sub={req.time} />
        <DetailField k="Format" v={req.format} sub={req.mode} />
        <DetailField k="Audience" v={req.audience + " attendees"} sub={req.venue} />
        <DetailField k="Offered fee" v={formatFee(req.fee)} sub="+ travel covered" />
      </div>

      <div style={{ marginTop: 28 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>
          Note from {req.requester.split(",")[0]}
        </div>
        <p
          className="serif"
          style={{
            fontSize: 18,
            fontStyle: "italic",
            color: "var(--ink-2)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          &ldquo;{req.note}&rdquo;
        </p>
      </div>

      {req.status === "pending" && (
        <>
          <div style={{ height: 1, background: "var(--line)", margin: "32px 0 24px" }} />
          <div className="eyebrow" style={{ marginBottom: 14 }}>
            Quick reply
          </div>
          <textarea
            placeholder={`Hi ${req.requester.split(",")[0].split(" ")[0]} — `}
            rows={3}
            style={{
              width: "100%",
              padding: 14,
              fontSize: 14,
              fontFamily: "inherit",
              border: "1px solid var(--line-2)",
              borderRadius: 8,
              outline: "none",
              resize: "vertical",
              background: "var(--paper)",
            }}
          />
          <div
            style={{
              marginTop: 16,
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn ghost sm">Propose alternate date</button>
              <button className="btn ghost sm">Negotiate fee</button>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn ghost">Decline</button>
              <button className="btn saffron">Accept request →</button>
            </div>
          </div>
        </>
      )}

      {req.status === "confirmed" && (
        <div
          style={{
            marginTop: 28,
            padding: 18,
            background: "var(--neem-soft)",
            borderRadius: 8,
            fontSize: 13,
            color: "var(--neem)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Verified size={14} />
          <span>Confirmed. Crests team will share the rider, travel and contract within 24 hours.</span>
        </div>
      )}
    </div>
  );
}

function DetailField({ k, v, sub }: { k: string; v: string; sub?: string }) {
  return (
    <div>
      <div className="eyebrow" style={{ fontSize: 10, marginBottom: 6 }}>
        {k}
      </div>
      <div className="serif" style={{ fontSize: 20 }}>
        {v}
      </div>
      {sub && (
        <div
          style={{
            fontSize: 12,
            color: "var(--ink-3)",
            marginTop: 2,
            fontFamily: "var(--mono)",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}
