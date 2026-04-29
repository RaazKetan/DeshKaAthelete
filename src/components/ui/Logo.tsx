import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  showWordmark?: boolean;
  href?: string;
}

export function Logo({ className, variant = "light", showWordmark = true, href = "/" }: LogoProps) {
  const wordmarkClass = variant === "light" ? "text-slate-900" : "text-white";
  const subClass = variant === "light" ? "text-slate-400" : "text-slate-500";

  const inner = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <CrestMark variant={variant} />
      {showWordmark && (
        <span className="leading-none">
          <span className={cn("block font-semibold tracking-[-0.01em] text-[15px]", wordmarkClass)}>
            Crests
          </span>
          <span className={cn("block text-[10px] font-medium tracking-wider uppercase mt-0.5", subClass)}>
            by DeshKa
          </span>
        </span>
      )}
    </span>
  );

  return href ? <Link href={href}>{inner}</Link> : inner;
}

function CrestMark({ variant }: { variant: "light" | "dark" }) {
  const isDark = variant === "dark";
  return (
    <span
      aria-hidden
      className={cn(
        "relative flex h-8 w-8 items-center justify-center rounded-md",
        isDark ? "bg-white text-slate-900" : "bg-slate-900 text-white",
      )}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {/* shield-style crest */}
        <path d="M12 3l8 3v6c0 4.5-3.4 8.5-8 9.5C7.4 20.5 4 16.5 4 12V6l8-3z" />
        <path d="M9 11l2.4 2.4L15 9.5" />
      </svg>
      <span
        className={cn(
          "absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2",
          isDark ? "ring-slate-900" : "ring-white",
        )}
      />
    </span>
  );
}
