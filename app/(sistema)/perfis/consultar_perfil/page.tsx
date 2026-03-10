'use client';

import { Search, Edit, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

// "BANCO DE DADOS" SINCRONIZADO
// Os IDs '1', '2' e '3' agora batem exatamente com os IDs da tela de Editar Usuário!
const listaPerfis = [
  { 
    id: '1', 
    nome: 'Administrador', 
    usuarios: [
      { id: '1', nome: 'Vinícius Brandão' }, // ID 1 = Vai carregar o Vinícius
      { id: '102', nome: 'Allef' } // ID 102 não existe lá, então a tela abrirá vazia
    ] 
  },
  { 
    id: '2', 
    nome: 'Engenheiro Civil', 
    usuarios: [
      { id: '2', nome: 'João da Silva' }, // ID 2 = Vai carregar o João
      { id: '105', nome: 'Fernanda Lima' },
      { id: '106', nome: 'Marcos Paulo' },
      { id: '107', nome: 'Roberto Alves' },
    ] 
  },
  { 
    id: '4', 
    nome: 'Arquiteto', 
    usuarios: [
      { id: '3', nome: 'Maria Souza' }, // ID 3 = Vai carregar a Maria
      { id: '112', nome: 'Camila Mendes' },
      { id: '113', nome: 'Rodrigo Faro' },
    ] 
  },
];

export default function ConsultarPerfil() {
  const [busca, setBusca] = useState('');
  
  // ESTADO: Guarda qual perfil foi clicado para abrir o pop-up
  const [perfilAberto, setPerfilAberto] = useState<any | null>(null);

  // Filtro Dinâmico
  const perfisFiltrados = listaPerfis.filter((perfil) =>
    perfil.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white relative w-full">
      
      {/* CABEÇALHO */}
      <div className="bg-[#e6e6e6] border-b border-gray-800 px-6 py-2 flex items-center shrink-0">
        <h1 className="text-2xl font-normal text-black tracking-wide">
          Consultar Perfis de Usuário
        </h1>
      </div>

      {/* CONTEÚDO */}
      <div className="p-8 flex-1 overflow-y-auto w-full pt-6">
        
        <div className="mb-6">
          <span className="text-xl text-black border-b border-gray-400 pb-1 pr-16 inline-block font-normal">
            Informações Gerais
          </span>
        </div>

        {/* BARRA DE PESQUISA */}
        <div className="relative max-w-2xl mb-8">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={20} className="text-gray-500" strokeWidth={1.5} />
          </div>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar perfil pelo nome..."
            className="w-full bg-[#e6e6e6] border border-black pl-10 pr-4 py-2.5 outline-none text-black font-normal focus:ring-1 focus:ring-black"
          />
        </div>

        {/* TABELA DE RESULTADOS */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse border border-black min-w-[800px]">
            <thead>
              <tr className="bg-[#e6e6e6] border-b border-black">
                <th className="p-3 border-r border-black font-medium text-black">Nome do Perfil</th>
                <th className="p-3 border-r border-black font-medium text-black text-center w-64">Usuários Vinculados</th>
                <th className="p-3 font-medium text-black text-center w-32">Ações</th>
              </tr>
            </thead>
            <tbody>
              {perfisFiltrados.length > 0 ? (
                perfisFiltrados.map((perfil) => (
                  <tr key={perfil.id} className="border-b border-black hover:bg-gray-50 transition-colors">
                    
                    {/* NOME DO PERFIL */}
                    <td className="p-3 border-r border-black text-black font-normal">
                      {perfil.nome}
                    </td>
                    
                    {/* USUÁRIOS VINCULADOS (Abre o Pop-up) */}
                    <td className="p-3 border-r border-black text-center">
                      <span 
                        onClick={() => setPerfilAberto(perfil)}
                        className="text-blue-600 font-medium hover:underline cursor-pointer transition-all"
                        title="Ver usuários"
                      >
                        {perfil.usuarios.length}
                      </span>
                    </td>

                    {/* AÇÕES (Editar Perfil) */}
                    <td className="p-3 text-center">
                      <div className="flex justify-center items-center gap-3">
                        <Link 
                          href={`/perfis/editar_perfil?id=${perfil.id}`} 
                          className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer block p-1" 
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
                  <td colSpan={3} className="p-8 text-center text-gray-500 font-normal">
                    Nenhum perfil encontrado para "{busca}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ========================================================= */}
        {/* POP-UP DE DETALHES DOS USUÁRIOS VINCULADOS                */}
        {/* ========================================================= */}
        {perfilAberto && (
          <div className="max-w-4xl border border-black bg-[#f9f9f9] shadow-md p-6 relative animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Botão de Fechar */}
            <button 
              onClick={() => setPerfilAberto(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
              title="Fechar"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            <h2 className="text-xl font-medium text-black mb-4 border-b border-gray-300 pb-2">
              Usuários Vinculados: <span className="font-normal">{perfilAberto.nome}</span>
            </h2>

            {/* Lista dos Usuários */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 max-h-60 overflow-y-auto pr-4">
              {perfilAberto.usuarios.map((user: any) => (
                <li key={user.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0 hover:bg-white transition-colors px-2">
                  <span className="text-black font-normal">{user.nome}</span>
                  
                  {/* 👇 O LINK MÁGICO PARA EDITAR USUÁRIO 👇 */}
                  <Link 
                    href={`/usuarios/editar_user?id=${user.id}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer p-1" 
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