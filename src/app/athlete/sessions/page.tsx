import { CalendarDays, CheckCircle2, Clock, MapPin } from "lucide-react";
import { getMockSession } from "@/app/actions/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { markSessionComplete } from "@/app/actions/booking";

export default async function AthleteSessionsPage() {
  const athlete = await getMockSession();
  if (!athlete) redirect("/athlete/auth");

  const [upcoming, past] = await Promise.all([
    prisma.booking.findMany({
      where: { athleteId: athlete.id, status: "CONFIRMED" },
      include: { school: true, session: true },
      orderBy: { date: "asc" },
    }),
    prisma.booking.findMany({
      where: { athleteId: athlete.id, status: "COMPLETED" },
      include: { school: true, session: true },
      orderBy: { date: "desc" },
      take: 10,
    }),
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-slate-400 font-semibold uppercase tracking-wider mb-1">Player Portal</p>
          <h1 className="text-3xl font-extrabold tracking-tight">Sessions</h1>
          <p className="text-slate-500 mt-1">Your confirmed upcoming and completed sessions.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">

        {/* ── Upcoming ── */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-blue-500" />
            Upcoming ({upcoming.length})
          </h2>

          {upcoming.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-10 text-center">
              <p className="text-slate-400 font-medium">No upcoming sessions.</p>
              <p className="text-slate-400 text-sm mt-1">Accept pending requests to confirm sessions.</p>
            </div>
          ) : (
            upcoming.map((booking) => {
              const sessionDate = new Date(booking.date);
              const isToday =
                sessionDate.toDateString() === new Date().toDateString();
              const isPast = sessionDate < new Date();

              return (
                <div
                  key={booking.id}
                  className={`bg-white border rounded-2xl overflow-hidden shadow-sm ${
                    isToday
                      ? "border-green-200 shadow-green-500/5"
                      : "border-slate-200"
                  }`}
                >
                  {isToday && (
                    <div className="bg-green-600 text-white text-xs font-bold uppercase tracking-wider px-6 py-1.5">
                      Today
                    </div>
                  )}
                  <div className="p-6 flex flex-col sm:flex-row gap-6 justify-between items-start">
                    {/* Date block */}
                    <div className="flex gap-5 items-start">
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center min-w-[56px]">
                        <p className="text-xs font-bold text-slate-400 uppercase">
                          {sessionDate.toLocaleDateString("en-IN", { month: "short" })}
                        </p>
                        <p className="text-2xl font-extrabold text-slate-900 leading-tight">
                          {sessionDate.getDate()}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">{booking.session.title}</h3>
                        <p className="text-slate-500 text-sm mt-0.5 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {sessionDate.toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="text-slate-500 text-sm mt-0.5 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {booking.school.name}
                          {booking.school.city ? `, ${booking.school.city}` : ""}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full">
                        ₹{Math.round(Number(athlete.pricingSession) * 0.88).toLocaleString()} pending payout
                      </span>
                      {isPast && (
                        <form
                          action={async () => {
                            "use server";
                            await markSessionComplete(booking.id);
                          }}
                        >
                          <button
                            id={`complete-${booking.id}`}
                            type="submit"
                            className="text-xs bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg transition-colors"
                          >
                            Mark as Completed
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── Past / Completed ── */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Completed ({past.length})
          </h2>

          {past.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-10 text-center">
              <p className="text-slate-400 font-medium">No completed sessions yet.</p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              {past.map((booking, i) => (
                <div
                  key={booking.id}
                  className={`flex items-center gap-4 px-6 py-4 ${
                    i < past.length - 1 ? "border-b border-slate-100" : ""
                  }`}
                >
                  <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm truncate">{booking.school.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(booking.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}{" "}
                      · {booking.session.type}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-green-700 text-sm">
                      +₹{Math.round(Number(athlete.pricingSession) * 0.88).toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400">Paid out</p>
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
