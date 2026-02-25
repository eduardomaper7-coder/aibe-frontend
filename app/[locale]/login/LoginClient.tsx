"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useParams } from "next/navigation";

export default function LoginClient({ jobId }: { jobId: string | null }) {
  const params = useParams();
  const locale = String((params as any)?.locale ?? "es");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const jobIdEffective =
    jobId ?? (typeof window !== "undefined" ? localStorage.getItem("job_id") : null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    const safeEmail = email.trim().toLowerCase();
    if (!safeEmail || !password) {
      setErr("Introduce email y contraseña.");
      return;
    }

    if (!jobIdEffective) {
      setErr("Falta job_id. Abre el login desde el enlace con ?job_id=...");
      return;
    }

    setLoading(true);
    const res = await signIn("credentials", {
  email: safeEmail,
  password,
  job_id: jobIdEffective,
  redirect: true,
  callbackUrl: `/${locale}/plan?job_id=${encodeURIComponent(jobIdEffective)}`,
});

    // Con redirect:true normalmente no llegas aquí.
    if (res?.error) setErr("Credenciales inválidas");
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