import { AlertCircle, ArrowUpRight, IndianRupee, TrendingUp } from "lucide-react";
import { getMockSession } from "@/app/actions/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AthleteEarningsPage() {
  const athlete = await getMockSession();
  if (!athlete) redirect("/athlete/auth");

  const [completed, pending, confirmed] = await Promise.all([
    prisma.booking.findMany({
      where: { athleteId: athlete.id, status: "COMPLETED" },
      include: { school: true, session: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.booking.count({ where: { athleteId: athlete.id, status: "PENDING" } }),
    prisma.booking.count({ where: { athleteId: athlete.id, status: "CONFIRMED" } }),
  ]);

  const SESSION_FEE = Number(athlete.pricingSession);
  const PAYOUT_RATE = 0.88; // 88% after 12% platform fee

  const totalEarned = completed.length * SESSION_FEE * PAYOUT_RATE;
  const pendingEscrow = (pending + confirmed) * SESSION_FEE;
  const platformFeeTotal = completed.length * SESSION_FEE * 0.12;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-slate-400 font-semibold uppercase tracking-wider mb-1">Player Portal</p>
          <h1 className="text-3xl font-extrabold tracking-tight">Earnings</h1>
          <p className="text-slate-500 mt-1">Your payouts, pending escrow, and transaction history.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-slate-900 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/15 rounded-full blur-2xl" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Total Earned</p>
            <p className="text-3xl font-extrabold text-white">
              ₹{totalEarned > 0 ? totalEarned.toLocaleString() : "0"}
            </p>
            <p className="text-xs text-green-400 font-semibold mt-2">
              From {completed.length} completed session{completed.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-green-50 rounded-full blur-xl" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">In Escrow</p>
            <p className="text-3xl font-extrabold text-slate-900">
              ₹{pendingEscrow > 0 ? pendingEscrow.toLocaleString() : "0"}
            </p>
            <p className="text-xs text-green-600 font-semibold mt-2">
              Released after session completion
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-100 rounded-full blur-xl" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Platform Fees</p>
            <p className="text-3xl font-extrabold text-slate-900">
              ₹{platformFeeTotal > 0 ? platformFeeTotal.toLocaleString() : "0"}
            </p>
            <p className="text-xs text-slate-400 font-medium mt-2">12% of gross (industry standard)</p>
          </div>
        </div>

        {/* ── Payout info ── */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-blue-900 mb-1">Bank account not linked yet</p>
            <p className="text-sm text-blue-700">
              Link your bank account or UPI to receive payouts within 48 hours of session completion.
            </p>
            <button
              id="link-bank-btn"
              className="mt-3 text-sm font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 transition-colors"
            >
              Link Bank Account <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── How payouts work ── */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-slate-500" /> How Your Earnings Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              { step: "1", label: "School Books", desc: "School pays ₹" + SESSION_FEE.toLocaleString() + " into escrow at booking time." },
              { step: "2", label: "You Deliver", desc: "Complete the session. School confirms delivery." },
              { step: "3", label: "You're Paid", desc: "₹" + Math.round(SESSION_FEE * 0.88).toLocaleString() + " credited to your bank within 48 hrs." },
            ].map((item) => (
              <div key={item.step} className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{item.label}</p>
                  <p className="text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Transaction History ── */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-slate-500" /> Transaction History
          </h2>

          {completed.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-10 text-center">
              <p className="text-slate-400 font-medium">No transactions yet.</p>
              <p className="text-slate-400 text-sm mt-1">Completed sessions will appear here.</p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              {completed.map((booking, i) => (
                <div
                  key={booking.id}
                  className={`flex items-center gap-4 px-6 py-4 ${
                    i < completed.length - 1 ? "border-b border-slate-100" : ""
                  }`}
                >
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                    <IndianRupee className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm truncate">
                      {booking.session.type} — {booking.school.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(booking.updatedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-green-700">
                      +₹{Math.round(SESSION_FEE * PAYOUT_RATE).toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400">after 12% fee</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
