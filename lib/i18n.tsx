import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type SupportedLang = "es" | "en";

const STORAGE_KEY = "1io0.lang";

/**
 * Force default language constant.
 * Set to null for automatic detection, "es" for Spanish, or "en" for English.
 * This will override all other language detection mechanisms.
 */
export const FORCE_DEFAULT_LANG: SupportedLang | null = null;

export function normalizeLang(input: string | null | undefined): SupportedLang | null {
  if (!input) return null;
  const v = input.toLowerCase();
  if (v.startsWith("es")) return "es";
  if (v.startsWith("en")) return "en";
  return null;
}

export function getLang(): SupportedLang {
  // 0) Force default language (highest priority)
  if (FORCE_DEFAULT_LANG) return FORCE_DEFAULT_LANG;

  // 1) URL override: ?lang=en
  try {
    const urlLang = normalizeLang(new URLSearchParams(window.location.search).get("lang"));
    if (urlLang) return urlLang;
  } catch {
    // ignore
  }

  // 2) Saved preference
  try {
    const stored = normalizeLang(window.localStorage.getItem(STORAGE_KEY));
    if (stored) return stored;
  } catch {
    // ignore
  }

  // 3) Browser language
  const nav = typeof navigator !== "undefined" ? normalizeLang(navigator.language) : null;
  if (nav) return nav;

  // Default
  return "es";
}

export function setLang(lang: SupportedLang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore
  }
}

export function t(value: { es: string; en: string }, lang: SupportedLang): string {
  return lang === "en" ? value.en : value.es;
}

// Language Context
interface LanguageContextType {
  lang: SupportedLang;
  setLanguage: (lang: SupportedLang) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<SupportedLang>(getLang());

  const setLanguage = (newLang: SupportedLang) => {
    setLang(newLang);
    setLangState(newLang);
  };

  useEffect(() => {
    // Update on mount if needed
    setLangState(getLang());
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
