import { ArrowRight, Calendar, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

export default function SchoolDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 selection:bg-green-500/30">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
          Welcome back, <span className="text-slate-600">DPS Bangalore</span>
        </h1>
        <p className="text-slate-500 text-lg">
          Manage your athlete sessions and upcoming programs.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Upcoming & Actions) */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Quick Action */}
           <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
             <div className="absolute right-0 top-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700" />
             <h2 className="text-2xl font-bold mb-2">Plan your next sports event</h2>
             <p className="text-slate-500 mb-6 max-w-md">Browse our directory of Olympians and Asian Games medalists to inspire your students.</p>
             <Link href="/school/athletes" className="btn-primary inline-flex items-center gap-2">
               Browse Athletes <ArrowRight className="w-4 h-4" />
             </Link>
           </div>

           {/* Upcoming Sessions */}
           <div>
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
               <Calendar className="w-5 h-5 text-green-600" />
               Upcoming Sessions
             </h3>
             <div className="space-y-4">
               {/* Mock Session */}
               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between hover:border-green-200 transition-colors">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700 text-xl shrink-0">
                      NC
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Neeraj Chopra</h4>
                      <p className="text-slate-500 text-sm">Motivation Masterclass • 60 mins</p>
                    </div>
                 </div>
                 <div className="flex flex-col sm:items-end gap-1">
                   <div className="badge-verified bg-green-50 text-green-700 border-green-200">
                     <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                   </div>
                   <p className="text-sm font-semibold text-slate-700 mt-2">Oct 15, 2026 • 10:00 AM</p>
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* Right Column (Pending & Stats) */}
        <div className="space-y-8">
           <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-premium">
             <h3 className="text-lg font-bold mb-4 text-white/90">Pending Requests</h3>
             
             {/* Mock Pending */}
             <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-green-400">PV Sindhu</h4>
                  <span className="flex items-center gap-1 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                    <Clock className="w-3 h-3" /> Awaiting Athlete
                  </span>
                </div>
                <p className="text-white/60 text-sm mb-3">Badminton Clinic • Nov 2</p>
                <div className="text-sm border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-white/40">Amount</span>
                  <span className="font-semibold">₹45,000 (In Escrow)</span>
                </div>
             </div>
           </div>

           <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
             <h3 className="text-lg font-bold mb-4 text-slate-900">Escrow Balance</h3>
             <p className="text-3xl font-extrabold text-slate-900 mb-1">₹45,000</p>
             <p className="text-sm text-slate-500">Funds secured for pending sessions.</p>
           </div>
        </div>

      </div>
    </div>
  );
}
