import PanelHeader from "./PanelHeader";
import Providers from "@/app/providers";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="min-h-screen bg-white text-black">
        <PanelHeader />
        {children}
      </div>
    </Providers>
  );
}