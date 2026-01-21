import React, { useState } from "react";
import SectionShell from "../components/ui/SectionShell";
import PixelButton from "../components/ui/PixelButton";
import { useLanguage } from "../lib/i18n";
import { translations } from "../lib/translations";

/**
 * Accessing environment variables. 
 * In Vite, use import.meta.env instead of process.env
 */
const SCRIPT_ID = import.meta.env.VITE_GOOGLE_SCRIPT_ID;
const GOOGLE_SCRIPT_URL = SCRIPT_ID
  ? `https://script.google.com/macros/s/${SCRIPT_ID}/exec`
  : "";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const { lang } = useLanguage();
  const t = translations.contact;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<Status>("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "loading") return;
    setStatus("loading");

    try {
      if (!SCRIPT_ID) {
        console.warn("VITE_GOOGLE_SCRIPT_ID is missing in .env");
        throw new Error("Missing Script ID");
      }

      console.log("📤 Enviando datos:", formData);
      console.log("🔗 URL:", GOOGLE_SCRIPT_URL);

      /**
       * Google Apps Script no soporta CORS headers personalizados con ContentService.
       * Solución: Usar FormData (application/x-www-form-urlencoded) en lugar de JSON.
       * Esto evita el preflight OPTIONS request que causa el error de CORS.
       */
      const formBody = new URLSearchParams();
      formBody.append('name', formData.name);
      formBody.append('email', formData.email);
      formBody.append('message', formData.message);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formBody,
      });

      console.log("📥 Response status:", response.status);
      console.log("📥 Response headers:", Object.fromEntries(response.headers.entries()));

      // Get the response text first (in case it's not JSON)
      const responseText = await response.text();
      console.log("📄 Response text:", responseText);

      // Check if response is ok (2xx status code)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
      }

      // Try to parse as JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("❌ JSON parse error:", parseError);
        throw new Error("Invalid JSON response from server");
      }

      console.log("✅ Parsed result:", result);

      if (result.status === "success") {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error(result.message || "Unknown error");
      }

    } catch (error) {
      console.error("❌ Submission error:", error);

      // Check if it's a CORS error
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        console.error("🚫 CORS ERROR: Google Apps Script no tiene configurado doOptions() correctamente");
        console.error("📖 Revisa las instrucciones en la consola arriba");
      }

      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <SectionShell
      id="contact"
      kicker={t.kicker[lang]}
      title={t.title[lang]}
      subtitle={t.subtitle[lang]}
      right={
        <div className="p-5 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/80 backdrop-blur-sm bg-[radial-gradient(1200px_500px_at_0%_0%,rgba(43,215,255,0.12),transparent_55%),radial-gradient(900px_500px_at_100%_0%,rgba(255,45,85,0.12),transparent_55%)] shadow-card relative overflow-hidden lego-edge">
          <div className="font-pixel text-sm md:text-base mb-2.5">{t.channelsTitle[lang]}</div>
          <div
            className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted"
            dangerouslySetInnerHTML={{ __html: t.channels[lang] }}
          />
          <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent my-6" />
          <div className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted">
            {t.tip[lang]}
          </div>
        </div>
      }
    >
      <form
        className="p-5 md:p-[22px] rounded-[14px] border border-white/10 bg-bg0/80 backdrop-blur-sm bg-[radial-gradient(1200px_500px_at_0%_0%,rgba(43,215,255,0.12),transparent_55%),radial-gradient(900px_500px_at_100%_0%,rgba(255,45,85,0.12),transparent_55%)] shadow-card relative overflow-hidden lego-edge"
        onSubmit={handleSubmit}
      >
        <div className="font-ui text-[18px] md:text-[22px] leading-[1.4] md:leading-[1.25] text-muted mb-3">
          {t.formIntro[lang]}
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="font-ui text-[18px] md:text-[22px] text-muted block"
            >
              {t.nameLabel[lang]}
            </label>
            <input
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mt-1.5 p-3 rounded-xl border border-white/15 bg-black/40 text-ink font-ui text-lg md:text-xl outline-none focus:border-accentB/45 focus:shadow-[0_0_0_4px_rgba(43,215,255,0.12)] placeholder-white/20"
              placeholder={t.namePlaceholder[lang]}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="font-ui text-[18px] md:text-[22px] text-muted block"
            >
              {t.emailLabel[lang]}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mt-1.5 p-3 rounded-xl border border-white/15 bg-black/40 text-ink font-ui text-lg md:text-xl outline-none focus:border-accentB/45 focus:shadow-[0_0_0_4px_rgba(43,215,255,0.12)] placeholder-white/20"
              placeholder={t.emailPlaceholder[lang]}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="font-ui text-[18px] md:text-[22px] text-muted block"
            >
              {t.messageLabel[lang]}
            </label>
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleInputChange}
              className="w-full mt-1.5 p-3 rounded-xl border border-white/15 bg-black/40 text-ink font-ui text-lg md:text-xl outline-none focus:border-accentB/45 focus:shadow-[0_0_0_4px_rgba(43,215,255,0.12)] placeholder-white/20"
              rows={4}
              placeholder={t.messagePlaceholder[lang]}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
          <PixelButton
            variant="primary"
            type="submit"
          >
            {status === "loading" ? t.submitting[lang] : t.submitButton[lang]}
          </PixelButton>

          {status === "success" && (
            <div className="font-ui text-lg md:text-xl text-good flex items-center gap-2 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-good" />
              {t.successMessage[lang]}
            </div>
          )}

          {status === "error" && (
            <div className="font-ui text-lg md:text-xl text-accentA flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accentA" />
              {t.errorMessage[lang]}
            </div>
          )}
        </div>
      </form>
    </SectionShell>
  );
}
