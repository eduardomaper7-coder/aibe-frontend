'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data?.error || 'Error al enviar el mensaje.');
        setLoading(false);
        return;
      }

      alert('✅ Mensaje enviado correctamente. ¡Gracias por contactarnos!');
      setForm({ nombre: '', email: '', mensaje: '' });
    } catch (error) {
      alert('Error al enviar el mensaje.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0a2239] to-[#0e3a5c] relative overflow-hidden">
      {/* Nombre de la empresa */}
      

      <div className="text-center mb-10 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Pregunta lo que quieras
        </h1>
        <p className="text-gray-200 text-lg">Formulario de contacto</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto"
      >
        <div className="mb-5">
          <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            value={form.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder="Tu nombre"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder="tu@correo.com"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-2">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            required
            rows={4}
            value={form.mensaje}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder="Escribe tu mensaje aquí..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-md bg-gradient-to-r from-blue-800 to-blue-600 text-white font-semibold text-lg hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </form>

      <footer className="mt-12 text-gray-400 text-sm text-center pb-8">
        © {new Date().getFullYear()} AIBE Technologies. Todos los derechos reservados.
      </footer>
    </main>
  );
}


