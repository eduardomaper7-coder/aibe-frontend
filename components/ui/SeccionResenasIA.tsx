/*
  Versión con título alineado a la izquierda.
  - Tipografía Inter sans-serif, tamaño ~38–40px, color blanco.
  - Título alineado a la izquierda.
  - Mantiene los focos blancos difuminados y el fondo azul oscuro.
*/

"use client";

import { ThumbsUp, Share2, Star } from "lucide-react";
import { motion, type Variants } from "framer-motion";

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Puntuación ${rating} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-yellow-400 stroke-yellow-500" : "stroke-gray-300"}`}
        />
      ))}
    </div>
  );
}

function Avatar({
  name,
  color,
  textColor = "text-white",
}: {
  name: string;
  color: string;
  textColor?: string;
}) {
  const initial = name && name.length > 0 ? name[0].toLowerCase() : "?";
  return (
    <div
      className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-full ${color} ${textColor} grid place-items-center font-semibold`}
    >
      <span className="text-base leading-none">{initial}</span>
      <div className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-white">
        <Star className="h-3 w-3 fill-orange-400 stroke-orange-500" />
      </div>
    </div>
  );
}

function ActionBar() {
  return (
    <div className="mt-3 flex gap-6 text-sm text-gray-500">
      <button className="flex items-center gap-1 hover:text-gray-700">
        <ThumbsUp className="h-4 w-4" />
        Me gusta
      </button>
      <button className="flex items-center gap-1 hover:text-gray-700">
        <Share2 className="h-4 w-4" />
        Compartir
      </button>
    </div>
  );
}

function ReviewCard({ review }: { review: any }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm w-full max-w-xl">
      <div className="flex items-start gap-3">
        <Avatar name={review.user} color={review.avatarColor} textColor={review.avatarText} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 text-sm text-gray-700">
            <span className="font-semibold">{review.user}</span>
            <span className="text-gray-500">· Local Guide · {review.guideReviews} reseñas</span>
          </div>
          <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
            <RatingStars rating={review.rating} />
            <span>· {review.time}</span>
          </div>
          <p className="mt-2 text-[15px] leading-6 text-gray-800">{review.text}</p>
          <ActionBar />
        </div>
      </div>
    </div>
  );
}

function AIResponseCard({ text }: { text: string }) {
  return (
    <div className="relative rounded-2xl border bg-white p-5 shadow-sm w-full max-w-xl">
      <div className="mb-2 text-sm font-medium text-gray-700">Respuesta IA sugerida</div>
      <p className="text-[15px] leading-6 text-gray-800">{text}</p>
    </div>
  );
}

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
        "¡Muchas gracias por tomarte el tiempo de compartir tu experiencia! Nos alegra mucho saber que te sentiste bien atendido y que notaste el esfuerzo que ponemos en mantener todo en buen estado. Valoramos sinceramente tus palabras y nos motiva saber que tu visita fue tan agradable. 😊",
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

  const getVariants = (
    baseDelay: number
  ): { review: Variants; arrow: Variants; ai: Variants } => ({
    review: {
      hidden: { opacity: 0, y: 8 },
      show: { opacity: 1, y: 0, transition: { delay: baseDelay, duration: 0.35 } },
    },
    arrow: {
      hidden: { pathLength: 0, opacity: 0 },
      show: {
        pathLength: 1,
        opacity: 1,
        transition: {
          delay: baseDelay + 0.45,
          duration: 0.5,
          ease: [0.42, 0, 0.58, 1], // cubic-bezier (easeInOut)
        },
      },
    },
    ai: {
      hidden: { opacity: 0, y: 8 },
      show: { opacity: 1, y: 0, transition: { delay: baseDelay + 1.0, duration: 0.35 } },
    },
  });

  return (
    <section className="w-full bg-black py-20">
      <div className="mx-auto max-w-6xl mb-16">
        <h2 className="font-sans text-white text-[38px] md:text-[40px] font-semibold tracking-tight text-left">
          Responde a tus reseñas de forma automática con IA
        </h2>
      </div>
      <div className="mx-auto max-w-6xl space-y-10">
        {rows.map((r, idx) => {
          const v = getVariants(idx * 0.2);
          return (
            <div
              key={idx}
              className="relative overflow-hidden rounded-3xl p-6 md:p-8 ring-1 ring-white/10 shadow-[0_0_50px_-12px_rgba(30,58,138,0.6)] bg-gradient-to-br from-[#0B1430] via-[#0A1537] to-[#081025]"
            >
              {/* Focos difuminados decorativos */}
              <div className="pointer-events-none absolute -top-28 -left-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
              <div className="pointer-events-none absolute top-16 left-1/4 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute bottom-12 right-1/3 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
              <div className="pointer-events-none absolute top-1/3 right-10 h-40 w-40 rounded-full bg-white/[0.07] blur-2xl" />

              <div className="relative flex flex-col items-center gap-10 md:flex-row md:justify-between">
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={v.review}
                >
                  <ReviewCard review={r} />
                </motion.div>

                <motion.svg
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 220 24"
                  className="hidden h-6 w-56 md:block"
                  fill="none"
                >
                  <defs>
                    <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                      <path d="M0,0 L0,8 L8,4 z" fill="#d1d5db" />
                    </marker>
                  </defs>
                  <motion.line
                    x1="2"
                    y1="12"
                    x2="210"
                    y2="12"
                    stroke="#d1d5db"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    markerEnd="url(#arrowhead)"
                    variants={v.arrow}
                  />
                </motion.svg>

                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={v.ai}
                >
                  <AIResponseCard text={r.ai} />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
