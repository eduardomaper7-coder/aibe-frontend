"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function PanelUserFlow({ user }: { user: any }) {

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasPaymentMethod, setHasPaymentMethod] = useState(false);

  const [formData, setFormData] = useState({
    ownerName: "",
    restaurantName: "",
    meetingType: "presencial",
    date: "",
    time: "",
  });

  // ---------------------------------------------------------
  // 🧠 LÓGICA PRINCIPAL
  // ---------------------------------------------------------
  useEffect(() => {
    if (!user) return;

    const loadPaymentStatus = async () => {
      const res = await fetch("/api/payment-method-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await res.json();
      setHasPaymentMethod(data.hasPaymentMethod);

      // ---------------------------------------------------------
      // CASO 1: USUARIO NO APROBADO → mostrar cita
      // ---------------------------------------------------------
      if (!user.approved) {
        setShowModal(true);
        setShowApproved(false);
        setLoading(false);
        return;
      }

      // ---------------------------------------------------------
      // CASO 2: USUARIO APROBADO + YA tiene método de pago
      // → NO mostrar modal Stripe
      // ---------------------------------------------------------
      if (data.hasPaymentMethod) {
        setShowModal(false);
        setShowApproved(false);
        setLoading(false);
        return;
      }

      // ---------------------------------------------------------
      // CASO 3: USUARIO APROBADO + SIN método de pago
      // → mostrar modal Stripe
      // ---------------------------------------------------------
      setShowModal(true);
      setShowApproved(true);
      setLoading(false);
    };

    loadPaymentStatus();
  }, [user]);

  // Mientras carga, evita parpadeos
  if (loading) return null;

  // Validación del formulario de cita
  const isFormValid =
    formData.ownerName.trim() !== "" &&
    formData.restaurantName.trim() !== "" &&
    formData.meetingType.trim() !== "" &&
    formData.date.trim() !== "" &&
    formData.time.trim() !== "";

  // Guardar cita
  const handleConfirm = async () => {
    const { data: currentUser } = await supabase.auth.getUser();
    const userId = currentUser.user?.id;
    if (!userId) return;

    await supabase.from("appointments").insert({
      user_id: userId,
      email: user.email,
      owner_name: formData.ownerName,
      restaurant_name: formData.restaurantName,
      meeting_type: formData.meetingType,
      date: formData.date,
      time: formData.time,
    });

    setShowForm(false);
    setShowApproved(false);
    setShowModal(true);
    setShowSuccess(true);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="bg-white text-black p-8 rounded-2xl shadow-2xl w-full max-w-md">

            {/* --------------- ÉXITO CITA --------------- */}
            {showSuccess && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-3">Cita confirmada con éxito</h2>
                <p className="text-gray-600 mb-4">Muchas gracias</p>

                <p className="text-sm text-gray-500 mb-6">
                  Enviaremos los detalles de la cita al correo:<br />
                  <span className="font-medium">{user?.email}</span>
                </p>

                <button
                  className="px-4 py-3 rounded-xl bg-black text-white w-full"
                  onClick={() => router.push("/")}
                >
                  Volver al inicio
                </button>
              </div>
            )}

            {/* --------------- CUENTA NO APROBADA → CITA --------------- */}
            {!showApproved && !showForm && !showSuccess && (
              <div className="text-center">
                <h2 className="text-xl font-bold mb-2">Tu cuenta está pendiente de aprobación</h2>
                <p className="text-gray-600 mb-6">
                  Confirma una cita con uno de nuestros especialistas.
                </p>

                <button
                  className="px-4 py-2 rounded-xl shadow bg-black text-white w-full mb-4"
                  onClick={() => setShowForm(true)}
                >
                  Programar cita
                </button>

                <button
                  className="text-gray-500 text-sm w-full"
                  onClick={() => router.push("/")}
                >
                  Volver al inicio
                </button>
              </div>
            )}

            {/* --------------- USUARIO APROBADO → STRIPE --------------- */}
            {showApproved && !showForm && !showSuccess && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-6">¡Tu cuenta ha sido aprobada!</h2>

                <div className="text-6xl mb-6">✔️</div>

                <button
                  onClick={async () => {
                    const res = await fetch("/api/checkout", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email: user.email }),
                    });

                    const json = await res.json();
                    if (json.url) window.location.href = json.url;
                  }}
                  className="px-4 py-3 rounded-xl bg-black text-white w-full text-lg shadow"
                >
                  Ir al pago
                </button>
              </div>
            )}

            {/* --------------- FORMULARIO CITA --------------- */}
            {showForm && !showSuccess && (
              <div>
                <h2 className="text-xl font-bold mb-6 text-center">Programar cita</h2>

                <label className="block mb-2 font-medium">Nombre del dueño/a</label>
                <input
                  className="border p-2 w-full rounded mb-4"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                />

                <label className="block mb-2 font-medium">Nombre del restaurante</label>
                <input
                  className="border p-2 w-full rounded mb-4"
                  value={formData.restaurantName}
                  onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                />

                <label className="block mb-2 font-medium">Tipo de cita</label>
                <select
                  className="border p-2 w-full rounded mb-4"
                  value={formData.meetingType}
                  onChange={(e) => setFormData({ ...formData, meetingType: e.target.value })}
                >
                  <option value="presencial">Presencial</option>
                  <option value="meets">Google Meets</option>
                </select>

                <label className="block mb-2 font-medium">Fecha</label>
                <input
                  type="date"
                  className="border p-2 w-full rounded mb-4"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />

                <label className="block mb-2 font-medium">Hora</label>
                <input
                  type="time"
                  className="border p-2 w-full rounded mb-4"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />

                {!isFormValid && (
                  <p className="text-red-500 text-sm mb-4 text-center">
                    Rellena todos los campos
                  </p>
                )}

                <button
                  className={`px-4 py-2 rounded-xl w-full ${
                    isFormValid
                      ? "bg-black text-white cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid}
                  onClick={handleConfirm}
                >
                  Confirmar cita
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
