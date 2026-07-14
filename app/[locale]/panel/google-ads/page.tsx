import GoogleAdsIntro from "./GoogleAdsIntro";
import GoogleAdsResultados from "./GoogleAdsResultados";
import GoogleAdsPilares from "./GoogleAdsPilares";
import GoogleAdsServicios from "./GoogleAdsServicios";
import GoogleAdsProceso from "./GoogleAdsProceso";

export default function GoogleAdsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto w-full max-w-[1500px] space-y-16">
        <GoogleAdsIntro />
        <GoogleAdsResultados />
        <GoogleAdsProceso />
      </div>
    </main>
  );
}