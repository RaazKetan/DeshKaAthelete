"use client";

import { useEffect, useState } from "react";
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

const SPORTS = [
  "Cricket",
  "Football",
  "Hockey",
  "Badminton",
  "Wrestling",
  "Boxing",
  "Athletics",
  "Archery",
  "Shooting",
  "Kabaddi",
  "Table Tennis",
  "Tennis",
  "Weightlifting",
  "Swimming",
  "Chess",
  "Gymnastics",
];

const TRUST_LOGOS = [
  "DPS Bangalore",
  "Oberoi International",
  "Ryan International",
  "Podar Education",
  "Pathways School",
  "Inventure Academy",
  "TISB",
];

const STATS = [
  { value: "500+", label: "Partner schools", sub: "Across 12 cities" },
  { value: "200+", label: "Verified Crests", sub: "Olympic to national" },
  { value: "₹2 Cr+", label: "Paid to Crests", sub: "And growing" },
  { value: "98%", label: "Session success", sub: "Rated by schools" },
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

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: "Manually verified",
    body:
      "Aadhaar, Federation registration, and Khelo India IDs are reviewed by humans before a Crest is listed.",
  },
  {
    icon: Award,
    title: "Elite tier only",
    body:
      "Olympians, Arjuna awardees, national champions, and Asian Games medallists. Invitation-driven supply.",
  },
  {
    icon: Lock,
    title: "Escrow protection",
    body:
      "Schools pay the platform, not the Crest. Funds release only after the session is confirmed delivered.",
  },
  {
    icon: Building2,
    title: "Built for institutions",
    body:
      "GST invoices, audit trail, accounts payable workflow, and a relationship manager for every school account.",
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

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
            <Link href="/athlete/auth" className="hover:text-slate-900 transition-colors">For athletes</Link>
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

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[640px] overflow-hidden">
          <div className="absolute left-1/2 top-32 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-emerald-100/50 blur-[140px]" />
        </div>

        <Container size="lg" className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Badge tone="emerald" icon={<span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />}>
              Live in Bangalore, Mumbai &amp; Delhi
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-8 text-balance text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.035em] leading-[1.02] text-slate-900"
          >
            India's verified national achievers,
            <br />
            <span className="text-emerald-600">one booking away.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Book Olympians, Arjuna awardees, and national champions today — with scientists,
            civil servants, and defence personnel coming next. Aadhaar &amp; Federation verified,
            payments held in escrow until the session is delivered.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link href="/school/athletes">
              <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Browse Crests
              </Button>
            </Link>
            <Link href="/athlete/auth">
              <Button size="lg" variant="outline">
                Join as an athlete
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500"
          >
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-slate-400" /> Free for schools to browse</span>
            <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-slate-400" /> Escrow-protected payments</span>
            <span className="inline-flex items-center gap-1.5"><Award className="h-3.5 w-3.5 text-slate-400" /> 100% manual KYC</span>
          </motion.div>
        </Container>

        {/* Sport marquee — quiet text-only */}
        <div className="mt-20 overflow-hidden border-y border-slate-200/70 py-4">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...SPORTS, ...SPORTS].map((s, i) => (
              <span key={i} className="mx-6 text-sm font-medium text-slate-400 tracking-tight">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trusted by ── */}
      <section className="py-14">
        <Container>
          <p className="text-center text-xs uppercase tracking-[0.18em] text-slate-400 mb-8">
            Trusted by India's leading institutions
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

      {/* ── Stats strip ── */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 border-y border-slate-200 py-12">
            {STATS.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <p className="text-4xl font-semibold tracking-tight text-slate-900">{s.value}</p>
                <p className="mt-2 text-sm font-medium text-slate-700">{s.label}</p>
                <p className="mt-0.5 text-xs text-slate-500">{s.sub}</p>
              </div>
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

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px rounded-2xl overflow-hidden bg-slate-200 border border-slate-200">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="bg-white p-8">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400">0{i + 1}</span>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
                <step.icon className="mt-6 h-5 w-5 text-emerald-600" />
                <h3 className="mt-4 text-base font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Trust ── */}
      <section id="trust" className="py-24 scroll-mt-20 bg-slate-50/60 border-y border-slate-200">
        <Container>
          <div className="max-w-2xl">
            <Badge tone="emerald" icon={<ShieldCheck className="h-3 w-3" />}>Trust &amp; safety</Badge>
            <h2 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-[-0.025em] text-slate-900">
              Built for the people who answer to parents and boards.
            </h2>
            <p className="mt-4 text-slate-600">
              Every safeguard exists so a principal can invite an Olympian without writing a single risk memo.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {TRUST_POINTS.map((p) => (
              <div key={p.title} className="bg-white border border-slate-200 rounded-xl p-6">
                <p.icon className="h-5 w-5 text-emerald-600" />
                <h3 className="mt-4 text-base font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Athlete CTA ── */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
        </div>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Badge tone="slate" icon={<Sparkles className="h-3 w-3" />}>For athletes</Badge>
              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.025em] leading-[1.05]">
                Your career on the field built a name.
                <br />
                <span className="text-emerald-400">Let it earn off it too.</span>
              </h2>
              <p className="mt-5 text-slate-300 text-lg max-w-xl leading-relaxed">
                Set your own fee. Pick your schedule. Get paid securely — within 48 hours of every session, with zero monthly fees and no chasing schools.
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 max-w-xl">
                {[
                  { icon: Wallet, text: "₹8,000 to ₹50,000 per session — you decide" },
                  { icon: Lock, text: "Payment guaranteed via escrow before you arrive" },
                  { icon: Users, text: "Live to 500+ partner schools instantly" },
                  { icon: ShieldCheck, text: "No upfront fee, no monthly subscription" },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Icon className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link href="/athlete/auth">
                  <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>Apply as an athlete</Button>
                </Link>
                <Link href="/athlete/auth">
                  <Button size="lg" variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5">
                    Already a member? Log in
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: "15+", l: "Sports covered", s: "Cricket → Archery" },
                  { v: "₹18K", l: "Avg. session fee", s: "Per 60-min session" },
                  { v: "500+", l: "Schools onboarded", s: "12 cities" },
                  { v: "₹2 Cr+", l: "Paid to athletes", s: "And growing" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-2xl font-semibold tracking-tight">{s.v}</p>
                    <p className="mt-3 text-xs font-medium text-slate-400">{s.l}</p>
                    <p className="text-[11px] text-slate-500">{s.s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-slate-200">
        <Container className="py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="col-span-2 md:col-span-1">
              <Logo />
              <p className="mt-4 text-sm text-slate-500 leading-relaxed max-w-xs">
                India's verified marketplace for national achievers. Built in Bangalore.
              </p>
            </div>
            <FooterCol
              title="Platform"
              links={[
                { label: "Browse Crests", href: "/school/athletes" },
                { label: "School portal", href: "/school/auth" },
                { label: "Athlete login", href: "/athlete/auth" },
              ]}
            />
            <FooterCol
              title="Trust"
              links={[
                { label: "How it works", href: "#how" },
                { label: "Verification", href: "#trust" },
                { label: "Escrow payments", href: "#trust" },
              ]}
            />
            <FooterCol
              title="Legal"
              links={[
                { label: "Privacy", href: "/policy/privacy" },
                { label: "Terms", href: "/policy/terms" },
                { label: "Refunds", href: "/policy/refund" },
              ]}
            />
          </div>

          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Crests by DeshKa · Made in India</p>
            <div className="flex items-center gap-5">
              <span className="inline-flex items-center gap-1.5"><Lock className="h-3 w-3" /> SSL secured</span>
              <span>PCI-DSS compliant</span>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-900">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
