"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type ClinicReport = {
  id: string;
  job_id: string | null;
  title: string;
  report_month: string;
  file_path: string;
  is_demo: boolean;
  created_at: string;
};

function formatMonth(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default function SeguimienoPage() {
  const [reports, setReports] = useState<ClinicReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openingId, setOpeningId] = useState<string | null>(null);

  const jobId = useMemo(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("job_id");
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadReports() {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from("clinic_reports")
          .select("*")
          .order("report_month", { ascending: false })
          .order("created_at", { ascending: false });

        if (jobId) {
          query = query.or(`job_id.eq.${jobId},is_demo.eq.true`);
        } else {
          query = query.eq("is_demo", true);
        }

        const { data, error } = await query;

        if (error) throw error;
        if (!mounted) return;

        setReports(data ?? []);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || "No se pudieron cargar los informes");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadReports();

    return () => {
      mounted = false;
    };
  }, [jobId]);

  async function openReport(report: ClinicReport) {
    try {
      setOpeningId(report.id);

      const { data, error } = await supabase.storage
        .from("clinic-reports")
        .createSignedUrl(report.file_path, 60 * 5);

      if (error) throw error;

      window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    } catch (e) {
      console.error(e);
      alert("No se pudo abrir el informe.");
    } finally {
      setOpeningId(null);
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6">
        <p className="text-sm font-medium text-blue-600">Captación local</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">
          Seguimieno
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Informes mensuales de la clínica.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Informes mensuales de la clínica
          </h2>
        </div>

        {loading && (
          <div className="p-5 text-sm text-slate-500">
            Cargando informes…
          </div>
        )}

        {error && (
          <div className="p-5 text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && reports.length === 0 && (
          <div className="p-5 text-sm text-slate-500">
            Todavía no hay informes disponibles.
          </div>
        )}

        {!loading && !error && reports.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Mes</th>
                  <th className="px-5 py-3 font-semibold">Informe</th>
                  <th className="px-5 py-3 font-semibold">Tipo</th>
                  <th className="px-5 py-3 text-right font-semibold">
                    Archivo
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4 font-medium text-slate-900">
                      {formatMonth(report.report_month)}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {report.title}
                    </td>

                    <td className="px-5 py-4">
                      {report.is_demo ? (
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                          Demo
                        </span>
                      ) : (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                          Clínica
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => openReport(report)}
                        disabled={openingId === report.id}
                        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {openingId === report.id ? "Abriendo…" : "Ver informe"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}