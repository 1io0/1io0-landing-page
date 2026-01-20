import React from "react";

interface PixelButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  href?: string;
  type?: "button" | "submit" | "reset";
}

export default function PixelButton({ children, onClick, variant = "primary", href, type = "button" }: PixelButtonProps) {
  const Tag = href ? "a" : "button";
  
  // Base classes
  const baseClasses = "relative inline-flex items-center justify-center gap-2.5 px-3.5 py-3 rounded-[14px] border border-white/15 cursor-pointer font-pixel text-xs uppercase tracking-wide shadow-[0_16px_40px_rgba(0,0,0,0.35)] overflow-hidden select-none hover:-translate-y-px hover:border-accentB/35 active:translate-y-0 transition-transform";

  // Variant styles
  const variantStyles = variant === "primary" 
    ? "bg-gradient-to-br from-accentA/90 to-accentB/75"
    : "bg-white/5 text-ink";

  return (
    <Tag
      // @ts-ignore
      onClick={onClick}
      href={href}
      type={!href ? type : undefined}
      className={`${baseClasses} ${variantStyles}`}
    >
      <span className="absolute inset-[-2px] z-10 opacity-90 pointer-events-none bg-[radial-gradient(420px_120px_at_20%_0%,rgba(255,255,255,0.18),transparent_60%),radial-gradient(420px_120px_at_80%_0%,rgba(255,255,255,0.10),transparent_62%)]" aria-hidden="true" />
      <span className="relative z-20">{children}</span>
    </Tag>
  );
}