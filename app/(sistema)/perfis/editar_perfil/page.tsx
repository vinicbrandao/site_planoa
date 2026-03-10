'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Save, CheckCircle2, AlertCircle } from 'lucide-react';

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

// Simulando perfis já salvos no banco
const listaPerfis = [
  { 
    id: '1', 
    nome: 'Administrador', 
    // O Admin tem tudo marcado
    permissoes: basePermissoes.map(p => ({ ...p, autorizado: true })) 
  },
  { 
    id: '2', 
    nome: 'Engenheiro Civil', 
    // O Engenheiro tem só as Obras marcadas
    permissoes: basePermissoes.map(p => ({ ...p, autorizado: p.grupo === 'obras' })) 
  },
  { 
    id: '3', 
    nome: 'Visitante', 
    // O Visitante não tem quase nada
    permissoes: basePermissoes.map(p => ({ ...p, autorizado: p.id === 'obr_vis' || p.id === 'ind_resumo' })) 
  },
];

// ====================================================
// 2. O COMPONENTE PRINCIPAL
// ====================================================
function EditarPerfilForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idDaUrl = searchParams.get('id');

  // Estados da Busca
  const [buscaPerfil, setBuscaPerfil] = useState('');
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [perfisFiltrados, setPerfisFiltrados] = useState(listaPerfis);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Controle de visibilidade do formulário
  const [isPerfilSelecionado, setIsPerfilSelecionado] = useState(false);

  // Estados do Formulário (Dados)
  const [nomePerfil, setNomePerfil] = useState('');
  const [permissoes, setPermissoes] = useState(basePermissoes);

  // Estados dos Modais (Pop-ups)
  const [modalSalvarAberto, setModalSalvarAberto] = useState(false);
  const [modalSucessoSalvarAberto, setModalSucessoSalvarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [modalSucessoExcluirAberto, setModalSucessoExcluirAberto] = useState(false);

  // ====================================================
  // EFEITOS DE BUSCA E URL
  // ====================================================
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
    // Cria uma cópia profunda das permissões para não alterar o "banco de dados" original direto
    setPermissoes(JSON.parse(JSON.stringify(perfilObj.permissoes))); 
    setMostrarDropdown(false);
    setIsPerfilSelecionado(true); 
  };

  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setBuscaPerfil(valor);
    setMostrarDropdown(true);
    
    // Esconde e limpa o formulário ao digitar algo diferente
    setIsPerfilSelecionado(false); 
    setNomePerfil(''); 
    setPermissoes(basePermissoes);

    const filtrados = listaPerfis.filter((p) =>
      p.nome.toLowerCase().includes(valor.toLowerCase())
    );
    setPerfisFiltrados(filtrados);
  };

  // ====================================================
  // LÓGICA DA TABELA INTELIGENTE (Selecionar Todos)
  // ====================================================
  const handleTogglePermissao = (idClicado: string) => {
    setPermissoes((listaAtual) => {
      const itemClicado = listaAtual.find(p => p.id === idClicado);
      if (!itemClicado) return listaAtual;

      const novoEstado = !itemClicado.autorizado;
      let novaLista = [...listaAtual];

      if (itemClicado.isTodos) {
        // Marca/Desmarca o grupo inteiro
        novaLista = novaLista.map(p => {
          if (p.grupo === itemClicado.grupo) {
            return { ...p, autorizado: novoEstado };
          }
          return p;
        });
      } else {
        // Marca/Desmarca apenas o item
        novaLista = novaLista.map(p =>
          p.id === idClicado ? { ...p, autorizado: novoEstado } : p
        );

        // Verifica o "Todos" do grupo
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

  // ====================================================
  // FUNÇÕES DOS MODAIS
  // ====================================================
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
    // router.push('/perfis/consultar_perfil'); // Se quiser voltar à tela anterior
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

  // ====================================================
  // RENDERIZAÇÃO DA PÁGINA
  // ====================================================
  return (
    <div className="p-8 flex-1 overflow-y-auto w-full pt-6">
      
      {/* 1. SELEÇÃO DO PERFIL */}
      <div className="mb-10 p-6 border border-black bg-gray-50 max-w-4xl flex flex-col md:flex-row items-end gap-4" ref={dropdownRef}>
        <div className="flex-1 w-full relative">
          <label className="block text-black font-medium mb-1">Selecione o perfil para edição:</label>
          <input 
            type="text" value={buscaPerfil} onChange={handleBuscaChange} onFocus={() => setMostrarDropdown(true)}
            placeholder="Selecione na lista ou digite para buscar..." autoComplete="off"
            className="w-full bg-[#e6e6e6] border border-black px-3 py-2 text-black outline-none focus:ring-1 focus:ring-black"
          />
          {mostrarDropdown && perfisFiltrados.length > 0 && (
            <ul className="absolute z-50 w-full bg-[#e6e6e6] border border-black border-t-0 mt-0 max-h-48 overflow-y-auto shadow-lg">
              {perfisFiltrados.map((p) => (
                <li key={p.id} onClick={() => preencherDados(p)} className="px-3 py-2 text-black cursor-pointer hover:bg-[#c0c0c0] transition-colors flex flex-col">
                  <span className="font-medium">{p.nome}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 2. FORMULÁRIO DE EDIÇÃO (Escondido até selecionar) */}
      {isPerfilSelecionado && (
        <form className="max-w-4xl pb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Nome do Perfil */}
          <div className="mb-8 max-w-lg">
            <label className="block text-black text-sm mb-1">Nome do Perfil*:</label>
            <input 
              type="text" 
              value={nomePerfil} 
              onChange={(e) => setNomePerfil(e.target.value)} 
              className="w-full bg-[#e6e6e6] border border-black px-3 py-2 text-black outline-none focus:ring-1 focus:ring-black" 
            />
          </div>

          <p className="text-black mb-2 text-sm">Autorizações do Perfil:</p>

          {/* Tabela de Autorizações (A Inteligente) */}
          <div className="border border-black w-full overflow-x-auto bg-[#e6e6e6]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border-r border-b border-black font-semibold text-black">Módulo / Tela</th>
                  <th className="p-2 border-b border-black font-semibold text-black text-center text-xs w-32">Autorizado</th>
                </tr>
              </thead>
              <tbody>
                {permissoes.map((item) => (
                  <tr 
                    key={item.id} 
                    className={`border-b border-black last:border-b-0 transition-colors hover:bg-[#d4d4d4] ${item.isTodos ? 'bg-[#d9d9d9]' : ''}`}
                  >
                    <td className={`p-2 border-r border-black text-black ${item.isTodos ? 'font-medium' : 'pl-6'}`}>
                      {item.nome}
                    </td>
                    <td className="p-2 flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        checked={item.autorizado}
                        onChange={() => handleTogglePermissao(item.id)}
                        className="w-5 h-5 cursor-pointer accent-black border-black"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Botões de Ação (Afastados) */}
          <div className="flex justify-between mt-8 w-full">
            <button type="button" onClick={handleAbrirExcluir} className="bg-red-600 border border-black px-6 py-2 text-white font-medium hover:bg-red-700 transition-colors cursor-pointer rounded-lg">
              Excluir Perfil
            </button>
            
            <button type="button" onClick={handleAbrirSalvar} className="flex items-center gap-2 bg-[#0B1B40] hover:bg-blue-900 text-white font-medium py-2.5 px-6 rounded-lg transition transform cursor-pointer active:scale-95">
              <Save size={18} /> Salvar Alterações
            </button>
          </div>
        </form>
      )}

      {/* ========================================================= */}
      {/* 3. OS 4 MODAIS (Exatamente iguais ao Editar Usuário)      */}
      {/* ========================================================= */}
      
      {/* Modal Salvar */}
      {modalSalvarAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl border border-black shadow-xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-medium text-black mb-4 border-b border-gray-300 pb-2 flex items-center gap-2">
              <span className="text-blue-600 font-bold">Aviso</span>
            </h2>
            <p className="text-black mb-8 text-base">Deseja implementar as alterações no perfil <strong>{nomePerfil}</strong>?</p>
            <div className="flex justify-end gap-4 w-full">
              <button onClick={() => setModalSalvarAberto(false)} className="px-6 py-2 rounded-lg border border-black bg-[#e6e6e6] text-black font-medium hover:bg-gray-300 transition-colors cursor-pointer">Não</button>
              <button onClick={handleConfirmarSalvar} className="px-6 py-2 rounded-lg border border-black bg-[#0B1B40] text-white font-medium hover:bg-blue-900 transition-colors cursor-pointer">Sim</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sucesso Salvar */}
      {modalSucessoSalvarAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl border border-black shadow-xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200 flex flex-col items-center text-center">
            <CheckCircle2 size={48} className="text-green-600 mb-4" />
            <h2 className="text-xl font-bold text-black mb-2">Sucesso!</h2>
            <p className="text-gray-700 mb-8 text-base">Alterações implementadas no perfil!</p>
            <button onClick={handleFecharSucessoSalvar} className="w-full px-6 py-2 rounded-lg border border-black bg-[#0B1B40] text-white font-medium hover:bg-blue-900 transition-colors cursor-pointer">OK</button>
          </div>
        </div>
      )}

      {/* Modal Excluir (Vermelho) */}
      {modalExcluirAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl border border-black shadow-xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-medium text-black mb-4 border-b border-gray-300 pb-2 flex items-center gap-2">
              <AlertCircle className="text-red-600" size={24} />
              <span className="text-red-600 font-bold">Atenção</span>
            </h2>
            <p className="text-black text-base mb-1">Deseja excluir o perfil <strong>{nomePerfil}</strong>?</p>
            <p className="text-red-500 text-sm font-semibold mb-8">Essa ação é irreversível e desvinculará todos os usuários associados a esse perfil.</p>
            <div className="flex justify-end gap-4 w-full">
              <button onClick={() => setModalExcluirAberto(false)} className="px-6 py-2 rounded-lg border border-black bg-[#e6e6e6] text-black font-medium hover:bg-gray-300 transition-colors cursor-pointer">Não</button>
              <button onClick={handleConfirmarExcluir} className="px-6 py-2 rounded-lg border border-black bg-red-600 text-white font-medium hover:bg-red-700 transition-colors cursor-pointer">Sim</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sucesso Excluir */}
      {modalSucessoExcluirAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl border border-black shadow-xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200 flex flex-col items-center text-center">
            <CheckCircle2 size={48} className="text-green-600 mb-4" />
            <h2 className="text-xl font-bold text-black mb-2">Sucesso!</h2>
            <p className="text-gray-700 mb-8 text-base">Perfil excluído.</p>
            <button onClick={handleFecharSucessoExcluir} className="w-full px-6 py-2 rounded-lg border border-black bg-[#0B1B40] text-white font-medium hover:bg-blue-900 transition-colors cursor-pointer">OK</button>
          </div>
        </div>
      )}

    </div>
  );
}

// ====================================================
// 3. COMPONENTE PAI (Com Suspense para ler a URL)
// ====================================================
export default function EditarPerfilPage() {
  return (
    <div className="flex flex-col h-full bg-white relative w-full">
      <div className="bg-[#e6e6e6] border-b border-black px-6 py-3 flex items-center shrink-0">
        <h1 className="text-2xl font-normal text-black tracking-wide">
          Editar Perfil
        </h1>
      </div>
      <Suspense fallback={<div className="p-8 text-black">Carregando dados...</div>}>
        <EditarPerfilForm />
      </Suspense>
    </div>
  );
}