"use client";

import StripeProvider from "@/components/ui/StripeProvider";
import CardForm from "@/components/ui/CardForm";

export default function AddCardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Añadir método de pago
        </h1>

        <StripeProvider>
          <CardForm />
        </StripeProvider>
      </div>
    </div>
  );
}
