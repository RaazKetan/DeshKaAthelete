"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogoMark } from "./atoms";

type Role = "booker" | "speaker";

const BOOKER_NAV = [
  { id: "/", label: "Discover" },
  { id: "/browse", label: "All speakers" },
  { id: "/#how", label: "How it works" },
];

const SPEAKER_NAV = [
  { id: "/speaker/dashboard", label: "My requests" },
  { id: "/", label: "Browse" },
];

const MARQUEE_ITEMS = [
  "CRESTS · BUREAU FOR INDIA'S NATIONAL ICONS",
  "124 VERIFIED SPEAKERS · 11 FEDERATIONS · 340+ SESSIONS DELIVERED",
  "ASHOKA UNIVERSITY · IIT BOMBAY · INFOSYS · TATA STEEL · DOON SCHOOL · IIM BANGALORE",
];

export function Topbar() {
  const pathname = usePathname();
  const [role, setRole] = useState<Role>("booker");
  const navItems = role === "speaker" ? SPEAKER_NAV : BOOKER_NAV;

  return (
    <header className="topbar">
      {/* Black ribbon with running marquee */}
      <div
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
          padding: "6px 0",
          fontSize: 11.5,
          fontFamily: "var(--mono)",
          letterSpacing: "0.06em",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((m, i) => (
            <span key={i}>
              <span style={{ color: "var(--marigold)" }}>•</span>&nbsp;&nbsp;{m}&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="topbar-inner">
        <Link href="/" className="logo">
          <LogoMark size={28} />
          <span>Crests</span>
        </Link>

        <nav className="nav">
          {navItems.map((n) => (
            <Link key={n.id} href={n.id} className={pathname === n.id ? "active" : ""}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="spacer" />

        {/* Role toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            border: "1.5px solid var(--ink)",
            borderRadius: 0,
            padding: 2,
            fontSize: 12,
            background: "var(--paper)",
          }}
        >
          {[
            { v: "booker" as Role, l: "Booker" },
            { v: "speaker" as Role, l: "Speaker" },
          ].map((opt) => (
            <button
              key={opt.v}
              type="button"
              onClick={() => setRole(opt.v)}
              style={{
                padding: "6px 14px",
                border: 0,
                background: role === opt.v ? "var(--ink)" : "transparent",
                color: role === opt.v ? "var(--paper)" : "var(--ink-2)",
                cursor: "pointer",
                fontWeight: role === opt.v ? 600 : 500,
              }}
            >
              {opt.l}
            </button>
          ))}
        </div>

        {role === "booker" ? (
          <>
            <Link href="/booker/auth/login" className="btn sm ghost" style={{ marginLeft: 4 }}>
              Sign in
            </Link>
            <Link href="/booker/auth/signup" className="btn sm saffron">
              Register institution
            </Link>
          </>
        ) : (
          <>
            <Link href="/speaker/auth/login" className="btn sm ghost" style={{ marginLeft: 4 }}>
              Sign in
            </Link>
            <Link
              href="/speaker/apply"
              className="btn sm"
              style={{ background: "var(--peacock)", borderColor: "var(--peacock)", color: "var(--paper)" }}
            >
              Apply to join
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
