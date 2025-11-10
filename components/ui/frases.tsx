"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const LOCAL_IMAGES: string[] = [
  "/imagenes/pexels-kindelmedia-6994314.jpg",
  "/imagenes/pexels-olly-926390.jpg",
  "/imagenes/pexels-reneterp-1581384.jpg",
];

// Hook con tipos
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id: ReturnType<typeof setInterval> = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}

type Props = {
  images?: string[];
};

export default function SeccionResenasIA({ images = LOCAL_IMAGES }: Props) {
  const [start, setStart] = useState<number>(0);
  const [sliding, setSliding] = useState<boolean>(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const normalized = useMemo<string[]>(() => {
    const src = images && images.length > 0 ? images : LOCAL_IMAGES;
    if (src.length < 6) {
      // duplica para tener scroll fluido
      return [...src, ...src, ...src];
    }
    return src;
  }, [images]);

  const currentSet = useMemo<string[]>(
    () => [0, 1, 2].map((i) => normalized[(start + i) % normalized.length]),
    [normalized, start]
  );

  const nextSet = useMemo<string[]>(
    () => [0, 1, 2].map((i) => normalized[(start + 3 + i) % normalized.length]),
    [normalized, start]
  );

  const widthClasses: string[] = ["md:w-[44%] w-full", "md:w-[34%] w-full", "md:w-[22%] w-full"];

  useInterval(() => setSliding(true), 8000);

  const handleTransitionEnd = () => {
    setSliding(false);
    // avanzar 3 posiciones (una “página”)
    setStart((prev) => (prev + 3) % normalized.length);
  };

  return (
    <section
      className="bg-black text-white overflow-hidden"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;600;800&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-tight">
          La IA de reseñas que lo puede todo
        </h1>
        <p className="mt-6 text-2xl md:text-4xl lg:text-5xl font-light leading-tight text-gray-300">
          Lee todas tus reseñas. Las entiende. Las responde. <br className="hidden md:block" />
          Analiza lo que dicen tus clientes y te ayuda a mejorar. <br className="hidden md:block" />
          Potencia tu imagen y haz crecer tu negocio.
        </p>
      </div>

      <div className="mt-12 md:mt-16">
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              className={`flex w-[200%] ${
                sliding
                  ? "transition-transform duration-[900ms] ease-out translate-x-[-50%]"
                  : "translate-x-0"
              }`}
            >
              {[currentSet, nextSet].map((set, pageIdx) => (
                <div key={pageIdx} className="w-1/2 flex items-center gap-4 p-0">
                  {set.map((src: string, i: number) => (
                    <div
                      key={`${pageIdx}-${i}-${src}`}
                      className={`${widthClasses[i % widthClasses.length]} h-[360px] rounded-3xl overflow-hidden`}
                    >
                      <img
                        src={src}
                        alt="Imagen de reseñas"
                        className="h-full w-full object-cover select-none transition-transform duration-700 ease-out hover:scale-[1.02]"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
