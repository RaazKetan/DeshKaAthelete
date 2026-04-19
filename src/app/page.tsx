"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import {
  ArrowRight, ShieldCheck, Trophy, Users, Zap, Medal, Star,
  CheckCircle2, Building2, BookOpen, Award, Lock, Phone, ChevronRight
} from "lucide-react";
import Link from "next/link";

/* ─── Data ─── */
const SPORTS_MARQUEE = [
  "🏏 Cricket", "⚽ Football", "🏸 Badminton", "🏑 Hockey", "🤼 Wrestling",
  "🥊 Boxing", "🎯 Archery", "🏊 Swimming", "🤸 Gymnastics", "♟️ Chess",
  "🏹 Shooting", "🏋️ Weightlifting", "🥋 Kabaddi", "🏓 Table Tennis", "🎾 Tennis",
  "🏐 Volleyball", "🚴 Cycling", "🤺 Fencing", "🏇 Equestrian", "⛳ Golf",
];

const TRUST_LOGOS = [
  "DPS Bangalore", "Oberoi International", "Ryan International", "Podar Education",
  "Pathways School", "Inventure Academy", "The International School Bangalore",
];

const FLOATING_SPORTS = [
  { emoji: "🏏", x: "8%",  y: "20%", delay: 0,   size: "text-3xl", dur: 6 },
  { emoji: "⚽", x: "88%", y: "15%", delay: 1.5, size: "text-2xl", dur: 7 },
  { emoji: "🏸", x: "5%",  y: "65%", delay: 0.8, size: "text-2xl", dur: 5.5 },
  { emoji: "🏑", x: "92%", y: "60%", delay: 2.2, size: "text-3xl", dur: 8 },
  { emoji: "🥊", x: "80%", y: "40%", delay: 0.5, size: "text-xl",  dur: 6.5 },
  { emoji: "🎯", x: "12%", y: "42%", delay: 1.8, size: "text-xl",  dur: 7.5 },
  { emoji: "🏹", x: "50%", y: "8%",  delay: 1,   size: "text-2xl", dur: 9 },
  { emoji: "🏋️", x: "72%", y: "80%", delay: 2.5, size: "text-2xl", dur: 6 },
];

const STATS = [
  { value: 500, suffix: "+", label: "Partner Schools", sub: "Across 12 states" },
  { value: 15,  suffix: "+", label: "Sports Covered", sub: "Olympic to regional" },
  { value: 2,   suffix: " Cr+", label: "Paid to Athletes", sub: "And growing daily", prefix: "₹" },
  { value: 98,  suffix: "%", label: "Session Success Rate", sub: "Based on school ratings" },
];

const HOW_IT_WORKS = [
  {
    step: "01", icon: BookOpen, title: "School Browses & Books",
    desc: "Explore verified athlete profiles filtered by sport, city, and availability. Book a session in under 2 minutes.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    step: "02", icon: Lock, title: "Payment Held in Escrow",
    desc: "100% of the session fee is secured in escrow before the athlete is notified. Zero financial risk for both parties.",
    color: "from-green-500 to-emerald-600",
  },
  {
    step: "03", icon: Award, title: "Session Delivered & Paid",
    desc: "After the school confirms the session is complete, payment is released to the athlete within 24 hours.",
    color: "from-orange-500 to-amber-600",
  },
];

const TRUST_POINTS = [
  {
    icon: ShieldCheck, title: "100% KYC Verified", color: "green",
    desc: "Every athlete submits Aadhaar, Federation IDs, Khelo India certificates, and sports achievements for manual review.",
    badge: "Manual Review"
  },
  {
    icon: Trophy, title: "Elite Tier Only", color: "amber",
    desc: "Entry strictly limited to Olympians, Arjuna awardees, national champions, and Asian Games medalists.",
    badge: "Invitation Only"
  },
  {
    icon: Lock, title: "Escrow Payment Protection", color: "blue",
    desc: "Your school pays the platform. Athletes are only paid after successful delivery. Zero setup costs, zero risk.",
    badge: "PCI Compliant"
  },
  {
    icon: Building2, title: "Trusted by Top Schools", color: "purple",
    desc: "Partner schools include CBSE, ICSE & IB institutions across Bangalore, Mumbai, Delhi, Hyderabad, and Pune.",
    badge: "500+ Schools"
  },
  {
    icon: Phone, title: "Dedicated Account Manager", color: "rose",
    desc: "Every school gets a dedicated relationship manager available via phone, email and WhatsApp during business hours.",
    badge: "9am–7pm IST"
  },
  {
    icon: Star, title: "SAI & Khelo India Aligned", color: "indigo",
    desc: "Athletes on our platform are verified against Sports Authority of India records and Khelo India databases.",
    badge: "Govt. Verified"
  },
];

