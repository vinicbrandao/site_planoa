'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  // O estado geral que dita se a sidebar tá aberta ou não
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const searchParams = useSearchParams();
  const cargo = searchParams.get('cargo');

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans overflow-hidden">
      
      {/* HEADER recebe a função de inverter o state da sidebar ao clicar no menu */}
      <Header 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        cargo={cargo} 
      />

      {/* ÁREA INFERIOR (Sidebar + Main Content) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR recebe o estado atual para saber se fica com largura 64 ou 0 */}
        <Sidebar 
          isOpen={sidebarOpen} 
          cargo={cargo} 
        />

        {/* === ÁREA PRINCIPAL === */}
        <main className="flex-1 overflow-hidden flex flex-col bg-gray-50 p-0">
         {children}
        </main>
      </div>
    </div>
  );
}