import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import React, { useState } from "react";

type AlertType = "error" | "success" | "info";

interface AlertProps {
  type: AlertType;
  message: string;
  onClose?: () => void;
  className?: string;
}

export default function Alert({ type, message, onClose, className = "" }: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const config = {
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      iconColor: "text-red-500",
      textColor: "text-red-700",
      Icon: AlertCircle
    },
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      iconColor: "text-green-500",
      textColor: "text-green-700",
      Icon: CheckCircle2
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      iconColor: "text-blue-500",
      textColor: "text-blue-700",
      Icon: Info
    }
  };

  const style = config[type];
  const Icon = style.Icon;

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${style.bg} ${style.border} ${className}`}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${style.iconColor}`} />
      <div className={`flex-1 text-sm font-medium ${style.textColor}`}>
        {message}
      </div>
      {(onClose || true) && (
        <button 
          onClick={handleClose}
          className={`shrink-0 opacity-50 hover:opacity-100 transition-opacity ${style.textColor}`}
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
