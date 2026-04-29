import { type ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/cn";

interface AuthLayoutProps {
  children: ReactNode;
  side: ReactNode;
  tone?: "dark" | "light";
}

export default function AuthLayout({ children, side, tone = "dark" }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left brand panel */}
      <div
        className={cn(
          "hidden lg:flex lg:w-1/2 relative flex-col justify-between p-10 xl:p-14 overflow-hidden",
          tone === "dark" ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900 border-r border-slate-200",
        )}
      >
        {tone === "dark" && (
          <div aria-hidden className="absolute inset-0 -z-0">
            <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-emerald-500/15 blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-[100px]" />
          </div>
        )}

        <div className="relative z-10">
          <Logo variant={tone === "dark" ? "dark" : "light"} />
        </div>

        <div className="relative z-10">{side}</div>

        <div className="relative z-10 text-xs text-slate-500">
          © {new Date().getFullYear()} Crests by DeshKa · Made in India
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-6 py-10 lg:px-12">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-between mb-8">
            <BackButton />
            <span className="lg:hidden">
              <Logo showWordmark={false} />
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
