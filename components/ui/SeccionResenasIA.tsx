"use client";

import Link from "next/link";
import { ThumbsUp, Share2, Star } from "lucide-react";
import { motion } from "framer-motion";

/* ⭐ ESTRELLAS */
function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 text-xs">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < rating ? "fill-yellow-400 stroke-yellow-500" : "stroke-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

/* ⭐ AVATAR */
function Avatar({
  name,
  color,
  textColor = "text-white",
}: {
  name: string;
  color: string;
  textColor?: string;
}) {
  const initial = name[0]?.toUpperCase() ?? "?";
  return (
    <div
      className={`relative h-8 w-8 shrink-0 rounded-full grid place-items-center text-sm font-semibold ${color} ${textColor}`}
    >
      {initial}
      <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full grid place-items-center bg-white">
        <Star className="h-2.5 w-2.5 fill-orange-400 stroke-orange-500" />
      </div>
    </div>
  );
}

/* ⭐ BARRA DE ACCIONES */
function ActionBar() {
  return (
    <div className="mt-2 flex gap-4 text-xs text-gray-500">
      <button className="flex items-center gap-1 hover:text-gray-700">
        <ThumbsUp className="h-3 w-3" /> Me gusta
      </button>
      <button className="flex items-center gap-1 hover:text-gray-700">
        <Share2 className="h-3 w-3" /> Compartir
      </button>
    </div>
  );
}

/* ⭐ RESEÑA */
function ReviewCard({ review }: { review: any }) {
  return (
    <div className="rounded-xl border bg-white p-3 shadow-sm w-full max-w-sm text-[13px] leading-5">
      <div className="flex items-start gap-2">
        <Avatar name={review.user} color={review.avatarColor} textColor={review.avatarText} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-1 text-xs text-gray-700">
            <span className="font-semibold">{review.user}</span>
            <span className="text-gray-500">· Local Guide · {review.guideReviews} reseñas</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-500">
            <RatingStars rating={review.rating} />
            <span>· {review.time}</span>
          </div>

          <p className="mt-2 text-[13px] leading-6 whitespace-normal break-words text-gray-800">
            {review.text}
          </p>

          <ActionBar />
        </div>
      </div>
    </div>
  );
}

/* ⭐ RESPUESTA IA */
function AIResponseCard({ text }: { text: string }) {
  return (
    <div className="rounded-xl border bg-white p-3 shadow-sm w-full max-w-sm text-[13px] leading-5">
      <div className="mb-1 text-xs font-medium text-gray-700">Respuesta IA sugerida</div>
      <p className="text-[13px] leading-6 whitespace-normal break-words text-gray-800">
        {text}
      </p>
    </div>
  );
}

/* ⭐ CÍRCULO DE FEATURES (SOLO DESKTOP) */
function FeatureCircle({
  title,
  subtitle,
  color,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 18 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative grid place-items-center rounded-full
        h-36 w-36 md:h-44 md:w-44 xl:h-52 xl:w-52 text-white text-center px-3 shadow-lg ring-1 ring-white/20"
      style={{ backgroundColor: color }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full"
        style={{
          backgroundColor: color,
          opacity: 0.45,
          filter: "blur(30px)",
          transform: "scale(1.2)",
        }}
      />
      <div>
        <div className="text-[13px] md:text-base xl:text-lg font-semibold">{title}</div>
        <div className="mt-1 text-[11px] md:text-xs xl:text-sm opacity-90">{subtitle}</div>
      </div>
    </motion.div>
  );
}

/* ⭐ COMPONENTE PRINCIPAL */
export default function SeccionResenasIA() {
  const rows = [
    /* --- tus 3 reseñas --- */
    {
      user: "Paula Gómez",
      guideReviews: 18,
      time: "Hace 3 días",
      rating: 5,
      avatarColor: "bg-orange-600",
      avatarText: "text-white",
      text:
        "Tuve una experiencia excelente. Desde el momento en que llegué, el personal fue muy amable...",
      ai:
        "¡Muchas gracias por compartir tu experiencia! Nos alegra saber que te sentiste bien atendido...",
    },
    {
      user: "Luis Pérez",
      guideReviews: 9,
      time: "Hace 1 semana",
      rating: 3,
      avatarColor: "bg-sky-500",
      avatarText: "text-slate-900",
      text:
        "El restaurante tiene un ambiente agradable, pero la comida tardó más de lo esperado...",
      ai:
        "Agradecemos mucho que hayas compartido tu experiencia. Nos alegra saber que disfrutaste...",
    },
    {
      user: "Natalia Ríos",
      guideReviews: 27,
      time: "Hace 2 semanas",
      rating: 2,
      avatarColor: "bg-emerald-600",
      avatarText: "text-white",
      text:
        "El spa tiene buenas instalaciones, pero mi visita no fue tan relajante como esperaba...",
      ai:
        "Gracias por dejar tu reseña. Lamentamos que el ambiente no haya sido todo lo relajante...",
    },
  ];

  const features = [
    { title: "Ahorra tiempo, gana eficiencia.", subtitle: "La IA responde por ti.", color: "#F59E0B" },
    { title: "Respuestas con el tono ideal.", subtitle: "Consistencia profesional.", color: "#F43F5E" },
    { title: "Mejora tu reputación.", subtitle: "Responde como un experto.", color: "#10B981" },
  ];

  return (
    <section className="w-full bg-black py-16 relative overflow-x-visible">
      <div className="max-w-5xl pl-6 md:pl-8 relative">
        <h2 className="text-white text-[30px] md:text-[34px] font-semibold">
          Responde a tus reseñas de forma automática con IA
        </h2>

        {/* 📱 MÓVIL: 3 reseñas + flecha vertical */}
        <div className="mt-12 space-y-12 md:hidden">
          {rows.map((r, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-4">
              <ReviewCard review={r} />

              <motion.svg
                width="32"
                height="90"
                viewBox="0 0 32 90"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <motion.line
                  x1="16"
                  y1="0"
                  x2="16"
                  y2="70"
                  stroke="#d1d5db"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
                <polygon points="10,70 22,70 16,90" fill="#d1d5db" />
              </motion.svg>

              <AIResponseCard text={r.ai} />
            </div>
          ))}
        </div>

        {/* 🖥️ ESCRITORIO COMPLETO */}
        <div className="hidden md:block relative mt-12 space-y-10">
          {rows.map((r, idx) => (
            <div key={idx} className="relative">
              <div className="rounded-3xl p-5 bg-gradient-to-br from-[#0B1430] via-[#0A1537] to-[#081025] ring-1 ring-white/10 flex items-center justify-between gap-6">
                <ReviewCard review={r} />

                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 20"
                  className="h-4 w-40"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <defs>
                    <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
                      <path d="M0,0 L0,6 L6,3 z" fill="#d1d5db" />
                    </marker>
                  </defs>
                  <motion.line
                    x1="2"
                    y1="10"
                    x2="190"
                    y2="10"
                    stroke="#d1d5db"
                    strokeWidth="2"
                    strokeLinecap="round"
                    markerEnd="url(#arrowhead)"
                  />
                </motion.svg>

                <AIResponseCard text={r.ai} />
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 right-[-260px]">
                <FeatureCircle {...features[idx]} delay={idx * 0.2} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <Link
          href="/contact"
          className="bg-white text-black font-semibold text-lg px-8 py-4 rounded-full hover:scale-105 transition-all"
        >
          Escríbenos sin compromiso
        </Link>
      </div>
    </section>
  );
}
