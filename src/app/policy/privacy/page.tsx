import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-green-600 transition-colors font-medium mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-4xl font-extrabold mb-6">Privacy Policy</h1>
        <p className="text-slate-500 mb-6">Last updated: April 2026</p>
        
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <p>
            Crests (by DeshKa) ("we," "us," or "our") respects your privacy and is committed to protecting it through our compliance with this policy.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We collect information by which you may be personally identified, such as name, postal address, e-mail address, telephone number, and KYC documents (Aadhaar, Federation IDs) for athletes.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. How We Use Information</h2>
          <p>
            We use information to present our platform, facilitate verification, process escrow payments, and enforce user compliance.
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Data Security</h2>
          <p>
            We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure.
          </p>
        </div>
      </div>
    </div>
  );
}
