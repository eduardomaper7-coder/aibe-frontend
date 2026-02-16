import PanelHeader from "./PanelHeader";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <PanelHeader />
      {children}
    </div>
  );
}
