import React from "react";
import PixelButton from "../components/ui/PixelButton";

export default function Hero({ onCta }: { onCta: () => void }) {
  return (
    <section className="pt-8 md:pt-16 pb-12 md:pb-[84px] relative">
      <div className="max-w-[1120px] mx-auto w-[92vw]">
        <div className="p-5 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/80 backdrop-blur-sm bg-[radial-gradient(1200px_500px_at_0%_0%,rgba(43,215,255,0.12),transparent_55%),radial-gradient(900px_500px_at_100%_0%,rgba(255,45,85,0.12),transparent_55%)] shadow-card relative overflow-hidden lego-edge reveal">
          
          <div className="font-ui text-base md:text-xl tracking-widest uppercase text-[#eaf2ff]/85 flex gap-2.5 items-center mb-4 md:mb-0">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-accentB shadow-[0_0_18px_rgba(43,215,255,0.5)] shrink-0" /> 
            <span className="break-words">1io0 · Tecnología para misiones reales</span>
          </div>

          <h1 className="font-pixel text-[22px] md:text-[34px] leading-[1.3] md:leading-[1.2] uppercase tracking-wide my-4 break-words hyphens-auto">
            Construimos software, 3D, IoT <br className="hidden md:block"/>e Inteligencia Artificial.
          </h1>

          <p className="font-ui text-[17px] md:text-[22px] leading-[1.5] md:leading-[1.25] text-muted max-w-[820px]">
            Desde plataformas web y APIs hasta gemelos digitales, dispositivos conectados y 
            sistemas cognitivos autónomos. Ingeniería de alta fidelidad para problemas complejos.
          </p>

          <div className="flex flex-wrap gap-2.5 mt-6 md:mt-3.5">
            <span className="font-ui text-base md:text-xl px-2.5 py-2 rounded-xl border border-accentB/35 bg-black/40 text-muted"><strong>Software</strong> · Web · Apps · APIs</span>
            <span className="font-ui text-base md:text-xl px-2.5 py-2 rounded-xl border border-accentC/40 bg-black/40 text-muted"><strong>3D</strong> · Modelado · Configuradores · AR</span>
            <span className="font-ui text-base md:text-xl px-2.5 py-2 rounded-xl border border-accentA/35 bg-black/40 text-muted"><strong>IoT</strong> · Sensores · Edge · Dashboards</span>
            <span className="font-ui text-base md:text-xl px-2.5 py-2 rounded-xl border border-good/40 bg-black/40 text-muted"><strong>IA</strong> · Agentes · LLMs · ML Ops</span>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent my-6" />

          <div className="flex gap-3 flex-wrap items-center">
            <PixelButton onClick={onCta}>Iniciar misión</PixelButton>
            <PixelButton variant="secondary" href="#services">Ver servicios</PixelButton>

            <div className="font-ui text-[16px] md:text-[18px] text-muted opacity-90 ml-auto hidden sm:block">
              IA descentralizada · seguridad · escalabilidad
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}