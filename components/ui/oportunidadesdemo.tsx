"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function PlanDeAccionDemo() {
  const data = [
    {
      categoria: "Recepción / Check-in",
      dato: "El 37% de las reseñas mencionan demoras en el check-in.",
      oportunidad:
        "Implementar un check-in digital o exprés para reducir tiempos de espera y mejorar la primera impresión del huésped.",
      reseñas: [
        { autor: "Alejandra C.", texto: "Llegamos con reserva confirmada y aun así esperamos más de 20 minutos para el check-in. La fila avanzaba muy lento." },
        { autor: "Javier R.", texto: "El proceso en recepción fue eterno. Mucho papeleo que podría hacerse antes de llegar." },
        { autor: "Marta S.", texto: "Buen trato, pero el check-in no fue ágil. Un sistema de pre-registro habría ayudado." },
      ],
    },
    {
      categoria: "Restaurante / Tiempos de servicio",
      dato: "El 42% de los clientes mencionan tiempos de espera superiores a 25 minutos.",
      oportunidad:
        "Optimizar procesos en cocina y sala para reducir los tiempos de servicio y aumentar la rotación de mesas.",
      reseñas: [
        { autor: "Sofía R.", texto: "La comida estaba rica, pero entre el pedido y el primer plato pasaron casi 30 minutos." },
        { autor: "Iván T.", texto: "Buen ambiente, aunque la espera entre platos fue larga. Vimos varias mesas en la misma situación." },
        { autor: "Elena C.", texto: "Llegamos con hambre y tardaron mucho en servirnos. Creo que cocina y sala no estaban coordinadas." },
      ],
    },
    {
      categoria: "Spa / Consistencia del servicio",
      dato: "El 29% de los comentarios señalan diferencias en la calidad entre terapeutas.",
      oportunidad:
        "Estandarizar la formación del personal para asegurar una experiencia consistente y elevar la satisfacción global.",
      reseñas: [
        { autor: "Andrés V.", texto: "Mi masaje fue excelente, pero el de mi pareja no tanto. Se nota que cada terapeuta trabaja diferente." },
        { autor: "Nuria S.", texto: "La primera sesión fue fantástica; en la segunda, con otra terapeuta, la técnica cambió y no fue igual de buena." },
        { autor: "Carla D.", texto: "Experiencia correcta, pero inconsistente según quién te atienda. Falta un estándar único." },
      ],
    },
  ];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % data.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (

   <section className="relative w-full min-h-screen bg-gradient-to-br from-[#03110A] via-[#041A12] to-[#06241A] py-16 overflow-hidden">
  {/* FOCOS BLANCOS — CAPA DE FONDO */}
  <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-white/10 blur-[140px]" />
  <div className="pointer-events-none absolute top-1/2 right-1/3 h-[28rem] w-[28rem] rounded-full bg-white/5 blur-[160px]" />
  <div className="pointer-events-none absolute bottom-10 left-1/2 h-80 w-80 rounded-full bg-white/10 blur-[120px]" />
  <div className="pointer-events-none absolute top-10 right-10 h-64 w-64 rounded-full bg-white/15 blur-[100px]" />

  {/* FOCOS ADICIONALES PARA MAYOR PROFUNDIDAD */}
  <div className="pointer-events-none absolute top-[10%] left-[10%] h-40 w-40 rounded-full bg-white/5 blur-[90px]" />
  <div className="pointer-events-none absolute top-[65%] left-[15%] h-60 w-60 rounded-full bg-white/7 blur-[110px]" />
  <div className="pointer-events-none absolute bottom-[20%] right-[5%] h-72 w-72 rounded-full bg-white/8 blur-[140px]" />
  <div className="pointer-events-none absolute bottom-[35%] right-[40%] h-56 w-56 rounded-full bg-white/6 blur-[120px]" />
  <div className="pointer-events-none absolute top-[70%] left-[60%] h-48 w-48 rounded-full bg-white/5 blur-[100px]" />
  <div className="pointer-events-none absolute top-[20%] right-[45%] h-44 w-44 rounded-full bg-white/8 blur-[90px]" />

  <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <header className="mb-10">
      <h1 className="text-white text-3xl md:text-4xl font-semibold tracking-tight">
        Toma decisiones estratégicas en base a las opiniones de tus clientes
      </h1>
      <p className="mt-2 text-slate-300 text-base md:text-lg">
        Ejecuta nuestro plan de acción realizado con inteligencia artificial
      </p>
    </header>

    {/* Recuadro degradado */}
    <motion.div
      className="relative overflow-hidden rounded-3xl p-8 md:p-10 bg-gradient-to-br from-[#0B1E14] via-[#103323] to-[#0B291E] shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)] ring-1 ring-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Focos suaves dentro del recuadro */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-1/3 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

      <div className="relative z-10">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Categoria {...data[index]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  </div>
</section>




  );
}

// ————————————————————————————————————————————————
function Categoria({ categoria, dato, oportunidad, reseñas }: any) {
  return (
    <section className="rounded-2xl p-5 md:p-6 text-slate-900">
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700 ring-1 ring-sky-200">
          <Dot className="h-2 w-2 fill-current" />
          {categoria}
        </span>
      </div>

      {/* Dato → Flecha → Oportunidad */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-stretch gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-inner">
          <h3 className="mb-2 text-sm font-semibold text-slate-700">Datos</h3>
          <p className="text-base leading-relaxed">{dato}</p>
        </div>

        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 300 100" className="h-24 w-full md:h-28">
            <path
              d="M10,80 C100,20 200,20 290,80"
              className="stroke-slate-300"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <defs>
              <marker
                id="arrow"
                markerWidth="10"
                markerHeight="10"
                refX="6"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L0,6 L6,3 z" className="fill-slate-400" />
              </marker>
            </defs>
            <line
              x1="30"
              y1="80"
              x2="270"
              y2="80"
              strokeWidth="2"
              className="stroke-slate-400"
              markerEnd="url(#arrow)"
            />
            <text
              x="150"
              y="18"
              textAnchor="middle"
              className="fill-slate-500 text-[12px]"
            >
              De datos a oportunidad
            </text>
          </svg>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-white p-5 md:p-6 shadow-inner">
          <h3 className="mb-2 text-sm font-semibold text-emerald-700">
            Oportunidad
          </h3>
          <p className="text-base leading-relaxed">{oportunidad}</p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="mb-3 text-sm font-semibold text-slate-700">
          Reseñas relacionadas
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reseñas.map((r: any, i: number) => (
            <ReviewCard key={i} autor={r.autor} texto={r.texto} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ autor, texto }: { autor: string; texto: string }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar />
          <div>
            <p className="text-sm font-medium text-slate-900">{autor}</p>
            <p className="text-xs text-slate-500">Reseña verificada</p>
          </div>
        </div>
        <Stars />
      </div>
      <p className="mt-3 text-sm text-slate-700 leading-relaxed">{texto}</p>
    </article>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(2)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-amber-400">
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.954L10 0l2.95 5.956 6.562.954-4.756 4.635 1.122 6.545z" />
        </svg>
      ))}
      {[...Array(3)].map((_, i) => (
        <svg key={`o${i}`} viewBox="0 0 20 20" className="h-4 w-4 fill-slate-200">
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.954L10 0l2.95 5.956 6.562.954-4.756 4.635 1.122 6.545z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar() {
  return (
    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 ring-1 ring-slate-300" />
  );
}

function Dot(props: any) {
  return (
    <svg viewBox="0 0 8 8" {...props}>
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}

