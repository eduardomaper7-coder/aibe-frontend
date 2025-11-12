// components/ui/comparativademo.tsx
import SentimientoDemo from '@/components/ui/sentimientodemo';
import VolumenDemo from '@/components/ui/volumendemo';

export default function ComparativaDemo() {
  return (
    // Sección combinada: Sentimiento + Volumen (ancho extendido)
    <section className="bg-black py-10">
      {/* contenedor full width visual, pero mantiene límites elegantes */}
      <div className="mx-auto w-[95vw] max-w-[1600px] px-2 md:px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Sentimiento */}
          <div className="flex justify-center w-full">
            <SentimientoDemo />
          </div>

          {/* Volumen */}
          <div className="flex justify-center w-full">
            <VolumenDemo />
          </div>
        </div>
      </div>
    </section>
  );
}

