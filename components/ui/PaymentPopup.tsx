"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    (async () => {
      setLoading(true);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return alert("No session");

      const res = await fetch("/api/stripe/create-setup-intent", {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      const json = await res.json();
      if (json?.clientSecret) setClientSecret(json.clientSecret);
      else alert("Stripe error");
      
      setLoading(false);
    })();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative">
        
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-black">
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Registrar tarjeta
        </h2>

        {loading && <p className="text-center py-4">Cargando…</p>}

        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <SetupForm onClose={onClose} />
          </Elements>
        )}
      </div>
    </div>
  );
}

function SetupForm({ onClose }: { onClose: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    console.log("➡️ Enviando confirmSetup...");

    const result = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
    });

    console.log("📌 Resultado confirmSetup:", result);

    if (result.error) {
      alert(result.error.message);
      setLoading(false);
      return;
    }

    if (result.setupIntent?.status === "succeeded") {
      console.log("🎉 SetupIntent OK, guardando en supabase...");

      const { data: { session } } = await supabase.auth.getSession();
      console.log("SESSION:", session);

      console.log("TOKEN:", session?.access_token);

      const res = await fetch("/api/user/payment-method", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      console.log("📌 Respuesta del endpoint:", res.status);

      const js = await res.json().catch(() => null);
      console.log("📌 JSON devuelto:", js);

      if (!res.ok) {
        alert("ERROR backend 🤯");
        setLoading(false);
        return;
      }

      alert("Tarjeta guardada correctamente 🎉");
      onClose();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-black text-white disabled:opacity-40"
      >
        {loading ? "Guardando..." : "Guardar tarjeta"}
      </button>
    </form>
  );
}
