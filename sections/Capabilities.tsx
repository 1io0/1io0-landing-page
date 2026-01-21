import React from "react";
import SectionShell from "../components/ui/SectionShell";
import { useLanguage } from "../lib/i18n";
import { translations } from "../lib/translations";

export default function Capabilities() {
  const { lang } = useLanguage();
  const t = translations.capabilities;

  return (
    <SectionShell
      id="capabilities"
      kicker={t.kicker[lang]}
      title={t.title[lang]}
      subtitle={t.subtitle[lang]}
      right={
        <div className="p-5 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/80 backdrop-blur-sm bg-[radial-gradient(1200px_500px_at_0%_0%,rgba(43,215,255,0.12),transparent_55%),radial-gradient(900px_500px_at_100%_0%,rgba(255,45,85,0.12),transparent_55%)] shadow-card relative overflow-hidden lego-edge">
          <div className="font-pixel text-sm md:text-base mb-2.5">{t.stackTitle[lang]}</div>
          <div
            className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted"
            dangerouslySetInnerHTML={{ __html: t.stack[lang] }}
          />
          <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent my-6" />
          <div className="flex flex-wrap gap-2.5">
            <span
              className="font-ui text-lg md:text-xl px-2.5 py-2 rounded-xl border border-accentB/35 bg-black/40 text-muted"
              dangerouslySetInnerHTML={{ __html: t.tagRealtime[lang] }}
            />
            <span
              className="font-ui text-lg md:text-xl px-2.5 py-2 rounded-xl border border-good/35 bg-black/40 text-muted"
              dangerouslySetInnerHTML={{ __html: t.tagCognitive[lang] }}
            />
            <span
              className="font-ui text-lg md:text-xl px-2.5 py-2 rounded-xl border border-accentA/35 bg-black/40 text-muted"
              dangerouslySetInnerHTML={{ __html: t.tagSecurity[lang] }}
            />
          </div>
        </div>
      }
    >
      <div className="p-5 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/80 backdrop-blur-sm bg-[radial-gradient(1200px_500px_at_0%_0%,rgba(43,215,255,0.12),transparent_55%),radial-gradient(900px_500px_at_100%_0%,rgba(255,45,85,0.12),transparent_55%)] shadow-card relative overflow-hidden lego-edge">
        <div className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted">
          <span dangerouslySetInnerHTML={{ __html: t.software[lang] }} />
          <div className="h-4" />
          <span dangerouslySetInnerHTML={{ __html: t.ai[lang] }} />
          <div className="h-4" />
          <span dangerouslySetInnerHTML={{ __html: t.visualization[lang] }} />
          <div className="h-4" />
          <span dangerouslySetInnerHTML={{ __html: t.iot[lang] }} />
        </div>
      </div>
    </SectionShell>
  );
}