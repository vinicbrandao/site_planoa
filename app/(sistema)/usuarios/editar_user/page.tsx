'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { IUsuario } from '@/lib/types';

// NOSSO "BANCO DE DADOS" DE TESTE (Usuários)
const listaUsuarios = [
  { id: '1', nome: 'Vinícius Brandão', email: 'vinicius@planoa.com', perfil: 'Administrador', status: 'Ativo' },
  { id: '2', nome: 'João da Silva', email: 'joaodasilva@gmail.com', perfil: 'Engenheiro Civil', status: 'Ativo' },
  { id: '3', nome: 'Maria Souza', email: 'maria.souza@planoa.com', perfil: 'Arquiteto', status: 'Inativo' },
];

const opcoesPerfil = [
  'Engenheiro Civil',
  'Arquiteto',
  'Administrador',
  'Visitante',
  'Nulo',
];

// === COMPONENTE PRINCIPAL UNIFICADO ===
function EditarUsuarioMain() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idDaUrl = searchParams.get('id');

  const [buscaUsuario, setBuscaUsuario] = useState('');
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isUsuarioSelecionado, setIsUsuarioSelecionado] = useState(false);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Ativo');
  
  const [perfil, setPerfil] = useState('');
  const [mostrarDropdownPerfil, setMostrarDropdownPerfil] = useState(false);
  const [opcoesFiltradasPerfil, setOpcoesFiltradasPerfil] = useState(opcoesPerfil);
  const dropdownPerfilRef = useRef<HTMLDivElement>(null);

  const [modalSalvarAberto, setModalSalvarAberto] = useState(false);
  const [modalSucessoSalvarAberto, setModalSucessoSalvarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [modalSucessoExcluirAberto, setModalSucessoExcluirAberto] = useState(false);

  useEffect(() => {
    if (idDaUrl) {
      const usuarioEncontrado = listaUsuarios.find((u) => u.id === idDaUrl);
      if (usuarioEncontrado) preencherDados(usuarioEncontrado);
    }
  }, [idDaUrl]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMostrarDropdown(false);
      }
      if (dropdownPerfilRef.current && !dropdownPerfilRef.current.contains(event.target as Node)) {
        setMostrarDropdownPerfil(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const preencherDados = (usuario: IUsuario) => {
    setBuscaUsuario(usuario.nome);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setPerfil(usuario.perfil);
    setStatus(usuario.status);
    setMostrarDropdown(false);
    setIsUsuarioSelecionado(true); 
  };

  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setBuscaUsuario(valor);
    setMostrarDropdown(true);
    setIsUsuarioSelecionado(false); 
    setNome(''); setEmail(''); setPerfil(''); setStatus('Ativo');

    const filtrados = listaUsuarios.filter((u) =>
      u.nome.toLowerCase().includes(valor.toLowerCase())
    );
    setUsuariosFiltrados(filtrados);
  };

  const handlePerfilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorDigitado = e.target.value;
    setPerfil(valorDigitado);
    setMostrarDropdownPerfil(true);
    const filtradas = opcoesPerfil.filter((opcao) =>
      opcao.toLowerCase().includes(valorDigitado.toLowerCase())
    );
    setOpcoesFiltradasPerfil(filtradas);
  };

  const handleOpcaoPerfilClick = (opcao: string) => {
    setPerfil(opcao);
    setMostrarDropdownPerfil(false);
  };

  const handleAbrirSalvar = () => {
    if (!nome) { alert("Selecione ou preencha um usuário antes de salvar."); return; }
    setModalSalvarAberto(true);
  };

  const handleConfirmarSalvar = () => {
    setModalSalvarAberto(false);
    setModalSucessoSalvarAberto(true);
  };

  const handleFecharSucessoSalvar = () => {
    setModalSucessoSalvarAberto(false);
    router.push('/usuarios/consultar_user'); 
  };

  const handleAbrirExcluir = () => {
    if (!nome) { alert("Selecione um usuário para excluir."); return; }
    setModalExcluirAberto(true);
  };

  const handleConfirmarExcluir = () => {
    setModalExcluirAberto(false);
    setModalSucessoExcluirAberto(true);
  };

  const handleFecharSucessoExcluir = () => {
    setModalSucessoExcluirAberto(false);
    setBuscaUsuario(''); setNome(''); setEmail(''); setPerfil(''); setStatus('Ativo');
    setIsUsuarioSelecionado(false); 
  };

  return (
    <div className="flex flex-col h-full bg-[#080818] relative w-full">
      {/* HEADER INTEGRADO */}
      <div className="bg-[#0D0D1F] border-b border-white/20 px-6 py-2 flex items-center shrink-0">
        <h1 className="text-2xl font-normal text-white tracking-wide">Editar Usuário</h1>
      </div>

      <div className="p-8 flex-1 overflow-y-auto w-full">
        {/* CAIXA DE BUSCA COM TEMA ESCURO */}
        <div className="mb-10 p-6 border border-white/20 rounded-lg bg-[#0D0D1F] max-w-4xl flex flex-col md:flex-row items-end gap-4" ref={dropdownRef}>
          <div className="flex-1 w-full relative">
            <label className="block text-white font-medium mb-1">Selecione o usuário para edição:</label>
            <input 
              type="text" value={buscaUsuario} onChange={handleBuscaChange} onFocus={() => setMostrarDropdown(true)}
              placeholder="Selecione na lista ou digite para buscar..." autoComplete="off"
              className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white outline-none focus:ring-1 focus:ring-white/30"
            />
            {mostrarDropdown && usuariosFiltrados.length > 0 && (
              <ul className="absolute z-50 w-full left-0 bg-[#1a1a2e] border border-white/20 border-t-0 mt-0 max-h-48 overflow-y-auto shadow-lg">
                {usuariosFiltrados.map((u) => (
                  <li key={u.id} onClick={() => preencherDados(u)} className="px-3 py-2 text-white cursor-pointer hover:bg-white/10 transition-colors flex flex-col">
                    <span className="font-medium">{u.nome}</span>
                    <span className="text-slate-400 text-xs">{u.email}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* FORMULÁRIO DE EDIÇÃO */}
        {isUsuarioSelecionado && (
          <form className="max-w-4xl pb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="w-full md:w-1/2">
                <label className="block text-white font-medium mb-1">Nome*:</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white outline-none focus:ring-1 focus:ring-white/30" />
              </div>
              <div className="w-full md:w-48">
                <label className="block text-white font-medium mb-1">Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white outline-none cursor-pointer">
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="relative w-full md:w-1/2" ref={dropdownPerfilRef}>
                <label className="block text-white font-medium mb-1">Perfil:</label>
                <input 
                  type="text" value={perfil} onChange={handlePerfilChange} placeholder="Ex.: Engenheiro Civil" autoComplete="off"
                  onFocus={() => {
                    setMostrarDropdownPerfil(true);
                    setOpcoesFiltradasPerfil(opcoesPerfil.filter(o => o.toLowerCase().includes(perfil.toLowerCase())));
                  }}
                  className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white outline-none focus:ring-1 focus:ring-white/30" 
                />
                {mostrarDropdownPerfil && opcoesFiltradasPerfil.length > 0 && (
                  <ul className="absolute z-50 w-full left-0 bg-[#1a1a2e] border border-white/20 border-t-0 mt-0 max-h-48 overflow-y-auto shadow-lg">
                    {opcoesFiltradasPerfil.map((opcao, index) => (
                      <li key={index} onClick={() => handleOpcaoPerfilClick(opcao)} className="px-3 py-2 text-white cursor-pointer hover:bg-white/10 transition-colors">
                        {opcao}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-12">
              <div className="w-full md:w-1/2">
                <label className="block text-white font-medium mb-1">E-mail*:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white outline-none focus:ring-1 focus:ring-white/30" />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20 flex justify-between">
              <button type="button" onClick={handleAbrirExcluir} className="bg-red-600 border border-white/20 px-6 py-2.5 text-white font-medium hover:bg-red-700 transition-colors cursor-pointer rounded-lg">
                Excluir Usuário
              </button>
              <button type="button" onClick={handleAbrirSalvar} className="flex items-center gap-2 bg-[#0B1B40] hover:bg-blue-900 text-white font-medium py-2.5 px-6 rounded-lg transition transform cursor-pointer active:scale-95">
                <Save size={18} /> Salvar Alterações
              </button>
            </div>
          </form>
        )}
      </div>

      {/* MODAIS (Tema Escuro Aplicado) */}
      {modalSalvarAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-[#0D0D1F] rounded-2xl border border-white/10 shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-medium text-white mb-4 border-b border-white/20 pb-2 flex items-center gap-2">
              <span className="text-blue-400 font-bold">Aviso</span>
            </h2>
            <p className="text-white mb-8 text-base">Deseja implementar as alterações no usuário <strong>{nome}</strong>?</p>
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
            <p className="text-slate-400 mb-8 text-base">Alterações implementadas!</p>
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
            <p className="text-white text-base mb-1">Deseja excluir o usuário <strong>{nome}</strong>?</p>
            <p className="text-red-400 text-sm font-semibold mb-8">Essa ação é irreversível.</p>
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
            <p className="text-slate-400 mb-8 text-base">Usuário excluído.</p>
            <button onClick={handleFecharSucessoExcluir} className="w-full px-6 py-2 rounded-lg bg-[#0B1B40] text-white font-medium hover:bg-blue-900 transition-colors cursor-pointer">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EditarUsuarioPage() {
  return (
    <Suspense fallback={<div className="h-full bg-[#080818] flex items-center justify-center text-white">Carregando dados...</div>}>
      <EditarUsuarioMain />
    </Suspense>
  );
}