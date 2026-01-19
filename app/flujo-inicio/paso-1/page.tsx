'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";

type Article = {
  angle: string;
  content: string;
};

export default function ArticulosPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [openArticleIndex, setOpenArticleIndex] = useState<number | null>(null);

  useEffect(() => {
  const googleMapsUrl = localStorage.getItem('googleMapsUrl');

  if (!googleMapsUrl) {
    setLoading(false);
    return;
  }

  async function generateArticles() {
    try {
      const res = await fetch(
        'http://localhost:8000/seo/articles/preview',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            google_maps_url: googleMapsUrl
          })
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error('Backend error:', text);
        throw new Error('Backend error');
      }

      const data = await res.json();
      console.log("ARTICLES FROM BACKEND:", data);

      setArticles(data.articles || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  generateArticles(); // ✅ ahora SÍ se ejecuta
}, []);


  const getExcerpt = (text: string, length = 300) =>
    text.length > length ? text.slice(0, length) + "…" : text;

  const destacado = articles[0];
  const secundario = articles[1];

  return (
    <main className="min-h-screen bg-white px-8 py-16 font-sans text-gray-900">
      <div className="mx-auto max-w-6xl">

        {/* Subtítulo superior */}
        <p className="mb-4 text-center text-sm font-medium uppercase tracking-wide text-gray-500">
          Se publicarán en un plazo de 7 días
        </p>

        {/* Título */}
        <h1 className="mb-4 text-center text-4xl font-bold tracking-tight">
          Artículos, Blogs, Prensa
        </h1>

        {/* Subtítulo inferior */}
        <p className="mb-16 text-center text-lg text-gray-600">
          Aumentarán la visibilidad del restaurante un 150%
        </p>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">
            Generando artículos con IA…
          </p>
        )}

        {/* Artículo destacado */}
        {!loading && destacado && (
          <section className="relative mb-12 rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold">
              Artículo destacado
            </h2>

            <p className="leading-relaxed text-gray-600 whitespace-pre-line">
              {openArticleIndex === 0
                ? destacado.content
                : getExcerpt(destacado.content, 450)}
            </p>

            {openArticleIndex === 0 ? (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setOpenArticleIndex(null)}
                  className="rounded-lg border px-6 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Volver
                </button>
              </div>
            ) : (
              <button
                onClick={() => setOpenArticleIndex(0)}
                className="absolute bottom-6 right-6 text-sm font-medium text-gray-700 hover:underline"
              >
                Ver más
              </button>
            )}
          </section>
        )}

        {/* Sección inferior */}
        {!loading && (
          <section className="grid gap-8 md:grid-cols-2">

            {/* Blog gastronómico */}
            <div className="relative rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="mb-3 text-xl font-semibold">
                Blog gastronómico
              </h3>

              <p className="text-gray-600 whitespace-pre-line">
                {secundario
                  ? openArticleIndex === 1
                    ? secundario.content
                    : getExcerpt(secundario.content, 300)
                  : 'Artículo en preparación…'}
              </p>

              {secundario && (
                openArticleIndex === 1 ? (
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={() => setOpenArticleIndex(null)}
                      className="rounded-lg border px-6 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Volver
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setOpenArticleIndex(1)}
                    className="absolute bottom-6 right-6 text-sm font-medium text-gray-700 hover:underline"
                  >
                    Ver más
                  </button>
                )
              )}
            </div>

            {/* Medios */}
            <div className="rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold">
                ¿Dónde se publicarán?
              </h3>
              <p className="mb-6 text-gray-600">
                Posibles medios locales
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <span>La Voz Urbana</span>
                <span>El Diario Local</span>
                <span>Sabores & Cultura</span>
                <span>Noticias del Barrio</span>
                <span>GastroHoy</span>
                <span>Prensa Regional</span>
              </div>
            </div>
          </section>
        )}

        {/* Botón siguiente */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/flujo-inicio/paso-2"
            className="rounded-xl bg-gray-900 px-10 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Siguiente
          </Link>
        </div>

      </div>
    </main>
  );
}


