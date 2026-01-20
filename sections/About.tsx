import React from "react";
import SectionShell from "../components/ui/SectionShell";

export default function About() {
  return (
    <SectionShell
      id="about"
      kicker="Nosotros"
      title="Ingeniería con alma de juguete"
      subtitle="Serios con la calidad, juguetones con el estilo: bloques claros, interfaces legibles, detalles sci‑fi."
      right={
        <div className="p-5 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/80 backdrop-blur-sm bg-[radial-gradient(1200px_500px_at_0%_0%,rgba(43,215,255,0.12),transparent_55%),radial-gradient(900px_500px_at_100%_0%,rgba(255,45,85,0.12),transparent_55%)] shadow-card relative overflow-hidden lego-edge">
          <div className="font-pixel text-sm md:text-base mb-2.5">Valores</div>
          <div className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted">
            • claridad sobre complejidad<br/>
            • velocidad sin improvisación<br/>
            • diseño que comunica estados<br/>
            • performance como feature<br/>
          </div>
        </div>
      }
    >
      <div className="p-5 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/80 backdrop-blur-sm bg-[radial-gradient(1200px_500px_at_0%_0%,rgba(43,215,255,0.12),transparent_55%),radial-gradient(900px_500px_at_100%_0%,rgba(255,45,85,0.12),transparent_55%)] shadow-card relative overflow-hidden lego-edge">
        <div className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted">
          En 1io0 combinamos estética con prácticas modernas:
          versionado, pruebas, observabilidad, y una obsesión por interfaces “operacionales”
          (las que se entienden incluso en modo emergencia).
        </div>
      </div>
    </SectionShell>
  );
}