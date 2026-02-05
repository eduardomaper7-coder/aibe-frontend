"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PanelShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;

      if (session) {
        setChecking(false);
        return;
      }

      const { data: sub } = supabase.auth.onAuthStateChange((_evt, newSession) => {
        if (!mounted) return;
        if (newSession) setChecking(false);
        else router.replace("/login");
      });

      const t = setTimeout(() => {
        if (!mounted) return;
        router.replace("/login");
      }, 600);

      return () => {
        clearTimeout(t);
        sub.subscription.unsubscribe();
      };
    })();

    return () => {
      mounted = false;
    };
  }, [router]);

  if (checking) {
    return (
      <div className="grid min-h-screen place-items-center">
        <p className="text-sm text-neutral-600">Cargando…</p>
      </div>
    );
  }

  return <>{children}</>;
}
