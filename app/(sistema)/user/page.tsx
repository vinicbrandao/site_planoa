'use client';

import { Suspense } from 'react';
import { User, Mail, Hash, Pencil, Save, ArrowLeft, Shield } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function PerfilConteudo() {
  const searchParams = useSearchParams();
  const cargo = searchParams.get('cargo') || 'Visitante';

  const usuario = {
    id: '20fdnf-fmvrmu-mfdlol20jj',
    nome: 'Vinícius Brandão',
    email: 'vinicius.brandaolis@gmail.com'
  };

  return (
    <div className="flex flex-col h-full bg-[#080818] w-full">
      
      {/* CABEÇALHO */}
      <div className="px-8 py-6 border-b border-white/20 flex justify-between items-center bg-[#0D0D1F] shrink-0">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard?cargo=${cargo || ''}`}>
            <button className="p-2 rounded-full cursor-pointer hover:bg-white/10 text-slate-400 hover:text-white transition" title="Voltar ao Dashboard">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Editar Informações</h1>
            <p className="text-slate-400 text-sm mt-1">Mantenha seus dados atualizados</p>
          </div>
        </div>
        <div className="h-14 w-14 bg-[#1a1a2e] border border-white/10 rounded-full flex items-center justify-center text-blue-400 shrink-0">
          <User size={28} />
        </div>
      </div>

      <div className="p-8 flex-1 overflow-y-auto w-full flex flex-col justify-between">
        <div className="max-w-4xl space-y-8">
          
          {/* Nome */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nome Completo</label>
            <div className="flex items-center gap-4 bg-[#1a1a2e] p-3 rounded-xl border border-white/20 focus-within:border-white/40 focus-within:ring-2 focus-within:ring-white/30 transition group">
              <User className="text-slate-400 group-focus-within:text-blue-400" size={20} />
              <input
                type="text"
                defaultValue={usuario.nome}
                className="flex-1 bg-transparent outline-none text-white font-medium"
              />
              <Pencil size={16} className="text-slate-400 cursor-pointer hover:text-blue-400" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">E-mail Corporativo</label>
            <div className="flex items-center gap-4 bg-[#1a1a2e] p-3 rounded-xl border border-white/20 focus-within:border-white/40 focus-within:ring-2 focus-within:ring-white/30 transition group">
              <Mail className="text-slate-400 group-focus-within:text-blue-400" size={20} />
              <input 
                type="email" 
                defaultValue={usuario.email} 
                className="flex-1 bg-transparent outline-none text-white font-medium" 
              />
              <Pencil size={16} className="text-slate-400 cursor-pointer hover:text-blue-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campo Perfil/Cargo */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Perfil de Acesso</label>
              <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10 opacity-80 cursor-not-allowed">
                <Shield className="text-slate-500" size={20} />
                <span className="flex-1 text-slate-300 font-medium capitalize">{cargo}</span>
                <span className="text-[10px] text-slate-400 font-bold bg-white/10 px-2 py-0.5 rounded uppercase">Leitura</span>
              </div>
            </div>

            {/* Campo ID */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">ID do Sistema</label>
              <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10 opacity-80 cursor-not-allowed">
                <Hash className="text-slate-500" size={20} />
                <span className="flex-1 text-slate-400 font-mono text-sm truncate">{usuario.id}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Rodapé com Botão Salvar (Limpo e integrado ao layout) */}
        <div className="mt-12 max-w-4xl border-t border-white/20 pt-6 flex justify-end">
          <button className="flex items-center gap-2 cursor-pointer bg-[#0B1B40] hover:bg-blue-900 text-white font-medium py-2.5 px-6 rounded-lg transition transform active:scale-95">
            <Save size={18} />
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PerfilPage() {
  return (
    <Suspense fallback={<div className="h-full bg-[#080818] flex items-center justify-center text-slate-400">Carregando informações...</div>}>
      <PerfilConteudo />
    </Suspense>
  );
}