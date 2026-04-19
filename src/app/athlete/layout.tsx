"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  CalendarDays,
  IndianRupee,
  LayoutDashboard,
  LogOut,
  Menu,
  Shield,
  Trophy,
  User,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/athlete/dashboard", label: "Dashboard",  icon: LayoutDashboard },
  { href: "/athlete/requests",  label: "Requests",   icon: Bell, badge: true },
  { href: "/athlete/sessions",  label: "Sessions",   icon: CalendarDays },
  { href: "/athlete/earnings",  label: "Earnings",   icon: IndianRupee },
  { href: "/athlete/profile",   label: "My Profile", icon: User },
];

export default function AthleteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const hideLayout =
    pathname === "/athlete/auth" ||
    pathname.startsWith("/athlete/onboarding");

  if (hideLayout) return <>{children}</>;

  const handleLogout = async () => {
    const { logoutAthlete } = await import("@/app/actions/athleteAuth");
    await logoutAthlete();
  };

  const SidebarContent = () => (
    <>
      {/* Logo / Brand */}
      <div className="px-5 py-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-green-600 to-green-400 flex items-center justify-center font-black text-white text-sm shadow-lg shadow-green-500/30">
            DA
          </div>
          <div>
            <p className="font-black text-white text-sm leading-none tracking-tight">DeshKa Athlete</p>
            <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-0.5">Player HQ</p>
          </div>
        </Link>
      </div>

      {/* Athlete card */}
      <div className="px-4 py-4 border-b border-white/5">
        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/10 border border-green-500/20 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center font-black text-white text-sm shadow-lg">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm truncate">Your Profile</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Shield className="w-3 h-3 text-green-400" />
                <span className="text-[10px] text-green-400 font-bold uppercase tracking-wide">KYC Verified</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">This month</span>
            <span className="text-green-400 font-black">₹0 earned</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto athlete-scrollbar">
        <p className="px-3 mb-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">Navigation</p>
        {NAV_ITEMS.map(({ href, label, icon: Icon, badge }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`athlete-nav-item ${isActive ? "active" : ""}`}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/5 space-y-1">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/8 border border-green-500/15">
          <Zap className="w-3.5 h-3.5 text-green-400" />
          <p className="text-[11px] text-green-400 font-semibold">Profile is live to 500+ schools</p>
        </div>
        <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 mt-1 text-sm text-slate-500 hover:text-red-400 font-semibold transition-colors rounded-xl hover:bg-red-500/8">
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex" style={{ background: "var(--athlete-bg)" }}>

      {/* ── Desktop Sidebar ── */}
      <aside
        className="hidden lg:flex w-64 shrink-0 flex-col fixed top-0 left-0 h-screen z-40"
        style={{
          background: "var(--athlete-sidebar-bg)",
          borderRight: "1px solid var(--athlete-border)",
        }}
      >
        <SidebarContent />
      </aside>

      {/* ── Mobile Top Bar ── */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4"
        style={{
          background: "var(--athlete-sidebar-bg)",
          borderBottom: "1px solid var(--athlete-border)",
        }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-green-600 to-green-400 flex items-center justify-center font-black text-white text-xs">DA</div>
          <span className="font-black text-white text-sm">Athlete HQ</span>
        </Link>
        <button
          id="mobile-nav-toggle"
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-xl transition-colors"
          style={{ background: "var(--athlete-surface-hover)" }}
        >
          <Menu className="w-5 h-5" style={{ color: "var(--athlete-on-surface)" }} />
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="absolute left-0 top-0 bottom-0 w-72 flex flex-col shadow-2xl"
            style={{ background: "var(--athlete-sidebar-bg)" }}
          >
            <div
              className="h-16 flex items-center justify-between px-5"
              style={{ borderBottom: "1px solid var(--athlete-border)" }}
            >
              <span className="font-black text-white">Menu</span>
              <button
                id="mobile-nav-close"
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-xl"
                style={{ background: "var(--athlete-surface-hover)" }}
              >
                <X className="w-5 h-5" style={{ color: "var(--athlete-on-muted)" }} />
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
