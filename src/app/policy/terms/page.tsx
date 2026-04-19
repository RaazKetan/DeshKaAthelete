import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-green-600 transition-colors font-medium mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-4xl font-extrabold mb-6">Terms of Service</h1>
        <p className="text-slate-500 mb-6">Last updated: April 2026</p>
        
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <p>
            Please read these Terms of Service carefully before using our platform.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the DeshKa Athlete platform, you agree to be bound by these restrictions and rules, effectively acting as an agreement between you and the platform.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Escrow Services</h2>
          <p>
            All mentorship session funds are held in escrow. Schools are required to deposit 100% of the session fee upon booking confirmation, which is released to the athlete post-session validation.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Code of Conduct</h2>
          <p>
            Athletes and Schools agree to maintain professional integrity and respect inside and outside platform discussions. Violations lead to permanent bans.
          </p>
        </div>
      </div>
    </div>
  );
}
