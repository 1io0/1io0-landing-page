import React, { useMemo } from "react";
import quotesData from "../data/quotes.json";
import carlSaganSvg from "../assets/carl_sagan.svg";
import { useLanguage } from "../lib/i18n";

type QuotesJson = {
  people: Array<{
    id: string;
    name: { es: string; en: string };
    role?: { es: string; en: string };
    assetPath: string;
    quotes: Array<{
      id: string;
      text: { es: string; en: string };
    }>;
  }>;
};

export default function Quotes() {
  const { lang } = useLanguage();
  const data = quotesData as unknown as QuotesJson;
  const person = data.people[0];

  const quoteIndex = useMemo(() => {
    if (!person?.quotes?.length) return 0;
    return Math.floor(Math.random() * person.quotes.length);
  }, [person?.id]);

  const quote = person?.quotes?.[quoteIndex];

  if (!person || !quote) return null;

  return (
    <section id="quotes" className="py-12 md:py-[84px] relative">
      <div className="max-w-[1120px] mx-auto w-[92vw]">
        <div className="reveal">
          <div className="p-5 md:p-[26px] rounded-[14px] border border-white/10 bg-bg0/80 backdrop-blur-sm shadow-card relative overflow-hidden lego-edge">
            <div className="grid grid-cols-1 md:grid-cols-[1.25fr_0.75fr] gap-7 md:gap-8 items-center">
              <div>
                <div className="font-ui text-[22px] md:text-[30px] leading-[1.4] md:leading-[1.25] text-ink">
                  <span className="text-muted">"</span>
                  {quote.text[lang]}
                  <span className="text-muted">"</span>
                </div>

                <div className="mt-5 font-ui text-muted text-[16px] md:text-[18px]">
                  {person.name[lang]}
                  {person.role?.[lang] ? `  • ${person.role[lang]}` : ""}
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-end">
                <div className="inline-flex bg-white/85 rounded-full shadow-[0_18px_55px_rgba(255,255,255,0.12)] border border-white/70 overflow-hidden">
                  <img
                    src={carlSaganSvg}
                    alt={person.name[lang]}
                    className="w-[96px] md:w-[112px] h-auto object-contain opacity-95 block"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
