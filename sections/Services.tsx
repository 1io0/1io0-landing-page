import React from "react";
import SectionShell from "../components/ui/SectionShell";
import { useLanguage } from "../lib/i18n";
import { translations } from "../lib/translations";

export default function Services() {
  const { lang } = useLanguage();
  const t = translations.services;

  return (
    <SectionShell
      id="services"
      kicker={t.kicker[lang]}
      title={t.title[lang]}
      subtitle={t.subtitle[lang]}
      right={
        <div className="p-5 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/80 backdrop-blur-sm bg-[radial-gradient(1200px_500px_at_0%_0%,rgba(43,215,255,0.12),transparent_55%),radial-gradient(900px_500px_at_100%_0%,rgba(255,45,85,0.12),transparent_55%)] shadow-card relative overflow-hidden lego-edge">
          <div className="font-pixel text-sm md:text-base mb-2.5">
            {t.deliverablesTitle[lang]}
          </div>
          <div
            className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted"
            dangerouslySetInnerHTML={{ __html: t.deliverables[lang] }}
          />
          <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent my-6" />
          <div className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted">
            {t.quote[lang]}
          </div>
        </div>
      }
    >
      <div className="grid gap-3.5">
        {t.list.map((s) => (
          <div key={s.title[lang]} className="p-4 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/60 backdrop-blur-sm hover:bg-bg0/80 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-accentB opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="font-pixel text-xs md:text-sm mb-2 text-ink">{s.title[lang]}</div>
            <div className="font-ui text-[18px] md:text-[22px] leading-[1.35] md:leading-[1.25] text-muted">{s.desc[lang]}</div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}