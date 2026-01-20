import React from "react";
import SectionShell from "../components/ui/SectionShell";

const services = [
  { title: "Desarrollo de software", desc: "Web apps, mobile, APIs, microservicios, integraciones y migraciones." },
  { title: "IA & Sistemas Cognitivos", desc: "Integración de LLMs, entrenamiento de modelos ad-hoc (texto/visión), agentes autónomos y optimización para Edge IA." },
  { title: "Modelado 3D & tiempo real", desc: "Modelos optimizados, escenas, configuradores, render en tiempo real y pipelines de visualización." },
  { title: "IoT & sistemas embebidos", desc: "Sensores, gateways, edge computing, telemetría industrial y gestión de flotas vía OTA." },
  { title: "UX/UI industrial", desc: "Diseño de interfaces operacionales con estética y dashboards predictivos." },
  { title: "Arquitectura & DevOps", desc: "CI/CD, observabilidad total, contenedores, hardening de seguridad y despliegue en la nube." },
  { title: "Data & automatización", desc: "Limpieza y curación de datasets, ETLs livianos, bots internos y análisis exploratorio de datos." },
];

export default function Services() {
  return (
    <SectionShell
      id="services"
      kicker="Servicios"
      title="De la idea al lanzamiento (y más allá)"
      subtitle="Paquetes modulares: puedes contratar una misión completa o solo el módulo que falta."
      right={
        <div className="p-5 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/80 backdrop-blur-sm bg-[radial-gradient(1200px_500px_at_0%_0%,rgba(43,215,255,0.12),transparent_55%),radial-gradient(900px_500px_at_100%_0%,rgba(255,45,85,0.12),transparent_55%)] shadow-card relative overflow-hidden lego-edge">
          <div className="font-pixel text-sm md:text-base mb-2.5">
            Entregables típicos
          </div>
          <div className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted">
            • roadmap + arquitectura IA<br/>
            • datasets curados y etiquetados<br/>
            • modelos entrenados (V1/V2)<br/>
            • prototipos rápidos (POC)<br/>
            • dashboards de monitoreo IA<br/>
            • documentación de auditoría ética<br/>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent my-6" />
          <div className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted">
            “Diseñamos como si fuera un cohete: con tolerancias claras, pruebas y checklist.”
          </div>
        </div>
      }
    >
      <div className="grid gap-3.5">
        {services.map((s) => (
          <div key={s.title} className="p-4 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/60 backdrop-blur-sm hover:bg-bg0/80 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-accentB opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="font-pixel text-xs md:text-sm mb-2 text-ink">{s.title}</div>
            <div className="font-ui text-[18px] md:text-[22px] leading-[1.35] md:leading-[1.25] text-muted">{s.desc}</div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}