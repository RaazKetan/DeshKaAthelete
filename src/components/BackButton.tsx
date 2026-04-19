"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ className = "mb-6" }: { className?: string }) {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()} 
      className={`flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm ${className}`}
    >
      <ArrowLeft className="w-4 h-4" /> Go Back
    </button>
  );
}
