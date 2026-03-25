'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchParams = useSearchParams();
  const cargo = searchParams.get('cargo');

  return (
    // 1. Trocamos 'h-screen' por 'min-h-screen' e removemos o 'overflow-hidden'
    <div className="flex flex-col min-h-screen bg-[#080818] font-sans">
      <Header 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        cargo={cargo} 
        isSidebarOpen={sidebarOpen}
      />

      {/* 2. Removemos os 'overflow-hidden' das divs filhas também */}
      <div className="flex flex-1">
        <Sidebar 
          isOpen={sidebarOpen} 
          cargo={cargo} 
          onClose={() => setSidebarOpen(false)}
        />
        <main className="flex-1 flex flex-col p-0">
         {children}
        </main>
      </div>
    </div>
  );
}