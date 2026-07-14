"use client";

import React from "react";

export default function SeccionResenasIA() {
  return (
    <section
      className="bg-black text-white overflow-hidden"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;600;800&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-tight">
          La IA de reseñas que lo puede todo
        </h1>
        <p className="mt-6 text-2xl md:text-4xl lg:text-5xl font-light leading-tight text-gray-300">
          Lee todas tus reseñas. Las entiende. Las responde. <br className="hidden md:block" />
          Analiza lo que dicen tus clientes y te ayuda a mejorar. <br className="hidden md:block" />
          Potencia tu imagen y haz crecer tu negocio.
        </p>
      </div>
    </section>
  );
}
