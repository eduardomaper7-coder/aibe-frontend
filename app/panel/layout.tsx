// app/panel/layout.tsx
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
}
