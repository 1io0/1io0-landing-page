import React from "react";
import SectionShell from "../components/ui/SectionShell";

const steps = [
  ["Brief de misión", "Objetivo, alcance, riesgos, constraints y definición de éxito."],
  ["Diseño & prototipo", "Flujos, UI, arquitectura y prueba rápida con usuarios/stakeholders."],
  ["Construcción", "Sprints cortos, CI/CD, pruebas, performance y telemetría desde el inicio."],
  ["Lanzamiento", "Hardening, monitoreo, runbooks y handoff. Luego: iteración basada en datos."],
];

export default function Process() {
  return (
    <SectionShell
      id="process"
      kicker="Proceso"
      title="Checklist de vuelo"
      subtitle="Transparencia, entregas constantes y calidad medible."
      right={
        <div className="p-5 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/80 backdrop-blur-sm bg-[radial-gradient(1200px_500px_at_0%_0%,rgba(43,215,255,0.12),transparent_55%),radial-gradient(900px_500px_at_100%_0%,rgba(255,45,85,0.12),transparent_55%)] shadow-card relative overflow-hidden lego-edge">
          <div className="font-pixel text-sm md:text-base mb-2.5">Garantías</div>
          <div className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted">
            • PRs + revisión<br/>
            • métricas de performance<br/>
            • logs y trazas<br/>
            • seguridad básica por defecto<br/>
            • documentación viva<br/>
          </div>
        </div>
      }
    >
      <div className="grid gap-3.5">
        {steps.map(([t, d], idx) => (
          <div key={t} className="p-4 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/60 backdrop-blur-sm hover:bg-bg0/80 transition-colors relative overflow-hidden">
            <div className="font-ui text-lg md:text-xl tracking-widest uppercase text-[#eaf2ff]/85 flex gap-2.5 items-center mb-2">
              <span 
                className="w-2.5 h-2.5 rounded-[2px] shadow-[0_0_18px_rgba(43,215,255,0.5)]" 
                style={{ background: idx % 2 ? "var(--accentA)" : "var(--accentB)" }}
              />
              Fase {idx + 1}
            </div>
            <div className="font-pixel text-xs md:text-sm mb-2">{t}</div>
            <div className="font-ui text-[18px] md:text-[22px] leading-[1.35] md:leading-[1.25] text-muted">{d}</div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}