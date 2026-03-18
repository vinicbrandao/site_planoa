'use client';

import { Suspense } from 'react';
import { User, Mail, Hash, Pencil, Save, ArrowLeft, Shield } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Componente externo que usa useSearchParams
function PerfilConteudo() {
  const searchParams = useSearchParams();
  const cargo = searchParams.get('cargo') || 'Visitante';

  const usuario = {
    id: '20fdnf-fmvrmu-mfdlol20jj',
    nome: 'Vinícius Brandão',
    email: 'vinicius.brandaolis@gmail.com'
  };

  return (
    <div className="flex flex-col h-full bg-white w-full">
      
{/* CABEÇALHO (Ocupando toda a largura no topo) */}
      <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-white shrink-0">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard?cargo=${cargo || ''}`}>
            <button className="p-2 rounded-full cursor-pointer hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition" title="Voltar ao Dashboard">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Editar Informações</h1>
            <p className="text-gray-500 text-sm mt-1">Mantenha seus dados atualizados</p>
          </div>
        </div>
        <div className="h-14 w-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-900 shrink-0">
          <User size={28} />
        </div>
      </div>

    <div className="p-8 flex-1 overflow-y-auto w-full">
      <div className="max-w-4xl space-y-6">
          {/* Nome */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nome Completo</label>
            <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition group">
              <User className="text-gray-400 group-focus-within:text-blue-500" size={20} />
              <input
                type="text"
                defaultValue={usuario.nome}
                className="flex-1 bg-transparent outline-none text-gray-900 font-medium"
              />
              <Pencil size={16} className="text-gray-400 cursor-pointer hover:text-blue-600" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">E-mail Corporativo</label>
             <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition group">
                <Mail className="text-gray-400 group-focus-within:text-blue-500" size={20} />
                <input 
                  type="email" 
                  defaultValue={usuario.email} 
                  className="flex-1 bg-transparent outline-none text-gray-900 font-medium" 
                />
                <Pencil size={16} className="text-gray-400 cursor-pointer hover:text-blue-600" />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campo Perfil/Cargo */}
            <div className="space-y-2">
               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Perfil de Acesso</label>
               <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-xl border border-gray-200 opacity-80 cursor-not-allowed">
                  <Shield className="text-gray-500" size={20} />
                  <span className="flex-1 text-gray-700 font-medium capitalize">{cargo}</span>
                  <span className="text-[10px] text-gray-500 font-bold bg-gray-200 px-2 py-0.5 rounded uppercase">Leitura</span>
               </div>
            </div>

            {/* Campo ID */}
            <div className="space-y-2">
               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">ID do Sistema</label>
               <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-xl border border-gray-200 opacity-80 cursor-not-allowed">
                  <Hash className="text-gray-500" size={20} />
                  <span className="flex-1 text-gray-500 font-mono text-sm truncate">{usuario.id}</span>
               </div>
            </div>
          </div>

        </div>

        {/* Rodapé com Seta (Esquerda) e Botão Salvar (Direita) */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <div className="px-8 py-5 bg-gray-50 border-t border-gray-200 flex justify-end items-center shrink-0 w-full">
          <button className="flex items-center gap-2 cursor-pointer bg-[#0B1B40] hover:bg-blue-900 text-white font-medium py-2.5 px-6 rounded-lg transition transform active:scale-95">
            <Save size={18} />
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default function PerfilPage() {
  return (
    <Suspense fallback={null}>
      <PerfilConteudo />
    </Suspense>
  );
}