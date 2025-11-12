export default function PlanDeAccionDemo() {
  const data = [
    {
      categoria: "Atención al cliente",
      dato: "El 10% de las reseñas negativas señalan un servicio lento.",
      oportunidad:
        "Implementar un sistema de turnos y respuestas predefinidas para picos de demanda; fijar SLA de 3 min en hora punta y capacitar al equipo.",
      reseñas: [
        {
          autor: "Laura G.",
          texto:
            "Me atendieron, pero tardaron mucho en responder el chat. Esperé casi 10 minutos.",
        },
        {
          autor: "Diego M.",
          texto:
            "Buen trato, aunque la cola telefónica fue eterna. Terminé colgando y volviendo a llamar.",
        },
        {
          autor: "María P.",
          texto:
            "El soporte resolvió mi problema, pero el tiempo de espera fue demasiado largo.",
        },
      ],
    },
    {
      categoria: "Logística / Entrega",
      dato: "El 25% de las reseñas negativas mencionan retrasos en la entrega.",
      oportunidad:
        "Ajustar promesas de entrega según zonas, activar notificaciones proactivas y crear stock de seguridad para SKUs top.",
      reseñas: [
        {
          autor: "Sofía R.",
          texto:
            "El pedido llegó dos días después de lo prometido. Nadie me avisó del retraso.",
        },
        {
          autor: "Iván T.",
          texto:
            "Todo bien con el producto, pero la mensajería demoró más de lo indicado.",
        },
        {
          autor: "Elena C.",
          texto:
            "Compré por la entrega rápida y al final tardó casi una semana.",
        },
      ],
    },
    {
      categoria: "Producto / Calidad",
      dato: "El 8% de las reseñas negativas indican defectos de fábrica en la primera semana.",
      oportunidad:
        "Robustecer control de calidad final, test de estrés de 24h y guía de uso inicial en el empaque para evitar fallos por configuración.",
      reseñas: [
        {
          autor: "Andrés V.",
          texto:
            "A los pocos días dejó de funcionar el botón principal. Tuve que tramitar garantía.",
        },
        {
          autor: "Nuria S.",
          texto:
            "El producto venía con una pieza floja. Se nota falta de control de calidad.",
        },
        {
          autor: "Carla D.",
          texto:
            "Funciona bien, pero el primero me llegó defectuoso y tuve que cambiarlo.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      {/* Contenedor principal con menos margen superior */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-8 md:pt-8">
        <header className="mb-6 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Plan de acción
          </h1>
        </header>

        <div className="space-y-8 md:space-y-10">
          {data.map((block, idx) => (
            <Categoria key={idx} {...block} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Categoria({
  categoria,
  dato,
  oportunidad,
  reseñas,
}: {
  categoria: string;
  dato: any;
  oportunidad: any;
  reseñas: any[];
}) {
  return (
    <section className="rounded-2xl bg-white p-5 md:p-6 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between gap-4 mb-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700 ring-1 ring-sky-200">
          <Dot className="h-2 w-2 fill-current" />
          {categoria}
        </span>
        <span className="text-xs text-slate-500">Últimos 90 días • Demo</span>
      </div>

      {/* Fila principal: Datos -> Flecha/Puente -> Oportunidad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
        {/* Datos */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6 shadow-inner">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">Datos</h3>
          <p className="text-slate-900 text-base leading-relaxed">{dato}</p>
        </div>

        {/* Flecha / Puente */}
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 300 100" className="w-full h-24 md:h-28">
            {/* Línea curva (puente) */}
            <path
              d="M10,80 C100,20 200,20 290,80"
              className="stroke-slate-300"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Flecha */}
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L6,3 z" className="fill-slate-400" />
              </marker>
            </defs>
            <line x1="30" y1="80" x2="270" y2="80" strokeWidth="2" className="stroke-slate-400" markerEnd="url(#arrow)" />
            {/* Etiquetas */}
            <text x="150" y="18" textAnchor="middle" className="fill-slate-500 text-[12px]">
              De datos a oportunidad
            </text>
          </svg>
        </div>

        {/* Oportunidad */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 md:p-6 shadow-inner">
          <h3 className="text-sm font-semibold text-emerald-700 mb-2">Oportunidad</h3>
          <p className="text-slate-900 text-base leading-relaxed">{oportunidad}</p>
        </div>
      </div>

      {/* Reseñas relacionadas */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-slate-700 mb-3">Reseñas relacionadas</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reseñas.map((r, i) => (
            <ReviewCard key={i} autor={r.autor} texto={r.texto} />)
          )}
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
    <div className="flex items-center gap-0.5" aria-label="2 estrellas">
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

function Dot(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 8 8" {...props}>
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}
