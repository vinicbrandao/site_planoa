'use client';

import { Search, Edit, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { IPerfil, IUsuarioPerfil } from '@/lib/types';

// "BANCO DE DADOS" SINCRONIZADO
const listaPerfis = [
  { 
    id: '1', 
    nome: 'Administrador', 
    usuarios: [
      { id: '1', nome: 'Vinícius Brandão' }, 
      { id: '102', nome: 'Allef' } 
    ] 
  },
  { 
    id: '2', 
    nome: 'Engenheiro Civil', 
    usuarios: [
      { id: '2', nome: 'João da Silva' }, 
      { id: '105', nome: 'Fernanda Lima' },
      { id: '106', nome: 'Marcos Paulo' },
      { id: '107', nome: 'Roberto Alves' },
    ] 
  },
  { 
    id: '4', 
    nome: 'Arquiteto', 
    usuarios: [
      { id: '3', nome: 'Maria Souza' }, 
      { id: '112', nome: 'Camila Mendes' },
      { id: '113', nome: 'Rodrigo Faro' },
    ] 
  },
];

export default function ConsultarPerfil() {
  const [busca, setBusca] = useState('');
  
  // ESTADO: Guarda qual perfil foi clicado para abrir o pop-up
  const [perfilAberto, setPerfilAberto] = useState<IPerfil | null>(null);

  // Filtro Dinâmico
  const perfisFiltrados = listaPerfis.filter((perfil) =>
    perfil.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#080818] relative w-full">
      
      {/* CABEÇALHO */}
      <div className="bg-[#0D0D1F] border-b border-white/20 px-6 py-2 flex items-center shrink-0">
        <h1 className="text-2xl font-normal text-white tracking-wide">
          Consultar Perfis de Usuário
        </h1>
      </div>

      {/* CONTEÚDO */}
      <div className="p-8 flex-1 overflow-y-auto w-full pt-6">
        
        <div className="mb-6">
          <span className="text-white border-b border-white/20 pb-1 pr-16 inline-block font-normal">
            Informações Gerais
          </span>
        </div>

        {/* BARRA DE PESQUISA */}
        <div className="relative max-w-2xl mb-8">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={20} className="text-slate-400" strokeWidth={1.5} />
          </div>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar perfil pelo nome..."
            className="w-full bg-[#1a1a2e] border border-white/20 text-white focus:ring-white/30 placeholder-slate-500 rounded-lg pl-10 pr-4 py-2.5 outline-none"
          />
        </div>

        {/* TABELA DE RESULTADOS (Corrigida para Tema Escuro) */}
        <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#0D0D1F]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 border-r border-white/10 font-medium text-slate-300">Nome do Perfil</th>
                <th className="p-4 border-r border-white/10 font-medium text-slate-300 text-center w-64">Usuários Vinculados</th>
                <th className="p-4 font-medium text-slate-300 text-center w-32">Ações</th>
              </tr>
            </thead>
            <tbody>
              {perfisFiltrados.length > 0 ? (
                perfisFiltrados.map((perfil) => (
                  <tr key={perfil.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    
                    {/* NOME DO PERFIL */}
                    <td className="p-4 border-r border-white/10 text-slate-200 font-normal">
                      {perfil.nome}
                    </td>
                    
                    {/* USUÁRIOS VINCULADOS (Abre o Pop-up) */}
                    <td className="p-4 border-r border-white/10 text-center">
                      <span 
                        onClick={() => setPerfilAberto(perfil)}
                        className="text-blue-400 font-medium hover:text-blue-300 hover:underline cursor-pointer transition-all"
                        title="Ver usuários"
                      >
                        {perfil.usuarios.length}
                      </span>
                    </td>

                    {/* AÇÕES (Editar Perfil) */}
                    <td className="p-4 text-center">
                      <div className="flex justify-center items-center gap-3">
                        <Link 
                          href={`/perfis/editar_perfil?id=${perfil.id}`} 
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-colors cursor-pointer rounded-md block p-2" 
                          title={`Editar ${perfil.nome}`}
                        >
                          <Edit size={18} strokeWidth={1.5} />
                        </Link>
                      </div>
                    </td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-slate-500 font-normal">
                    Nenhum perfil encontrado para "{busca}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ========================================================= */}
        {/* POP-UP DE DETALHES DOS USUÁRIOS (Corrigido para Tema Escuro)*/}
        {/* ========================================================= */}
        {perfilAberto && (
          <div className="mt-8 max-w-4xl border border-white/10 rounded-xl bg-[#0D0D1F] shadow-xl p-6 relative animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Botão de Fechar */}
            <button 
              onClick={() => setPerfilAberto(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors cursor-pointer bg-transparent"
              title="Fechar"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            <h2 className="text-xl font-medium text-white mb-4 border-b border-white/20 pb-3">
              Usuários Vinculados: <span className="font-normal text-blue-400">{perfilAberto.nome}</span>
            </h2>

            {/* Lista dos Usuários */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 max-h-60 overflow-y-auto pr-4">
              {perfilAberto.usuarios.map((user: IUsuarioPerfil) => (
                <li key={user.id} className="flex justify-between items-center py-2.5 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors px-3 rounded-md">
                  <span className="text-slate-200 font-normal">{user.nome}</span>
                  
                  {/* LINK PARA EDITAR USUÁRIO */}
                  <Link 
                    href={`/usuarios/editar_user?id=${user.id}`}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-colors cursor-pointer p-2 rounded-md" 
                    title={`Editar ${user.nome}`}
                  >
                    <Edit size={16} strokeWidth={1.5} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}