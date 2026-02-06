"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";

export default function PostAuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const locale = String((params as any)?.locale ?? "es");

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
  const accessToken = useMemo(
    () => (session as any)?.accessToken as string | undefined,
    [session]
  );

  const didRun = useRef(false);
  const [msg, setMsg] = useState("Preparando tu panel…");

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google", { callbackUrl: `/${locale}/post-auth` });
    }
  }, [status, locale]);

  useEffect(() => {
    if (!accessToken) return;
    if (!API_BASE) {
      setMsg("Falta NEXT_PUBLIC_API_URL en .env.local");
      return;
    }
    if (didRun.current) return;
    didRun.current = true;

    (async () => {
      try {
        setMsg("Verificando tu último análisis…");

        // 1) intenta recuperar último job
        const lastRes = await fetch(`${API_BASE}/gbp/last-job`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (lastRes.ok) {
          const last = await lastRes.json().catch(() => ({}));
          if (last?.job_id) {
            router.replace(
              `/${locale}/panel?job_id=${encodeURIComponent(last.job_id)}`
            );
            return;
          }
        }

        // 2) si no hay, crea uno nuevo (flujo "nuevo")
        setMsg("Creando tu análisis…");

        const res = await fetch(`${API_BASE}/gbp/auto-job`, {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(
            data?.detail ||
              data?.error?.message ||
              `Error (${res.status}) creando el análisis`
          );
        }

        const jobId = data?.job_id;
        if (!jobId) throw new Error("El backend no devolvió job_id");

        router.replace(`/${locale}/panel?job_id=${encodeURIComponent(jobId)}`);
      } catch (e: any) {
        setMsg(e?.message ?? "Error preparando el panel");
      }
    })();
  }, [accessToken, API_BASE, router, locale]);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-2">Un segundo…</h1>
      <p>{msg}</p>
    </div>
  );
}
