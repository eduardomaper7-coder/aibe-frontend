export default function FichaGoogleFotos() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm md:p-12">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-yellow-500">
            Contenido actualizado
          </span>

          <h2 className="mt-3 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Subimos tus fotos y vídeos a Google por ti
          </h2>
        </div>

        <div className="space-y-5 text-lg text-slate-600">
          <p>
            Una ficha sin fotos recientes transmite abandono. Por eso nos
            encargamos de subir a tu ficha de Google las imágenes y vídeos que
            nos envíes por WhatsApp o email.
          </p>

          <p>
            Puedes mandarnos fotos de la clínica, equipo, recepción, gabinetes,
            tratamientos, instalaciones o cualquier contenido que ayude a generar
            confianza antes de que el paciente reserve.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {["Fotos de la clínica", "Vídeos cortos", "Actualizaciones frecuentes"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-800"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}