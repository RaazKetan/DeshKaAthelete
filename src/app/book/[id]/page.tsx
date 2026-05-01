"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Topbar } from "@/components/crests/Topbar";
import { Footer } from "@/components/crests/Footer";
import { ChipGroup, ImageFrame, Verified } from "@/components/crests/atoms";
import { SPEAKERS, formatFee } from "@/data/speakers";

interface Form {
  org: string;
  orgKind: string;
  contactName: string;
  role: string;
  email: string;
  date: string;
  altDate: string;
  time: string;
  format: string;
  mode: "inperson" | "virtual" | "hybrid";
  audience: string;
  venue: string;
  sessionType: "single" | "group" | "open";
  topicFocus: string;
  note: string;
}

const TOTAL = 4;

export default function BookingPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const speaker = SPEAKERS.find((s) => s.id === id) ?? SPEAKERS[0];
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>({
    org: "",
    orgKind: "University",
    contactName: "",
    role: "",
    email: "",
    date: "",
    altDate: "",
    time: "morning",
    format: "Keynote",
    mode: "inperson",
    audience: "200",
    venue: "",
    sessionType: "single",
    topicFocus: "",
    note: "",
  });
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <>
      <Topbar />
      <main>
        <div className="container-1320" style={{ padding: "24px 32px 0" }}>
          <Link
            href={`/speakers/${speaker.id}`}
            style={{
              background: "transparent",
              border: 0,
              color: "var(--ink-3)",
              fontSize: 13,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              textDecoration: "none",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path
                d="M8 2 L4 6 L8 10"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to profile
          </Link>
        </div>

        <div
          className="container-1320"
          style={{ padding: "24px 32px 80px", display: "grid", gridTemplateColumns: "7fr 5fr", gap: 56 }}
        >
          <div>
            <div className="eyebrow">Booking · Step {step} of {TOTAL}</div>
            <h1
              className="serif"
              style={{
                fontSize: "clamp(36px, 4vw, 52px)",
                margin: "12px 0 8px",
                fontWeight: 400,
                lineHeight: 1.05,
              }}
            >
              {step === 1 && "Tell us who you are."}
              {step === 2 && `When should ${speaker.name.split(" ")[0]} be there?`}
              {step === 3 && "Shape the session."}
              {step === 4 && "Confirm & send the request."}
            </h1>
            <p style={{ color: "var(--ink-3)", fontSize: 15, margin: 0, maxWidth: 560 }}>
              {step === 1 &&
                "We share these details with the speaker so they can decide. Crests verifies every requesting institution."}
              {step === 2 && "Pick a primary date and one alternate. Most speakers respond within 48 hours."}
              {step === 3 &&
                "Format, audience size, and the angle you want them to take. Optional but helps."}
              {step === 4 &&
                "Review, confirm, send. No charge until the speaker accepts and a contract is signed."}
            </p>

            <div style={{ display: "flex", gap: 8, marginTop: 32, marginBottom: 40 }}>
              {Array.from({ length: TOTAL }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 3,
                    borderRadius: 2,
                    background: i < step ? "var(--saffron-deep)" : "var(--line)",
                    transition: "background 0.3s",
                  }}
                />
              ))}
            </div>

            {step === 1 && (
              <FormGrid>
                <FormField label="Institution / Organisation" full>
                  <Input value={form.org} onChange={(v) => set("org", v)} placeholder="e.g. Indian Institute of Technology, Bombay" />
                </FormField>
                <FormField label="Type">
                  <Segmented
                    value={form.orgKind}
                    onChange={(v) => set("orgKind", v)}
                    options={["School", "University", "Enterprise", "Govt"]}
                  />
                </FormField>
                <FormField label="Audience size">
                  <Input value={form.audience} onChange={(v) => set("audience", v)} placeholder="200" type="number" />
                </FormField>
                <FormField label="Your name" full>
                  <Input value={form.contactName} onChange={(v) => set("contactName", v)} placeholder="Pranjal Khurana" />
                </FormField>
                <FormField label="Role">
                  <Input value={form.role} onChange={(v) => set("role", v)} placeholder="Dean of Student Life" />
                </FormField>
                <FormField label="Work email">
                  <Input value={form.email} onChange={(v) => set("email", v)} placeholder="pranjal@iitb.ac.in" />
                </FormField>
              </FormGrid>
            )}

            {step === 2 && (
              <div>
                <FormField label="Primary date" full>
                  <DatePicker value={form.date} onChange={(v) => set("date", v)} />
                </FormField>
                <div style={{ height: 24 }} />
                <FormGrid>
                  <FormField label="Alternate date">
                    <Input
                      value={form.altDate}
                      onChange={(v) => set("altDate", v)}
                      placeholder="DD / MM / YYYY"
                    />
                  </FormField>
                  <FormField label="Preferred time">
                    <Segmented
                      value={form.time}
                      onChange={(v) => set("time", v)}
                      options={[
                        { value: "morning", label: "Morning" },
                        { value: "afternoon", label: "Afternoon" },
                        { value: "evening", label: "Evening" },
                      ]}
                    />
                  </FormField>
                </FormGrid>
                <div
                  style={{
                    marginTop: 24,
                    padding: 18,
                    background: "var(--saffron-soft)",
                    borderRadius: 8,
                    fontSize: 13,
                    color: "var(--ink-2)",
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--saffron-deep)" }}>
                    NOTE
                  </span>
                  <span>
                    {speaker.name.split(" ")[0]} typically holds 5 dates per month. Crests will surface
                    alternates if your primary is unavailable.
                  </span>
                </div>
              </div>
            )}

            {step === 3 && (
              <FormGrid>
                <FormField label="Session format" full>
                  <ChipGroup
                    options={speaker.formats}
                    value={form.format}
                    onChange={(v) => set("format", v)}
                  />
                </FormField>
                <FormField label="Mode">
                  <Segmented
                    value={form.mode}
                    onChange={(v) => set("mode", v as Form["mode"])}
                    options={[
                      { value: "inperson", label: "In-person" },
                      { value: "virtual", label: "Virtual" },
                      { value: "hybrid", label: "Hybrid" },
                    ]}
                  />
                </FormField>
                <FormField label="Group size">
                  <Segmented
                    value={form.sessionType}
                    onChange={(v) => set("sessionType", v as Form["sessionType"])}
                    options={[
                      { value: "single", label: "1:1" },
                      { value: "group", label: "Group" },
                      { value: "open", label: "Open hall" },
                    ]}
                  />
                </FormField>
                <FormField label="Venue / city" full>
                  <Input
                    value={form.venue}
                    onChange={(v) => set("venue", v)}
                    placeholder="Convocation Hall, Powai, Mumbai"
                  />
                </FormField>
                <FormField label="Topic focus" full>
                  <Input
                    value={form.topicFocus}
                    onChange={(v) => set("topicFocus", v)}
                    placeholder={`e.g. "${speaker.topics[0]}" — tied to our Independence Day week`}
                  />
                </FormField>
                <FormField label="Anything else for the speaker?" full>
                  <textarea
                    value={form.note}
                    onChange={(e) => set("note", e.target.value)}
                    placeholder="Why this speaker for this audience, what you'd like them to walk away from, any sensitivities…"
                    rows={5}
                    style={{
                      width: "100%",
                      padding: 14,
                      fontFamily: "inherit",
                      fontSize: 14,
                      border: "1px solid var(--line-2)",
                      borderRadius: 8,
                      background: "var(--paper)",
                      resize: "vertical",
                      outline: "none",
                    }}
                  />
                </FormField>
              </FormGrid>
            )}

            {step === 4 && <ReviewSummary form={form} />}

            <div
              style={{ marginTop: 40, display: "flex", justifyContent: "space-between", gap: 12 }}
            >
              <button
                className="btn ghost"
                onClick={() => (step > 1 ? setStep(step - 1) : router.push(`/speakers/${speaker.id}`))}
              >
                ← {step > 1 ? "Back" : "Cancel"}
              </button>
              {step < TOTAL ? (
                <button className="btn saffron" onClick={() => setStep(step + 1)}>
                  Continue →
                </button>
              ) : (
                <button className="btn saffron" onClick={() => router.push("/booking/confirmed")}>
                  Send request to {speaker.name.split(" ")[0]} →
                </button>
              )}
            </div>
          </div>

          <aside>
            <div
              style={{
                position: "sticky",
                top: 100,
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-lg)",
                padding: 24,
                background: "var(--paper)",
              }}
            >
              <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
                <div
                  style={{
                    width: 64,
                    height: 80,
                    borderRadius: 6,
                    overflow: "hidden",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <ImageFrame seed={speaker.seed} ratio="64 / 80" label="" />
                </div>
                <div>
                  <div className="eyebrow" style={{ fontSize: 10 }}>
                    {speaker.handle}
                  </div>
                  <div className="serif" style={{ fontSize: 22, lineHeight: 1.05, marginTop: 4 }}>
                    {speaker.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 6,
                      fontSize: 11.5,
                      color: "var(--ink-3)",
                    }}
                  >
                    <Verified size={11} /> Verified · ★ {speaker.rating}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <SummaryRow k="Format" v={form.format} />
                <SummaryRow
                  k="Mode"
                  v={form.mode === "inperson" ? "In-person" : form.mode === "virtual" ? "Virtual" : "Hybrid"}
                />
                <SummaryRow k="Audience" v={form.audience ? form.audience + " attendees" : "—"} />
                <SummaryRow k="Date" v={form.date || "—"} />
              </div>
              <div style={{ height: 1, background: "var(--line)", margin: "20px 0" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span style={{ fontSize: 12, color: "var(--ink-3)" }}>Estimated fee</span>
                <span className="serif" style={{ fontSize: 26 }}>
                  {formatFee(speaker.fee)}
                </span>
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 11,
                  color: "var(--ink-3)",
                  fontFamily: "var(--mono)",
                }}
              >
                + travel, applicable taxes
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

function FormGrid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>{children}</div>
  );
}

