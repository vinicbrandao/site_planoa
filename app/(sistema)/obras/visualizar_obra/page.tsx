'use client';

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { IObra, IUsuario } from '@/lib/types';

// ====================================================
// BANCOS DE DADOS FAKE
// ====================================================
const usuariosDoSistema = [
  { id: '101', nome: 'Vinícius Brandão', perfil: 'Administrador', email: 'vinicius@planoa.com', status: 'Ativo' },
  { id: '102', nome: 'João da Silva', perfil: 'Engenheiro Civil', email: 'joao@gmail.com', status: 'Ativo' },
  { id: '103', nome: 'Maria Souza', perfil: 'Arquiteto', email: 'maria@planoa.com', status: 'Inativo' },
  { id: '104', nome: 'Carlos Eduardo', perfil: 'Engenheiro Civil', email: 'carlos@gmail.com', status: 'Ativo' },
  { id: '105', nome: 'Fernanda Lima', perfil: 'Arquiteto', email: 'fernanda@planoa.com', status: 'Ativo' },
  { id: '106', nome: 'Allef', perfil: 'Engenheiro de Software', email: 'allef@planoa.com', status: 'Ativo' },
];

const obrasDoSistema = [
  { id: '1', nome: 'City Park', codigoSienge: '128', status: 'Ativo', categoria: 'Comercial', inicioObra: '2026-03-05', fimObra: 'Não definido', local: 'Rua Principal, 100', usuarios: [usuariosDoSistema[0], usuariosDoSistema[5]] },
  { id: '2', nome: 'Residencial Flores', codigoSienge: '129', status: 'Inativo', categoria: 'Residencial', inicioObra: '2025-01-10', fimObra: '2025-12-20', local: 'Av. das Flores, 500', usuarios: [usuariosDoSistema[1]] },
  { id: '3', nome: 'Ponte JK', codigoSienge: '130', status: 'Ativo', categoria: 'Infraestrutura', inicioObra: '2026-01-15', fimObra: 'Não definido', local: 'Rodovia BR-101', usuarios: [] }
];

