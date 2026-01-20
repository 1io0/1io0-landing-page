import React from "react";
import SectionShell from "../components/ui/SectionShell";

export default function Capabilities() {
  return (
    <SectionShell
      id="capabilities"
      kicker="Capacidades"
      title="Tecnología que escala sin perder el estilo"
      subtitle="Un look atemporal por fuera, ingeniería moderna por dentro."
      right={
        <div className="p-5 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/80 backdrop-blur-sm bg-[radial-gradient(1200px_500px_at_0%_0%,rgba(43,215,255,0.12),transparent_55%),radial-gradient(900px_500px_at_100%_0%,rgba(255,45,85,0.12),transparent_55%)] shadow-card relative overflow-hidden lego-edge">
          <div className="font-pixel text-sm md:text-base mb-2.5">Stack sugerido</div>
          <div className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted">
            • React / Next.js / TypeScript<br/>
            • Node.js / Python (FastAPI)<br/>
            • LangChain / OpenAI / HuggingFace<br/>
            • TensorFlow / PyTorch<br/>
            • WebGL / Three.js / MQTT / BLE<br/>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent my-6" />
          <div className="flex flex-wrap gap-2.5">
            <span className="font-ui text-lg md:text-xl px-2.5 py-2 rounded-xl border border-accentB/35 bg-black/40 text-muted"><strong>Realtime</strong> platforms</span>
            <span className="font-ui text-lg md:text-xl px-2.5 py-2 rounded-xl border border-good/35 bg-black/40 text-muted"><strong>Cognitive</strong> agents</span>
            <span className="font-ui text-lg md:text-xl px-2.5 py-2 rounded-xl border border-accentA/35 bg-black/40 text-muted"><strong>Security</strong> first</span>
          </div>
        </div>
      }
    >
      <div className="p-5 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/80 backdrop-blur-sm bg-[radial-gradient(1200px_500px_at_0%_0%,rgba(43,215,255,0.12),transparent_55%),radial-gradient(900px_500px_at_100%_0%,rgba(255,45,85,0.12),transparent_55%)] shadow-card relative overflow-hidden lego-edge">
        <div className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted">
          <strong className="text-ink">Desarrollo de Software:</strong> Ingeniería de aplicaciones robustas con enfoque en Clean Architecture, alta disponibilidad y performance extrema. Especialistas en React, Next.js y ecosistemas TypeScript/Node para web y móvil.
          <div className="h-4" />
          <strong className="text-ink">Inteligencia Artificial:</strong> Implementación de RAG (Retrieval-Augmented Generation), fine-tuning de modelos LLM, sistemas de visión por computadora y automatización mediante agentes cognitivos autónomos.
          <div className="h-4" />
          <strong className="text-ink">Visualización 3D & Tiempo Real:</strong> Gemelos digitales, configuradores 3D interactivos optimizados para navegadores y experiencias inmersivas con WebGL/Three.js.
          <div className="h-4" />
          <strong className="text-ink">IoT & Conectividad:</strong> Telemetría industrial, Edge computing, protocolos seguros de baja latencia (MQTT/gRPC) y gestión remota de flotas de dispositivos.
        </div>
      </div>
    </SectionShell>
  );
}