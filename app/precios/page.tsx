import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PricingSection() {
  return (
    <div className="w-full min-h-screen bg-blue-100 font-inter text-gray-900">

      {/* SECCIÓN PRINCIPAL (antes azul suave blue-50) */}
      <div className="w-full bg-blue-200 text-gray-800 py-20 px-6 md:px-12">

        {/* Encabezado */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl mb-4 font-normal">
            Sin riesgos: paga únicamente por resultados reales.
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 font-light">
            Siempre: Gratis hasta que aumentemos sus ventas un 5%
          </p>
        </div>

        {/* Tabla de precios */}
        <section className="mb-10 max-w-5xl mx-auto">
          <h3 className="text-3xl mb-6 text-center font-normal">
            Planes por Volumen de Clientes
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-white text-gray-700">
                  <th className="p-4 font-normal">Nuevos clientes al mes</th>
                  <th className="p-4 font-normal">Precio por cliente</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                <tr className="border-b border-gray-300">
                  <td className="p-4 font-light">1–100 clientes</td>
                  <td className="p-4 font-light">0,60 € / cliente</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-4 font-light">100–250 clientes</td>
                  <td className="p-4 font-light">0,50 € / cliente</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-4 font-light">250–500 clientes</td>
                  <td className="p-4 font-light">0,45 € / cliente</td>
                </tr>
                <tr>
                  <td className="p-4 font-light">500+ clientes</td>
                  <td className="p-4 font-light">0,30 € / cliente</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* SECCIÓN DE LOS 3 RECUADROS */}
<section className="w-full bg-gray-300 py-16 px-6 md:px-12">
  <div className="max-w-6xl mx-auto">

    <h3 className="text-3xl mb-12 font-normal">
      ¿Cómo contamos los clientes generados?
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* Recuadro 1 */}
      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
        <h4 className="text-2xl mb-4 font-normal">
          1. Datos reales de Google y tu web
        </h4>
        <p className="text-gray-700 mb-4 font-light">
          Cada mes analizamos:
        </p>
        <ul className="space-y-2 text-gray-700 font-light">
          <li>Clics en “Cómo llegar”</li>
          <li>Clics en Llamar</li>
          <li>Visitas al sitio web</li>
          <li>Reservas realizadas</li>
          <li>Búsquedas de marca</li>
        </ul>
      </div>

      {/* Recuadro 2 */}
      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
        <h4 className="text-2xl mb-4 font-normal">
          2. Tu aportación
        </h4>
        <p className="text-gray-700 mb-4 font-light">
          Cada mes solo te pediremos:
        </p>
        <ul className="space-y-2 text-gray-700 font-light">
          <li>¿Has notado más clientes nuevos?</li>
          <li>¿Más mesas?</li>
          <li>¿Más facturación?</li>
          <li>¿Más tickets?</li>
        </ul>
      </div>

      {/* Recuadro 3 */}
      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
        <h4 className="text-2xl mb-4 font-normal">
          3. Resultado final
        </h4>
        <p className="text-gray-700 mb-4 font-light">
          Combinamos:
        </p>
        <ul className="space-y-2 text-gray-700 font-light">
          <li>Crecimiento detectado en Google</li>
          <li>Lo que ves realmente en tu restaurante</li>
        </ul>
      </div>

    </div>
  </div>
</section>


      {/* SECCIÓN BENEFICIOS */}
      <section className="bg-blue-200 w-full py-20 px-6 md:px-12 text-gray-900">
        <div className="max-w-4xl mx-auto">

          <h3 className="text-3xl mb-6 font-normal">
            Sin riesgos, sin letra pequeña
          </h3>

          <p className="text-gray-700 mb-8 font-light">
            No hay permanencias. No pagas si no vemos crecimiento.
          </p>

          <ul className="list-disc ml-6 text-gray-700 space-y-3 font-light">
            <li>No molesta a tu personal</li>
            <li>Basado en datos reales</li>
            <li>Controlas cuánto pagas</li>
            <li>Total transparencia</li>
          </ul>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="text-center mt-16 pb-20 px-6 md:px-12 bg-blue-100">
        <h3 className="text-3xl mb-4 font-normal">
          Contacta con uno de nuestros especialistas.
        </h3>

        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto font-light">
          Analizamos tu ficha de Google y tu web y te decimos cuántos clientes
          nuevos podemos generar este mes.
        </p>

        <Link
          href="/registro"
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-xl shadow-lg inline-block transition"
        >
          Comenzar gratis
        </Link>
      </section>

    </div>
  );
}
