import React from "react";

export default function Footer() {
  return (
    <footer className="py-11 pb-16 border-t border-line bg-black/15">
      <div className="max-w-[1120px] mx-auto w-[92vw] flex items-start justify-between gap-5 flex-wrap">
        <div>
          <div className="font-pixel text-sm">1io0</div>
          <div className="font-ui text-[22px] text-muted opacity-85">
            software · 3D · iot · automatización
          </div>
        </div>

        <div className="font-ui text-[22px] text-muted opacity-80">
          © {new Date().getFullYear()} 1io0 — built for the void.
        </div>
      </div>
    </footer>
  );
}