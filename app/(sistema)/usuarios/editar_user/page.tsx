'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Save, CheckCircle2, AlertCircle } from 'lucide-react';

// NOSSO "BANCO DE DADOS" DE TESTE (Usuários)
const listaUsuarios = [
  { id: '1', nome: 'Vinícius Brandão', email: 'vinicius@planoa.com', perfil: 'Administrador', status: 'Ativo' },
  { id: '2', nome: 'João da Silva', email: 'joaodasilva@gmail.com', perfil: 'Engenheiro Civil', status: 'Ativo' },
  { id: '3', nome: 'Maria Souza', email: 'maria.souza@planoa.com', perfil: 'Arquiteto', status: 'Inativo' },
];

// 👇 1. "BANCO DE DADOS" DE PERFIS 👇
const opcoesPerfil = [
  'Engenheiro Civil',
  'Arquiteto',
  'Administrador',
  'Visitante',
  'Nulo',
];

function EditarUsuarioForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idDaUrl = searchParams.get('id');

  // Estados da Busca Principal (Usuário)
  const [buscaUsuario, setBuscaUsuario] = useState('');
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Controle de visibilidade do formulário
  const [isUsuarioSelecionado, setIsUsuarioSelecionado] = useState(false);

  // Estados dos Campos do Formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Ativo');
  
  // 👇 2. ESTADOS DO DROPDOWN DE PERFIL 👇
  const [perfil, setPerfil] = useState('');
  const [mostrarDropdownPerfil, setMostrarDropdownPerfil] = useState(false);
  const [opcoesFiltradasPerfil, setOpcoesFiltradasPerfil] = useState(opcoesPerfil);
  const dropdownPerfilRef = useRef<HTMLDivElement>(null);

  // ====================================================
  // ESTADOS DOS MODAIS (Pop-ups)
  // ====================================================
  const [modalSalvarAberto, setModalSalvarAberto] = useState(false);
  const [modalSucessoSalvarAberto, setModalSucessoSalvarAberto] = useState(false);
  
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [modalSucessoExcluirAberto, setModalSucessoExcluirAberto] = useState(false);

  // ====================================================
  // EFEITOS E FUNÇÕES BASE
  // ====================================================
  useEffect(() => {
    if (idDaUrl) {
      const usuarioEncontrado = listaUsuarios.find((u) => u.id === idDaUrl);
      if (usuarioEncontrado) preencherDados(usuarioEncontrado);
    }
  }, [idDaUrl]);

  // Efeito de fechar os dois dropdowns se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Fecha dropdown de busca de usuário
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMostrarDropdown(false);
      }
      // Fecha dropdown de perfil
      if (dropdownPerfilRef.current && !dropdownPerfilRef.current.contains(event.target as Node)) {
        setMostrarDropdownPerfil(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const preencherDados = (usuario: any) => {
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

  // FUNÇÕES PARA GERENCIAR O DROPDOWN DO PERFIL
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

  // FUNÇÕES DOS FLUXOS DE POP-UP
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

  // ====================================================
  // RENDERIZAÇÃO
  // ====================================================
  return (
    <div className="p-8 flex-1 overflow-y-auto w-full pt-6">
      
      {/* SELEÇÃO DO USUÁRIO */}
      <div className="mb-10 p-6 border border-black bg-gray-50 max-w-4xl flex flex-col md:flex-row items-end gap-4" ref={dropdownRef}>
        <div className="flex-1 w-full relative">
          <label className="block text-black font-medium mb-1">Selecione o usuário para edição:</label>
          <input 
            type="text" value={buscaUsuario} onChange={handleBuscaChange} onFocus={() => setMostrarDropdown(true)}
            placeholder="Selecione na lista ou digite para buscar..." autoComplete="off"
            className="w-full bg-[#e6e6e6] border border-black px-3 py-2 text-black outline-none focus:ring-1 focus:ring-black"
          />
          {mostrarDropdown && usuariosFiltrados.length > 0 && (
            <ul className="absolute z-50 w-full bg-[#e6e6e6] border border-black border-t-0 mt-0 max-h-48 overflow-y-auto shadow-lg">
              {usuariosFiltrados.map((u) => (
                <li key={u.id} onClick={() => preencherDados(u)} className="px-3 py-2 text-black cursor-pointer hover:bg-[#c0c0c0] transition-colors flex flex-col">
                  <span className="font-medium">{u.nome}</span>
                  <span className="text-gray-600 text-xs">{u.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* FORMULÁRIO DE EDIÇÃO (Condicional) */}
      {isUsuarioSelecionado && (
        <form className="max-w-4xl pb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row gap-8 mb-6">
            <div className="flex-1 max-w-lg">
              <label className="block text-black text-sm mb-1">Nome*:</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full bg-[#e6e6e6] border border-black px-3 py-2 text-black outline-none" />
            </div>
            <div className="w-full md:w-48">
              <label className="block text-black text-sm mb-1">Status:</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-[#e6e6e6] border border-black px-3 py-2 text-black outline-none cursor-pointer">
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>

          {/* 👇 4. CAMPO DE PERFIL ATUALIZADO (Igual ao Cadastro) 👇 */}
          <div className="mb-6 max-w-lg relative" ref={dropdownPerfilRef}>
            <label className="block text-black text-sm mb-1">Perfil:</label>
            <input 
              type="text" 
              value={perfil} 
              onChange={handlePerfilChange} 
              onFocus={() => {
                setMostrarDropdownPerfil(true);
                // Reseta a lista para mostrar opções relevantes ao clicar
                setOpcoesFiltradasPerfil(opcoesPerfil.filter(o => o.toLowerCase().includes(perfil.toLowerCase())));
              }}
              placeholder="Ex.: Engenheiro Civil"
              autoComplete="off"
              className="w-full bg-[#e6e6e6] border border-black px-3 py-2 text-black outline-none focus:ring-1 focus:ring-black" 
            />
            {mostrarDropdownPerfil && opcoesFiltradasPerfil.length > 0 && (
              <ul className="absolute z-50 w-full bg-[#e6e6e6] border border-black border-t-0 mt-0 max-h-48 overflow-y-auto shadow-lg">
                {opcoesFiltradasPerfil.map((opcao, index) => (
                  <li
                    key={index}
                    onClick={() => handleOpcaoPerfilClick(opcao)}
                    className="px-3 py-2 text-black cursor-pointer hover:bg-[#c0c0c0] transition-colors"
                  >
                    {opcao}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-12 max-w-lg">
            <label className="block text-black text-sm mb-1">E-mail*:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#e6e6e6] border border-black px-3 py-2 text-black outline-none" />
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="flex justify-between mt-8 w-full max-w-4xl">
            <button type="button" onClick={handleAbrirExcluir} className="bg-red-600 border border-black px-6 py-2 text-white font-medium hover:bg-red-700 transition-colors cursor-pointer rounded-lg">
              Excluir Usuário
            </button>
            
            <button type="button" onClick={handleAbrirSalvar} className="flex items-center gap-2 bg-[#0B1B40] hover:bg-blue-900 text-white font-medium py-2.5 px-6 rounded-lg transition transform cursor-pointer active:scale-95">
              <Save size={18} /> Salvar Alterações
            </button>
          </div>
        </form>
      )}

      {/* (MODAIS INTACTOS ABAIXO...) */}
      
      {modalSalvarAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl border border-black shadow-xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-medium text-black mb-4 border-b border-gray-300 pb-2 flex items-center gap-2">
              <span className="text-blue-600 font-bold">Aviso</span>
            </h2>
            <p className="text-black mb-8 text-base">Deseja implementar as alterações no usuário <strong>{nome}</strong>?</p>
            <div className="flex justify-end gap-4 w-full">
              <button onClick={() => setModalSalvarAberto(false)} className="px-6 py-2 rounded-lg border border-black bg-[#e6e6e6] text-black font-medium hover:bg-gray-300 transition-colors cursor-pointer">Não</button>
              <button onClick={handleConfirmarSalvar} className="px-6 py-2 rounded-lg border border-black bg-[#0B1B40] text-white font-medium hover:bg-blue-900 transition-colors cursor-pointer">Sim</button>
            </div>
          </div>
        </div>
      )}

      {modalSucessoSalvarAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl border border-black shadow-xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200 flex flex-col items-center text-center">
            <CheckCircle2 size={48} className="text-green-600 mb-4" />
            <h2 className="text-xl font-bold text-black mb-2">Sucesso!</h2>
            <p className="text-gray-700 mb-8 text-base">Alterações implementadas!</p>
            <button onClick={handleFecharSucessoSalvar} className="w-full px-6 py-2 rounded-lg border border-black bg-[#0B1B40] text-white font-medium hover:bg-blue-900 transition-colors cursor-pointer">OK</button>
          </div>
        </div>
      )}

      {modalExcluirAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl border border-black shadow-xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-medium text-black mb-4 border-b border-gray-300 pb-2 flex items-center gap-2">
              <AlertCircle className="text-red-600" size={24} />
              <span className="text-red-600 font-bold">Atenção</span>
            </h2>
            <p className="text-black text-base mb-1">
              Deseja excluir o usuário <strong>{nome}</strong>?
            </p>
            <p className="text-red-500 text-sm font-semibold mb-8">
              Essa ação é irreversível.
            </p>
            <div className="flex justify-end gap-4 w-full">
              <button onClick={() => setModalExcluirAberto(false)} className="px-6 py-2 rounded-lg border border-black bg-[#e6e6e6] text-black font-medium hover:bg-gray-300 transition-colors cursor-pointer">Não</button>
              <button onClick={handleConfirmarExcluir} className="px-6 py-2 rounded-lg border border-black bg-red-600 text-white font-medium hover:bg-red-700 transition-colors cursor-pointer">Sim</button>
            </div>
          </div>
        </div>
      )}

      {modalSucessoExcluirAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl border border-black shadow-xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200 flex flex-col items-center text-center">
            <CheckCircle2 size={48} className="text-green-600 mb-4" />
            <h2 className="text-xl font-bold text-black mb-2">Sucesso!</h2>
            <p className="text-gray-700 mb-8 text-base">Usuário excluído.</p>
            <button onClick={handleFecharSucessoExcluir} className="w-full px-6 py-2 rounded-lg border border-black bg-[#0B1B40] text-white font-medium hover:bg-blue-900 transition-colors cursor-pointer">OK</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function EditarUsuarioPage() {
  return (
    <div className="flex flex-col h-full bg-white relative w-full">
      <div className="bg-[#e6e6e6] border-b border-black px-6 py-3 flex items-center shrink-0">
        <h1 className="text-2xl font-normal text-black tracking-wide">
          Editar Usuário
        </h1>
      </div>
      <Suspense fallback={<div className="p-8 text-black">Carregando dados...</div>}>
        <EditarUsuarioForm />
      </Suspense>
    </div>
  );
}