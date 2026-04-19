"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
  X,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/school/dashboard", label: "Dashboard",       icon: LayoutDashboard },
  { href: "/school/athletes",  label: "Browse Athletes", icon: Users },
];

export default function SchoolLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const hideLayout = pathname.startsWith("/school/book");
  if (hideLayout) return <>{children}</>;

  const isActive = (href: string) =>
    pathname === href ||
    (href === "/school/athletes" && pathname.startsWith("/school/book"));

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div
        className="px-5 py-5 flex items-center gap-3"
        style={{ borderBottom: "1px solid var(--school-border)" }}
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-black text-white text-sm shadow-md shadow-indigo-500/25">
            DA
          </div>
          <div>
            <p className="font-black text-slate-900 text-sm leading-none tracking-tight">DeshKa Athlete</p>
            <p
              className="text-[10px] font-bold uppercase tracking-widest mt-0.5"
              style={{ color: "var(--school-accent)" }}
            >
              School Portal
            </p>
          </div>
        </Link>
      </div>

      {/* Trust badge */}
      <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--school-border)" }}>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: "var(--school-accent-dim)", border: "1px solid rgba(79,70,229,0.12)" }}
        >
          <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: "var(--school-accent)" }} />
          <div>
            <p className="text-[11px] font-black" style={{ color: "var(--school-accent)" }}>Verified Platform</p>
            <p className="text-[10px] text-slate-400">KYC-checked athletes only</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="px-3 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Menu</p>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`school-nav-item ${isActive(href) ? "active" : ""}`}
          >
            <Icon className="w-[18px] h-[18px] shrink-0" />
            <span className="flex-1">{label}</span>
            {isActive(href) && <ChevronRight className="w-4 h-4 opacity-40" />}
          </Link>
        ))}
      </nav>

      {/* Bottom - School Account + Help */}
      <div className="p-4 space-y-2" style={{ borderTop: "1px solid var(--school-border)" }}>
        {/* School account */}
        <div
          className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors hover:bg-slate-50"
          style={{ border: "1px solid var(--school-border)" }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm"
            style={{ background: "var(--school-accent-dim)", color: "var(--school-accent)" }}
          >
            DPS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">DPS Bangalore</p>
            <p className="text-xs text-slate-400">School Admin Account</p>
          </div>
          <Building2 className="w-4 h-4 text-slate-300 shrink-0" />
        </div>

        <a href="#" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-slate-700 hover:bg-slate-50 font-semibold transition-colors">
          <HelpCircle className="w-4 h-4" />
          Help & Support
        </a>

        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-red-500 font-semibold transition-colors rounded-xl hover:bg-red-50">
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex" style={{ background: "var(--school-bg)" }}>

      {/* ── Desktop Sidebar ── */}
      <aside
        className="hidden lg:flex w-64 shrink-0 flex-col fixed top-0 left-0 h-screen z-40"
        style={{
          background: "var(--school-sidebar-bg)",
          borderRight: "1.5px solid var(--school-border)",
          boxShadow: "2px 0 12px rgba(79,70,229,0.04)",
        }}
      >
        <SidebarContent />
      </aside>

      {/* ── Mobile Top Bar ── */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4"
        style={{
          background: "var(--school-sidebar-bg)",
          borderBottom: "1px solid var(--school-border)",
          boxShadow: "0 1px 8px rgba(79,70,229,0.06)",
        }}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-black text-white text-xs shadow-sm">DA</div>
          <span className="font-black text-slate-900 text-sm">School Portal</span>
        </Link>
        <button
          id="school-mobile-nav-toggle"
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-5 h-5 text-slate-500" />
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-72 flex flex-col shadow-2xl"
            style={{ background: "var(--school-sidebar-bg)" }}
          >
            <div
              className="h-16 flex items-center justify-between px-5"
              style={{ borderBottom: "1px solid var(--school-border)" }}
            >
              <span className="font-black text-slate-900">Navigation</span>
              <button
                id="school-mobile-nav-close"
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
              <SidebarContent />
            </div>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        {children}
      </div>
    </div>
  );
}
