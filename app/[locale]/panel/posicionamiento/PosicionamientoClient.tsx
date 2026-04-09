"use client";

import { useEffect, useMemo, useState } from "react";
import GeoGridMap from "../components/GeoGridMap";

type GridPoint = {
  lat: number;
  lng: number;
  rank: number;
  label: string;
};

type GeoGridResponse = {
  business_name: string;
  keyword: string;
  center?: { lat: number; lng: number };
  grid?: GridPoint[];
};

type JobMetaResponse = {
  place_name?: string;
  city?: string | null;
  latitude?: number | null;
  longitude?: number | null;
};

type PosicionamientoClientProps = {
  jobId: string | null;
};

function getRankColor(rank: number) {
  if (rank <= 3) return "bg-green-100 text-green-700 border-green-200";
  if (rank <= 10) return "bg-yellow-100 text-yellow-700 border-yellow-200";
  return "bg-red-100 text-red-700 border-red-200";
}

export default function PosicionamientoClient({
  jobId,
}: PosicionamientoClientProps) {
  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  const [loading, setLoading] = useState(true);
  const [loadingMeta, setLoadingMeta] = useState(true);
  const [data, setData] = useState<GeoGridResponse | null>(null);

  const [businessName, setBusinessName] = useState("Clínica");
  const [city, setCity] = useState("");
  const [keyword, setKeyword] = useState("fisioterapia");

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  async function loadJobMeta(currentJobId: string) {
    if (!API_BASE || !currentJobId) return;

    try {
      setLoadingMeta(true);

      const res = await fetch(`${API_BASE}/jobs/${currentJobId}/meta`, {
        cache: "no-store",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Meta error ${res.status}: ${text}`);
      }

      const meta = (await res.json()) as JobMetaResponse;

      if (meta.place_name) {
        setBusinessName(meta.place_name);
      }

      if (meta.city) {
        setCity(meta.city);
      }

      if (
        typeof meta.latitude === "number" &&
        typeof meta.longitude === "number"
      ) {
        setCoords({
          lat: meta.latitude,
          lng: meta.longitude,
        });
      }
    } catch (error) {
      console.error("Error cargando meta del negocio:", error);
    } finally {
      setLoadingMeta(false);
    }
  }

  async function resolveLocationWithCity() {
    if (!API_BASE || !jobId || !city.trim()) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/jobs/${jobId}/resolve-location`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: city.trim(),
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Resolve location error ${res.status}: ${text}`);
      }

      const meta = (await res.json()) as JobMetaResponse;

      if (meta.city) {
        setCity(meta.city);
      }

      if (
        typeof meta.latitude === "number" &&
        typeof meta.longitude === "number"
      ) {
        const nextCoords = {
          lat: meta.latitude,
          lng: meta.longitude,
        };

        setCoords(nextCoords);
        await loadGeoGrid(businessName, keyword, nextCoords);
      } else {
        console.error("No se pudieron resolver coordenadas con esa ciudad");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error resolviendo ubicación:", error);
      setLoading(false);
    }
  }

  async function loadGeoGrid(
    currentBusinessName = businessName,
    currentKeyword = keyword,
    currentCoords = coords
  ) {
    if (!API_BASE) {
      console.error("Falta NEXT_PUBLIC_API_URL");
      setLoading(false);
      return;
    }

    if (!currentCoords) {
      console.error("No hay coordenadas del negocio disponibles");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/geogrid/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business_name: currentBusinessName,
          keyword: currentKeyword,
          lat: currentCoords.lat,
          lng: currentCoords.lng,
          grid_size: 3,
          spacing_meters: 500,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("GeoGrid backend error:", res.status, text);
        throw new Error(`GeoGrid error ${res.status}: ${text}`);
      }

      const json = (await res.json()) as GeoGridResponse;
      console.log("Respuesta GeoGrid:", json);
      setData(json);
    } catch (error) {
      console.error("Error cargando GeoGrid:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (jobId) {
      loadJobMeta(jobId);
    } else {
      setLoadingMeta(false);
    }
  }, [jobId]);

  useEffect(() => {
    if (!loadingMeta) {
      setLoading(false);
    }
  }, [loadingMeta]);

  const stats = useMemo(() => {
    if (!data?.grid?.length) {
      return {
        avg: 0,
        top3: 0,
        top10: 0,
        visibility: 0,
      };
    }

    const total = data.grid.length;
    const avg = Math.round(
      data.grid.reduce((acc, item) => acc + item.rank, 0) / total
    );
    const top3 = data.grid.filter((item) => item.rank <= 3).length;
    const top10 = data.grid.filter((item) => item.rank <= 10).length;
    const visibility = Math.round((top10 / total) * 100);

    return { avg, top3, top10, visibility };
  }, [data]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm text-slate-500">Mapa GeoGrid</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Posicionamiento &amp; visibilidad
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              · Visualiza cómo aparece la clínica en Google según la zona
            </p>
          </div>

          <div className="grid w-full gap-3 md:grid-cols-4 xl:w-auto">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">
                Clínica
              </label>
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="h-11 rounded-xl border border-slate-200 px-4 outline-none transition focus:border-sky-400"
                placeholder="Nombre de la clínica"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">
                Ciudad
              </label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-11 rounded-xl border border-slate-200 px-4 outline-none transition focus:border-sky-400"
                placeholder="Ciudad de la clínica"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">
                Keyword
              </label>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="h-11 rounded-xl border border-slate-200 px-4 outline-none transition focus:border-sky-400"
                placeholder="fisioterapia fuenlabrada"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  if (coords) {
                    loadGeoGrid();
                  } else {
                    resolveLocationWithCity();
                  }
                }}
                disabled={loading || !city.trim()}
                className="h-11 w-full rounded-xl bg-sky-500 px-5 font-medium text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Cargando..." : "Actualizar mapa"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-slate-500">
          <div>Ciudad: {city || "Sin ciudad"}</div>
          {coords ? (
            <div>
              Coordenadas detectadas: {coords.lat}, {coords.lng}
            </div>
          ) : (
            <div>No se han detectado coordenadas para este negocio.</div>
          )}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Posición media</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{stats.avg}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Puntos en Top 3</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{stats.top3}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Puntos en Top 10</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{stats.top10}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Visibilidad local</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stats.visibility}%
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Mapa de posicionamiento
              </h2>
              <p className="text-sm text-slate-500">
                Verde: Top 3 · Amarillo: 4-10 · Rojo: 11+
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <GeoGridMap data={data} />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Detalle del grid
          </h2>
          <p className="mb-4 text-sm text-slate-500">
            Cada celda representa una búsqueda desde una zona distinta.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {data?.grid?.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className={`rounded-2xl border p-3 ${getRankColor(item.rank)}`}
              >
                <div className="text-xs font-medium opacity-80">{item.label}</div>
                <div className="mt-1 text-2xl font-bold">#{item.rank}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}