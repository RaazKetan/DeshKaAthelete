import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-green-600 transition-colors font-medium mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-4xl font-extrabold mb-6">Refund Policy</h1>
        <p className="text-slate-500 mb-6">Last updated: April 2026</p>
        
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <p>
            This policy outlines under what conditions refunds are processed. We guarantee 100% security for school budgets.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Session Cancellations</h2>
          <p>
            If the assigned athlete fails to attend the scheduled session or cancels prior to 24 hours, schools will automatically be fully refunded their escrow deposit.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Rescheduling</h2>
          <p>
            No cancellation fees apply if the session is uniformly rescheduled by both the school and the athlete through the DeshKa platform directly.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Dispute Resolution</h2>
          <p>
            If a session is incomplete or unsatisfactory, schools can open a dispute. Our team will manually review facts (attendance, timeline, etc.) and issue refunds proportionately if criteria are unmet.
          </p>
        </div>
      </div>
    </div>
  );
}
