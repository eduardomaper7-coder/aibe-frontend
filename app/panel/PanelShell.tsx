"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

type View = "menu" | "help" | "subscription" | "confirm-cancel";

/* =========================
   Logo (versión para fondo claro)
========================= */
function PanelLogo() {
  return (
    <Link href="/panel" className="flex items-center gap-3" aria-label="Panel">
      {/* ICONO degradado */}
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-md"
        aria-hidden="true"
      >
        <span
          className="font-semibold leading-none text-white"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: 14 }}
        >
          AI
        </span>
      </div>

      {/* BLOQUE DE TEXTO */}
      <span className="leading-tight">
        <div className="flex items-baseline gap-1">
          <span
            className="tracking-tight"
            style={{
              color: "#111111",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            AIBE
          </span>
          <span
            style={{
              color: "#111111",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 300,
              fontSize: 15,
              lineHeight: 1,
            }}
          >
            Technologies
          </span>
        </div>
        <div
          className="text-slate-500"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 300,
            fontSize: 12,
            lineHeight: 1.1,
          }}
        >
          Artificial Intelligence for Business Efficiency
        </div>
      </span>
    </Link>
  );
}

/* =========================
   Componente AccountMenu (export nombrado)
========================= */
export function AccountMenu() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("menu");

  const [email, setEmail] = useState<string | null>(null);
  const [loadingEmail, setLoadingEmail] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [plan, setPlan] = useState<string | null>(null);
  const [loadingCancel, setLoadingCancel] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popRef = useRef<HTMLDivElement | null>(null);

  // Cargar email y plan desde Supabase
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingEmail(true);
        setError(null);
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!mounted) return;

        setEmail(user?.email ?? null);

        const metaPlan =
          (user?.user_metadata?.plan as string | undefined) ||
          (user?.app_metadata?.subscription as string | undefined) ||
          null;
        setPlan(metaPlan ?? "X suscripción");
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || "No se pudo obtener el usuario");
        setPlan("X suscripción");
      } finally {
        if (mounted) setLoadingEmail(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Cerrar al hacer click fuera o con Esc
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        open &&
        popRef.current &&
        !popRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
        setView("menu");
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setView("menu");
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error("Error al cerrar sesión:", e);
    } finally {
      setOpen(false);
      setView("menu");
      if (typeof window !== "undefined") {
        window.location.href = "https://aibetech.es";
      }
    }
  }

  function Header({ title }: { title: string }) {
    return (
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={() => {
            if (view === "menu") setOpen(false);
            else setView("menu");
          }}
          className="rounded-full p-1 hover:bg-gray-100"
          aria-label="Cerrar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5 text-gray-500"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  function MenuView() {
    return (
      <>
        <Header title="Mi Cuenta" />
        {/* Gmail */}
        <div className="mb-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
          <div className="font-medium text-gray-900">Gmail</div>
          <div className="mt-1">
            {loadingEmail ? (
              <span className="italic text-gray-500">cargando…</span>
            ) : error ? (
              <span className="text-red-600">{error}</span>
            ) : email ? (
              <span className="break-all">{email}</span>
            ) : (
              <span className="text-gray-500">No has iniciado sesión</span>
            )}
          </div>
        </div>

        {/* Acciones */}
        <div className="space-y-2">
          <button
            onClick={() => setView("subscription")}
            className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Suscripción
          </button>
          <button
            onClick={() => setView("help")}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Ayuda
          </button>
          <button
            onClick={handleSignOut}
            className="w-full rounded-xl border border-red-200 bg-white px-4 py-2.5 text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Cerrar sesión
          </button>
        </div>
      </>
    );
  }

  function HelpView() {
    return (
      <>
        <Header title="Ayuda" />
        <div className="space-y-3 text-sm text-gray-800">
          <p>
            <span className="font-medium">Gmail:</span>{" "}
            <a href="mailto:aibe.technologies7@gmail.com" className="text-blue-600 hover:underline">
              aibe.technologies7@gmail.com
            </a>
          </p>
          <p>
            <span className="font-medium">Teléfono / WhatsApp:</span>{" "}
            <a href="https://wa.me/34699301819" target="_blank" className="text-blue-600 hover:underline" rel="noreferrer">
              699 301 819
            </a>
          </p>
          <p className="text-gray-600">
            El servicio técnico se pondrá en contacto con usted en menos de <span className="font-semibold">24 horas</span>.
          </p>
        </div>

        <button
          onClick={() => setView("menu")}
          className="mt-4 w-full rounded-xl border px-4 py-2.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Volver
        </button>
      </>
    );
  }

  function SubscriptionView() {
    return (
      <>
        <Header title="Suscripción" />
        <div className="mb-4 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
          <div className="text-gray-600">
            Suscripción actual: <span className="font-medium text-gray-900">{plan ?? "X suscripción"}</span>
          </div>
        </div>

        <button
          onClick={() => setView("confirm-cancel")}
          className="w-full rounded-xl bg-red-600 px-4 py-2.5 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Cancelar suscripción
        </button>

        <button
          onClick={() => setView("menu")}
          className="mt-2 w-full rounded-xl border px-4 py-2.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Volver
        </button>
      </>
    );
  }

  function ConfirmCancelView() {
    async function onYes() {
      try {
        setLoadingCancel(true);
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          router.push("/login");
          return;
        }
        const res = await fetch("/api/stripe/cancel-subscription", {
          method: "POST",
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        const json = await res.json();
        if (!json?.ok) {
          console.error("Error cancelando:", json);
          alert("No se pudo cancelar la suscripción. Intenta más tarde.");
          return;
        }
        await supabase.auth.signOut();
        setOpen(false);
        setView("menu");
        router.push("/panel/cuenta/suscripcion-cancelada");
      } finally {
        setLoadingCancel(false);
      }
    }

    function onNo() {
      setOpen(false);
      setView("menu");
      router.push("/panel");
    }

    return (
      <>
        <Header title="Confirmar" />
        <p className="text-sm font-medium">¿Estás seguro que deseas cancelar tu suscripción?</p>
        <div className="mt-4 flex items-center gap-3">
          <button
            disabled={loadingCancel}
            onClick={onYes}
            className="rounded-xl bg-red-600 px-4 py-2.5 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-60"
          >
            SI
          </button>
          <button
            onClick={onNo}
            className="rounded-xl border px-4 py-2.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            NO
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="relative inline-block text-left">
      {/* Botón avatar */}
      <button
        ref={buttonRef}
        aria-label="Perfil"
        className="grid h-9 w-9 place-items-center rounded-full border bg-white text-slate-600 hover:bg-slate-50"
        onClick={() => {
          setOpen((v) => !v);
          setView("menu");
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"
          />
        </svg>
      </button>

      {/* Pop-up */}
      {open && (
        <div
          ref={popRef}
          role="menu"
          aria-label="Menú de cuenta"
          className="absolute right-0 mt-2 w-80 origin-top-right rounded-2xl border border-gray-200 bg-white p-4 shadow-xl ring-1 ring-black/5"
        >
          {view === "menu" && <MenuView />}
          {view === "help" && <HelpView />}
          {view === "subscription" && <SubscriptionView />}
          {view === "confirm-cancel" && <ConfirmCancelView />}
        </div>
      )}
    </div>
  );
}

/* =========================
   Layout del Panel (con guard)
========================= */
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
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

  return (
    <div className="min-h-[100dvh] bg-white">
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        {/* Barra superior con logo, navegación centrada y cuenta */}
        <div className="relative mx-auto flex w-full items-center px-4 py-3">
          {/* Izquierda: logo */}
          <PanelLogo />

          {/* Centro: navegación de secciones */}
          <nav
            className="pointer-events-auto absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 md:flex"
            aria-label="Secciones del panel"
          >
            <a href="#temas" className="px-2 py-2 text-[15px] font-medium text-slate-700 border-b-2 border-transparent hover:border-slate-300 transition">
              Temas detectados
            </a>
            <a href="#sentimiento" className="px-2 py-2 text-[15px] font-medium text-slate-700 border-b-2 border-transparent hover:border-slate-300 transition">
              Sentimiento
            </a>
            <a href="#oportunidades" className="px-2 py-2 text-[15px] font-medium text-slate-700 border-b-2 border-transparent hover:border-slate-300 transition">
              Oportunidades
            </a>
            <a href="#volumen" className="px-2 py-2 text-[15px] font-medium text-slate-700 border-b-2 border-transparent hover:border-slate-300 transition">
              Volumen
            </a>
            <a href="#respuestas" className="px-2 py-2 text-[15px] font-medium text-slate-700 border-b-2 border-transparent hover:border-slate-300 transition">
              Respuestas IA
            </a>
          </nav>

          {/* Derecha: menú de cuenta */}
          <div className="ml-auto flex items-center gap-3">
            <AccountMenu />
          </div>
        </div>

        {/* Navegación secundaria visible en móvil (scroll horizontal suave) */}
        <div className="md:hidden">
          <div className="no-scrollbar flex w-full snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 pt-1">
            {[
              { href: "#temas", label: "Temas detectados" },
              { href: "#sentimiento", label: "Sentimiento" },
              { href: "#oportunidades", label: "Oportunidades" },
              { href: "#volumen", label: "Volumen" },
              { href: "#respuestas", label: "Respuestas IA" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="snap-start whitespace-nowrap rounded-full border px-3 py-1.5 text-sm text-slate-700"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main className="w-full px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
