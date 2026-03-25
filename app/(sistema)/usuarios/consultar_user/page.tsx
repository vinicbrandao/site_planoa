'use client';

import { Search, Edit } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const listaUsuarios = [
  { id: 1, nome: 'Vinícius Brandão', email: 'vinicius@planoa.com', perfil: 'Administrador', status: 'Ativo' },
  { id: 2, nome: 'João da Silva', email: 'joaodasilva@gmail.com', perfil: 'Engenheiro Civil', status: 'Ativo' },
  { id: 3, nome: 'Maria Souza', email: 'maria.souza@planoa.com', perfil: 'Arquiteto', status: 'Inativo' },
];

export default function ConsultarUsuario() {
  const [busca, setBusca] = useState('');

  const usuariosFiltrados = listaUsuarios.filter((usuario) => {
    const textoBuscado = busca.toLowerCase();
    return (
      usuario.nome.toLowerCase().includes(textoBuscado) ||
      usuario.email.toLowerCase().includes(textoBuscado) ||
      usuario.perfil.toLowerCase().includes(textoBuscado)
    );
  });

  return (
    <div className="flex flex-col h-full bg-[#080818] relative w-full">
      {/* HEADER INTEGRADO */}
      <div className="bg-[#0D0D1F] border-b border-white/20 px-6 py-2 flex items-center shrink-0">
        <h1 className="text-2xl font-normal text-white tracking-wide">
          Consulta de Usuários
        </h1>
      </div>

      <div className="p-8 flex-1 overflow-y-auto w-full">
        
        <div className="mb-6">
          <span className="text-xl text-white border-b border-white/20 pb-1 pr-8 inline-block font-normal">
            Consulte na caixa de pesquisa abaixo
          </span>
        </div>

        {/* BARRA DE PESQUISA */}
        <div className="relative max-w-2xl mb-8">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={20} className="text-slate-400" />
          </div>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome, e-mail ou perfil..."
            className="w-full bg-[#1a1a2e] border border-white/20 pl-10 pr-4 py-2.5 outline-none text-white focus:ring-1 focus:ring-white/30 placeholder-slate-500 rounded-lg"
          />
        </div>

        {/* TABELA DE RESULTADOS */}
        <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#0D0D1F]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 border-r border-white/10 font-medium text-slate-300">Nome</th>
                <th className="p-4 border-r border-white/10 font-medium text-slate-300">E-mail</th>
                <th className="p-4 border-r border-white/10 font-medium text-slate-300">Perfil</th>
                <th className="p-4 border-r border-white/10 font-medium text-slate-300 text-center w-32">Status</th>
                <th className="p-4 font-medium text-slate-300 text-center w-28">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="p-4 border-r border-white/10 text-slate-200">{usuario.nome}</td>
                    <td className="p-4 border-r border-white/10 text-slate-400">{usuario.email}</td>
                    <td className="p-4 border-r border-white/10 text-slate-300">{usuario.perfil}</td>
                    
                    {/* Pílulas de Status */}
                    <td className="p-4 border-r border-white/10 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                        usuario.status === 'Ativo' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {usuario.status}
                      </span>
                    </td>
                    
                    {/* Botões de Ação */}
                    <td className="p-4 text-center">
                      <div className="flex justify-center items-center">
                        <Link 
                          href={`/usuarios/editar_user?id=${usuario.id}`} 
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-2 rounded-md transition-all cursor-pointer inline-flex"
                          title="Editar Usuário"
                        >
                          <Edit size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">
                    Nenhum usuário encontrado para '{busca}'
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}