export default function VisualizarObra() {
  const [buscaObraPrincipal, setBuscaObraPrincipal] = useState('');
  const [obraSelecionada, setObraSelecionada] = useState<IObra | null>(null);
  const [mostrarTabelaUsuarios, setMostrarTabelaUsuarios] = useState(false);

  const obrasFiltradas = buscaObraPrincipal.trim() === '' ? [] : obrasDoSistema.filter(obra =>
    obra.nome.toLowerCase().includes(buscaObraPrincipal.toLowerCase()) ||
    obra.codigoSienge.includes(buscaObraPrincipal)
  );

  const handleSelecionarObra = (obra: any) => {
    setObraSelecionada(obra);
    setMostrarTabelaUsuarios(false);
    setBuscaObraPrincipal('');
  };

  const CampoSomenteLeitura = ({ label, valor }: { label: string, valor: string }) => (
    <div className="w-full">
      <label className="block text-white text-sm mb-1">{label}</label>
      <div className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-slate-300 min-h-[42px] flex items-center cursor-default select-all rounded-md">
        {valor || '-'}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#080818] relative w-full">
      
      {/* CABEÇALHO */}
      <div className="bg-[#0D0D1F] border-b border-white/20 px-6 py-3 flex items-center shrink-0">
        <h1 className="text-2xl font-normal text-white tracking-wide">Visualizar Obra</h1>
      </div>

      <div className="p-8 flex-1 overflow-y-auto w-full pt-6">
        
        {/* BARRA DE PESQUISA */}
        <div className="mb-12 max-w-5xl">
          <label className="block text-white text-sm mb-1">
            Localizar Obra para Visualização:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              value={buscaObraPrincipal}
              onChange={(e) => setBuscaObraPrincipal(e.target.value)}
              placeholder="Digite o nome ou código Sienge da obra..."
              className="w-full bg-[#1a1a2e] border border-white/20 pl-10 pr-4 py-2 text-white outline-none focus:ring-1 focus:ring-white/30 rounded-md placeholder-slate-500"
            />
            {obrasFiltradas.length > 0 && (
              <div className="absolute z-20 w-full mt-1 bg-[#1a1a2e] border border-white/20 max-h-60 overflow-y-auto rounded-md shadow-xl">
                {obrasFiltradas.map((obra) => (
                  <div 
                    key={obra.id}
                    onClick={() => handleSelecionarObra(obra)}
                    className="px-4 py-3 hover:bg-white/10 cursor-pointer border-b border-white/10 last:border-b-0 transition-colors flex justify-between items-center text-white"
                  >
                    <span>{obra.nome}</span>
                    <span className="text-slate-400 text-sm">Cód: {obra.codigoSienge}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* INFORMAÇÕES DA OBRA (Opacidade controlada pela seleção) */}
        <div className={`transition-opacity duration-300 pb-24 ${!obraSelecionada ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
          <div className="mb-6">
            <span className="text-xl text-white border-b border-white/20 pb-1 pr-16 inline-block font-normal">
              Informações Gerais {obraSelecionada && <span className="ml-1 text-blue-400">({obraSelecionada.nome})</span>}
            </span>
          </div>

          <div className="max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex-1 flex flex-col gap-6">
                <CampoSomenteLeitura label="Nome:" valor={obraSelecionada?.nome || ''} />
                <CampoSomenteLeitura label="Categoria:" valor={obraSelecionada?.categoria || ''} />
                <CampoSomenteLeitura label="Local:" valor={obraSelecionada?.local || ''} />
                <div>
                  <label className="block text-white text-sm mb-1">Usuários:</label>
                  <div 
                    onClick={() => setMostrarTabelaUsuarios(!mostrarTabelaUsuarios)} 
                    className="w-full h-[42px] bg-[#1a1a2e] border border-white/20 px-3 text-slate-300 flex items-center justify-between select-none text-sm cursor-pointer hover:bg-white/10 transition-colors rounded-md"
                  >
                    <span>{!obraSelecionada || obraSelecionada.usuarios.length === 0 ? "Nenhum usuário vinculado a esta obra" : `${obraSelecionada.usuarios.length} usuário(s) vinculado(s)`}</span>
                    {mostrarTabelaUsuarios ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-80 flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="flex-1"><CampoSomenteLeitura label="Código Sienge:" valor={obraSelecionada?.codigoSienge || ''} /></div>
                  <div className="flex-1"><CampoSomenteLeitura label="Status:" valor={obraSelecionada?.status || ''} /></div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1"><CampoSomenteLeitura label="Início da obra:" valor={obraSelecionada?.inicioObra || ''} /></div>
                  <div className="flex-1"><CampoSomenteLeitura label="Fim da obra:" valor={obraSelecionada?.fimObra || ''} /></div>
                </div>
              </div>
            </div>

            {/* TABELA DE USUÁRIOS VINCULADOS */}
            {mostrarTabelaUsuarios && obraSelecionada && (
              <div className="mt-10 max-w-5xl animate-in slide-in-from-top-4 fade-in duration-300">
                <span className="block text-white text-base mb-4 border-b border-white/20 pb-1 pr-16 inline-block font-normal">Lista de Usuários Vinculados:</span>
                
                {obraSelecionada.usuarios.length > 0 ? (
                  <div className="border border-white/10 overflow-x-auto rounded-lg bg-[#0D0D1F]">
                    <table className="w-full text-left border-collapse min-w-max">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/10">
                          <th className="p-3 font-medium text-slate-300 border-r border-white/10">Nome</th>
                          <th className="p-3 font-medium text-slate-300 border-r border-white/10">E-mail</th>
                          <th className="p-3 font-medium text-slate-300 border-r border-white/10">Perfil</th>
                          <th className="p-3 font-medium text-slate-300 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {obraSelecionada.usuarios.map((u: IUsuario) => (
                          <tr key={u.id} className="border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors">
                            <td className="p-3 text-slate-200 border-r border-white/10">{u.nome}</td>
                            <td className="p-3 text-slate-400 border-r border-white/10">{u.email}</td>
                            <td className="p-3 text-slate-300 border-r border-white/10">{u.perfil}</td>
                            <td className="p-3 text-center">
                              <span className={`text-xs px-3 py-1 rounded-full border ${u.status === 'Ativo' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 'text-red-400 border-red-500/20 bg-red-500/10'}`}>
                                {u.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="border border-white/20 border-dashed p-8 text-center text-slate-400 bg-white/5 rounded-lg">
                    Nenhum usuário vinculado a esta obra.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}