"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import {
  COOKIE_CONSENT_EVENT,
  CookieConsentPreferences,
  readCookieConsent,
} from "@/lib/cookie-consent";

export default function ConsentAwareAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(readCookieConsent()?.analytics === true);

    const handleConsent = (event: Event) => {
      const customEvent = event as CustomEvent<CookieConsentPreferences>;
      setEnabled(customEvent.detail?.analytics === true);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsent);
  }, []);

  return enabled ? <Analytics /> : null;
}
