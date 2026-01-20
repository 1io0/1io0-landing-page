export type SupportedLang = "es" | "en";

const STORAGE_KEY = "1io0.lang";

export function normalizeLang(input: string | null | undefined): SupportedLang | null {
  if (!input) return null;
  const v = input.toLowerCase();
  if (v.startsWith("es")) return "es";
  if (v.startsWith("en")) return "en";
  return null;
}

export function getLang(): SupportedLang {
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
