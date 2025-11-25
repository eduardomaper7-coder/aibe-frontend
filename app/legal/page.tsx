export default function LegalPage() {
  return (
    <section className="bg-gray-100 text-gray-800 py-16 px-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-12">
          Información Legal – AIBE Technologies
        </h1>

        {/* AVISO LEGAL */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Aviso Legal</h2>

          <p><strong>Nombre comercial:</strong> AIBE Technologies (Artificial Intelligence for Business Efficiency)</p>
          <p><strong>Email de contacto:</strong> <a className="text-blue-600" href="mailto:ayuda@aibetech.es">ayuda@aibetech.es</a></p>

          <p className="mt-4">
            El presente Aviso Legal regula el acceso y uso del sitio web y de los servicios ofrecidos por AIBE Technologies.
            El acceso a esta web implica la aceptación plena de los términos expuestos.
          </p>
        </section>

        {/* POLÍTICA DE PRIVACIDAD */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Política de Privacidad</h2>

          <p>
            AIBE Technologies cumple con la normativa vigente de protección de datos. Esta política describe cómo se recopila, usa
            y protege la información personal de los usuarios.
          </p>

          <h3 className="text-xl font-medium mt-6">Responsable del tratamiento</h3>
          <p><strong>AIBE Technologies</strong> — <a className="text-blue-600" href="mailto:ayuda@aibetech.es">ayuda@aibetech.es</a></p>

          <h3 className="text-xl font-medium mt-6">Datos recopilados</h3>
          <ul className="list-disc ml-6">
            <li>Datos identificativos</li>
            <li>Datos de empresa</li>
            <li>Datos técnicos</li>
            <li>Datos necesarios para la prestación del servicio</li>
          </ul>
        </section>

        {/* TÉRMINOS DEL SERVICIO */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Términos del Servicio</h2>

          <p>
            Estos términos regulan el uso de los servicios ofrecidos por AIBE Technologies, incluyendo automatización de reseñas,
            análisis reputacional e informes basados en IA.
          </p>

          <h3 className="text-xl font-medium mt-6">Naturaleza del servicio</h3>
          <p>
            El cliente acepta que los textos generados por IA son automáticos y pueden no representar la opinión del negocio.
          </p>
        </section>

      </div>
    </section>
  );
}
