"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

type Lead = {
  id: string;
  business_name: string;
  email: string;
  phone: string | null;
  created_at: string;
};

const TOTAL_SLOTS = 100;

type TimeLeft = {
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function EarlyAccessPage() {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [launchDateLabel, setLaunchDateLabel] = useState<string>("");

  // Contador de 2 semanas
  useEffect(() => {
    const target = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 2 semanas
    setLaunchDateLabel(
      target.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    );

    const updateTimeLeft = () => {
      const diff = target.getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft({
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      let totalSeconds = Math.floor(diff / 1000);

      const weeks = Math.floor(totalSeconds / (7 * 24 * 60 * 60));
      totalSeconds -= weeks * 7 * 24 * 60 * 60;

      const days = Math.floor(totalSeconds / (24 * 60 * 60));
      totalSeconds -= days * 24 * 60 * 60;

      const hours = Math.floor(totalSeconds / (60 * 60));
      totalSeconds -= hours * 60 * 60;

      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds - minutes * 60;

      setTimeLeft({ weeks, days, hours, minutes, seconds });
    };

    updateTimeLeft();
    const intervalId = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Cargar leads + tiempo real
  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase
        .from("early_access_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setErrorMsg("No se han podido cargar los negocios apuntados.");
      } else if (data) {
        setLeads(data as Lead[]);
      }
    };

    fetchLeads();

    const channel = supabase
      .channel("public:early_access_leads")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "early_access_leads" },
        (payload) => {
          const newLead = payload.new as Lead;
          setLeads((current) => [newLead, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!businessName.trim() || !email.trim()) {
      setErrorMsg("Nombre del negocio y correo electrónico son obligatorios.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("early_access_leads").insert({
      business_name: businessName.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      setErrorMsg("Ha habido un error al reservar tu plaza. Inténtalo de nuevo.");
    } else {
      setSuccessMsg("¡Plaza reservada correctamente!");
      setBusinessName("");
      setEmail("");
      setPhone("");
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatUnit = (value: number) => value.toString().padStart(2, "0");

  const remainingSlots = Math.max(0, TOTAL_SLOTS - leads.length);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a2239] to-[#0e3a5c] text-slate-50 py-16">
      {/* ↓↓ menos margen lateral y más ancho útil ↓↓ */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 space-y-10">
        {/* Bloque principal */}
        {/* ↓↓ todo centrado ↓↓ */}
        <section className="space-y-8 flex flex-col items-center text-center">
          {/* Contador centrado y ajustado al contenido */}
          <div className="w-full flex justify-center">
            <div className="inline-flex flex-col items-center rounded-2xl border border-white/10 bg-black/25 shadow-2xl shadow-black/40 backdrop-blur px-5 py-4 sm:px-7 sm:py-6">
              <p className="text-xs sm:text-sm uppercase tracking-[0.16em] text-sky-300 mb-3">
                Tiempo restante para el lanzamiento oficial
              </p>

              <div className="flex flex-wrap justify-center gap-3 sm:gap-5 items-center">
                {[
                  { label: "Semanas", value: timeLeft.weeks },
                  { label: "Días", value: timeLeft.days },
                  { label: "Horas", value: timeLeft.hours },
                  { label: "Minutos", value: timeLeft.minutes },
                  { label: "Segundos", value: timeLeft.seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center justify-center rounded-xl bg-slate-900/40 border border-white/10 px-4 py-2.5 min-w-[72px]"
                  >
                    <span className="text-2xl sm:text-3xl font-semibold tabular-nums text-sky-100">
                      {formatUnit(item.value)}
                    </span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-300">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Textos y precios, centrados */}
          <div className="space-y-3 max-w-2xl">
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
    ¡Hazte con tu plaza!
  </h1>

  <p className="text-sm sm:text-base text-slate-100/90">
    <span className="font-semibold">Precio oficial del servicio:</span> 5,29€/mes  
    <span className="text-slate-200/80"> (desde el 30/11/2025)</span>.
  </p>

  <p className="text-sm sm:text-base text-sky-200">
    <span className="font-semibold text-sky-100">Con reserva de plaza ahora:</span>  
    1€/mes  
    <span className="text-slate-200/80"> (y mantienes este precio para siempre)</span>.
  </p>
</div>


          {/* Formulario reserva */}
          <div className="w-full rounded-2xl bg-slate-900/40 border border-white/10 shadow-xl shadow-black/40 backdrop-blur p-4 sm:p-5">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-emerald-300 mb-3 text-left">
              Reservar es gratis
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 md:flex-row md:items-end"
            >
              <div className="flex-1 space-y-1.5">
                <label className="text-xs text-slate-200">
                  Nombre del negocio
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Ej: Panadería La Espiga"
                  required
                  className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/80 focus:border-transparent"
                />
              </div>

              <div className="flex-1 space-y-1.5">
                <label className="text-xs text-slate-200">
                  Correo electrónico / Gmail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  required
                  className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/80 focus:border-transparent"
                />
              </div>

              <div className="flex-1 space-y-1.5">
                <label className="text-xs text-slate-200">
                  Número de teléfono (opcional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+34 600 000 000"
                  className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/80 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="md:self-stretch rounded-xl bg-sky-500 hover:bg-sky-400 disabled:bg-sky-500/60 text-sm font-semibold text-slate-900 px-4 py-2.5 mt-1 md:mt-0 whitespace-nowrap transition-colors shadow-lg shadow-sky-500/40"
              >
                {loading ? "Reservando..." : "Reservar plaza"}
              </button>
            </form>

            {errorMsg && (
              <p className="mt-3 text-xs text-red-300">{errorMsg}</p>
            )}
            {successMsg && (
              <p className="mt-3 text-xs text-emerald-300">{successMsg}</p>
            )}
          </div>
        </section>

        {/* Tabla de negocios */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg sm:text-xl font-semibold">
              Negocios que ya han reservado
            </h2>

            <span className="inline-flex items-center rounded-full border border-sky-500/50 bg-slate-900/50 px-3 py-1 text-xs sm:text-sm text-sky-100">
              Plazas restantes&nbsp;
              <span className="font-semibold">
                {remainingSlots}/{TOTAL_SLOTS}
              </span>
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 shadow-lg shadow-black/40">
            <table className="min-w-full text-sm text-slate-100">
              <thead className="bg-slate-950/40">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-300">
                    Nombre del negocio
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-300">
                    Fecha de reserva
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-300">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-6 text-center text-sm text-slate-300"
                    >
                      Aún no hay negocios reservados. ¡Puedes ser el primero!
                    </td>
                  </tr>
                ) : (
                  leads.map((lead, idx) => (
                    <tr
                      key={lead.id}
                      className={
                        idx % 2 === 0 ? "bg-slate-900/30" : "bg-slate-900/10"
                      }
                    >
                      <td className="px-4 py-3 align-middle">
                        {lead.business_name}
                      </td>
                      <td className="px-4 py-3 align-middle whitespace-nowrap text-slate-200/90">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="px-4 py-3 align-middle text-emerald-300 font-medium">
                        ¡Ya tiene su acceso anticipado!
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* CTA de contacto */}
<div className="pt-6 text-center">
  <Link
    href="/contact"
    className="text-sky-300 hover:text-sky-200 font-medium text-sm sm:text-base transition-colors"
  >
    ¿Tienes alguna duda? <span className="underline">Contáctanos →</span>
  </Link>
</div>

        </section>
      </div>
    </main>
  );
}
