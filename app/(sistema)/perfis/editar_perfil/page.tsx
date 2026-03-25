'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';

// ====================================================
// 1. NOSSO "BANCO DE DADOS" DE TESTE (Perfis e Permissões)
// ====================================================
const basePermissoes = [
  { id: 'ind_todos', nome: 'Indicadores - Todos', isTodos: true, grupo: 'indicadores', autorizado: false },
  { id: 'ind_menu', nome: 'Indicadores - Menu', isTodos: false, grupo: 'indicadores', autorizado: false },
  { id: 'ind_resumo', nome: 'Indicadores - Resumo', isTodos: false, grupo: 'indicadores', autorizado: false },
  { id: 'ind_comp', nome: 'Indicadores - Comparações', isTodos: false, grupo: 'indicadores', autorizado: false },
  
  { id: 'obr_todos', nome: 'Obras - Todos', isTodos: true, grupo: 'obras', autorizado: false },
  { id: 'obr_menu', nome: 'Obras - Menu', isTodos: false, grupo: 'obras', autorizado: false },
  { id: 'obr_vis', nome: 'Obras - City Park - Visualizar', isTodos: false, grupo: 'obras', autorizado: false },
  { id: 'obr_edit', nome: 'Obras - City Park - Editar', isTodos: false, grupo: 'obras', autorizado: false },
];

const listaPerfis = [
  { 
    id: '1', 
    nome: 'Administrador', 
    permissoes: basePermissoes.map(p => ({ ...p, autorizado: true })) 
  },
  { 
    id: '2', 
    nome: 'Engenheiro Civil', 
    permissoes: basePermissoes.map(p => ({ ...p, autorizado: p.grupo === 'obras' })) 
  },
  { 
    id: '3', 
    nome: 'Visitante', 
    permissoes: basePermissoes.map(p => ({ ...p, autorizado: p.id === 'obr_vis' || p.id === 'ind_resumo' })) 
  },
];

