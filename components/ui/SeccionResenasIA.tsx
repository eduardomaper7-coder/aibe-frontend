"use client";

import Link from "next/link";
import { ThumbsUp, Share2, Star } from "lucide-react";
import { motion, type Variants } from "framer-motion";

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

/* ⭐ AVATAR MÁS PEQUEÑO */
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
      className={`relative h-8 w-8 shrink-0 overflow-hidden rounded-full ${color} ${textColor} grid place-items-center text-sm font-semibold`}
    >
      {initial}
      <div className="absolute -bottom-1 -right-1 grid h-3 w-3 place-items-center rounded-full bg-white">
        <Star className="h-2.5 w-2.5 fill-orange-400 stroke-orange-500" />
      </div>
    </div>
  );
}

/* ⭐ ACCIONES */
function ActionBar() {
  return (
    <div className="mt-2 flex gap-4 text-xs text-gray-500">
      <button className="flex items-center gap-1 hover:text-gray-700">
        <ThumbsUp className="h-3 w-3" />
        Me gusta
      </button>
      <button className="flex items-center gap-1 hover:text-gray-700">
        <Share2 className="h-3 w-3" />
        Compartir
      </button>
    </div>
  );
}

/* ⭐ TARJETA DE RESEÑA REDUCIDA Y SIN TRUNCAR */
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

          {/* TEXTO COMPLETO SIN TRUNCAR */}
          <p className="mt-2 text-[13px] leading-6 whitespace-normal break-words text-gray-800">
            {review.text}
          </p>

          <ActionBar />
        </div>
      </div>
    </div>
  );
}

/* ⭐ TARJETA IA REDUCIDA Y SIN TRUNCAR */
function AIResponseCard({ text }: { text: string }) {
  return (
    <div className="relative rounded-xl border bg-white p-3 shadow-sm w-full max-w-sm text-[13px] leading-5">
      <div className="mb-1 text-xs font-medium text-gray-700">Respuesta IA sugerida</div>

      {/* TEXTO COMPLETO SIN TRUNCAR */}
      <p className="text-[13px] leading-6 whitespace-normal break-words text-gray-800">
        {text}
      </p>
    </div>
  );
}

/* ⭐ CÍRCULO FEATURE REDUCIDO */
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
      viewport={{ once: true, amount: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid place-items-center rounded-full
        h-36 w-36 md:h-44 md:w-44 xl:h-52 xl:w-52
        text-white text-center px-3 shadow-lg ring-1 ring-white/20"
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

      <div className="font-sans">
        <div className="text-[13px] md:text-base xl:text-lg font-semibold">
          {title}
        </div>
        <div className="mt-1 text-[11px] md:text-xs xl:text-sm opacity-90">
          {subtitle}
        </div>
      </div>
    </motion.div>
  );
}

