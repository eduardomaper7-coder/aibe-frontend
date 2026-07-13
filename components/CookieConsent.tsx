"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Cookie, ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  readCookieConsent,
  saveCookieConsent,
} from "@/lib/cookie-consent";

type Props = {
  locale: string;
};

const copy = {
  es: {
    label: "Tu privacidad importa",
    title: "Cookies, pero sin sorpresas.",
    description:
      "Usamos cookies técnicas para que la web funcione y, solo con tu permiso, analítica para entender cómo se utiliza y mejorarla.",
    learnMore: "Leer la Política de Cookies",
    accept: "Aceptar todas",
    reject: "Rechazar opcionales",
    configure: "Configurar",
    settingsTitle: "Configura tus preferencias",
    settingsDescription:
      "Puedes cambiar esta elección en cualquier momento desde el enlace “Configurar cookies” del pie de página.",
    necessaryTitle: "Cookies técnicas",
    necessaryDescription:
      "Necesarias para seguridad, inicio de sesión, navegación y para recordar tu elección. No pueden desactivarse.",
    alwaysActive: "Siempre activas",
    analyticsTitle: "Analítica",
    analyticsDescription:
      "Nos ayuda a medir visitas y rendimiento mediante Vercel Analytics. Permanece desactivada hasta que la autorices.",
    save: "Guardar preferencias",
    close: "Cerrar configuración",
    privacy: "Política de privacidad",
  },
  en: {
    label: "Your privacy matters",
    title: "Cookies, without surprises.",
    description:
      "We use essential cookies to keep the website working and, only with your permission, analytics to understand usage and improve it.",
    learnMore: "Read the Cookie Policy",
    accept: "Accept all",
    reject: "Reject optional",
    configure: "Configure",
    settingsTitle: "Choose your preferences",
    settingsDescription:
      "You can change this choice at any time through the “Cookie settings” link in the footer.",
    necessaryTitle: "Essential cookies",
    necessaryDescription:
      "Required for security, sign-in, navigation and remembering your choice. They cannot be disabled.",
    alwaysActive: "Always active",
    analyticsTitle: "Analytics",
    analyticsDescription:
      "Helps us measure visits and performance through Vercel Analytics. It remains disabled until you allow it.",
    save: "Save preferences",
    close: "Close settings",
    privacy: "Privacy policy",
  },
} as const;

