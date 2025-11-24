"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function IsolatedPortal({ children }) {
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  useEffect(() => {
    const host = document.createElement("div");
    host.style.position = "fixed";
    host.style.inset = "0";
    host.style.zIndex = "999999999";
    document.body.appendChild(host);

    const shadow = host.attachShadow({ mode: "open" });

    // INYECTAR TAILWIND EN EL SHADOW DOM
    document.querySelectorAll("style, link[rel='stylesheet']").forEach((node) => {
      shadow.appendChild(node.cloneNode(true));
    });

    setShadowRoot(shadow);

    return () => host.remove();
  }, []);

  if (!shadowRoot) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      {children}
    </div>,
    shadowRoot
  );
}
