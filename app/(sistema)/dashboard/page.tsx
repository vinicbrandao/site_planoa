'use client'; 

import { useSearchParams } from 'next/navigation';
import { ChevronDown, Filter } from 'lucide-react';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const cargo = searchParams.get('cargo');

  return (
    // Note que não temos mais a tag <DashboardShell> aqui!
    // Usamos apenas uma <div> comum para organizar o conteúdo interno com um padding (p-6)
    <div className="p-6 h-full flex flex-col gap-6 overflow-y-auto w-full">
      
      {/* Botão de Filtro Global */}
        <div className="w-full bg-gray-200 h-12 rounded-lg mb-8 flex items-center px-4 shadow-sm border border-gray-300">
           <span className="text-gray-700 text-sm flex items-center gap-2 cursor-pointer font-bold">
             <Filter size={18} /> Filtro Global <ChevronDown size={16} />
           </span>
        </div>

      {/* Grid Superior: Visão Geral e Detalhes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6 min-h-[300px]">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Visão Geral</h2>
          {/* O conteúdo do seu gráfico ou tabela vai aqui */}
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border p-6 min-h-[300px]">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Detalhes</h2>
          {/* O conteúdo lateral de detalhes vai aqui */}
        </div>
      </div>

      {/* Grid Inferior: Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6">
        <div className="bg-white rounded-xl shadow-sm border p-6 min-h-[150px]">
          <h3 className="text-md font-medium text-gray-600">Indicador 1</h3>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6 min-h-[150px]">
          <h3 className="text-md font-medium text-gray-600">Indicador 2</h3>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-6 min-h-[150px]">
          <h3 className="text-md font-medium text-gray-600">Indicador 3</h3>
        </div>
      </div>

    </div>
  );
}