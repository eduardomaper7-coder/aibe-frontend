"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __swDestroy?: () => void;
    __swOnScroll?: () => void;
  }
}

/**
 * The home animation boots itself from an inline script in the server HTML (so it starts before
 * React hydrates). This component only covers the React-driven cases:
 *  - client-side navigation INTO the home (inline scripts inserted by React never execute) → run the boot script;
 *  - navigating AWAY → tear the engine down (scroll listeners, rAF loop, blob URLs).
 */
export default function WorldLifecycle({ bootSrc }: { bootSrc: string }) {
  useEffect(() => {
    if (!document.querySelector("#world.sw-root")) {
      const s = document.createElement("script");
      s.textContent = bootSrc;
      document.body.appendChild(s);
    }
    return () => {
      window.__swDestroy?.();
      window.__swDestroy = undefined;
      if (window.__swOnScroll) window.removeEventListener("scroll", window.__swOnScroll);
      window.__swOnScroll = undefined;
    };
  }, [bootSrc]);
  return null;
}
