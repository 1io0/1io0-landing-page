import React from "react";
import SectionShell from "../components/ui/SectionShell";
import { useLanguage } from "../lib/i18n";
import { translations } from "../lib/translations";

export default function About() {
  const { lang } = useLanguage();
  const t = translations.about;

  return (
    <SectionShell
      id="about"
      kicker={t.kicker[lang]}
      title={t.title[lang]}
      subtitle={t.subtitle[lang]}
      right={
        <div className="p-5 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/80 backdrop-blur-sm bg-[radial-gradient(1200px_500px_at_0%_0%,rgba(43,215,255,0.12),transparent_55%),radial-gradient(900px_500px_at_100%_0%,rgba(255,45,85,0.12),transparent_55%)] shadow-card relative overflow-hidden lego-edge">
          <div className="font-pixel text-sm md:text-base mb-2.5">{t.valuesTitle[lang]}</div>
          <div
            className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted"
            dangerouslySetInnerHTML={{ __html: t.values[lang] }}
          />
        </div>
      }
    >
      <div className="p-5 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/80 backdrop-blur-sm bg-[radial-gradient(1200px_500px_at_0%_0%,rgba(43,215,255,0.12),transparent_55%),radial-gradient(900px_500px_at_100%_0%,rgba(255,45,85,0.12),transparent_55%)] shadow-card relative overflow-hidden lego-edge">
        <div className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted">
          {t.description[lang]}
        </div>
      </div>
    </SectionShell>
  );
}