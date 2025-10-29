import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import Image from "next/image";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "tier-1" | "tier-2" | "tier-3" | "tier-4" | "tier-5";
  size?: "sm" | "md" | "lg";
}

const Badge = ({ className, variant = "default", size = "md", children, ...props }: BadgeProps) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-full";

  const variants = {
    default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    success: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    danger: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    "tier-1": "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg",
    "tier-2": "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md",
    "tier-3": "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md",
    "tier-4": "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
    "tier-5": "bg-gradient-to-r from-slate-400 to-slate-500 text-white",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  // 티어별 로고 경로
  const getTierLogo = (variant: string) => {
    const tierLogos = {
      "tier-1": "/Images/tier/tier1.svg",
      "tier-2": "/Images/tier/tier2.svg",
      "tier-3": "/Images/tier/tier3.svg",
      "tier-4": "/Images/tier/tier4.svg",
      "tier-5": "/Images/tier/tier5.svg",
    };
    return tierLogos[variant as keyof typeof tierLogos];
  };

  // 티어 배지인지 확인
  const isTierBadge = variant?.startsWith("tier-");

  return (
    <>
      {isTierBadge ? (
        <Image
          src={getTierLogo(variant!) || ""}
          alt={`${variant} 로고`}
          width={size === "sm" ? 16 : size === "md" ? 18 : 20}
          height={size === "sm" ? 16 : size === "md" ? 18 : 20}
          className="object-contain"
        />
        ) : (
          children
        )}
      </>
  );
};

export default Badge;

