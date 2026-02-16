// app/[locale]/panel/layout.tsx
import PanelHeader from "./PanelHeader";
import PanelShell from "./PanelShell";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <PanelShell>
      <div className="min-h-screen bg-white text-black">
        <PanelHeader />
        {children}
      </div>
    </PanelShell>
  );
}
