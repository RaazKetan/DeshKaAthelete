import { Trophy, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BackButton from "@/components/BackButton";

export default async function SchoolAthletesDirectory() {
  const athletes = await prisma.athlete.findMany({
    where: { isVerified: true },
    include: { achievements: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 selection:bg-green-500/30">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <BackButton />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Verified <span className="bg-gradient-to-br from-green-600 to-green-400 bg-clip-text text-transparent">Athlete Directory</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl">
          Browse our curated list of national champions and Olympians. Find the perfect role model for your student programs and book a session directly.
        </p>
      </div>

      {/* Directory Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {athletes.map((athlete: any) => (
          <div key={athlete.id} className="group athlete-card flex flex-col hover:shadow-premium-hover">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="p-6 flex-grow relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-2xl font-bold text-green-700 shadow-sm">
                  {athlete.name.charAt(0)}
                </div>
                {athlete.isVerified && (
                  <div className="badge-verified">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Elite
                  </div>
                )}
              </div>

              <h2 className="text-2xl font-bold mb-1 text-slate-900 group-hover:text-green-600 transition-colors">{athlete.name}</h2>
              <div className="badge-sport mb-4">
                 <Trophy className="w-3.5 h-3.5" />
                 {athlete.sport}
              </div>

              <div className="space-y-2 mb-6">
                {athlete.achievements && athlete.achievements.slice(0, 3).map((ach) => (
                  <div key={ach.id} className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-sm text-slate-600 shadow-sm">
                    {ach.title}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 pt-0 mt-auto relative z-10">
              <div className="flex items-center justify-between mb-4 pt-4 border-t border-slate-100">
                <div className="text-sm">
                   <span className="text-slate-500 block">Session Fee</span>
                   <span className="font-bold text-lg text-slate-900">₹{(Number(athlete.pricingSession) / 1000).toFixed(0)}k <span className="text-slate-400 text-sm font-normal">approx</span></span>
                </div>
                <div className="text-right">
                   <span className="text-green-600 text-sm font-semibold flex items-center justify-end gap-1">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                     Available
                   </span>
                </div>
              </div>
              <Link href={`/school/book/${athlete.id}`} className="w-full bg-white border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 hover:text-green-700 text-slate-700 font-bold py-3 rounded-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2">
                View Profile &amp; Book <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
