"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import TemasSection from "./analisis/temas/TemasSection";
import SentimientoSection from "./analisis/sentimiento/sentimiento";
import OportunidadesSection from "./analisis/oportunidades/oportunidades";
import VolumenSection from "./analisis/volumen/volumen";
import RespuestasSection from "./analisis/respuestas/respuestas";

import Footer from "../Footer";

import { Calendar, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/** -------- PANEL PRINCIPAL -------- */
function PanelUI() {
  const params = useParams();
  const locale = String((params as any)?.locale ?? "es");

  const searchParams = useSearchParams();
  const jobIdStr = searchParams.get("job_id") ?? "";
  const jobIdNum = jobIdStr ? Number(jobIdStr) : 0;

  const router = useRouter();
  const { data: session } = useSession();

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

  const [placeName, setPlaceName] = useState<string | null>(null);

  const [needsBusinessSetup, setNeedsBusinessSetup] = useState(false);
  const [needsAnalysis, setNeedsAnalysis] = useState(false);
  const [setupLoading, setSetupLoading] = useState(false);
  const [setupPlaceName, setSetupPlaceName] = useState("");
  const [setupPlaceZone, setSetupPlaceZone] = useState("");
  const [setupCandidates, setSetupCandidates] = useState<any[] | null>(null);

  type PeriodKey = "7d" | "30d" | "3m" | "6m" | "1y" | "all";

  const [period, setPeriod] = useState<PeriodKey>("all");
  const [customFrom, setCustomFrom] = useState<string>("");
  const [customTo, setCustomTo] = useState<string>("");

  const [showPeriodMenu, setShowPeriodMenu] = useState(false);
  const [showCustomMenu, setShowCustomMenu] = useState(false);

  const todayLocal = () => new Date().toLocaleDateString("en-CA");

  useEffect(() => {
    if (jobIdStr) return;
    if (!API_BASE) return;

    const uid = (session as any)?.userId;

    if (uid) {
      fetch(`${API_BASE}/jobs/my-latest/${uid}`, { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : Promise.reject(r)))
        .then((d) => {
          if (d?.job_id) {
            router.replace(
              `/${locale}/panel?job_id=${encodeURIComponent(String(d.job_id))}`
            );
          }
        })
        .catch(() => {
          const stored =
            typeof window !== "undefined" ? localStorage.getItem("job_id") : null;
          if (stored) {
            router.replace(
              `/${locale}/panel?job_id=${encodeURIComponent(stored)}`
            );
          }
        });

      return;
    }

    const stored =
      typeof window !== "undefined" ? localStorage.getItem("job_id") : null;
    if (stored) {
      router.replace(`/${locale}/panel?job_id=${encodeURIComponent(stored)}`);
    }
  }, [jobIdStr, API_BASE, session, locale, router]);

  useEffect(() => {
    if (!jobIdNum) return;
    if (!API_BASE) return;

    fetch(`${API_BASE}/jobs/${jobIdNum}/meta`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (data?.place_name) {
          setPlaceName(String(data.place_name));
          setSetupPlaceName(String(data.place_name));
        }
        if (data?.city) {
          setSetupPlaceZone(String(data.city));
        }
        setNeedsBusinessSetup(Boolean(data?.needs_setup));
        setNeedsAnalysis(Boolean(data?.needs_analysis));
      })
      .catch(() => {
        setNeedsBusinessSetup(true);
        setNeedsAnalysis(false);
      });
  }, [jobIdNum, API_BASE]);

  async function runScrapeWithCandidate(c: any) {
    const apiBase = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
    if (!apiBase) throw new Error("NEXT_PUBLIC_API_URL no está configurado");

    const res = await fetch(`${apiBase}/scrape`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        job_id: jobIdNum,
        google_maps_url: c.google_maps_url,
        place_name: setupPlaceName.trim(),
        city: setupPlaceZone.trim() || null,
        max_reviews: 10000,
        personal_data: false,
      }),
    });

    if (!res.ok) throw new Error(await res.text());

    await res.json();

    setNeedsBusinessSetup(false);
    setNeedsAnalysis(false);
    setSetupCandidates(null);
    setPlaceName(setupPlaceName.trim());

    window.location.href = `/${locale}/panel?job_id=${encodeURIComponent(
      String(jobIdNum)
    )}&t=${Date.now()}`;
  }

  async function handleBusinessSetup() {
    const name = setupPlaceName.trim();
    const zone = setupPlaceZone.trim();
    const q = zone ? `${name}, ${zone}` : name;

    if (!name) return;

    try {
      setSetupLoading(true);
      setSetupCandidates(null);

      const apiBase = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
      if (!apiBase) throw new Error("NEXT_PUBLIC_API_URL no está configurado");

      const r = await fetch(`${apiBase}/places/search?q=${encodeURIComponent(q)}`);
      if (!r.ok) throw new Error(await r.text());

      const data = await r.json();
      const list = data?.candidates ?? [];

      if (!list.length) {
        alert("No se encontró ningún negocio con esos datos.");
        return;
      }

      if (list.length === 1) {
        await runScrapeWithCandidate(list[0]);
        return;
      }

      setSetupCandidates(list);
    } catch (e) {
      console.error(e);
      alert("No se pudo iniciar el análisis.");
    } finally {
      setSetupLoading(false);
    }
  }

  const { startLabel, endLabel, fromDate, toDate } = useMemo(() => {
    if (customFrom && customTo) {
      return {
        startLabel: customFrom,
        endLabel: customTo,
        fromDate: customFrom,
        toDate: customTo,
      };
    }

    const endDate = new Date();
    const startDate = new Date(endDate);

    switch (period) {
      case "7d":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(endDate.getDate() - 30);
        break;
      case "3m":
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case "6m":
        startDate.setMonth(endDate.getMonth() - 6);
        break;
      case "1y":
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      case "all":
        return {
          startLabel: "histórico",
          endLabel: endDate.toLocaleDateString("en-CA"),
          fromDate: null,
          toDate: endDate.toLocaleDateString("en-CA"),
        };
    }

    const fmt = (d: Date) => d.toLocaleDateString("en-CA");

    return {
      startLabel: fmt(startDate),
      endLabel: fmt(endDate),
      fromDate: fmt(startDate),
      toDate: fmt(endDate),
    };
  }, [period, customFrom, customTo]);

  const bucket: "day" | "week" | "month" = useMemo(() => {
    if (customFrom && customTo) return "day";
    if (period === "7d") return "day";
    if (period === "30d" || period === "3m") return "week";
    return "month";
  }, [period, customFrom, customTo]);

  const selectPeriod = (p: PeriodKey) => {
    setPeriod(p);
    setCustomFrom("");
    setCustomTo("");
    setShowPeriodMenu(false);
  };

  const applyCustom = () => setShowCustomMenu(false);

  const clearCustom = () => {
    setCustomFrom("");
    setCustomTo("");
    setShowCustomMenu(false);
  };

  if (!jobIdStr) {
    return <div className="p-8 text-slate-600">Cargando tu análisis…</div>;
  }

  if (!jobIdNum) {
    return <div className="p-8 text-slate-600">job_id inválido.</div>;
  }

  return (
    <div className="relative text-black bg-white min-h-screen">
      <div
        className={
          needsBusinessSetup || needsAnalysis
            ? "pointer-events-none blur-sm select-none"
            : ""
        }
      >
        <div className="w-full pb-0">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mb-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm p-5">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Te damos la bienvenida,
                  </p>
                  <h1 className="text-3xl font-semibold text-slate-900">
                    {placeName || "Tu negocio"}
                  </h1>
                  <p className="mt-1 text-sm text-slate-600">
                    analizando reseñas del{" "}
                    <span className="font-medium">{startLabel}</span> al{" "}
                    <span className="font-medium">{endLabel}</span>
                  </p>
                </div>

                <div className="relative flex flex-wrap items-center gap-2 bg-white rounded-xl p-3 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs">
                      {startLabel} → {endLabel}
                    </span>
                  </div>

                  <div className="relative">
                    <Button
                      variant="outline"
                      className="rounded-2xl text-slate-800 bg-white border-slate-300"
                      onClick={() => {
                        setShowPeriodMenu((v) => !v);
                        setShowCustomMenu(false);
                      }}
                    >
                      {period === "7d" && "Periodo: 7 días"}
                      {period === "30d" && "Periodo: 1 mes"}
                      {period === "3m" && "Periodo: 3 meses"}
                      {period === "6m" && "Periodo: 6 meses"}
                      {period === "1y" && "Periodo: 1 año"}
                      {period === "all" && "Periodo: histórico"}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>

                    {showPeriodMenu && (
                      <Card className="absolute right-0 z-20 mt-2 w-56 shadow-lg bg-white border">
                        <CardContent className="p-1 text-slate-800">
                          <ul className="text-sm">
                            <li>
                              <button
                                className="w-full px-3 py-2 text-left hover:bg-slate-100 rounded-lg"
                                onClick={() => selectPeriod("7d")}
                              >
                                Últimos 7 días
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full px-3 py-2 text-left hover:bg-slate-100 rounded-lg"
                                onClick={() => selectPeriod("30d")}
                              >
                                1 mes
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full px-3 py-2 text-left hover:bg-slate-100 rounded-lg"
                                onClick={() => selectPeriod("3m")}
                              >
                                3 meses
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full px-3 py-2 text-left hover:bg-slate-100 rounded-lg"
                                onClick={() => selectPeriod("6m")}
                              >
                                6 meses
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full px-3 py-2 text-left hover:bg-slate-100 rounded-lg"
                                onClick={() => selectPeriod("1y")}
                              >
                                1 año
                              </button>
                            </li>
                            <li>
                              <button
                                className="w-full px-3 py-2 text-left hover:bg-slate-100 rounded-lg"
                                onClick={() => selectPeriod("all")}
                              >
                                Histórico
                              </button>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  <div className="relative">
                    <Button
                      variant="outline"
                      className="rounded-2xl text-slate-800 bg-white border-slate-300"
                      onClick={() => {
                        setShowCustomMenu((v) => !v);
                        setShowPeriodMenu(false);
                      }}
                    >
                      {customFrom && customTo
                        ? `Personalizado: ${customFrom} → ${customTo}`
                        : "Personalizado"}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>

                    {showCustomMenu && (
                      <Card className="absolute right-0 z-20 mt-2 w-64 shadow-lg bg-white border">
                        <CardContent className="p-3 text-slate-800">
                          <div className="space-y-3">
                            <label className="block text-xs font-medium text-slate-600">
                              Desde
                            </label>
                            <input
                              type="date"
                              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                              value={customFrom}
                              max={customTo || todayLocal()}
                              onChange={(e) => setCustomFrom(e.target.value)}
                            />

                            <label className="block text-xs font-medium text-slate-600">
                              Hasta
                            </label>
                            <input
                              type="date"
                              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                              value={customTo}
                              min={customFrom || undefined}
                              max={todayLocal()}
                              onChange={(e) => setCustomTo(e.target.value)}
                            />

                            <div className="flex items-center justify-between">
                              <Button
                                variant="default"
                                className="rounded-xl"
                                onClick={applyCustom}
                                disabled={
                                  !(
                                    customFrom &&
                                    customTo &&
                                    customFrom <= customTo
                                  )
                                }
                              >
                                Aplicar
                              </Button>

                              <Button
                                variant="ghost"
                                className="rounded-xl text-slate-600"
                                onClick={clearCustom}
                              >
                                <X className="mr-1 h-4 w-4" />
                                Borrar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section
            id="temas"
            className="mt-8 px-4 sm:px-6 lg:px-8 scroll-mt-24"
          >
            <TemasSection
              jobId={jobIdStr}
              fromDate={fromDate}
              toDate={toDate}
            />
          </section>

          <section
            id="sentimiento"
            className="mt-10 px-4 sm:px-6 lg:px-8 scroll-mt-24"
          >
            <SentimientoSection
              jobId={jobIdStr}
              fromDate={fromDate}
              toDate={toDate}
              bucket={bucket}
            />
          </section>

          <>
            <section
              id="volumen"
              className="mt-8 px-4 sm:px-6 lg:px-8 scroll-mt-24"
            >
              <VolumenSection
                jobId={jobIdStr}
                fromDate={fromDate}
                toDate={toDate}
                bucket={
                  period === "7d" ? "day" : period === "30d" ? "week" : "month"
                }
              />
            </section>

            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-slate-100">
              <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                <section id="oportunidades" className="scroll-mt-24">
                  <OportunidadesSection
                    jobId={jobIdStr}
                    fromDate={fromDate}
                    toDate={toDate}
                  />
                </section>
              </div>
            </div>

            <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-blue-100">
              <div className="mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6 pb-10">
                <section id="respuestas" className="scroll-mt-24">
                  <RespuestasSection jobId={jobIdNum} />
                </section>
              </div>
            </div>
          </>
        </div>

        <Footer />
      </div>

      {(needsBusinessSetup || needsAnalysis) && (
        <div className="absolute inset-0 z-30 flex items-start justify-center px-4 pt-20 md:pt-24">
          <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-xl p-6 md:p-8">
            <p className="text-2xl md:text-3xl font-semibold text-slate-900">
              {needsBusinessSetup
                ? "Completa tu análisis"
                : "Inicia el análisis de reseñas"}
            </p>
            <p className="mt-2 text-slate-600">
              {needsBusinessSetup
                ? "Escribe el nombre de tu negocio y tu ciudad para comenzar."
                : "Ya hemos preparado los datos de tu negocio. Pulsa el botón para extraer y analizar tus reseñas."}
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_260px] gap-4">
              <input
                type="text"
                value={setupPlaceName}
                onChange={(e) => setSetupPlaceName(e.target.value)}
                placeholder="Nombre del negocio"
                className="w-full rounded-2xl border border-slate-300 px-4 py-4"
                disabled={setupLoading}
              />

              <input
                type="text"
                value={setupPlaceZone}
                onChange={(e) => setSetupPlaceZone(e.target.value)}
                placeholder="Ciudad"
                className="w-full rounded-2xl border border-slate-300 px-4 py-4"
                disabled={setupLoading}
              />
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleBusinessSetup}
                disabled={setupLoading || !setupPlaceName.trim()}
                className="rounded-2xl bg-slate-900 px-6 py-4 text-white font-semibold disabled:opacity-60"
              >
                {setupLoading ? "Analizando…" : "Empezar →"}
              </button>
            </div>

            {setupCandidates?.length ? (
              <div className="mt-6 space-y-2">
                {setupCandidates.map((c, idx) => (
                  <button
                    key={c.place_id || idx}
                    type="button"
                    className="block w-full rounded-2xl border border-slate-200 p-4 text-left hover:bg-slate-50"
                    onClick={async () => {
                      try {
                        setSetupLoading(true);
                        await runScrapeWithCandidate(c);
                      } catch (e) {
                        console.error(e);
                        alert("No se pudo iniciar el análisis.");
                      } finally {
                        setSetupLoading(false);
                      }
                    }}
                  >
                    <div className="font-medium text-slate-900">{c.name}</div>
                    <div className="text-sm text-slate-600">{c.address}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {c.rating ? `⭐ ${c.rating}` : ""}{" "}
                      {c.user_ratings_total
                        ? `(${c.user_ratings_total} reseñas)`
                        : ""}
                    </div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PanelClient() {
  return (
    <Suspense fallback={<div>Cargando panel…</div>}>
      <PanelUI />
    </Suspense>
  );
}