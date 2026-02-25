"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

export default function LoginClient({ jobId }: { jobId: string | null }) {
  const params = useParams();
  const locale = String((params as any)?.locale ?? "es");
  const router = useRouter();

  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  // Si viene job_id en URL, guárdalo para futuras veces (opcional)
  useEffect(() => {
    if (!jobId) return;
    try {
      localStorage.setItem("job_id", jobId);
    } catch {}
  }, [jobId]);

  // Tras login OK, recupera job_id del backend y redirige
  useEffect(() => {
    if (status !== "authenticated") return;
    if (!API_BASE) return;

    const uid = (session as any)?.userId;
    if (!uid) return;

    fetch(`${API_BASE}/jobs/my-latest/${uid}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((d) => {
        const jid = d?.job_id ? String(d.job_id) : null;
        if (jid) {
          try {
            localStorage.setItem("job_id", jid);
          } catch {}
          router.replace(`/${locale}/panel?job_id=${encodeURIComponent(jid)}`);
        } else {
          router.replace(`/${locale}/plan`);
        }
      })
      .catch(() => router.replace(`/${locale}/plan`));
  }, [status, session, API_BASE, locale, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    const safeEmail = email.trim().toLowerCase();
    if (!safeEmail || !password) {
      setErr("Introduce email y contraseña.");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      email: safeEmail,
      password,
      redirect: false, // <-- importante
    });

    if (res?.error) {
      setErr("Credenciales inválidas");
      setLoading(false);
      return;
    }

    // Si no hay error, useSession pasará a authenticated y el useEffect redirige
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold">Iniciar sesión</h1>

      <input
        className="border w-full p-3 mt-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
      />
      <input
        className="border w-full p-3 mt-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        type="password"
      />

      {err && <p className="text-red-600 mt-3">{err}</p>}

      <button
        className="mt-4 w-full bg-black text-white p-3 rounded-xl disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}