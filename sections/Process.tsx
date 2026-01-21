import React from "react";
import SectionShell from "../components/ui/SectionShell";
import { useLanguage } from "../lib/i18n";
import { translations } from "../lib/translations";

export default function Process() {
  const { lang } = useLanguage();
  const t = translations.process;

  return (
    <SectionShell
      id="process"
      kicker={t.kicker[lang]}
      title={t.title[lang]}
      subtitle={t.subtitle[lang]}
      right={
        <div className="p-5 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/80 backdrop-blur-sm bg-[radial-gradient(1200px_500px_at_0%_0%,rgba(43,215,255,0.12),transparent_55%),radial-gradient(900px_500px_at_100%_0%,rgba(255,45,85,0.12),transparent_55%)] shadow-card relative overflow-hidden lego-edge">
          <div className="font-pixel text-sm md:text-base mb-2.5">{t.guaranteesTitle[lang]}</div>
          <div
            className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted"
            dangerouslySetInnerHTML={{ __html: t.guarantees[lang] }}
          />
        </div>
      }
    >
      <div className="grid gap-3.5">
        {t.steps.map((step, idx) => (
          <div key={step.title[lang]} className="p-4 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/60 backdrop-blur-sm hover:bg-bg0/80 transition-colors relative overflow-hidden">
            <div className="font-ui text-lg md:text-xl tracking-widest uppercase text-[#eaf2ff]/85 flex gap-2.5 items-center mb-2">
              <span 
                className="w-2.5 h-2.5 rounded-[2px] shadow-[0_0_18px_rgba(43,215,255,0.5)]" 
                style={{ background: idx % 2 ? "var(--accentA)" : "var(--accentB)" }}
              />
              {t.phase[lang]} {idx + 1}
            </div>
            <div className="font-pixel text-xs md:text-sm mb-2">{step.title[lang]}</div>
            <div className="font-ui text-[18px] md:text-[22px] leading-[1.35] md:leading-[1.25] text-muted">{step.desc[lang]}</div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}