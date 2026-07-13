export const COOKIE_CONSENT_NAME = "aibe_cookie_consent";
export const COOKIE_CONSENT_EVENT = "aibe:cookie-consent-changed";
export const OPEN_COOKIE_SETTINGS_EVENT = "aibe:open-cookie-settings";
export const COOKIE_CONSENT_VERSION = 1;

export type CookieConsentPreferences = {
  version: number;
  necessary: true;
  analytics: boolean;
  savedAt: string;
};

export function readCookieConsent(): CookieConsentPreferences | null {
  if (typeof document === "undefined") return null;

  const rawCookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_CONSENT_NAME}=`));

  if (!rawCookie) return null;

  try {
    const value = decodeURIComponent(rawCookie.split("=").slice(1).join("="));
    const parsed = JSON.parse(value) as Partial<CookieConsentPreferences>;

    if (
      parsed.version !== COOKIE_CONSENT_VERSION ||
      parsed.necessary !== true ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.savedAt !== "string"
    ) {
      return null;
    }

    return parsed as CookieConsentPreferences;
  } catch {
    return null;
  }
}

export function saveCookieConsent(analytics: boolean): CookieConsentPreferences {
  const consent: CookieConsentPreferences = {
    version: COOKIE_CONSENT_VERSION,
    necessary: true,
    analytics,
    savedAt: new Date().toISOString(),
  };

  const maxAge = 60 * 60 * 24 * 365;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${COOKIE_CONSENT_NAME}=${encodeURIComponent(
    JSON.stringify(consent)
  )}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;

  window.dispatchEvent(
    new CustomEvent<CookieConsentPreferences>(COOKIE_CONSENT_EVENT, {
      detail: consent,
    })
  );

  return consent;
}

export function openCookieSettings() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
  }
}
