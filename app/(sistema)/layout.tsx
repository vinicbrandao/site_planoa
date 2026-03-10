import { ReactNode } from "react";
import { DashboardShell } from "@/components/DashboardShell";

export default function SistemaLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DashboardShell>
      {children}
    </DashboardShell>
  );
}