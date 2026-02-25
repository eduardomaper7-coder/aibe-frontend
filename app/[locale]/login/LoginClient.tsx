"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";

export default function LoginClient({ jobId }: { jobId: string | null }) {
  const router = useRouter();
  const params = useParams();
  const locale = String((params as any)?.locale ?? "es");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    const res = await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    if (res?.error) {
      setErr("Credenciales inválidas");
      return;
    }

    router.push(`/${locale}/panel${jobId ? `?job_id=${encodeURIComponent(jobId)}` : ""}`);
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold">Iniciar sesión</h1>

      <input className="border w-full p-3 mt-4" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
      <input className="border w-full p-3 mt-3" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Contraseña" type="password" />

      {err && <p className="text-red-600 mt-3">{err}</p>}

      <button className="mt-4 w-full bg-black text-white p-3 rounded-xl">Entrar</button>
    </form>
  );
}