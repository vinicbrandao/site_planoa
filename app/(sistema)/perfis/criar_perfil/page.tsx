'use client';

import { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react'; // Adicionei o CheckCircle2 para o ícone de sucesso

// LISTA INTELIGENTE DE PERMISSÕES
const permissoesIniciais = [
  { id: 'ind_todos', nome: 'Indicadores - Todos', isTodos: true, grupo: 'indicadores', autorizado: false },
  { id: 'ind_menu', nome: 'Indicadores - Menu', isTodos: false, grupo: 'indicadores', autorizado: false },
  { id: 'ind_resumo', nome: 'Indicadores - Resumo', isTodos: false, grupo: 'indicadores', autorizado: false },
  { id: 'ind_comp', nome: 'Indicadores - Comparações', isTodos: false, grupo: 'indicadores', autorizado: false },
  
  { id: 'obr_todos', nome: 'Obras - Todos', isTodos: true, grupo: 'obras', autorizado: false },
  { id: 'obr_menu', nome: 'Obras - Menu', isTodos: false, grupo: 'obras', autorizado: false },
  { id: 'obr_vis', nome: 'Obras - City Park - Visualizar', isTodos: false, grupo: 'obras', autorizado: false },
  { id: 'obr_edit', nome: 'Obras - City Park - Editar', isTodos: false, grupo: 'obras', autorizado: false },
];

export default function CriarPerfil() {
  // ESTADOS DO FORMULÁRIO
  const [nomePerfil, setNomePerfil] = useState('');
  const [permissoes, setPermissoes] = useState(permissoesIniciais);

  // 👇 NOVOS ESTADOS DOS MODAIS 👇
  const [modalSalvarAberto, setModalSalvarAberto] = useState(false);
  const [modalSucessoSalvarAberto, setModalSucessoSalvarAberto] = useState(false);

  // A MÁGICA DO "SELECIONAR TODOS" (Intacta)
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

  // 👇 FUNÇÕES DOS MODAIS 👇
  const handleAbrirSalvar = () => {
    if (!nomePerfil.trim()) {
      alert("Por favor, preencha o nome do perfil antes de salvar.");
      return;
    }
    setModalSalvarAberto(true);
  };

  const handleConfirmarSalvar = () => {
    setModalSalvarAberto(false);
    setModalSucessoSalvarAberto(true);
    // Aqui no futuro entrará o código para salvar o perfil no banco de dados!
  };

  const handleFecharSucessoSalvar = () => {
    setModalSucessoSalvarAberto(false);
    // Limpa a tela para o próximo cadastro de perfil
    setNomePerfil('');
    setPermissoes(permissoesIniciais);
  };

  return (
    <div className="flex flex-col h-full bg-white relative w-full">
      {/* CABEÇALHO */}
      <div className="bg-[#e6e6e6] border-b border-black px-6 py-3 flex items-center shrink-0">
        <h1 className="text-2xl font-normal text-black tracking-wide">
          Criar Perfil
        </h1>
      </div>

      {/* CONTEÚDO */}
      <div className="p-8 flex-1 overflow-y-auto w-full pt-6">
        
        <div className="mb-6">
          <span className="text-xl text-black border-b border-gray-400 pb-1 pr-16 inline-block font-normal">
            Crie um novo perfil de usuário e defina suas autorizações
          </span>
        </div>

        <form className="max-w-4xl pb-24">
          {/* NOME DO PERFIL */}
          <div className="mb-8 max-w-lg">
            <label className="block text-black text-sm mb-1">Perfil:</label>
            <input 
              type="text" 
              value={nomePerfil}
              onChange={(e) => setNomePerfil(e.target.value)}
              placeholder="Ex.: Engenheiro Civil"
              className="w-full bg-[#e6e6e6] border border-black px-3 py-2 text-black outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <p className="text-black mb-2 text-sm">Autorizações:</p>

          {/* TABELA DE AUTORIZAÇÕES */}
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

          {/* BOTÃO SALVAR (Com evento onClick) */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
            <button 
              type="button" 
              onClick={handleAbrirSalvar}
              className="flex items-center gap-2 cursor-pointer bg-[#0B1B40] hover:bg-blue-900 text-white font-medium py-2.5 px-6 rounded-lg transition transform active:scale-95"
            >
              <Save size={18} />
              Salvar Alterações
            </button>
          </div>
        </form>

      </div>

      {/* ========================================================= */}
      {/* 🟢 MODAL DE CONFIRMAÇÃO DE SALVAR 🟢                      */}
      {/* ========================================================= */}
      {modalSalvarAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl border border-black shadow-xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-medium text-black mb-4 border-b border-gray-300 pb-2 flex items-center gap-2">
              <span className="text-blue-600 font-bold">Aviso</span>
            </h2>
            <p className="text-black mb-8 text-base">
              Deseja criar o perfil <strong>{nomePerfil}</strong>?
            </p>
            <div className="flex justify-end gap-4 w-full">
              <button 
                onClick={() => setModalSalvarAberto(false)} 
                className="px-6 py-2 rounded-lg border border-black bg-[#e6e6e6] text-black font-medium hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Não
              </button>
              <button 
                onClick={handleConfirmarSalvar} 
                className="px-6 py-2 rounded-lg border border-black bg-[#0B1B40] text-white font-medium hover:bg-blue-900 transition-colors cursor-pointer"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 🟢 MODAL DE SUCESSO 🟢                                    */}
      {/* ========================================================= */}
      {modalSucessoSalvarAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl border border-black shadow-xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200 flex flex-col items-center text-center">
            <CheckCircle2 size={48} className="text-green-600 mb-4" />
            <h2 className="text-xl font-bold text-black mb-2">Sucesso!</h2>
            <p className="text-gray-700 mb-8 text-base">Perfil cadastrado no sistema!</p>
            <button 
              onClick={handleFecharSucessoSalvar} 
              className="w-full px-6 py-2 rounded-lg border border-black bg-[#0B1B40] text-white font-medium hover:bg-blue-900 transition-colors cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
}