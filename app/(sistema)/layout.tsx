import { ReactNode, Suspense } from "react";
import { DashboardShell } from "@/components/DashboardShell";

export default function SistemaLayout({ children }: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <DashboardShell>
        {children}
      </DashboardShell>
    </Suspense>
  );
}