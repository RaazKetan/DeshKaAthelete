import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  rightSlot?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Field({ label, hint, error, optional, rightSlot, children, className }: FieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">
            {label}
            {optional && <span className="ml-1.5 text-xs font-normal text-slate-400">Optional</span>}
          </label>
          {rightSlot}
        </div>
      )}
      {children}
      {error ? (
        <p className="text-xs font-medium text-rose-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full h-11 rounded-lg border bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500 transition disabled:opacity-50 disabled:bg-slate-50";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }>(
  function Input({ className, invalid, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(inputClass, invalid && "border-rose-300 focus-visible:ring-rose-500/30 focus-visible:border-rose-500", !invalid && "border-slate-200", className)}
        {...props}
      />
    );
  },
);

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }>(
  function Select({ className, invalid, children, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={cn(inputClass, "pr-10 appearance-none bg-no-repeat bg-[length:16px] bg-[right_14px_center] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%2364748b%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%224 6 8 10 12 6%22/></svg>')]", invalid && "border-rose-300", !invalid && "border-slate-200", className)}
        {...props}
      >
        {children}
      </select>
    );
  },
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }>(
  function Textarea({ className, invalid, rows = 4, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn("w-full rounded-lg border bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:border-emerald-500 transition resize-none", invalid && "border-rose-300", !invalid && "border-slate-200", className)}
        {...props}
      />
    );
  },
);

interface PrefixInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  prefix: ReactNode;
  invalid?: boolean;
}

export const PrefixInput = forwardRef<HTMLInputElement, PrefixInputProps>(
  function PrefixInput({ prefix, className, invalid, ...props }, ref) {
    return (
      <div className={cn("flex items-stretch rounded-lg border bg-white overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500/40 focus-within:border-emerald-500 transition", invalid && "border-rose-300", !invalid && "border-slate-200")}>
        <span className="flex items-center px-3 text-sm font-medium text-slate-500 bg-slate-50 border-r border-slate-200">
          {prefix}
        </span>
        <input
          ref={ref}
          className={cn("flex-1 px-3.5 text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none", className)}
          {...props}
        />
      </div>
    );
  },
);
