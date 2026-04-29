"use client";

import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

type AlertType = "error" | "success" | "info";

interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
  className?: string;
  dismissible?: boolean;
}

const config = {
  error:   { Icon: AlertCircle,   classes: "bg-rose-50 border-rose-200 text-rose-700" },
  success: { Icon: CheckCircle2,  classes: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  info:    { Icon: Info,          classes: "bg-slate-50 border-slate-200 text-slate-700" },
} as const;

export default function Alert({ type, message, onClose, className, dismissible = true }: AlertProps) {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  const { Icon, classes } = config[type];

  function handleClose() {
    setOpen(false);
    onClose?.();
  }

  return (
    <div className={cn("flex items-start gap-3 rounded-lg border px-4 py-3 text-sm", classes, className)}>
      <Icon className="h-4 w-4 shrink-0 mt-0.5" />
      <p className="flex-1 font-medium leading-relaxed">{message}</p>
      {dismissible && (
        <button
          type="button"
          onClick={handleClose}
          aria-label="Dismiss"
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
