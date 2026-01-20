import React from "react";

interface SectionShellProps {
  id: string;
  kicker: string;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children?: React.ReactNode;
}

export default function SectionShell({ id, kicker, title, subtitle, right, children }: SectionShellProps) {
  return (
    // Added 'scroll-mt-28' to ensure the section starts below the sticky header when navigated to via ID
    <section id={id} className="py-12 md:py-[84px] relative scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-[1120px] mx-auto w-[92vw]">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-7 items-start">
          <div className="reveal">
            <div className="font-ui text-lg md:text-xl tracking-widest uppercase text-[#eaf2ff]/85 flex gap-2.5 items-center">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-accentB shadow-[0_0_18px_rgba(43,215,255,0.5)]" /> 
              {kicker}
            </div>
            <h2 className="font-pixel text-[20px] md:text-[26px] leading-[1.3] uppercase tracking-wide my-3.5 break-words">
              {title}
            </h2>
            {subtitle && <p className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted">{subtitle}</p>}
            <div className="mt-6 md:mt-4">{children}</div>
          </div>

          <div className="reveal">
            {right}
          </div>
        </div>
      </div>
    </section>
  );
}