/* ⭐ COMPONENTE PRINCIPAL */
export default function SeccionResenasIA() {
  const rows = [
    {
      user: "Paula Gómez",
      guideReviews: 18,
      time: "Hace 3 días",
      rating: 5,
      avatarColor: "bg-orange-600",
      avatarText: "text-white",
      text:
        "Tuve una experiencia excelente. Desde el momento en que llegué, el personal fue muy amable y atento. Me explicaron todo con claridad y se aseguraron de que me sintiera cómodo. Además, el lugar estaba impecable y se notaba que cuidan cada detalle. Sin duda, fue una visita muy agradable y me quedo con una impresión muy positiva.",
      ai:
        "¡Muchas gracias por compartir tu experiencia! Nos alegra saber que te sentiste bien atendido y que notaste el esfuerzo que ponemos en mantener todo en buen estado. Valoramos sinceramente tus palabras y nos motiva saber que tu visita fue tan agradable. 😊",
    },
    {
      user: "Luis Pérez",
      guideReviews: 9,
      time: "Hace 1 semana",
      rating: 3,
      avatarColor: "bg-sky-500",
      avatarText: "text-slate-900",
      text:
        "El restaurante tiene un ambiente agradable y el personal fue atento, pero la comida tardó un poco más de lo esperado. Pedí la lasaña de carne, que estaba muy sabrosa, aunque me habría gustado que llegara un poco más caliente. En general, fue una buena experiencia, pero con algunos detalles por mejorar.",
      ai:
        "Agradecemos mucho que hayas compartido tu experiencia. Nos alegra saber que disfrutaste el sabor de la lasaña y valoramos tus observaciones sobre el tiempo de servicio y la temperatura del plato. Comentarios como el tuyo nos ayudan a comprender mejor la experiencia de nuestros clientes y a cuidar esos pequeños detalles que marcan la diferencia.",
    },
    {
      user: "Natalia Ríos",
      guideReviews: 27,
      time: "Hace 2 semanas",
      rating: 2,
      avatarColor: "bg-emerald-600",
      avatarText: "text-white",
      text:
        "El spa tiene unas instalaciones bonitas, pero mi visita no fue tan relajante como esperaba. Durante el masaje, hubo algo de ruido en la sala contigua y me costó desconectarme. El personal fue respetuoso, pero sentí que la experiencia podría haber sido más tranquila. Salí algo decepcionada, aunque el lugar en sí me pareció agradable.",
      ai:
        "Gracias por dejar tu reseña y contarnos cómo fue tu experiencia. Lamentamos que el ambiente no haya sido todo lo relajante que esperabas y agradecemos que lo señales con claridad. Valoramos tus comentarios, ya que nos permiten conocer mejor la percepción de nuestros clientes y seguir prestando atención a los detalles que influyen en su bienestar.",
    },
  ];

  const features = [
    {
      title: "Ahorra tiempo, gana eficiencia.",
      subtitle: "La IA responde por ti en segundos.",
      color: "#F59E0B",
    },
    {
      title: "Respuestas con el tono ideal.",
      subtitle: "Comunicación profesional y coherente.",
      color: "#F43F5E",
    },
    {
      title: "Mejora tu reputación fácilmente.",
      subtitle: "Demuestra atención en cada respuesta.",
      color: "#10B981",
    },
  ];

  const getVariants = (baseDelay: number) => ({
    review: {
      hidden: { opacity: 0, y: 8 },
      show: { opacity: 1, y: 0, transition: { delay: baseDelay } },
    },
    arrow: {
      hidden: { pathLength: 0, opacity: 0 },
      show: {
        pathLength: 1,
        opacity: 1,
        transition: { delay: baseDelay + 0.3, duration: 0.4 },
      },
    },
    ai: {
      hidden: { opacity: 0, y: 8 },
      show: { opacity: 1, y: 0, transition: { delay: baseDelay + 0.6 } },
    },
  });

  return (
    <section className="w-full bg-black py-16 relative overflow-x-visible">
      <div className="max-w-5xl pl-6 md:pl-8 relative">

        <h2 className="text-white text-[30px] md:text-[34px] font-semibold">
          Responde a tus reseñas de forma automática con IA
        </h2>

        <div className="relative mt-12 space-y-10">

          {/* Línea vertical */}
          <div
            className="hidden md:block absolute top-0 right-[-240px] lg:right-[-300px] xl:right-[-360px]
              w-[160px] md:w-[180px] xl:w-[220px] h-full"
          >
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-px bg-white/30 h-full"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            />
          </div>

          {rows.map((r, idx) => {
            const v = getVariants(idx * 0.15);
            const f = features[idx];
            const circleDelay = 0.15 + idx * 0.15;

            return (
              <div key={idx} className="relative">
                
                <div className="relative overflow-hidden rounded-3xl p-4 md:p-5 bg-gradient-to-br from-[#0B1430] via-[#0A1537] to-[#081025] ring-1 ring-white/10">

                  <div className="relative flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">

                    <motion.div variants={v.review} initial="hidden" whileInView="show" viewport={{ once: true }}>
                      <ReviewCard review={r} />
                    </motion.div>

                    <motion.svg
                      variants={v.arrow}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 200 20"
                      className="hidden md:block h-4 w-40"
                      fill="none"
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

                    <motion.div variants={v.ai} initial="hidden" whileInView="show" viewport={{ once: true }}>
                      <AIResponseCard text={r.ai} />
                    </motion.div>
                  </div>
                </div>

                <div
                  className="hidden md:block absolute top-1/2 -translate-y-1/2
                    right-[-240px] lg:right-[-300px] xl:right-[-360px]
                    w-[160px] md:w-[180px] xl:w-[220px]"
                >
                  <div className="mx-auto w-full">
                    <FeatureCircle {...f} delay={circleDelay} />
                  </div>
                </div>
              </div>
            );
          })}
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

