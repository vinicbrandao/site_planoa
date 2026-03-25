'use client';

import { useState, useRef } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';

const opcoesPerfil = ['Engenheiro Civil', 'Arquiteto', 'Administrador', 'Visitante'];

export default function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [status, setStatus] = useState('Ativo');
  const [perfil, setPerfil] = useState('');
  const [email, setEmail] = useState('');
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [opcoesFiltradas, setOpcoesFiltradas] = useState(opcoesPerfil);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [modalConfirmacaoAberto, setModalConfirmacaoAberto] = useState(false);
  const [modalSucessoAberto, setModalSucessoAberto] = useState(false);

  const handlePerfilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorDigitado = e.target.value;
    setPerfil(valorDigitado);
    setMostrarDropdown(true);
    setOpcoesFiltradas(opcoesPerfil.filter((opcao) =>
      opcao.toLowerCase().includes(valorDigitado.toLowerCase())
    ));
  };

  const handleOpcaoClick = (opcao: string) => {
    setPerfil(opcao);
    setMostrarDropdown(false);
  };

  const handleSalvarClick = () => {
    if (!nome.trim() || !email.trim()) {
      alert("Por favor, preencha Nome e E-mail.");
      return;
    }
    setModalConfirmacaoAberto(true);
  };

  const handleConfirmar = () => {
    const novoUsuario = { id: Date.now().toString(), nome, email, perfil, status };
    const usuariosExistentes = JSON.parse(localStorage.getItem('db_usuarios') || '[]');
    localStorage.setItem('db_usuarios', JSON.stringify([...usuariosExistentes, novoUsuario]));
    setModalConfirmacaoAberto(false);
    setModalSucessoAberto(true);
  };

  const handleFecharSucesso = () => {
    setModalSucessoAberto(false);
    setNome(''); setPerfil(''); setEmail(''); setStatus('Ativo');
  };

  return (
    <div className="flex flex-col h-full bg-[#080818] relative w-full">
      <div className="bg-[#0D0D1F] border-b border-white/20 px-6 py-2 flex items-center shrink-0">
        <h1 className="text-2xl font-normal text-white tracking-wide">Cadastro Usuário</h1>
      </div>

      <div className="p-8 flex-1 overflow-y-auto w-full">
        <div className="mb-8">
          <span className="text-xl text-white border-b border-white/20 pb-1 pr-12 inline-block">
            Informações Gerais
          </span>
        </div>

        <form className="space-y-6 max-w-4xl pb-24">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <label className="block text-white font-medium mb-1">Nome*:</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: João" className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white outline-none focus:ring-1 focus:ring-white/30" />
            </div>
            <div className="w-full md:w-48">
              <label className="block text-white font-medium mb-1">Status:</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white cursor-pointer outline-none">
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* 1. ADICIONADO 'relative' NESTA DIV */}
          <div className="relative w-full md:w-1/2" ref={dropdownRef}>
            
            <label className="block text-white font-medium mb-1">Perfil:</label>
            <input 
              type="text" 
              value={perfil} 
              onChange={handlePerfilChange} 
              onFocus={() => setMostrarDropdown(true)} 
              placeholder="Ex.: Engenheiro Civil" 
              className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white outline-none" 
              autoComplete="off" 
            />
              {mostrarDropdown && opcoesFiltradas.length > 0 && (
                <ul className="absolute z-50 w-full left-0 bg-[#1a1a2e] border border-white/20 border-t-0 mt-0 max-h-48 overflow-y-auto shadow-lg">
                  {opcoesFiltradas.map((opcao, index) => (
                    <li 
                      key={index} 
                      onClick={() => handleOpcaoClick(opcao)} 
                      className="px-3 py-2 text-white cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      {opcao}
                    </li>
                  ))}
                </ul>
              )}
          </div>
        </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <label className="block text-white font-medium mb-1">E-mail*:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ex.: exemplo@planoa.com" className="w-full bg-[#1a1a2e] border border-white/20 px-3 py-2 text-white outline-none" />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20 flex justify-end">
            <button type="button" onClick={handleSalvarClick} className="flex items-center gap-2 cursor-pointer bg-[#0B1B40] hover:bg-blue-900 text-white font-medium py-2.5 px-6 rounded-lg transition transform active:scale-95">
              <Save size={18} /> Salvar Alterações
            </button>
          </div>
        </form>
      </div>

      {/* === MODAIS ADAPTADOS PARA TEMA ESCURO === */}

      {modalConfirmacaoAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          {/* Fundo alterado para o tom escuro do cabeçalho, borda suavizada e texto branco */}
          <div className="bg-[#0D0D1F] rounded-2xl border border-white/10 shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
            {/* Título com texto branco e borda translúcida. O azul do 'Aviso' foi clareado para contraste */}
            <h2 className="text-xl font-medium text-white mb-4 border-b border-white/20 pb-2 flex items-center gap-2">
              <span className="text-blue-400 font-bold">Aviso</span>
            </h2>
            
            <p className="text-white mb-8 text-base">
              Deseja criar o usuário <strong>{nome}</strong> com o perfil <strong>{perfil}</strong>?
            </p>
            
            <div className="flex justify-end gap-4 w-full">
              {/* Botão 'Não' adaptado: borda translúcida, fundo transparente, hover sutil */}
              <button 
                onClick={() => setModalConfirmacaoAberto(false)} 
                className="px-6 py-2 rounded-lg border border-white/20 bg-transparent text-white font-medium hover:bg-white/10 transition-colors cursor-pointer"
              >
                Não
              </button>
              
              {/* Botão 'Sim' mantém a cor primária, removendo a borda preta antiga */}
              <button 
                onClick={handleConfirmar} 
                className="px-6 py-2 rounded-lg bg-[#0B1B40] text-white font-medium hover:bg-blue-900 transition-colors cursor-pointer"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}

      {modalSucessoAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          {/* Mesma adaptação de fundo e borda do modal anterior */}
          <div className="bg-[#0D0D1F] rounded-2xl border border-white/10 shadow-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200 flex flex-col items-center text-center">
            {/* Ícone verde alterado para um tom mais vibrante (emerald-400) para contrastar no escuro */}
            <CheckCircle2 size={48} className="text-emerald-400 mb-4" />
            
            <h2 className="text-xl font-bold text-white mb-2">Sucesso!</h2>
            
            {/* Descrição em cinza claro para suavizar */}
            <p className="text-slate-400 mb-8 text-base">
              Usuário cadastrado e pronto para o login!
            </p>
            
            {/* Botão primário ocupando largura total, sem borda preta */}
            <button 
              onClick={handleFecharSucesso} 
              className="w-full px-6 py-2 rounded-lg bg-[#0B1B40] text-white font-medium hover:bg-blue-900 transition-colors cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}