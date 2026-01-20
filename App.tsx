import React, { useEffect, useState } from "react";
import SpaceScene from "./components/SpaceScene";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Capabilities from "./sections/Capabilities";
import Process from "./sections/Process";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Quotes from "./sections/Quotes";
import Footer from "./sections/Footer";

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    scrollToId(id);
  };

  const menuItems = ['Services', 'Capabilities', 'Process', 'About', 'Contact'];

  return (
    <>
      <SpaceScene />

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg0/55 border-b border-line w-full">
        <div className="max-w-[1120px] mx-auto w-[92vw] flex items-center justify-between py-3.5">
          <div className="flex gap-4 items-center z-50 relative">
            {/* Logo with pill-shaped background */}
            <div className="flex items-center px-4 py-2.5 rounded-full bg-white border border-white/90 shadow-[0_0_25px_rgba(255,255,255,0.3)]">
              <img
                src="assets/logo.svg"
                alt="1io0"
                className="h-[32px] md:h-[38px] w-auto object-contain"
              />
            </div>
            <div className="font-ui text-[16px] md:text-[18px] text-muted opacity-85 leading-none self-end pb-1.5 hidden sm:block">
              software · 3D · iA · iot
            </div>
            {/* Mobile subtitle version */}
            <div className="font-ui text-[16px] text-muted opacity-85 leading-none self-end pb-1.5 sm:hidden">
               sw · 3D
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50 p-2 text-ink focus:outline-none relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col items-end gap-1.5">
              <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
              <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-4'}`} />
              <span className={`h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-3.5 flex-wrap justify-end" aria-label="Secciones Desktop">
            {menuItems.map((item) => (
              <button 
                key={item}
                onClick={() => scrollToId(item.toLowerCase())}
                className="font-ui text-xl px-2.5 py-1.5 border border-white/15 bg-white/5 text-ink rounded-[10px] hover:bg-accentB/10 hover:border-accentB/35 transition-colors cursor-pointer"
              >
                {item === 'About' ? 'Nosotros' : 
                 item === 'Services' ? 'Servicios' :
                 item === 'Capabilities' ? 'Capacidades' :
                 item === 'Process' ? 'Proceso' : 'Contacto'}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Full Screen Menu */}
      <div className={`fixed inset-0 z-40 flex flex-col items-center justify-start pt-24
        bg-bg0/98 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-bg1 via-bg0 to-bg0
        backdrop-blur-xl transition-all duration-300 ease-in-out overflow-y-auto
        ${isMenuOpen ? 'opacity-100 translate-x-0 visible' : 'opacity-0 translate-x-full invisible pointer-events-none'}
      `}>
        <nav className="flex flex-col gap-8 text-center p-6 w-full max-w-sm">
            {/* Added decoration line */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-accentB to-transparent mx-auto mb-2 opacity-50" />
          
          {menuItems.map((item) => (
            <button 
              key={item}
              onClick={() => handleNavClick(item.toLowerCase())}
              className="font-pixel text-xl md:text-2xl uppercase tracking-widest text-ink hover:text-accentB transition-colors py-2"
            >
              {item === 'About' ? 'Nosotros' : 
                item === 'Services' ? 'Servicios' :
                item === 'Capabilities' ? 'Capacidades' :
                item === 'Process' ? 'Proceso' : 'Contacto'}
            </button>
          ))}

            {/* Added decoration line */}
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-accentA to-transparent mx-auto mt-2 opacity-50" />
        </nav>

        <div className="mt-auto pb-10 font-ui text-muted opacity-50 text-lg">
          1io0 Systems
        </div>
      </div>

      <main className="relative z-10 pt-[76px] md:pt-[84px]">
        <Hero onCta={() => scrollToId("contact")} />
        <Services />
        <Capabilities />
        <Process />
        <About />
        <Contact />
        <Quotes />
      </main>

      <Footer />
    </>
  );
}