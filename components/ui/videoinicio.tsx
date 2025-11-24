import React from "react";

const VideoInicio: React.FC = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center py-20 bg-black"
      aria-label="Video dentro de pantalla de ordenador"
    >
      {/* 💻 DESKTOP — Marco del ordenador */}
      <div className="relative hidden md:flex bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.6)] border border-slate-700 items-center justify-center p-4 md:p-6">
        {/* Pantalla interior */}
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-inner">
          <video
            className="max-w-full max-h-[80vh] object-contain rounded-xl"
            src="/videos/1111.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Cámara superior */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-500 rounded-full opacity-70" />
      </div>

      {/* 📱 MÓVIL — Video simple con controles */}
      <div className="flex md:hidden w-full px-4 mt-6">
        <video
          src="/videos/1111.mp4"
          controls
          playsInline
          className="w-full rounded-xl shadow-lg"
          style={{ maxHeight: "70vh" }}
        />
      </div>
    </section>
  );
};

export default VideoInicio;




