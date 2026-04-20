import {
  Activity,
  Bell,
  CalendarDays,
  ChevronRight,
  IndianRupee,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { getMockSession } from "@/app/actions/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AthleteDashboard() {
  const athlete = await getMockSession();

  if (!athlete) {
    redirect("/athlete/auth");
  }

  const [pendingBookings, confirmedBookings, totalDelivered] = await Promise.all([
    prisma.booking.findMany({
      where: { athleteId: athlete.id, status: "PENDING" },
      include: { school: true, session: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.booking.findMany({
      where: { athleteId: athlete.id, status: "CONFIRMED" },
      include: { school: true, session: true },
      orderBy: { date: "asc" },
      take: 2,
    }),
    prisma.booking.count({ where: { athleteId: athlete.id, status: "COMPLETED" } }),
  ]);

  const totalEarnings = totalDelivered * Number(athlete.pricingSession) * 0.88;
  const pendingEscrow = pendingBookings.length * Number(athlete.pricingSession);

  // Profile completeness
  const completenessItems = [
    { label: "Name", done: !!athlete.name },
    { label: "Sport", done: !!athlete.sport },
    { label: "Federation ID", done: !!athlete.federationId },
    { label: "Aadhaar verified", done: !!athlete.aadhaarLastFour },
    { label: "Khelo India ID", done: !!athlete.kheloIndiaId },
    { label: "Photo", done: !!athlete.avatarUrl },
  ];
  const completenessScore = Math.round(
    (completenessItems.filter((i) => i.done).length / completenessItems.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 selection:bg-green-500/30">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400 font-semibold uppercase tracking-wider mb-1">
              Player Dashboard
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Hello, <span className="text-green-600">{athlete.name.split(" ")[0]}</span> 👋
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="badge-sport">{athlete.sport}</span>
              {athlete.isVerified && (
                <span className="badge-verified">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
              )}
            </div>
          </div>
          <Link href="/athlete/profile" className="border-[1.5px] border-slate-200 text-slate-900 bg-transparent hover:bg-slate-100 hover:border-slate-300 rounded-full font-semibold transition-all inline-flex px-4 text-sm py-2.5 shrink-0">
            Edit Profile
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Earnings */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-green-200 transition-colors">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-green-50 rounded-full blur-2xl group-hover:bg-green-100 transition-colors" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-green-50 rounded-xl">
                <IndianRupee className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-bold text-slate-500">Total Earned</span>
            </div>
            <h2 className="text-3xl font-extrabold">
              ₹{totalEarnings > 0 ? totalEarnings.toLocaleString() : "0"}
            </h2>
            {pendingEscrow > 0 && (
              <p className="text-sm font-semibold text-green-600 mt-2">
                +₹{pendingEscrow.toLocaleString()} in escrow
              </p>
            )}
          </div>

          {/* Sessions */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-blue-50 rounded-full blur-2xl group-hover:bg-blue-100 transition-colors" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-blue-50 rounded-xl">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-bold text-slate-500">Sessions Done</span>
            </div>
            <h2 className="text-3xl font-extrabold">{totalDelivered}</h2>
            <p className="text-sm text-slate-500 mt-2 font-medium">Verified by DeshKa Athlete</p>
          </div>

          {/* Pending requests */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-green-500/20 rounded-full blur-3xl" />
            <div className="flex items-center gap-3 mb-4 text-slate-300">
              <div className="p-2.5 bg-slate-800 rounded-xl">
                <Bell className="w-5 h-5 text-green-400" />
              </div>
              <span className="font-bold text-slate-300">New Requests</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">{pendingBookings.length}</h2>
            {pendingBookings.length > 0 ? (
              <Link
                href="/athlete/requests"
                className="text-sm font-bold text-green-400 hover:text-green-300 mt-2 flex items-center gap-1 transition-colors"
              >
                Review now <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <p className="text-sm text-slate-500 mt-2 font-medium">All caught up!</p>
            )}
          </div>
        </div>

        {/* ── Profile Completeness ── */}
        {completenessScore < 100 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900">Profile Completeness</h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  Complete your profile to appear higher in school searches
                </p>
              </div>
              <span className="text-2xl font-extrabold text-green-600">{completenessScore}%</span>
            </div>
            {/* Progress bar */}
            <div className="h-2 bg-slate-100 rounded-full mb-4">
              <div
                className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-700"
                style={{ width: `${completenessScore}%` }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {completenessItems.map((item) => (
                <span
                  key={item.label}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                    item.done
                      ? "bg-green-50 text-green-700 border border-green-100"
                      : "bg-slate-100 text-slate-400 border border-slate-200"
                  }`}
                >
                  {item.done ? "✓" : "○"} {item.label}
                </span>
              ))}
            </div>
            <Link
              href="/athlete/profile"
              className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-green-600 hover:text-green-700 transition-colors"
            >
              Complete profile <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── Pending Requests ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Bell className="w-5 h-5 text-green-500" /> Pending Requests
              </h3>
              <Link href="/athlete/requests" className="text-sm font-bold text-green-600 hover:text-green-700">
                View All
              </Link>
            </div>

            {pendingBookings.length > 0 ? (
              pendingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white p-5 rounded-2xl border border-green-200 shadow-sm shadow-green-500/5 hover:border-green-300 transition-colors"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">
                        New Booking
                      </div>
                      <h4 className="font-bold text-slate-900">{booking.school.name}</h4>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {booking.session.type} · {new Date(booking.date).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-extrabold text-slate-900">
                        ₹{Number(athlete.pricingSession).toLocaleString()}
                      </p>
                      <Link
                        href="/athlete/requests"
                        className="text-xs font-bold text-green-600 hover:text-green-700 mt-1 inline-block"
                      >
                        Review →
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-slate-50 p-8 rounded-2xl border border-dashed border-slate-200 text-center">
                <p className="text-slate-400 font-medium text-sm">No pending requests right now.</p>
                <p className="text-slate-400 text-xs mt-1">
                  Schools discover you when your profile is fully verified.
                </p>
              </div>
            )}
          </div>

          {/* ── Upcoming Sessions ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-blue-500" /> Upcoming Sessions
              </h3>
              <Link href="/athlete/sessions" className="text-sm font-bold text-blue-600 hover:text-blue-700">
                View All
              </Link>
            </div>

            {confirmedBookings.length > 0 ? (
              confirmedBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm hover:border-blue-200 transition-colors"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                        Confirmed
                      </div>
                      <h4 className="font-bold text-slate-900">{booking.school.name}</h4>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {booking.session.type} · {new Date(booking.date).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2 py-1 rounded-full">
                        Escrow Held
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-slate-50 p-8 rounded-2xl border border-dashed border-slate-200 text-center">
                <p className="text-slate-400 font-medium text-sm">No upcoming sessions yet.</p>
                <p className="text-slate-400 text-xs mt-1">Accepted bookings will show up here.</p>
              </div>
            )}
          </div>

        </div>

        {/* ── Quick Actions ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: "/athlete/requests", label: "Review Requests", icon: Bell, color: "green" },
            { href: "/athlete/sessions", label: "My Sessions", icon: CalendarDays, color: "blue" },
            { href: "/athlete/earnings", label: "View Earnings", icon: TrendingUp, color: "green" },
            { href: "/athlete/profile", label: "Edit Profile", icon: Activity, color: "purple" },
          ].map(({ href, label, icon: Icon, color }) => (
            <Link
              key={href}
              href={href}
              className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-3 hover:border-slate-300 hover:shadow-sm transition-all group"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  color === "green"
                    ? "bg-green-50 group-hover:bg-green-100"
                    : color === "blue"
                    ? "bg-blue-50 group-hover:bg-blue-100"
                    : color === "green"
                    ? "bg-green-50 group-hover:bg-green-100"
                    : "bg-purple-50 group-hover:bg-purple-100"
                } transition-colors`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    color === "green"
                      ? "text-green-600"
                      : color === "blue"
                      ? "text-blue-600"
                      : color === "green"
                      ? "text-green-600"
                      : "text-purple-600"
                  }`}
                />
              </div>
              <p className="text-sm font-bold text-slate-900">{label}</p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