function FormField({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : "auto" }}>
      <div className="eyebrow" style={{ fontSize: 10, marginBottom: 8 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      style={{
        width: "100%",
        padding: "12px 14px",
        border: "1px solid var(--line-2)",
        borderRadius: 8,
        background: "var(--paper)",
        fontSize: 14,
        outline: "none",
        fontFamily: "inherit",
      }}
    />
  );
}

function Segmented({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: (string | { value: string; label: string })[];
}) {
  const opts = options.map((o) => (typeof o === "object" ? o : { value: o, label: o }));
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid var(--line-2)",
        borderRadius: 8,
        padding: 3,
        background: "var(--paper)",
      }}
    >
      {opts.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          style={{
            flex: 1,
            padding: "8px 10px",
            fontSize: 12.5,
            border: 0,
            borderRadius: 6,
            background: value === o.value ? "var(--ink)" : "transparent",
            color: value === o.value ? "var(--paper)" : "var(--ink-2)",
            cursor: "pointer",
            fontWeight: value === o.value ? 500 : 400,
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function DatePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [month, setMonth] = useState(7); // August
  const [year] = useState(2026);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const days = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  return (
    <div
      style={{
        border: "1px solid var(--line-2)",
        borderRadius: "var(--radius-lg)",
        padding: 20,
        background: "var(--paper)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <button
          onClick={() => setMonth((m) => (m === 0 ? 11 : m - 1))}
          style={{ background: "transparent", border: 0, fontSize: 16, cursor: "pointer", color: "var(--ink-2)" }}
          aria-label="Previous month"
        >
          ‹
        </button>
        <div className="serif" style={{ fontSize: 18 }}>
          {monthNames[month]} {year}
        </div>
        <button
          onClick={() => setMonth((m) => (m === 11 ? 0 : m + 1))}
          style={{ background: "transparent", border: 0, fontSize: 16, cursor: "pointer", color: "var(--ink-2)" }}
          aria-label="Next month"
        >
          ›
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 6 }}>
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              fontSize: 10,
              color: "var(--ink-3)",
              fontFamily: "var(--mono)",
            }}
          >
            {d}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={"b" + i} />
        ))}
        {Array.from({ length: days }).map((_, i) => {
          const d = i + 1;
          const dateStr = `${monthNames[month]} ${d}, ${year}`;
          const open = (d * (month + 1)) % 5 !== 0;
          const selected = value === dateStr;
          return (
            <button
              key={d}
              disabled={!open}
              onClick={() => onChange(dateStr)}
              style={{
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontFamily: "var(--mono)",
                border: 0,
                borderRadius: 6,
                background: selected ? "var(--ink)" : "transparent",
                color: selected ? "var(--paper)" : open ? "var(--ink)" : "var(--ink-4)",
                cursor: open ? "pointer" : "not-allowed",
                textDecoration: !open ? "line-through" : "none",
                opacity: !open ? 0.4 : 1,
              }}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SummaryRow({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
      <span style={{ color: "var(--ink-3)" }}>{k}</span>
      <span style={{ color: "var(--ink)", fontFamily: "var(--mono)", fontSize: 12 }}>{v || "—"}</span>
    </div>
  );
}

function ReviewSummary({ form }: { form: Form }) {
  const rows: [string, string, string][] = [
    ["Institution", form.org || "Not set", form.orgKind],
    ["Contact", form.contactName || "Not set", form.role + (form.email ? " · " + form.email : "")],
    ["Date", form.date || "Not set", `Alt: ${form.altDate || "—"} · ${form.time}`],
    ["Format", form.format, `${form.mode} · ${form.sessionType} · ${form.audience} attendees`],
    ["Venue", form.venue || "TBD", ""],
    ["Topic focus", form.topicFocus || "Open", ""],
    ["Note", form.note || "—", ""],
  ];
  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
      {rows.map(([k, v, sub], i) => (
        <div
          key={k}
          style={{
            display: "grid",
            gridTemplateColumns: "160px 1fr",
            padding: "20px 24px",
            borderTop: i ? "1px solid var(--line)" : 0,
            gap: 24,
          }}
        >
          <div className="eyebrow" style={{ fontSize: 10 }}>
            {k}
          </div>
          <div>
            <div style={{ fontSize: 14, color: "var(--ink)" }}>{v}</div>
            {sub && (
              <div
                style={{
                  fontSize: 12,
                  color: "var(--ink-3)",
                  marginTop: 4,
                  fontFamily: "var(--mono)",
                }}
              >
                {sub}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
