import { ArrowRight, CheckCircle2, Clock, Trophy, Users } from "lucide-react";
import Link from "next/link";

const TIMELINE = [
  { status: "done", label: "Profile Submitted", sub: "Just now" },
  { status: "active", label: "Manual KYC Review", sub: "Typically 24–48 hours" },
  { status: "pending", label: "Profile Goes Live", sub: "Visible to 500+ schools" },
];

export default function OnboardingSuccess() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 py-16 selection:bg-green-500/30">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-green-100 rounded-full blur-[120px] opacity-50 -z-10" />

      <div className="w-full max-w-lg">
        {/* Success icon */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center mb-6 shadow-lg shadow-green-500/10">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-200 bg-green-50 mb-4">
            <span className="text-xs font-bold tracking-wide text-green-700 uppercase">Profile Submitted</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            You&apos;re in the queue!
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-sm">
            Our team is reviewing your credentials. Here&apos;s what happens next:
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <div key={item.label} className="flex gap-4">
                {/* Dot + line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      item.status === "done"
                        ? "bg-green-500 text-white"
                        : item.status === "active"
                        ? "bg-green-500 text-white ring-4 ring-green-100"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {item.status === "done" ? (
                      "✓"
                    ) : item.status === "active" ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-bold">{i + 1}</span>
                    )}
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div
                      className={`w-0.5 flex-1 min-h-[32px] my-1 ${
                        item.status === "done" ? "bg-green-200" : "bg-slate-100"
                      }`}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="pb-6">
                  <p
                    className={`font-bold text-sm ${
                      item.status === "pending" ? "text-slate-400" : "text-slate-900"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p
                    className={`text-sm ${
                      item.status === "active"
                        ? "text-green-600 font-semibold"
                        : "text-slate-400"
                    }`}
                  >
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What to do meanwhile */}
        <div className="bg-slate-900 rounded-2xl p-6 mb-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">While you wait</p>
          <div className="space-y-3">
            {[
              { icon: Users, text: "Share your profile link with your network" },
              { icon: Trophy, text: "Add more achievements to stand out" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-slate-300 text-sm font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Link
            href="/athlete/dashboard"
            id="goto-dashboard-btn"
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-md shadow-green-600/20"
          >
            Go to Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/athlete/profile"
            className="w-full bg-white border border-slate-200 text-slate-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
          >
            Complete My Profile
          </Link>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Questions? Email us at{" "}
          <a href="mailto:verify@deshkaathlete.in" className="text-green-600 hover:underline">
            verify@deshkaathlete.in
          </a>
        </p>
      </div>
    </div>
  );
}
