import type { ReactNode, CSSProperties, ChangeEvent } from "react";

// ── Logo mark — Ashoka chakra inspired ──
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" fill="var(--kumkum)" />
      <circle cx="14" cy="14" r="9" stroke="var(--paper)" strokeWidth="1.2" fill="none" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x1 = 14 + Math.cos(a) * 4;
        const y1 = 14 + Math.sin(a) * 4;
        const x2 = 14 + Math.cos(a) * 9;
        const y2 = 14 + Math.sin(a) * 9;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--paper)" strokeWidth="1.2" />;
      })}
      <circle cx="14" cy="14" r="2" fill="var(--paper)" />
    </svg>
  );
}

// ── Decorative motif (kolam-inspired diamond grid) ──
export function Motif({ size = 60, color = "var(--ink)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <path d="M30 4 L56 30 L30 56 L4 30 Z" stroke={color} strokeWidth="1.2" />
      <path d="M30 14 L46 30 L30 46 L14 30 Z" stroke={color} strokeWidth="1.2" />
      <circle cx="30" cy="30" r="3" fill={color} />
      <circle cx="30" cy="4" r="1.5" fill={color} />
      <circle cx="56" cy="30" r="1.5" fill={color} />
      <circle cx="30" cy="56" r="1.5" fill={color} />
      <circle cx="4" cy="30" r="1.5" fill={color} />
    </svg>
  );
}

// ── Silhouette overlay — abstract head/shoulders, varied by seed ──
export function Silhouette({ seed = 0, tone = "ink" }: { seed?: number; tone?: "ink" | "light" }) {
  const fill = tone === "light" ? "oklch(0.78 0.012 70)" : "oklch(0.42 0.018 60)";
  const v = seed % 4;
  return (
    <svg className="silhouette" viewBox="0 0 100 120" preserveAspectRatio="xMidYMax meet">
      {v === 0 && (
        <g fill={fill}>
          <ellipse cx="50" cy="48" rx="14" ry="16" />
          <path d="M20 120 C20 92 33 78 50 78 C67 78 80 92 80 120 Z" />
        </g>
      )}
      {v === 1 && (
        <g fill={fill}>
          <path d="M36 38 Q50 24 64 38 L64 50 Q64 58 50 60 Q36 58 36 50 Z" />
          <ellipse cx="50" cy="54" rx="14" ry="16" />
          <path d="M22 120 C22 90 34 78 50 78 C66 78 78 90 78 120 Z" />
        </g>
      )}
      {v === 2 && (
        <g fill={fill}>
          <path d="M34 44 Q34 30 50 30 Q66 30 66 44 L66 64 Q60 70 50 70 Q40 70 34 64 Z" />
          <path d="M18 120 C18 90 32 78 50 78 C68 78 82 90 82 120 Z" />
        </g>
      )}
      {v === 3 && (
        <g fill={fill}>
          <ellipse cx="50" cy="46" rx="13" ry="15" />
          <path d="M14 120 C14 88 30 76 50 76 C70 76 86 88 86 120 Z" />
        </g>
      )}
    </svg>
  );
}

// ── Verified badge ──
export function Verified({
  size = 14,
  label = "Verified national representation",
}: { size?: number; label?: string }) {
  return (
    <span
      className="tick"
      title={label}
      style={{ width: size, height: size, fontSize: size * 0.62 }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 6.2 L5 8.5 L9.5 3.5"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

// ── Tricolor accent stripe ──
export function TricolorBar({ height = 3, vertical = false }: { height?: number; vertical?: boolean }) {
  const style: CSSProperties = vertical
    ? { width: height, height: "100%", display: "flex", flexDirection: "column" }
    : { height, width: "100%", display: "flex" };
  return (
    <div style={style}>
      <div style={{ flex: 1, background: "oklch(0.68 0.14 55)" }} />
      <div style={{ flex: 1, background: "oklch(0.97 0.008 80)" }} />
      <div style={{ flex: 1, background: "oklch(0.42 0.07 155)" }} />
    </div>
  );
}

// ── Search input ──
interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  size?: "md" | "lg";
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search by name, achievement, topic…",
  size = "md",
}: SearchInputProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        border: "1px solid var(--line-2)",
        background: "var(--paper)",
        borderRadius: 999,
        padding: size === "lg" ? "14px 22px" : "8px 14px",
        flex: 1,
        minWidth: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="7" cy="7" r="5" stroke="var(--ink-3)" strokeWidth="1.5" />
        <path d="M11 11 L14 14" stroke="var(--ink-3)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          border: 0,
          background: "transparent",
          outline: "none",
          fontSize: size === "lg" ? 15 : 13.5,
          minWidth: 0,
        }}
      />
    </div>
  );
}

// ── Chip group ──
type ChipOption = string | { value: string; label: string };

interface ChipGroupProps {
  options: ChipOption[];
  value: string | string[];
  onChange: (v: any) => void;
  multi?: boolean;
}

export function ChipGroup({ options, value, onChange, multi = false }: ChipGroupProps) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {options.map((opt) => {
        const v = typeof opt === "object" ? opt.value : opt;
        const l = typeof opt === "object" ? opt.label : opt;
        const active = multi ? (value as string[]).includes(v) : value === v;
        return (
          <button
            key={v}
            type="button"
            className={active ? "chip active" : "chip"}
            onClick={() => {
              if (multi) {
                const arr = value as string[];
                onChange(active ? arr.filter((x) => x !== v) : [...arr, v]);
              } else {
                onChange(v);
              }
            }}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}

// ── ImageFrame ──
interface ImageFrameProps {
  seed?: number;
  tone?: "ink" | "light";
  children?: ReactNode;
  ratio?: string;
  label?: string;
  accent?: string;
}

export function ImageFrame({
  seed = 0,
  tone = "ink",
  children,
  ratio = "4 / 5",
  label,
  accent,
}: ImageFrameProps) {
  return (
    <div
      className="placeholder"
      style={{ aspectRatio: ratio, position: "relative" }}
      data-label={label}
    >
      <Silhouette seed={seed} tone={tone} />
      {accent && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 2,
            padding: "3px 8px",
            fontSize: 10,
            fontFamily: "var(--mono)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            background: "var(--paper)",
            color: "var(--ink-2)",
            border: "1px solid var(--line-2)",
            borderRadius: 999,
          }}
        >
          {accent}
        </div>
      )}
      {children}
    </div>
  );
}
