"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShieldCheck, TrendingUp, CalendarClock, RotateCcw, XCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">A</span>
            <span>AIBE</span>
          </Link>

          {/* Nav actions */}
          <nav className="flex items-center gap-3">
            <a
              href="#contacto"
              className="px-4 py-2 rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition shadow-sm"
            >
              Contacto
            </a>
            {/* 👇 CAMBIADO: ahora incluye redirect=/panel y usa Link */}
            <Link
              href="/mi-cuenta?redirect=/panel"
              className="px-4 py-2 rounded-xl bg-slate-900 text-white shadow-md hover:shadow-lg transition"
            >
              Mi cuenta
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Convierte cada reseña en una oportunidad de crecimiento
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-prose">
                La tecnología que usan las grandes empresas, ahora al alcance de tu negocio.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#planes"
                  className="px-6 py-3 rounded-xl bg-slate-900 text-white font-medium shadow-md hover:shadow-lg transition"
                >
                  Obtener oferta
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              {/* Decorative mockup / illustration substitute */}
              <div className="relative rounded-3xl border border-slate-200 bg-white shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">AI</div>
                  <div>
                    <div className="font-semibold">AIBE Dashboard</div>
                    <div className="text-sm text-slate-500">Reseñas en tiempo real</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="text-3xl font-bold">4.8</div>
                    <div className="text-sm text-slate-500">Valoración media</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4"/><span className="text-sm text-slate-500">Tendencia</span></div>
                    <div className="text-emerald-600 font-semibold">+12% semanal</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/><span className="text-sm text-slate-500">Reputación</span></div>
                    <div className="font-semibold">Protegida</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>

              {/* Aspirational phrase */}
              <div className="absolute -bottom-6 right-0 translate-y-full md:translate-y-0 md:bottom-4 md:right-4">
                <span className="text-sm md:text-base bg-white/80 backdrop-blur px-3 py-2 rounded-xl border border-slate-200 shadow-sm">
                  Mientras tú vendes, nuestra IA cuida tu reputación
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background accents */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-slate-100" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-slate-100" />
        </div>
      </section>

      {/* Two highlight cards */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xl sm:text-2xl font-semibold">
                Más de 500 negocios confían cada día en AIBE Technologies.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xl sm:text-2xl font-semibold">
                #1 en inteligencia artificial para gestión de reseñas y reputación online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="planes" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">Elige el plan perfecto para tu negocio</h2>
            <div className="flex flex-wrap items-center justify-center gap-3 text-slate-600 text-sm">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white">
                <CalendarClock className="h-4 w-4" /> Ayuda los 365 días del año
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white">
                <RotateCcw className="h-4 w-4" /> 30 días de garantía de reembolso
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white">
                <XCircle className="h-4 w-4" /> cancela en cualquier momento
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Básico */}
            <motion.div initial={{opacity:0, y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}} className="relative">
              <div className="absolute top-3 right-3 text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg border border-emerald-200">
                -85%
              </div>
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
                <h3 className="text-xl font-bold mb-1">AIBE Básico</h3>
                <p className="text-slate-600 mb-4">Ideal para pequeños negocios que quieren automatizar sus respuestas.</p>
                <div className="text-slate-500 line-through">9,99€</div>
                <div className="text-4xl font-extrabold">1,49€/mes</div>
                <Link href="/registro?plan=basic" className="mt-4 inline-flex justify-center px-4 py-2 rounded-xl bg-slate-900 text-white shadow hover:shadow-md">
                  Elegir plan
                </Link>
                <ul className="mt-6 space-y-2 text-sm text-slate-700">
                  <li>Respuestas automáticas con tono humano.</li>
                  <li>Personalización del tono y estilo de respuesta.</li>
                  <li>Historial de reseñas centralizado en un solo panel.</li>
                  <li>Notificaciones por nuevas reseñas recibidas.</li>
                  <li>Visualización básica de valoraciones y medias.</li>
                </ul>
              </div>
            </motion.div>

            {/* Business */}
            <motion.div initial={{opacity:0, y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="relative">
              <div className="absolute top-3 right-3 text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg border border-emerald-200">
                -82%
              </div>
              <div className="absolute -top-3 left-6">
                <span className="inline-flex items-center rounded-full bg-amber-500 text-white text-xs font-semibold px-3 py-1 shadow">Más vendido</span>
              </div>
              <div className="h-full rounded-3xl border-2 border-slate-900 bg-white p-6 shadow-md flex flex-col">
                <h3 className="text-xl font-bold mb-1">AIBE Business</h3>
                <div className="text-slate-500 line-through">12,99€</div>
                <div className="text-4xl font-extrabold">2,29€/mes</div>
                <div className="text-emerald-600 font-medium mt-1">+ 1 mes gratis al contratar ahora</div>
                <Link href="/registro?plan=business" className="mt-4 inline-flex justify-center px-4 py-2 rounded-xl bg-slate-900 text-white shadow hover:shadow-md">
                  Elegir plan
                </Link>
                <ul className="mt-6 space-y-2 text-sm text-slate-700">
                  <li>Todo lo del plan Básico, y además:</li>
                  <li>Análisis completo de reseñas históricas.</li>
                  <li>Sugerencias inteligentes para optimizar el negocio.</li>
                  <li>Clasificación por temas y sentimientos clave.</li>
                  <li>Informes personalizados con recomendaciones de la IA.</li>
                  <li>Detección de tendencias y oportunidades clave.</li>
                  <li>Comparativa avanzada con negocios competidores.</li>
                  <li>Panel online con historial y evolución.</li>
                  <li>Decisiones estratégicas basadas en inteligencia artificial.</li>
                </ul>
              </div>
            </motion.div>

            {/* Plus */}
            <motion.div initial={{opacity:0, y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}} className="relative">
              <div className="absolute top-3 right-3 text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg border border-emerald-200">
                -75%
              </div>
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
                <h3 className="text-xl font-bold mb-1">AIBE Plus</h3>
                <p className="text-slate-600 mb-4">Diseñado para franquicias y empresas con varios locales.</p>
                <div className="text-slate-500 line-through">25,99€</div>
                <div className="text-4xl font-extrabold">6,49€</div>
                <Link href="/registro?plan=plus" className="mt-4 inline-flex justify-center px-4 py-2 rounded-xl bg-slate-900 text-white shadow hover:shadow-md">
                  Elegir plan
                </Link>
                <ul className="mt-6 space-y-2 text-sm text-slate-700">
                  <li>Todo lo del plan Business, y además:</li>
                  <li>Gestión centralizada de múltiples ubicaciones o marcas.</li>
                  <li>Informes globales y por cada punto de venta.</li>
                  <li>Soporte prioritario 24h</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
          AIBE Technologies: Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}


