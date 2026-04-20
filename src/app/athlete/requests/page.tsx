import { Check, Info, X, Clock, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { getMockSession } from "@/app/actions/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { acceptBooking, declineBooking } from "@/app/actions/booking";

export default async function AthleteRequests({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const athlete = await getMockSession();

  if (!athlete) {
    redirect("/athlete/auth");
  }

  const { tab: rawTab } = await searchParams;
  const tab = rawTab ?? "pending";


  const statusMap: Record<string, string[]> = {
    pending: ["PENDING"],
    confirmed: ["CONFIRMED"],
    completed: ["COMPLETED", "CANCELLED"],
  };
  const statuses = statusMap[tab] ?? ["PENDING"];

  const bookings = await prisma.booking.findMany({
    where: { athleteId: athlete.id, status: { in: statuses as any } },
    include: { school: true, session: true },
    orderBy: { createdAt: "desc" },
  });

  const counts = await prisma.booking.groupBy({
    by: ["status"],
    where: { athleteId: athlete.id },
    _count: { id: true },
  });

  const countMap = Object.fromEntries(
    counts.map((c) => [c.status, c._count.id])
  );

  const TABS = [
    { key: "pending", label: "Pending", count: countMap["PENDING"] ?? 0 },
    { key: "confirmed", label: "Confirmed", count: countMap["CONFIRMED"] ?? 0 },
    { key: "completed", label: "History", count: (countMap["COMPLETED"] ?? 0) + (countMap["CANCELLED"] ?? 0) },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-slate-400 font-semibold uppercase tracking-wider mb-1">School Requests</p>
          <h1 className="text-3xl font-extrabold tracking-tight">Booking Requests</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-1">
            {TABS.map((t) => (
              <Link
                key={t.key}
                href={`/athlete/requests?tab=${t.key}`}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-bold border-b-2 transition-colors ${
                  tab === t.key
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                {t.label}
                {t.count > 0 && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      tab === t.key
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {t.count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-500 font-semibold">No {tab} requests at the moment.</p>
            <p className="text-slate-400 text-sm mt-1">Check back later or complete your profile to get more bookings.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
              {/* Status tag */}
              <div
                className={`px-6 py-2 text-xs font-bold uppercase tracking-widest border-b ${
                  booking.status === "PENDING"
                    ? "bg-green-50 text-green-700 border-green-100"
                    : booking.status === "CONFIRMED"
                    ? "bg-blue-50 text-blue-700 border-blue-100"
                    : booking.status === "COMPLETED"
                    ? "bg-green-50 text-green-700 border-green-100"
                    : "bg-slate-50 text-slate-500 border-slate-100"
                }`}
              >
                {booking.status === "PENDING" && "⬤ New Booking Request"}
                {booking.status === "CONFIRMED" && "✓ Confirmed — Escrow Held"}
                {booking.status === "COMPLETED" && "✓ Completed"}
                {booking.status === "CANCELLED" && "✕ Declined"}
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                  {/* Left: Event Details */}
                  <div className="w-full md:w-2/3 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">
                        {booking.session.title}
                      </h2>
                      <p className="text-slate-500 font-medium text-sm">
                        {new Date(booking.date).toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        ·{" "}
                        {new Date(booking.date).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {/* School context */}
                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl relative">
                      <div className="absolute -top-3 left-5 px-2 bg-slate-50 text-xs font-bold text-slate-400 flex items-center gap-1 uppercase tracking-widest">
                        <Info className="w-3 h-3" /> School Context
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-bold text-slate-900">{booking.school.name}</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {booking.schoolType && (
                              <span className="text-xs bg-white border border-slate-200 px-2 py-1 rounded-lg text-slate-600 font-medium">
                                {booking.schoolType}
                              </span>
                            )}
                            {booking.audienceSize && (
                              <span className="text-xs bg-white border border-slate-200 px-2 py-1 rounded-lg text-slate-600 font-medium">
                                ~{booking.audienceSize} Students
                              </span>
                            )}
                          </div>
                        </div>
                        {booking.schoolNote && (
                          <div className="border-t border-slate-200 pt-3">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5">
                              Message from School
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed italic border-l-2 border-green-400 pl-3 font-serif">
                              &ldquo;{booking.schoolNote}&rdquo;
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Financials + Actions */}
                  <div className="w-full md:w-1/3 space-y-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Escrow Secured
                      </p>
                      <p className="text-3xl font-extrabold text-slate-900">
                        ₹{Number(athlete.pricingSession).toLocaleString()}
                      </p>
                      <p className="text-xs text-green-700 font-semibold mt-1">
                        Your payout: ₹{Math.round(Number(athlete.pricingSession) * 0.88).toLocaleString()}
                      </p>
                    </div>

                    {booking.status === "PENDING" && (
                      <div className="space-y-2.5">
                        <form
                          action={async () => {
                            "use server";
                            await acceptBooking(booking.id);
                          }}
                        >
                          <button
                            id={`accept-${booking.id}`}
                            type="submit"
                            className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                          >
                            <Check className="w-5 h-5" /> Accept Booking
                          </button>
                        </form>
                        <form
                          action={async () => {
                            "use server";
                            await declineBooking(booking.id);
                          }}
                        >
                          <button
                            id={`decline-${booking.id}`}
                            type="submit"
                            className="w-full border border-slate-300 text-slate-600 font-bold py-3.5 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                          >
                            <X className="w-5 h-5" /> Decline
                          </button>
                        </form>
                        <p className="text-xs text-center text-slate-400">
                          Declining refunds the escrow to the school automatically.
                        </p>
                      </div>
                    )}

                    {booking.status === "CONFIRMED" && (
                      <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                        <CalendarCheck className="w-5 h-5 text-blue-600 shrink-0" />
                        <p className="font-semibold">Session confirmed. You&apos;ll be paid after completion.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
