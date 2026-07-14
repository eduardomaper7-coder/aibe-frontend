"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase"; // 👈 cliente unificado

export default function AuthCallback() {
  useEffect(() => {
    let mounted = true;

    (async () => {
      // 1) Intenta leer la sesión actual
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;

      if (session) {
        window.location.replace("/panel");
        return;
      }

      // 2) Si aún no está, espera un cambio de estado (hidratación post-OAuth)
      const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
        if (!mounted) return;
        if (newSession) {
          window.location.replace("/panel");
        } else {
          window.location.replace("/login?error=oauth");
        }
      });

      // 3) “Plan B” por si nunca llega el evento (timeout corto)
      setTimeout(() => {
        if (!mounted) return;
        window.location.replace("/login?error=oauth");
      }, 1500);

      // cleanup
      return () => {
        sub.subscription.unsubscribe();
      };
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen grid place-items-center">
      <p className="text-sm text-neutral-600">Procesando autenticación…</p>
    </div>
  );
}
