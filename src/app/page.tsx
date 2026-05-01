import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Award,
  Users,
  CalendarCheck,
  Building2,
  Wallet,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";

const TRUST_LOGOS = [
  "DPS Bangalore",
  "Oberoi International",
  "Ryan International",
  "Podar Education",
  "Pathways School",
  "Inventure Academy",
  "TISB",
];

const HOW_IT_WORKS = [
  {
    icon: Users,
    title: "Browse verified Crests",
    body:
      "Filter by sport, city, and availability. Every profile is manually reviewed against Aadhaar, Federation IDs, and Khelo India records.",
  },
  {
    icon: Lock,
    title: "Pay into escrow",
    body:
      "Your full session fee is held by Crests. The Crest is only notified once payment lands. Zero risk to either side.",
  },
  {
    icon: CalendarCheck,
    title: "Session is delivered",
    body:
      "The Crest shows up. School confirms completion. Funds release to the Crest in 48 hours, minus a flat 12% platform fee.",
  },
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

export default function Home() {
  const featured = SPEAKERS.slice(0, 4);

  return (
    <div className="relative">
      {/* ── Nav ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
          scrolled ? "bg-white/85 backdrop-blur-md border-b border-slate-200/70" : "bg-transparent"
        }`}
      >
        <Container className="flex h-16 items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#how" className="hover:text-slate-900 transition-colors">How it works</a>
            <a href="#trust" className="hover:text-slate-900 transition-colors">Trust</a>
            <Link href="/school/athletes" className="hover:text-slate-900 transition-colors">For schools</Link>
            <Link href="/athlete/auth" className="hover:text-slate-900 transition-colors">For Crests</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/athlete/auth" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/school/auth">
              <Button variant="dark" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                School portal
              </Button>
            </Link>
          </div>
        </Container>
      </header>

      {/* ── Hero — editorial title page ── */}
      <section className="relative bg-[#f3eee2]">
        <Container size="xl" className="pt-28 lg:pt-32">
          {/* Top bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-baseline gap-x-10 gap-y-1 text-[11px] font-medium uppercase tracking-[0.2em]"
          >
            <span className="font-mono text-slate-900">EST. 2026 · NEW DELHI</span>
            <span className="text-slate-500">A bureau for India's national icons</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-12 lg:mt-16 text-slate-900 leading-[0.92] tracking-[-0.045em]"
            style={{ fontWeight: 900, fontSize: "clamp(3.25rem, 13vw, 14rem)" }}
          >
            <span className="block">India&apos;s finest,</span>
            <span className="block">
              on{" "}
              <em className="italic" style={{ fontStyle: "italic", fontWeight: 900 }}>
                your
              </em>{" "}
              stage.
            </span>
          </motion.h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 max-w-3xl text-lg lg:text-xl leading-relaxed text-slate-800"
          >
            Olympians from Haryana. Surgeons from AIIMS. Founders from Indore.
            Jawans from Pune. Authors from Jaipur.{" "}
            <span className="font-semibold">Crests</span> is the verified bureau
            that gets them to your school assembly, college fest, or all-hands —
            without the WhatsApp circus.
          </motion.p>

          {/* Stats spread */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-16 lg:mt-24 border-y border-slate-900/80 py-8 lg:py-10"
          >
            <div className="grid grid-cols-3 divide-x divide-slate-300">
              <Stat n="11"   label="Federations partnered" />
              <Stat n="340+" label="Sessions delivered" />
              <Stat n="96%"  label="Renewal rate" />
            </div>
          </motion.div>

          {/* Hero CTAs (kept subtle so the editorial layout breathes) */}
          <div className="mt-12 pb-20 lg:pb-28 flex flex-col sm:flex-row gap-3">
            <Link href="/school/athletes">
              <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Browse Crests
              </Button>
            </Link>
            <Link href="/athlete/auth">
              <Button size="lg" variant="outline" className="bg-transparent">
                Become a Crest
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Trusted by ── */}
      <section className="py-14">
        <Container>
          <p className="text-center text-xs uppercase tracking-[0.18em] text-slate-400 mb-8">
            Trusted by India&apos;s leading institutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {TRUST_LOGOS.map((s) => (
              <span key={s} className="text-sm font-medium text-slate-500">
                {s}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ── How it works ── */}
      <section id="how" className="py-24 scroll-mt-20">
        <Container>
          <div className="max-w-2xl">
            <Badge tone="neutral">How it works</Badge>
            <h2 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-[-0.025em] text-slate-900">
              Three steps. Five minutes. Zero risk.
            </h2>
            <p className="mt-4 text-slate-600">
              From browsing to a confirmed session — without chasing payments, federations, or middlemen.
            </p>
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
        <section id="how" style={{ padding: "80px 0", scrollMarginTop: 80 }}>
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

      </main>

      <Footer />
    </>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="px-6 first:pl-0 last:pr-0">
      <p
        className="text-slate-900 leading-none"
        style={{ fontWeight: 900, fontSize: "clamp(2.25rem, 5.5vw, 4rem)", letterSpacing: "-0.03em" }}
      >
        {n}
      </p>
      <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
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