/* ─── Animated Counter ─── */
function AnimatedNumber({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useSpring(count, { duration: 2000, bounce: 0 });

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2 });
    }
  }, [isInView, count, target]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
      }
    });
  }, [rounded, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

/* ─── Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Main Component ─── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen selection:bg-green-500/30 overflow-x-hidden">

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "glass-nav shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-700 to-green-400 flex items-center justify-center font-black text-white shadow-lg shadow-green-500/30">
              DA
            </div>
            <div>
              <p className="font-black text-lg text-slate-900 leading-none tracking-tight">DeshKa Athlete</p>
              <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">India's Sports Network</p>
            </div>
          </Link>

          <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-500">
            <a href="#how" className="hover:text-green-600 transition-colors">How It Works</a>
            <a href="#trust" className="hover:text-green-600 transition-colors">Trust & Safety</a>
            <Link href="/school/athletes" className="hover:text-green-600 transition-colors">For Schools</Link>
          </div>

          <div className="flex gap-3">
            <Link
              href="/athlete/auth"
              className="hidden sm:flex text-sm font-bold text-slate-600 hover:text-green-700 transition-colors items-center gap-1 px-3 py-2 rounded-lg hover:bg-green-50"
            >
              Athlete Login
            </Link>
            <Link
              href="/school/dashboard"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-700 transition-all shadow-sm hover:shadow-md flex items-center gap-1.5"
            >
              School Portal
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <main className="relative min-h-screen flex flex-col items-center justify-center pt-28 sm:pt-24 pb-16 px-4 sm:px-6 overflow-hidden">

        {/* Background gradient mesh */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-green-100 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[100px] opacity-80" />
          <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-blue-50 rounded-full blur-[80px] opacity-50" />
        </div>

        {/* Floating sports orbs — hidden on xs screens to prevent overflow */}
        <div className="hidden sm:block">
        {FLOATING_SPORTS.map((orb, i) => (
          <motion.div
            key={i}
            className={`absolute select-none pointer-events-none ${orb.size}`}
            style={{ left: orb.x, top: orb.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.7, 0.5],
              scale: [0, 1, 0.9],
              y: [0, -18, 0],
            }}
            transition={{
              opacity: { delay: orb.delay, duration: 1 },
              scale: { delay: orb.delay, duration: 1 },
              y: { delay: orb.delay, duration: orb.dur, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            {orb.emoji}
          </motion.div>
        ))}
        </div>

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 px-2">

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-200 bg-white/80 backdrop-blur-sm mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
            <span className="text-xs font-bold tracking-widest text-green-700 uppercase">Now Live in Bangalore · Mumbai · Delhi</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6 text-slate-900"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={fadeUp} custom={0} className="block">
              Elite Mentorship by
            </motion.span>
            <motion.span variants={fadeUp} custom={1} className="block gradient-text pb-2">
              India's Greatest
            </motion.span>
            <motion.span variants={fadeUp} custom={2} className="block">
              Sports Stars
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-slate-500 mb-8 sm:mb-10 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Connect your students with verified Olympians, National Champions, and Asian Games
            medalists — across Cricket, Football, Hockey, Badminton &amp; 12+ more sports.
          </motion.p>

          {/* Sports marquee ticker */}
          <motion.div
            className="w-full overflow-hidden mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex gap-3 animate-[marquee_35s_linear_infinite] whitespace-nowrap w-max">
              {[...SPORTS_MARQUEE, ...SPORTS_MARQUEE].map((sport, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm shrink-0"
                >
                  {sport}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md sm:max-w-none justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link href="/school/athletes" className="btn-primary hover:scale-105 transition-transform justify-center">
              Browse Athletes
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/athlete/auth" className="btn-ghost justify-center">
              <Medal className="w-5 h-5 text-green-600" />
              Join as an Athlete
            </Link>
          </motion.div>

          {/* Trust micro-signals */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8 sm:mt-10 text-xs font-semibold text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            {[
              "✅ Free to browse",
              "🔒 Escrow payment protection",
              "📋 KYC verified athletes",
              "🇮🇳 Made in India",
            ].map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </motion.div>
        </div>
      </main>

      {/* ── Social Proof Scroller - Schools ── */}
      <section className="py-12 border-y border-slate-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
            Trusted by India's Leading Schools & Academies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {TRUST_LOGOS.map((school, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
                <Building2 className="w-4 h-4 text-slate-300" />
                {school}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-green-500/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-emerald-500/8 rounded-full blur-[80px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  <AnimatedNumber target={stat.value} prefix={stat.prefix ?? ""} suffix={stat.suffix} />
                </div>
                <p className="text-sm font-bold text-green-400 mb-1">{stat.label}</p>
                <p className="text-xs text-slate-500">{stat.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 mb-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
              Simple Process
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Book a Session in <span className="gradient-text">3 Easy Steps</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              From browsing athletes to confirmed session — takes under 5 minutes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-14 left-[25%] right-[25%] h-0.5 bg-gradient-to-r from-blue-200 via-green-200 to-orange-200" />

            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className="p-8 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 group">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-black text-slate-300 tracking-widest uppercase">{step.step}</span>
                  <h3 className="text-xl font-black text-slate-900 mt-2 mb-3">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust & Safety ── */}
      <section id="trust" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 mb-5">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span className="text-xs font-bold text-green-700 uppercase tracking-widest">Trust & Safety</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Built for Schools That Need to <span className="gradient-text">Trust Every Step</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              We know schools are accountable to parents, principals, and boards.
              Every safeguard exists so you can invite an athlete with zero worry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRUST_POINTS.map((point, i) => {
              const colorMap: Record<string, string> = {
                green: "bg-green-100 text-green-600 border-green-200",
                amber: "bg-amber-100 text-amber-600 border-amber-200",
                blue: "bg-blue-100 text-blue-600 border-blue-200",
                purple: "bg-purple-100 text-purple-600 border-purple-200",
                rose: "bg-rose-100 text-rose-600 border-rose-200",
                indigo: "bg-indigo-100 text-indigo-600 border-indigo-200",
              };
              const badgeMap: Record<string, string> = {
                green: "bg-green-50 text-green-700 border-green-200",
                amber: "bg-amber-50 text-amber-700 border-amber-200",
                blue: "bg-blue-50 text-blue-700 border-blue-200",
                purple: "bg-purple-50 text-purple-700 border-purple-200",
                rose: "bg-rose-50 text-rose-700 border-rose-200",
                indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
              };
              return (
                <motion.div
                  key={i}
                  className="p-7 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, duration: 0.55 }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colorMap[point.color]}`}>
                      <point.icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${badgeMap[point.color]}`}>
                      {point.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">{point.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{point.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Athlete CTA Section ── */}
      <section id="athletes" className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 -z-0">
          <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-green-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[300px] bg-emerald-500/12 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 mb-8">
                <Medal className="w-4 h-4 text-green-400" />
                <span className="text-xs font-bold tracking-widest text-green-400 uppercase">For Athletes</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-[1.1]">
                Turn your <span className="gradient-text">sporting legacy</span> into meaningful income.
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                If you&apos;ve competed at national or international level in any sport — schools across India
                want to learn from you. Set your own fee, pick your schedule, get paid securely.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: Zap, text: "Set your own fee — typically ₹8,000 to ₹50,000 per session" },
                  { icon: Lock, text: "Payment guaranteed via escrow before you even show up" },
                  { icon: Users, text: "Your verified profile is live to 500+ partner schools instantly" },
                  { icon: CheckCircle2, text: "No upfront fee, no monthly subscription — zero cost to join" },
                ].map(({ icon: Icon, text }, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-500/15 border border-green-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-green-400" />
                    </div>
                    <p className="text-slate-300 text-sm font-medium">{text}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/athlete/auth"
                  className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-black transition-all hover:scale-105 shadow-xl shadow-green-600/25 flex items-center justify-center gap-2"
                >
                  Apply as an Athlete
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/athlete/auth"
                  className="border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center"
                >
                  Already a member? Log in
                </Link>
              </div>
            </motion.div>

            {/* Stats cards */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {[
                { label: "Sports Covered", value: "15+", sub: "From Cricket to Archery", icon: "🏆" },
                { label: "Avg. Session Fee", value: "₹18K", sub: "Per 60-min session", icon: "💰" },
                { label: "Schools Onboarded", value: "500+", sub: "Across 12 cities", icon: "🏫" },
                { label: "Paid to Athletes", value: "₹2 Cr+", sub: "And growing", icon: "📈" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm hover:border-green-500/30 hover:bg-slate-800 transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  <div className="text-2xl mb-3">{stat.icon}</div>
                  <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                  <p className="text-sm font-bold text-slate-400 mb-0.5">{stat.label}</p>
                  <p className="text-xs text-slate-500">{stat.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-green-700 to-green-400 flex items-center justify-center font-black text-white text-sm shadow-sm">
                  DA
                </div>
                <div>
                  <p className="font-black text-white leading-none text-sm">DeshKa Athlete</p>
                  <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-0.5">India's Sports Network</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                Connecting India's elite sports stars with schools for mentorship and inspiration.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Platform</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/school/athletes" className="hover:text-white transition-colors">Browse Athletes</Link></li>
                <li><Link href="/school/dashboard" className="hover:text-white transition-colors">School Portal</Link></li>
                <li><Link href="/athlete/auth" className="hover:text-white transition-colors">Athlete Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Trust</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#trust" className="hover:text-white transition-colors">KYC Process</a></li>
                <li><a href="#how" className="hover:text-white transition-colors">Escrow Payments</a></li>
                <li><span className="text-slate-600">SAI Verified Athletes</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">
              © 2025 DeshKa Athlete. Proudly 🇮🇳 Made in India.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3" /> SSL Secured
              </span>
              <span>PCI-DSS Compliant Payments</span>
              <span>SAI & Khelo India Aligned</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
