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
  // Estado que guarda o que o usuário digitou na barra
  const [busca, setBusca] = useState('');

  // O React lê a lista inteira e só guarda quem tiver o nome, email ou perfil igual ao texto buscado
  const usuariosFiltrados = listaUsuarios.filter((usuario) => {
    const textoBuscado = busca.toLowerCase();
    return (
      usuario.nome.toLowerCase().includes(textoBuscado) ||
      usuario.email.toLowerCase().includes(textoBuscado) ||
      usuario.perfil.toLowerCase().includes(textoBuscado)
    );
  });

  return (
    <div className="flex flex-col h-full bg-white relative w-full">
      {/* TÍTULO DA PÁGINA */}
      <div className="bg-[#e6e6e6] border-b border-gray-800 px-6 py-2 flex items-center shrink-0">
        <h1 className="text-2xl font-normal text-black tracking-wide">
          Consulta de Usuários
        </h1>
      </div>

      {/* CONTEÚDO */}
      <div className="p-8 flex-1 overflow-y-auto w-full">
        
        {/* Subtítulo */}
        <div className="mb-6">
          <span className="text-xl text-black border-b border-black pb-1 pr-8 inline-block font-normal">
            Consulte na caixa de pesquisa abaixo
          </span>
        </div>

        {/* 3. BARRA DE PESQUISA */}
        <div className="relative max-w-2xl mb-8">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={20} className="text-gray-500" />
          </div>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)} // Atualiza a busca a cada letra digitada
            placeholder="Buscar por nome, e-mail ou perfil..."
            className="w-full bg-[#e6e6e6] border border-black pl-10 pr-4 py-2.5 outline-none text-black focus:ring-1 focus:ring-black"
          />
        </div>

        {/* 4. TABELA DE RESULTADOS */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-black min-w-[800px]">
            <thead>
              <tr className="bg-[#e6e6e6] border-b border-black">
                <th className="p-3 border-r border-black font-medium text-black">Nome</th>
                <th className="p-3 border-r border-black font-medium text-black">E-mail</th>
                <th className="p-3 border-r border-black font-medium text-black">Perfil</th>
                <th className="p-3 border-r border-black font-medium text-black text-center w-32">Status</th>
                <th className="p-3 font-medium text-black text-center w-28">Ações</th>
              </tr>
            </thead>
            <tbody>
              {/* O map agora roda na lista FILTRADA, e não na lista original! */}
              {usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id} className="border-b border-black hover:bg-gray-50 transition-colors">
                    <td className="p-3 border-r border-black text-black">{usuario.nome}</td>
                    <td className="p-3 border-r border-black text-black">{usuario.email}</td>
                    <td className="p-3 border-r border-black text-black">{usuario.perfil}</td>
                    
                    {/* Status com as "Pílulas" coloridas */}
                    <td className="p-3 border-r border-black text-center">
                      <span className={`inline-block px-3 py-0.5 rounded-full text-sm font-medium border ${
                        usuario.status === 'Ativo' 
                          ? 'bg-green-100 text-green-700 border-green-500' 
                          : 'bg-red-100 text-red-700 border-red-500'
                      }`}>
                        {usuario.status}
                      </span>
                    </td>
                    
                    {/* Botões de Ação (Editar) */}
                    <td className="p-3 text-center">
                      <div className="flex justify-center items-center gap-3">
                        {/* 👇 2. O botão virou um <Link> apontando para a página de edição 👇 */}
                        <Link 
                          href={`/usuarios/editar_user?id=${usuario.id}`} 
                          className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer block p-1" 
                        >
                          <Edit size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                // Se a busca não encontrar ninguém, mostra essa mensagem:
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500 font-medium">
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