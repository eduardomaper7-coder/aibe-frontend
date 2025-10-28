export default function ExitoPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">✅ Pago completado con éxito</h1>
      <p className="text-lg">Gracias por tu suscripción. Ya puedes acceder a todas las funciones de AIBE.</p>
      <a
        href="/"
        className="mt-6 text-blue-600 underline hover:text-blue-800"
      >
        Volver al inicio
      </a>
    </div>
  );
}
