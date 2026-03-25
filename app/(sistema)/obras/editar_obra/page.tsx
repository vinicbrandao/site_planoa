'use client';

import { useState } from 'react';
import { Save, CheckCircle2, Plus, X, Search, User, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

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
  { id: '1', nome: 'City Park', codigoSienge: '128', status: 'Ativo', categoria: 'Comercial', inicioObra: '2026-03-05', fimObra: '', local: 'Rua Principal, 100', usuarios: [usuariosDoSistema[0], usuariosDoSistema[5]] },
  { id: '2', nome: 'Residencial Flores', codigoSienge: '129', status: 'Inativo', categoria: 'Residencial', inicioObra: '2025-01-10', fimObra: '2025-12-20', local: 'Av. das Flores, 500', usuarios: [usuariosDoSistema[1]] },
  { id: '3', nome: 'Ponte JK', codigoSienge: '130', status: 'Ativo', categoria: 'Infraestrutura', inicioObra: '2026-01-15', fimObra: '', local: 'Rodovia BR-101', usuarios: [] }
];

export default function EditarObra() {
  const [buscaObraPrincipal, setBuscaObraPrincipal] = useState('');
  const [obraSelecionadaParaEdicao, setObraSelecionadaParaEdicao] = useState<any>(null);

  const [nome, setNome] = useState('');
  const [codigoSienge, setCodigoSienge] = useState('');
  const [status, setStatus] = useState('Ativo');
  const [categoria, setCategoria] = useState('');
  const [inicioObra, setInicioObra] = useState('');
  const [fimObra, setFimObra] = useState('');
  const [local, setLocal] = useState('');
  const [usuariosVinculados, setUsuariosVinculados] = useState<any[]>([]);
  const [mostrarTabelaUsuarios, setMostrarTabelaUsuarios] = useState(false);

  const [buscaUser, setBuscaUser] = useState('');
  const [userSelecionadoParaAdd, setUserSelecionadoParaAdd] = useState<any | null>(null);

  const [modalSalvarObraAberto, setModalSalvarObraAberto] = useState(false);
  const [modalSucessoObraAberto, setModalSucessoObraAberto] = useState(false);
  const [modalIncluirUserAberto, setModalIncluirUserAberto] = useState(false);
  const [modalConfirmarUserAberto, setModalConfirmarUserAberto] = useState(false);
  const [modalSucessoUserAberto, setModalSucessoUserAberto] = useState(false);

  const obrasFiltradas = buscaObraPrincipal.trim() === '' ? [] : obrasDoSistema.filter(obra =>
    obra.nome.toLowerCase().includes(buscaObraPrincipal.toLowerCase()) ||
    obra.codigoSienge.includes(buscaObraPrincipal)
  );

  const handleSelecionarObra = (obra: any) => {
    setObraSelecionadaParaEdicao(obra);
    setNome(obra.nome);
    setCodigoSienge(obra.codigoSienge);
    setStatus(obra.status);
    setCategoria(obra.categoria);
    setInicioObra(obra.inicioObra);
    setFimObra(obra.fimObra);
    setLocal(obra.local);
    setUsuariosVinculados(obra.usuarios);
    setMostrarTabelaUsuarios(false);
    setBuscaObraPrincipal('');
  };

  const usuariosDisponiveis = usuariosDoSistema.filter(u => 
    !usuariosVinculados.some(vinculado => vinculado.id === u.id) &&
    u.nome.toLowerCase().includes(buscaUser.toLowerCase())
  );

  const handleAbrirSalvarObra = () => {
    if (!obraSelecionadaParaEdicao) { alert("Pesquise e selecione uma obra primeiro."); return; }
    if (!nome.trim()) { alert("O Nome da obra não pode ficar vazio."); return; }
    setModalSalvarObraAberto(true);
  };

  const handleConfirmarSalvarObra = () => {
    setModalSalvarObraAberto(false);
    setModalSucessoObraAberto(true);
  };

  const handleFecharSucessoObra = () => setModalSucessoObraAberto(false);

  const handleAbrirIncluirUser = () => {
    if (!obraSelecionadaParaEdicao) { alert("Selecione uma obra primeiro."); return; }
    setBuscaUser(''); setUserSelecionadoParaAdd(null); setModalIncluirUserAberto(true);
  };

  const handleValidarNovoUser = () => {
    if (!userSelecionadoParaAdd) { alert("Selecione um usuário."); return; }
    setModalIncluirUserAberto(false); setModalConfirmarUserAberto(true);
  };

  const handleConfirmarNovoUser = () => {
    setModalConfirmarUserAberto(false);
    setUsuariosVinculados([...usuariosVinculados, userSelecionadoParaAdd]);
    setMostrarTabelaUsuarios(true); 
    setModalSucessoUserAberto(true);
  };

  const handleFecharSucessoUser = () => { setModalSucessoUserAberto(false); setUserSelecionadoParaAdd(null); };

  const handleRemoverUsuario = (idParaRemover: string) => {
    setUsuariosVinculados(usuariosVinculados.filter(u => u.id !== idParaRemover));
  };

  return (
    <div className="flex flex-col h-full bg-[#080818] relative w-full">
      {/* CABEÇALHO */}
      <div className="bg-[#0D0D1F] border-b border-white/20 px-6 py-3 flex items-center shrink-0">
        <h1 className="text-2xl font-normal text-white tracking-wide">Editar Obra</h1>
      </div>

      <div className="p-8 flex-1 overflow-y-auto w-full pt-6">
        
        {/* BARRA DE PESQUISA */}
        <div className="mb-12 max-w-5xl">
          <label className="block text-white text-sm mb-1">
            Localizar Obra:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              value={buscaObraPrincipal}
              onChange={(e) => setBuscaObraPrincipal(e.target.value)}
              placeholder="Digite o nome ou código Sienge da obra para editar..."
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

        {/* FORMULÁRIO (Opacidade controlada pela seleção) */}
        <div className={`transition-opacity duration-300 pb-24 ${!obraSelecionadaParaEdicao ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
          <div className="mb-6">
            <span className="text-xl text-white border-b border-white/20 pb-1 pr-16 inline-block font-normal">
              Informações Gerais {obraSelecionadaParaEdicao && <span className="ml-1 text-blue-400">({obraSelecionadaParaEdicao.nome})</span>}
            </span>
          </div>

          <form className="max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex-1 flex flex-col gap-6">
                <div>
                  <label className="block text-white text-sm mb-1">Nome*</label>
                  <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white outline-none focus:ring-1 focus:ring-white/30 rounded-md" />
                </div>
                <div>
                  <label className="block text-white text-sm mb-1">Categoria:</label>
                  <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white outline-none cursor-pointer focus:ring-1 focus:ring-white/30 rounded-md">
                    <option value="" disabled>Selecione...</option>
                    <option value="Residencial">Residencial</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Infraestrutura">Infraestrutura</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white text-sm mb-1">Local:</label>
                  <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white outline-none focus:ring-1 focus:ring-white/30 rounded-md" />
                </div>
                
                {/* CAIXA DE USUÁRIOS */}
                <div>
                  <label className="block text-white text-sm mb-1">Usuários:</label>
                  <div className="flex items-center gap-2 h-[42px]">
                    <div onClick={() => setMostrarTabelaUsuarios(!mostrarTabelaUsuarios)} className="w-full h-full bg-[#1a1a2e] border border-white/20 px-3 text-slate-300 flex items-center justify-between select-none text-sm cursor-pointer hover:bg-white/10 transition-colors rounded-md">
                      <span>{usuariosVinculados.length === 0 ? "Nenhum usuário vinculado a esta obra" : `${usuariosVinculados.length} usuário(s) vinculado(s)`}</span>
                      {mostrarTabelaUsuarios ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                    <button type="button" onClick={handleAbrirIncluirUser} className="h-full w-[42px] shrink-0 bg-[#0B1B40] border border-white/20 text-white hover:bg-blue-900 transition-colors flex items-center justify-center cursor-pointer rounded-md"><Plus size={20} strokeWidth={2} /></button>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-80 flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-white text-sm mb-1">Código Sienge</label>
                    <input type="text" value={codigoSienge} onChange={(e) => setCodigoSienge(e.target.value)} className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white outline-none focus:ring-1 focus:ring-white/30 rounded-md" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-white text-sm mb-1">Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white outline-none cursor-pointer focus:ring-1 focus:ring-white/30 rounded-md">
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-white text-sm mb-1 text-left">Ínicio da obra*:</label>
                    <input type="date" value={inicioObra} onChange={(e) => setInicioObra(e.target.value)} className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white outline-none focus:ring-1 focus:ring-white/30 cursor-pointer rounded-md" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-white text-sm mb-1 text-left">Fim da obra:</label>
                    <input type="date" value={fimObra} onChange={(e) => setFimObra(e.target.value)} className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white outline-none focus:ring-1 focus:ring-white/30 cursor-pointer rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            {/* TABELA DE USUÁRIOS VINCULADOS */}
            {mostrarTabelaUsuarios && (
              <div className="mt-10 max-w-5xl animate-in slide-in-from-top-4 fade-in duration-300">
                <span className="block text-white text-base mb-4 border-b border-white/20 pb-1 pr-16 inline-block font-normal">Lista de Usuários Vinculados:</span>
                {usuariosVinculados.length > 0 ? (
                  <div className="border border-white/10 overflow-x-auto rounded-lg bg-[#0D0D1F]">
                    <table className="w-full text-left border-collapse min-w-max">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/10">
                          <th className="p-3 font-medium text-slate-300 border-r border-white/10">Nome</th>
                          <th className="p-3 font-medium text-slate-300 border-r border-white/10">E-mail</th>
                          <th className="p-3 font-medium text-slate-300 border-r border-white/10">Perfil</th>
                          <th className="p-3 font-medium text-slate-300 border-r border-white/10 text-center">Status</th>
                          <th className="p-3 font-medium text-slate-300 text-center w-24">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usuariosVinculados.map((u) => (
                          <tr key={u.id} className="border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors">
                            <td className="p-3 text-slate-200 border-r border-white/10">{u.nome}</td>
                            <td className="p-3 text-slate-400 border-r border-white/10">{u.email}</td>
                            <td className="p-3 text-slate-300 border-r border-white/10">{u.perfil}</td>
                            <td className="p-3 text-center border-r border-white/10">
                              <span className={`text-xs px-3 py-1 rounded-full border ${u.status === 'Ativo' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 'text-red-400 border-red-500/20 bg-red-500/10'}`}>
                                {u.status}
                              </span>
                            </td>
                            <td className="p-3 flex justify-center items-center h-full">
                              <button type="button" onClick={() => handleRemoverUsuario(u.id)} className="border border-red-500/30 p-1.5 rounded flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer" title="Remover usuário da obra">
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="border border-white/20 border-dashed p-8 text-center text-slate-400 bg-white/5 rounded-lg">Nenhum usuário vinculado a esta obra.</div>
                )}
              </div>
            )}

            {/* BARRA FIXA DE SALVAR */}
            <div className="fixed bottom-0 right-0 p-6 bg-transparent w-[calc(100%-16rem)] flex justify-end z-10 pointer-events-none">
              <button type="button" onClick={handleAbrirSalvarObra} className="flex items-center gap-2 cursor-pointer bg-[#0B1B40] hover:bg-blue-900 text-white font-medium py-2.5 px-6 rounded-lg transition transform active:scale-95 shadow-lg pointer-events-auto">
                <Save size={18} /> Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAIS */}
      {/* ========================================================= */}
      
      {modalIncluirUserAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-[#0D0D1F] border border-white/10 shadow-2xl p-8 w-full max-w-lg relative animate-in fade-in zoom-in duration-200 rounded-xl">
            <button onClick={() => setModalIncluirUserAberto(false)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors cursor-pointer bg-transparent"><X size={24} /></button>
            <h2 className="text-xl font-normal text-white text-center mb-6"><span className="border-b border-white/20 pb-1 px-2">Vincular Usuário à Obra</span></h2>
            
            <div className="space-y-4 mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><Search size={18} className="text-slate-400" /></div>
                <input type="text" value={buscaUser} onChange={(e) => { setBuscaUser(e.target.value); setUserSelecionadoParaAdd(null); }} placeholder="Buscar pelo nome..." className="w-full bg-[#1a1a2e] border border-white/20 pl-10 pr-4 py-2 text-white outline-none focus:ring-1 focus:ring-white/30 rounded-md" />
              </div>
              
              <div className="border border-white/10 bg-[#1a1a2e] max-h-48 overflow-y-auto rounded-md">
                {usuariosDisponiveis.length > 0 ? (
                  <ul>
                    {usuariosDisponiveis.map(u => (
                      <li key={u.id} onClick={() => setUserSelecionadoParaAdd(u)} className={`px-4 py-3 cursor-pointer flex flex-col transition-colors border-b border-white/10 last:border-b-0 ${userSelecionadoParaAdd?.id === u.id ? 'bg-blue-900/30 border-l-4 border-l-blue-500' : 'hover:bg-white/5'}`}>
                        <span className="font-medium text-white flex items-center gap-2"><User size={16} className="text-slate-400" />{u.nome}</span>
                        <span className="text-xs text-slate-400 ml-6">{u.perfil} | {u.email}</span>
                      </li>
                    ))}
                  </ul>
                ) : ( <div className="p-4 text-sm text-slate-500 text-center">Nenhum usuário disponível para adicionar.</div> )}
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button type="button" onClick={handleValidarNovoUser} disabled={!userSelecionadoParaAdd} className={`px-8 py-2 text-white font-medium transition-colors cursor-pointer rounded-lg ${userSelecionadoParaAdd ? 'bg-[#0B1B40] hover:bg-blue-900' : 'bg-white/10 text-slate-500 cursor-not-allowed border border-white/5'}`}>Adicionar</button>
            </div>
          </div>
        </div>
      )}

      {modalConfirmarUserAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-[#0D0D1F] rounded-2xl border border-white/10 shadow-xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-medium text-white mb-4 border-b border-white/20 pb-2 flex items-center gap-2"><span className="text-blue-400 font-bold">Aviso</span></h2>
            <p className="text-white mb-8 text-base">Deseja adicionar o usuário <strong>{userSelecionadoParaAdd?.nome}</strong> à obra?</p>
            <div className="flex justify-end gap-4 w-full">
              <button onClick={() => setModalConfirmarUserAberto(false)} className="px-6 py-2 rounded-lg border border-white/20 bg-transparent text-white hover:bg-white/10 transition-colors cursor-pointer">Não</button>
              <button onClick={handleConfirmarNovoUser} className="px-6 py-2 rounded-lg bg-[#0B1B40] text-white hover:bg-blue-900 transition-colors cursor-pointer">Sim</button>
            </div>
          </div>
        </div>
      )}

      {modalSucessoUserAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-[#0D0D1F] rounded-2xl border border-white/10 shadow-xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200 flex flex-col items-center text-center">
            <CheckCircle2 size={48} className="text-emerald-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Sucesso!</h2>
            <p className="text-slate-400 mb-8 text-base">Usuário incluído na lista da obra!</p>
            <button onClick={handleFecharSucessoUser} className="w-full px-6 py-2 rounded-lg bg-[#0B1B40] text-white hover:bg-blue-900 transition-colors cursor-pointer">OK</button>
          </div>
        </div>
      )}

      {modalSalvarObraAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-[#0D0D1F] rounded-2xl border border-white/10 shadow-xl p-6 w-full max-w-md animate-in fade-in duration-200">
            <h2 className="text-xl font-medium text-white mb-4 border-b border-white/20 pb-2 flex items-center gap-2"><span className="text-blue-400 font-bold">Aviso</span></h2>
            <p className="text-white mb-8 text-base">Deseja salvar as alterações da obra <strong>{nome}</strong>?</p>
            <div className="flex justify-end gap-4 w-full">
              <button onClick={() => setModalSalvarObraAberto(false)} className="px-6 py-2 rounded-lg border border-white/20 bg-transparent text-white hover:bg-white/10 transition-colors cursor-pointer">Não</button>
              <button onClick={handleConfirmarSalvarObra} className="px-6 py-2 rounded-lg bg-[#0B1B40] text-white hover:bg-blue-900 transition-colors cursor-pointer">Sim</button>
            </div>
          </div>
        </div>
      )}

      {modalSucessoObraAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-[#0D0D1F] rounded-2xl border border-white/10 shadow-xl p-6 w-full max-w-sm animate-in fade-in duration-200 flex flex-col items-center text-center">
            <CheckCircle2 size={48} className="text-emerald-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Sucesso!</h2>
            <p className="text-slate-400 mb-8 text-base">Alterações salvas com sucesso!</p>
            <button onClick={handleFecharSucessoObra} className="w-full px-6 py-2 rounded-lg bg-[#0B1B40] text-white hover:bg-blue-900 transition-colors cursor-pointer">OK</button>
          </div>
        </div>
      )}

    </div>
  );
}