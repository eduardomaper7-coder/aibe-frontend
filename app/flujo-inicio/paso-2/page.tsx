"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type RestaurantData = {
  name?: string;
  address?: string;
  website?: string;
  phone?: string;
  cuisine?: string;
};

export default function Paso2() {
  const router = useRouter();

  const [googleMapsUrl, setGoogleMapsUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RestaurantData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 1️⃣ Recuperar el link guardado
  useEffect(() => {
    const stored = localStorage.getItem("googleMapsUrl");

    if (!stored) {
      // Si el usuario llega aquí sin pasar por el inicio
      router.replace("/");
      return;
    }

    setGoogleMapsUrl(stored);
  }, [router]);

  // 2️⃣ Llamar al backend automáticamente
  useEffect(() => {
    if (!googleMapsUrl) return;

    async function extract() {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:8000/api/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            google_maps_url: googleMapsUrl,
          }),
        });

        const payload = await res.json();

        if (!res.ok) {
          throw new Error(
            payload?.detail?.message || "Error extrayendo información"
          );
        }

        setData(payload);
      } catch (err: any) {
        setError(err.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    }

    extract();
  }, [googleMapsUrl]);

  // 3️⃣ UI
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="animate-pulse text-xl font-medium">
          Analizando tu restaurante…
        </div>
        <p className="mt-4 text-sm text-gray-500 max-w-md">
          Estamos recopilando información pública para crear tu web optimizada
          para SEO.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <div className="text-red-600 font-medium mb-3">
          No hemos podido analizar el restaurante
        </div>
        <p className="text-sm text-gray-600 mb-6">{error}</p>

        <button
          onClick={() => router.push("/")}
          className="rounded-full px-6 py-3 bg-black text-white"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">
        Hemos encontrado tu restaurante
      </h1>

      <div className="rounded-2xl border bg-white p-6 space-y-3">
        <div>
          <span className="font-medium">Nombre:</span>{" "}
          {data?.name || "—"}
        </div>
        <div>
          <span className="font-medium">Dirección:</span>{" "}
          {data?.address || "—"}
        </div>
        <div>
          <span className="font-medium">Web:</span>{" "}
          {data?.website ? (
            <a
              href={data.website}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              {data.website}
            </a>
          ) : (
            "—"
          )}
        </div>
        <div>
          <span className="font-medium">Tipo de cocina:</span>{" "}
          {data?.cuisine || "—"}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => router.push("/flujo-inicio/paso-3")}
          className="rounded-full px-8 py-3 bg-black text-white"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
