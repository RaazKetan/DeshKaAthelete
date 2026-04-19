import { CheckCircle2, Copy, Eye, ShieldCheck, Trophy, User } from "lucide-react";
import { getMockSession } from "@/app/actions/session";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AthleteProfile() {
  const athlete = await getMockSession();

  if (!athlete) {
    redirect("/athlete/auth");
  }

  const completedCount = await prisma.booking.count({
    where: { athleteId: athlete.id, status: "COMPLETED" },
  });

  const SPORTS = [
    "Cricket", "Football", "Hockey (Field)", "Badminton", "Athletics",
    "Wrestling", "Boxing", "Kabaddi", "Shooting", "Archery",
    "Table Tennis", "Tennis", "Weightlifting", "Swimming", "Gymnastics",
    "Chess", "Squash", "Volleyball", "Basketball", "Judo",
    "Taekwondo", "Cycling", "Rowing", "Sailing", "Golf", "Other",
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 selection:bg-green-500/30">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400 font-semibold uppercase tracking-wider mb-1">Player Portal</p>
            <h1 className="text-3xl font-extrabold tracking-tight">My Profile</h1>
          </div>
          <div className="flex gap-3">
            <button
              id="copy-profile-link"
              className="btn-ghost text-sm py-2.5 flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Copy Profile Link</span>
            </button>
            <button
              id="save-profile-btn"
              className="bg-slate-900 text-white font-bold py-2.5 px-6 rounded-xl text-sm hover:bg-slate-800 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Edit Panel (left, 3 cols) ── */}
          <div className="lg:col-span-3 space-y-8">

            {/* Avatar + basics */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-slate-500" /> Basic Information
              </h2>

              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center text-3xl font-extrabold text-green-700 shrink-0">
                  {athlete.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{athlete.name}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{athlete.sport}</p>
                  <button
                    id="upload-avatar-btn"
                    className="text-xs text-green-600 font-bold mt-2 hover:text-green-700 transition-colors"
                  >
                    + Upload Photo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">Display Name</label>
                  <input
                    id="profile-name"
                    type="text"
                    defaultValue={athlete.name}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">Primary Sport</label>
                  <select
                    id="profile-sport"
                    defaultValue={athlete.sport}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium transition-all bg-white"
                  >
                    {SPORTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-sm font-bold text-slate-700">Bio</label>
                  <textarea
                    id="profile-bio"
                    defaultValue={athlete.bio || ""}
                    placeholder="Tell schools about your career highlights and what you bring to a session..."
                    rows={4}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 font-medium transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="font-bold text-slate-900">Session Pricing</h2>
              <div className="space-y-1.5 max-w-xs">
                <label className="block text-sm font-bold text-slate-700">
                  Base Fee per Session (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input
                    id="profile-pricing"
                    type="number"
                    defaultValue={athlete.pricingSession}
                    className="w-full border border-slate-200 rounded-xl py-3 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 font-bold text-lg transition-all"
                  />
                </div>
                <p className="text-xs text-slate-400">
                  For a 60-min session. Your payout: ₹{Math.round(athlete.pricingSession * 0.88).toLocaleString()} (after 12% platform fee).
                </p>
              </div>
            </div>

            {/* Verified Credentials */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" /> Verified Credentials
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    label: "Aadhaar Verified",
                    value: athlete.aadhaarLastFour ? `XXXX-XXXX-${athlete.aadhaarLastFour}` : null,
                  },
                  { label: "Federation ID", value: athlete.federationId },
                  { label: "Khelo India ID", value: athlete.kheloIndiaId },
                ].map((cred) => (
                  <div
                    key={cred.label}
                    className={`border rounded-xl p-4 flex items-start gap-3 ${
                      cred.value
                        ? "border-green-200 bg-green-50/50"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-md shrink-0 ${
                        cred.value ? "bg-green-100" : "bg-slate-100"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${cred.value ? "text-green-600" : "text-slate-400"}`}
                      />
                    </div>
                    <div>
                      <p
                        className={`font-bold text-sm ${cred.value ? "text-green-900" : "text-slate-500"}`}
                      >
                        {cred.label}
                      </p>
                      <p className={`text-xs mt-0.5 ${cred.value ? "text-green-700" : "text-slate-400"}`}>
                        {cred.value ?? "Not provided"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Public Profile Preview (right, 2 cols) ── */}
          <div className="lg:col-span-2">
            <div className="sticky top-6">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4 text-slate-400" />
                <p className="text-sm font-bold text-slate-500">Public Preview</p>
                <span className="text-xs text-slate-400">(what schools see)</span>
              </div>

              {/* Preview card */}
              <div className="athlete-card bg-white overflow-hidden">
                {/* Avatar banner */}
                <div className="relative h-28 bg-gradient-to-br from-slate-800 to-slate-900 flex items-end px-5 pb-0">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/15 rounded-full blur-2xl" />
                  <div className="w-16 h-16 rounded-full bg-green-100 border-3 border-white flex items-center justify-center text-2xl font-extrabold text-green-700 translate-y-8 border-4 border-white shadow-lg">
                    {athlete.name.charAt(0)}
                  </div>
                </div>

                <div className="pt-10 px-5 pb-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg leading-tight">
                        {athlete.name}
                      </h3>
                      <span className="badge-sport mt-1">{athlete.sport}</span>
                    </div>
                    {athlete.isVerified && (
                      <span className="badge-verified shrink-0">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>

                  <p className="text-slate-500 text-xs leading-relaxed mb-4">
                    {athlete.bio || "Bio not added yet. Add a bio to attract more schools."}
                  </p>

                  <div className="flex gap-4 text-sm mb-4">
                    <div className="text-center">
                      <p className="font-extrabold text-slate-900">{completedCount}</p>
                      <p className="text-slate-400 text-xs">Sessions</p>
                    </div>
                    <div className="text-center">
                      <p className="font-extrabold text-slate-900">
                        ₹{athlete.pricingSession.toLocaleString()}
                      </p>
                      <p className="text-slate-400 text-xs">per session</p>
                    </div>
                    <div className="text-center">
                      <Trophy className="w-4 h-4 text-green-500 mx-auto" />
                      <p className="text-slate-400 text-xs">Verified</p>
                    </div>
                  </div>

                  <button
                    disabled
                    className="w-full bg-slate-900 text-white text-sm font-bold py-2.5 rounded-xl opacity-60"
                  >
                    Book a Session
                  </button>

                  <p className="text-center text-xs text-slate-400 mt-2">Preview only — not live</p>
                </div>
              </div>

              {/* Share link */}
              <div className="mt-4 bg-white border border-slate-200 rounded-xl p-4">
                <p className="text-xs font-bold text-slate-500 mb-2">Your profile link</p>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                  <span className="text-xs text-slate-500 truncate flex-1">
                    deshkaathlete.in/player/{athlete.id.slice(0, 8)}
                  </span>
                  <button
                    id="copy-link-small"
                    className="text-green-600 hover:text-green-700"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
