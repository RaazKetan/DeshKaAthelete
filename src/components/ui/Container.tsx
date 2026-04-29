import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export function Container({ size = "xl", className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-6 lg:px-8", sizeMap[size], className)} {...props} />;
}