// ====================================================
// 2. O COMPONENTE PRINCIPAL (Tema Escuro Aplicado)
// ====================================================
function EditarPerfilMain() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idDaUrl = searchParams.get('id');

  const [buscaPerfil, setBuscaPerfil] = useState('');
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [perfisFiltrados, setPerfisFiltrados] = useState(listaPerfis);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isPerfilSelecionado, setIsPerfilSelecionado] = useState(false);
  const [nomePerfil, setNomePerfil] = useState('');
  const [permissoes, setPermissoes] = useState(basePermissoes);

  const [modalSalvarAberto, setModalSalvarAberto] = useState(false);
  const [modalSucessoSalvarAberto, setModalSucessoSalvarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [modalSucessoExcluirAberto, setModalSucessoExcluirAberto] = useState(false);

  useEffect(() => {
    if (idDaUrl) {
      const perfilEncontrado = listaPerfis.find((p) => p.id === idDaUrl);
      if (perfilEncontrado) preencherDados(perfilEncontrado);
    }
  }, [idDaUrl]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMostrarDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const preencherDados = (perfilObj: any) => {
    setBuscaPerfil(perfilObj.nome);
    setNomePerfil(perfilObj.nome);
    setPermissoes(JSON.parse(JSON.stringify(perfilObj.permissoes))); 
    setMostrarDropdown(false);
    setIsPerfilSelecionado(true); 
  };

  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setBuscaPerfil(valor);
    setMostrarDropdown(true);
    
    setIsPerfilSelecionado(false); 
    setNomePerfil(''); 
    setPermissoes(basePermissoes);

    const filtrados = listaPerfis.filter((p) =>
      p.nome.toLowerCase().includes(valor.toLowerCase())
    );
    setPerfisFiltrados(filtrados);
  };

  const handleTogglePermissao = (idClicado: string) => {
    setPermissoes((listaAtual) => {
      const itemClicado = listaAtual.find(p => p.id === idClicado);
      if (!itemClicado) return listaAtual;

      const novoEstado = !itemClicado.autorizado;
      let novaLista = [...listaAtual];

      if (itemClicado.isTodos) {
        novaLista = novaLista.map(p => {
          if (p.grupo === itemClicado.grupo) {
            return { ...p, autorizado: novoEstado };
          }
          return p;
        });
      } else {
        novaLista = novaLista.map(p =>
          p.id === idClicado ? { ...p, autorizado: novoEstado } : p
        );

        const itensDoGrupo = novaLista.filter(p => p.grupo === itemClicado.grupo && !p.isTodos);
        const todosEstaoMarcados = itensDoGrupo.every(p => p.autorizado);

        novaLista = novaLista.map(p => {
          if (p.isTodos && p.grupo === itemClicado.grupo) {
            return { ...p, autorizado: todosEstaoMarcados };
          }
          return p;
        });
      }

      return novaLista;
    });
  };

  const handleAbrirSalvar = () => {
    if (!nomePerfil) { alert("Preencha o nome do perfil."); return; }
    setModalSalvarAberto(true);
  };

  const handleConfirmarSalvar = () => {
    setModalSalvarAberto(false);
    setModalSucessoSalvarAberto(true);
  };

  const handleFecharSucessoSalvar = () => {
    setModalSucessoSalvarAberto(false);
  };

  const handleAbrirExcluir = () => {
    setModalExcluirAberto(true);
  };

  const handleConfirmarExcluir = () => {
    setModalExcluirAberto(false);
    setModalSucessoExcluirAberto(true);
  };

  const handleFecharSucessoExcluir = () => {
    setModalSucessoExcluirAberto(false);
    setBuscaPerfil(''); setNomePerfil(''); setPermissoes(basePermissoes);
    setIsPerfilSelecionado(false); 
  };

  return (
    <div className="flex flex-col h-full bg-[#080818] relative w-full">
      {/* HEADER INTEGRADO */}
      <div className="bg-[#0D0D1F] border-b border-white/20 px-6 py-2 flex items-center shrink-0">
        <h1 className="text-2xl font-normal text-white tracking-wide">Editar Perfil</h1>
      </div>

      <div className="p-8 flex-1 overflow-y-auto w-full">
        
        {/* SELEÇÃO DO PERFIL */}
        <div className="mb-10 p-6 border border-white/20 rounded-lg bg-[#0D0D1F] max-w-4xl flex flex-col md:flex-row items-end gap-4" ref={dropdownRef}>
          <div className="flex-1 w-full relative">
            <label className="block text-white font-medium mb-1">Selecione o perfil para edição:</label>
            <input 
              type="text" value={buscaPerfil} onChange={handleBuscaChange} onFocus={() => setMostrarDropdown(true)}
              placeholder="Selecione na lista ou digite para buscar..." autoComplete="off"
              className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white outline-none focus:ring-1 focus:ring-white/30 rounded-md"
            />
            {mostrarDropdown && perfisFiltrados.length > 0 && (
              <ul className="absolute z-50 w-full left-0 bg-[#1a1a2e] border border-white/20 border-t-0 mt-0 max-h-48 overflow-y-auto shadow-lg rounded-b-md">
                {perfisFiltrados.map((p) => (
                  <li key={p.id} onClick={() => preencherDados(p)} className="px-3 py-2 text-white cursor-pointer hover:bg-white/10 transition-colors flex flex-col">
                    <span className="font-medium">{p.nome}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* FORMULÁRIO DE EDIÇÃO */}
        {isPerfilSelecionado && (
          <form className="max-w-4xl pb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="mb-8 max-w-lg">
              <label className="block text-white text-sm mb-1">Nome do Perfil*:</label>
              <input 
                type="text" 
                value={nomePerfil} 
                onChange={(e) => setNomePerfil(e.target.value)} 
                className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white outline-none focus:ring-1 focus:ring-white/30 rounded-md" 
              />
            </div>

            <p className="text-white mb-2 text-sm">Autorizações do Perfil:</p>

            <div className="border border-white/20 w-full overflow-x-auto bg-[#0D0D1F] rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/20">
                    <th className="p-3 border-r border-white/20 font-semibold text-slate-300">Módulo / Tela</th>
                    <th className="p-3 font-semibold text-slate-300 text-center text-xs w-32">Autorizado</th>
                  </tr>
                </thead>
                <tbody>
                  {permissoes.map((item) => (
                    <tr 
                      key={item.id} 
                      className={`border-b border-white/10 last:border-b-0 transition-colors hover:bg-white/5 ${item.isTodos ? 'bg-white/10' : ''}`}
                    >
                      <td className={`p-3 border-r border-white/10 text-slate-200 ${item.isTodos ? 'font-medium text-white' : 'pl-8'}`}>
                        {item.nome}
                      </td>
                      <td className="p-3 flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          checked={item.autorizado}
                          onChange={() => handleTogglePermissao(item.id)}
                          className="w-5 h-5 cursor-pointer accent-blue-500 bg-[#1a1a2e] border-white/20 rounded"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between mt-8 w-full border-t border-white/20 pt-6">
              <button type="button" onClick={handleAbrirExcluir} className="bg-red-600 border border-white/20 px-6 py-2.5 text-white font-medium hover:bg-red-700 transition-colors cursor-pointer rounded-lg">
                Excluir Perfil
              </button>
              
              <button type="button" onClick={handleAbrirSalvar} className="flex items-center gap-2 bg-[#0B1B40] hover:bg-blue-900 text-white font-medium py-2.5 px-6 rounded-lg transition transform cursor-pointer active:scale-95">
                <Save size={18} /> Salvar Alterações
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAIS (Tema Escuro) */}
      {/* ========================================================= */}
      
      {modalSalvarAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-[#0D0D1F] rounded-2xl border border-white/10 shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-medium text-white mb-4 border-b border-white/20 pb-2 flex items-center gap-2">
              <span className="text-blue-400 font-bold">Aviso</span>
            </h2>
            <p className="text-white mb-8 text-base">Deseja implementar as alterações no perfil <strong>{nomePerfil}</strong>?</p>
            <div className="flex justify-end gap-4 w-full">
              <button onClick={() => setModalSalvarAberto(false)} className="px-6 py-2 rounded-lg border border-white/20 bg-transparent text-white font-medium hover:bg-white/10 transition-colors cursor-pointer">Não</button>
              <button onClick={handleConfirmarSalvar} className="px-6 py-2 rounded-lg bg-[#0B1B40] text-white font-medium hover:bg-blue-900 transition-colors cursor-pointer">Sim</button>
            </div>
          </div>
        </div>
      )}

      {modalSucessoSalvarAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-[#0D0D1F] rounded-2xl border border-white/10 shadow-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200 flex flex-col items-center text-center">
            <CheckCircle2 size={48} className="text-emerald-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Sucesso!</h2>
            <p className="text-slate-400 mb-8 text-base">Alterações implementadas no perfil!</p>
            <button onClick={handleFecharSucessoSalvar} className="w-full px-6 py-2 rounded-lg bg-[#0B1B40] text-white font-medium hover:bg-blue-900 transition-colors cursor-pointer">OK</button>
          </div>
        </div>
      )}

      {modalExcluirAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-[#0D0D1F] rounded-2xl border border-white/10 shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-medium text-white mb-4 border-b border-white/20 pb-2 flex items-center gap-2">
              <AlertCircle className="text-red-500" size={24} />
              <span className="text-red-500 font-bold">Atenção</span>
            </h2>
            <p className="text-white text-base mb-1">Deseja excluir o perfil <strong>{nomePerfil}</strong>?</p>
            <p className="text-red-400 text-sm font-semibold mb-8">Essa ação é irreversível e desvinculará todos os usuários associados a esse perfil.</p>
            <div className="flex justify-end gap-4 w-full">
              <button onClick={() => setModalExcluirAberto(false)} className="px-6 py-2 rounded-lg border border-white/20 bg-transparent text-white font-medium hover:bg-white/10 transition-colors cursor-pointer">Não</button>
              <button onClick={handleConfirmarExcluir} className="px-6 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors cursor-pointer">Sim</button>
            </div>
          </div>
        </div>
      )}

      {modalSucessoExcluirAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-[#0D0D1F] rounded-2xl border border-white/10 shadow-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200 flex flex-col items-center text-center">
            <CheckCircle2 size={48} className="text-emerald-400 mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Sucesso!</h2>
            <p className="text-slate-400 mb-8 text-base">Perfil excluído.</p>
            <button onClick={handleFecharSucessoExcluir} className="w-full px-6 py-2 rounded-lg bg-[#0B1B40] text-white font-medium hover:bg-blue-900 transition-colors cursor-pointer">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ====================================================
// 3. WRAPPER DO NEXT.JS (Para o useSearchParams)
// ====================================================
export default function EditarPerfilPage() {
  return (
    <Suspense fallback={<div className="h-full bg-[#080818] flex items-center justify-center text-white">Carregando dados...</div>}>
      <EditarPerfilMain />
    </Suspense>
  );
}