export default function CookieConsent({ locale }: Props) {
  const language = locale === "en" ? "en" : "es";
  const text = copy[language];
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [returnToBanner, setReturnToBanner] = useState(true);

  useEffect(() => {
    const saved = readCookieConsent();
    setAnalytics(saved?.analytics ?? false);
    setVisible(!saved);

    const openSettings = () => {
      const current = readCookieConsent();
      setAnalytics(current?.analytics ?? false);
      setReturnToBanner(false);
      setSettingsOpen(true);
      setVisible(true);
    };

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
    setVisible(returnToBanner);
  }, [returnToBanner]);

  useEffect(() => {
    if (!settingsOpen) return;

    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSettings();
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [settingsOpen, closeSettings]);

  const persist = (analyticsEnabled: boolean) => {
    saveCookieConsent(analyticsEnabled);
    setAnalytics(analyticsEnabled);
    setSettingsOpen(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <section
        className="cookieBanner"
        aria-label={text.label}
        aria-live="polite"
      >
        <div className="cookieIcon" aria-hidden="true">
          <Cookie size={23} strokeWidth={1.8} />
        </div>

        <div className="cookieCopy">
          <span className="cookieEyebrow">{text.label}</span>
          <h2>{text.title}</h2>
          <p>
            {text.description}{" "}
            <Link href={`/${language}/politica-cookies`}>{text.learnMore}</Link>.
          </p>
        </div>

        <div className="cookieActions">
          <button className="cookieButton cookieButtonDark" onClick={() => persist(false)}>
            {text.reject}
          </button>
          <button className="cookieButton cookieButtonBlue" onClick={() => persist(true)}>
            {text.accept}
          </button>
          <button
            className="cookieConfigure"
            onClick={() => {
              setReturnToBanner(true);
              setSettingsOpen(true);
            }}
          >
            <SlidersHorizontal size={16} aria-hidden="true" />
            {text.configure}
          </button>
        </div>
      </section>

      {settingsOpen && (
        <div className="cookieOverlay" role="presentation" onMouseDown={closeSettings}>
          <section
            className="cookieModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="modalHeader">
              <div>
                <span className="cookieEyebrow">{text.label}</span>
                <h2 id={titleId}>{text.settingsTitle}</h2>
              </div>
              <button
                ref={closeButtonRef}
                className="closeButton"
                onClick={closeSettings}
                aria-label={text.close}
              >
                <X size={20} />
              </button>
            </div>

            <p className="modalIntro" id={descriptionId}>{text.settingsDescription}</p>

            <div className="preferenceList">
              <div className="preferenceRow">
                <div className="preferenceIcon" aria-hidden="true">
                  <ShieldCheck size={20} />
                </div>
                <div className="preferenceCopy">
                  <div className="preferenceHeading">
                    <h3>{text.necessaryTitle}</h3>
                    <span>{text.alwaysActive}</span>
                  </div>
                  <p>{text.necessaryDescription}</p>
                </div>
              </div>

              <label className="preferenceRow preferenceInteractive">
                <div className="preferenceIcon" aria-hidden="true">
                  <SlidersHorizontal size={20} />
                </div>
                <div className="preferenceCopy">
                  <div className="preferenceHeading">
                    <h3>{text.analyticsTitle}</h3>
                    <span className="switch">
                      <input
                        type="checkbox"
                        checked={analytics}
                        onChange={(event) => setAnalytics(event.target.checked)}
                      />
                      <span className="switchTrack" aria-hidden="true" />
                    </span>
                  </div>
                  <p>{text.analyticsDescription}</p>
                </div>
              </label>
            </div>

            <div className="modalLinks">
              <Link href={`/${language}/politica-cookies`}>{text.learnMore}</Link>
              <Link href={`/${language}/politica-privacidad`}>{text.privacy}</Link>
            </div>

            <div className="modalActions">
              <button className="cookieButton cookieButtonDark" onClick={() => persist(false)}>
                {text.reject}
              </button>
              <button className="cookieButton cookieButtonBlue" onClick={() => persist(analytics)}>
                {text.save}
              </button>
            </div>
          </section>
        </div>
      )}

      <style jsx>{`
        .cookieBanner {
          position: fixed;
          left: 50%;
          bottom: max(18px, env(safe-area-inset-bottom));
          z-index: 2147483646;
          width: min(1120px, calc(100% - 32px));
          transform: translateX(-50%);
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 20px;
          padding: 18px;
          color: #f8fbff;
          background: rgba(7, 17, 31, 0.94);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          box-shadow: 0 24px 80px rgba(2, 10, 24, 0.38);
          backdrop-filter: blur(24px) saturate(140%);
          font-family: "Montserrat", Arial, sans-serif;
          animation: cookieEnter 0.45s cubic-bezier(.2,.8,.2,1) both;
        }

        .cookieIcon,
        .preferenceIcon {
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          width: 44px;
          height: 44px;
          color: #9fc2ff;
          background: rgba(46, 123, 255, 0.16);
          border: 1px solid rgba(116, 168, 255, 0.26);
          border-radius: 14px;
        }

        .cookieEyebrow {
          display: block;
          margin-bottom: 4px;
          color: #8db8ff;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .cookieCopy h2,
        .modalHeader h2 {
          margin: 0;
          color: #ffffff;
          font-size: 1.08rem;
          line-height: 1.25;
          letter-spacing: -0.02em;
        }

        .cookieCopy p {
          margin: 5px 0 0;
          max-width: 720px;
          color: #b7c2d2;
          font-size: 0.88rem;
          line-height: 1.55;
        }

        .cookieCopy a,
        .modalLinks a {
          color: #ffffff;
          font-weight: 700;
          text-underline-offset: 3px;
        }

        .cookieActions,
        .modalActions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          min-width: 330px;
        }

        .cookieButton,
        .cookieConfigure,
        .closeButton {
          font: inherit;
          cursor: pointer;
        }

        .cookieButton {
          min-height: 43px;
          padding: 10px 15px;
          border: 1px solid transparent;
          border-radius: 13px;
          font-size: 0.82rem;
          font-weight: 800;
          transition: transform 0.2s ease, filter 0.2s ease, border-color 0.2s ease;
        }

        .cookieButton:hover { transform: translateY(-1px); filter: brightness(1.06); }
        .cookieButton:focus-visible,
        .cookieConfigure:focus-visible,
        .closeButton:focus-visible,
        .switch input:focus-visible + .switchTrack {
          outline: 3px solid rgba(116, 168, 255, 0.72);
          outline-offset: 2px;
        }

        .cookieButtonDark {
          color: #ffffff;
          background: #1c2a3d;
          border-color: rgba(255, 255, 255, 0.12);
        }

        .cookieButtonBlue {
          color: #ffffff;
          background: #2e7bff;
          border-color: #5a97ff;
        }

        .cookieConfigure {
          grid-column: 1 / -1;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 7px;
          min-height: 30px;
          padding: 3px 8px;
          color: #dbe8ff;
          background: transparent;
          border: 0;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .cookieConfigure:hover { color: #ffffff; }

        .cookieOverlay {
          position: fixed;
          inset: 0;
          z-index: 2147483647;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(1, 7, 18, 0.62);
          backdrop-filter: blur(12px);
          animation: overlayEnter 0.2s ease both;
        }

        .cookieModal {
          width: min(620px, 100%);
          max-height: min(760px, calc(100vh - 40px));
          overflow: auto;
          padding: clamp(22px, 4vw, 34px);
          color: #172033;
          background: #ffffff;
          border: 1px solid rgba(17, 42, 82, 0.1);
          border-radius: 28px;
          box-shadow: 0 32px 100px rgba(0, 15, 45, 0.35);
          font-family: "Montserrat", Arial, sans-serif;
          animation: modalEnter 0.3s cubic-bezier(.2,.8,.2,1) both;
        }

        .modalHeader {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }

        .modalHeader h2 { color: #0b1324; font-size: clamp(1.5rem, 4vw, 2rem); }
        .modalHeader .cookieEyebrow { color: #2e7bff; }

        .closeButton {
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          width: 42px;
          height: 42px;
          color: #34435a;
          background: #f1f5fb;
          border: 0;
          border-radius: 50%;
        }

        .modalIntro {
          margin: 14px 0 24px;
          color: #667085;
          font-size: 0.93rem;
          line-height: 1.65;
        }

        .preferenceList {
          display: grid;
          gap: 12px;
        }

        .preferenceRow {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px;
          background: #f7f9fd;
          border: 1px solid #e6ebf4;
          border-radius: 18px;
        }

        .preferenceInteractive { cursor: pointer; }
        .preferenceInteractive:hover { border-color: #c7d8f7; }
        .preferenceCopy { flex: 1; min-width: 0; }

        .preferenceHeading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .preferenceHeading h3 {
          margin: 0;
          color: #101828;
          font-size: 0.98rem;
        }

        .preferenceHeading > span:not(.switch) {
          flex: 0 0 auto;
          padding: 5px 8px;
          color: #21663b;
          background: #e8f7ed;
          border-radius: 999px;
          font-size: 0.69rem;
          font-weight: 800;
        }

        .preferenceCopy p {
          margin: 7px 0 0;
          color: #667085;
          font-size: 0.84rem;
          line-height: 1.55;
        }

        .switch { position: relative; flex: 0 0 auto; width: 46px; height: 26px; }
        .switch input { position: absolute; opacity: 0; pointer-events: none; }
        .switchTrack {
          position: absolute;
          inset: 0;
          background: #c8d0dc;
          border-radius: 999px;
          transition: background 0.2s ease;
        }
        .switchTrack::after {
          content: "";
          position: absolute;
          top: 3px;
          left: 3px;
          width: 20px;
          height: 20px;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s ease;
        }
        .switch input:checked + .switchTrack { background: #2e7bff; }
        .switch input:checked + .switchTrack::after { transform: translateX(20px); }

        .modalLinks {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 18px;
          margin: 20px 0;
        }

        .modalLinks a {
          color: #2e69ca;
          font-size: 0.8rem;
        }

        .modalActions { min-width: 0; }

        @keyframes cookieEnter {
          from { opacity: 0; transform: translate(-50%, 18px) scale(0.98); }
          to { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        @keyframes overlayEnter { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalEnter {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 860px) {
          .cookieBanner {
            grid-template-columns: auto minmax(0, 1fr);
          }
          .cookieActions {
            grid-column: 1 / -1;
            min-width: 0;
          }
        }

        @media (max-width: 560px) {
          .cookieBanner {
            width: calc(100% - 20px);
            bottom: max(10px, env(safe-area-inset-bottom));
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 17px;
            border-radius: 20px;
          }
          .cookieIcon { display: none; }
          .cookieCopy h2 { font-size: 1rem; }
          .cookieCopy p { font-size: 0.81rem; }
          .cookieActions,
          .modalActions { grid-template-columns: 1fr; }
          .cookieConfigure { grid-column: auto; }
          .cookieOverlay { align-items: end; padding: 10px; }
          .cookieModal {
            width: 100%;
            max-height: calc(100vh - 20px);
            border-radius: 24px;
          }
          .preferenceRow { padding: 15px; }
          .preferenceIcon { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cookieBanner,
          .cookieOverlay,
          .cookieModal { animation: none; }
          .cookieButton,
          .switchTrack,
          .switchTrack::after { transition: none; }
        }
      `}</style>
    </>
  );
}
