'use client';

import { useState, useRef, useEffect } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';

const opcoesPerfil = [
  'Engenheiro Civil',
  'Arquiteto',
  'Administrador',
  'Visitante',
];

export default function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [status, setStatus] = useState('Ativo');
  const [perfil, setPerfil] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState(''); // 1. NOVO: Estado para a senha

  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [opcoesFiltradas, setOpcoesFiltradas] = useState(opcoesPerfil);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [modalConfirmacaoAberto, setModalConfirmacaoAberto] = useState(false);
  const [modalSucessoAberto, setModalSucessoAberto] = useState(false);

  // --- FUNÇÕES DE CONTROLE ---
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
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      alert("Por favor, preencha Nome, E-mail e Senha.");
      return;
    }
    setModalConfirmacaoAberto(true);
  };

  // 2. NOVO: AQUI É ONDE COLOCAMOS AS CONST PARA SALVAR NO BANCO FAKE
  const handleConfirmar = () => {
    // Criamos a "ficha" do novo usuário
    const novoUsuario = {
      id: Date.now().toString(), // Gera um ID único simples
      nome: nome,
      email: email,
      perfil: perfil,
      senha: senha,
      status: status
    };

    // Puxamos o que já tem no "Banco Fake", ou criamos uma lista vazia se não existir nada
    const usuariosExistentes = JSON.parse(localStorage.getItem('db_usuarios') || '[]');
    
    // Adicionamos o novo na lista
    const novaLista = [...usuariosExistentes, novoUsuario];

    // Salvamos a lista atualizada de volta no navegador
    localStorage.setItem('db_usuarios', JSON.stringify(novaLista));

    setModalConfirmacaoAberto(false);
    setModalSucessoAberto(true);
  };

  const handleFecharSucesso = () => {
    setModalSucessoAberto(false);
    setNome('');
    setPerfil('');
    setEmail('');
    setSenha(''); // Limpa a senha também
    setStatus('Ativo');
  };

  return (
    <div className="flex flex-col h-full bg-white relative w-full">
      <div className="bg-[#e6e6e6] border-b border-gray-800 px-6 py-2 flex items-center shrink-0">
        <h1 className="text-2xl font-normal text-black tracking-wide">Cadastro Usuário</h1>
      </div>

      <div className="p-8 flex-1 overflow-y-auto w-full bg-white">
        <div className="mb-8">
          <span className="text-xl text-black border-b border-gray-400 pb-1 pr-12 inline-block">
            Informações Gerais
          </span>
        </div>

        <form className="space-y-6 max-w-4xl pb-24">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <label className="block text-black font-medium mb-1">Nome*:</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: João" className="w-full bg-[#D9D9D9] border border-black px-3 py-2 text-black outline-none focus:ring-1 focus:ring-black" />
            </div>

            <div className="w-full md:w-48">
              <label className="block text-black font-medium mb-1">Status:</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-[#D9D9D9] border border-black px-3 py-2 text-black cursor-pointer outline-none">
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-112" ref={dropdownRef}>
              <label className="block text-black font-medium mb-1">Perfil:</label>
              <input type="text" value={perfil} onChange={handlePerfilChange} onFocus={() => setMostrarDropdown(true)} placeholder="Ex.: Engenheiro Civil" className="w-full bg-[#D9D9D9] border border-black px-3 py-2 text-black outline-none" autoComplete="off" />
              {mostrarDropdown && opcoesFiltradas.length > 0 && (
                <ul className="absolute z-50 w-112 bg-[#D9D9D9] border border-black border-t-0 mt-0 max-h-60 overflow-y-auto shadow-lg">
                  {opcoesFiltradas.map((opcao, index) => (
                    <li key={index} onClick={() => handleOpcaoClick(opcao)} className="px-3 py-2 text-black cursor-pointer hover:bg-[#c0c0c0] transition-colors">{opcao}</li>
                  ))}
                </ul>
              )}
            </div>
            </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <label className="block text-black font-medium mb-1">E-mail*:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ex.: exemplo@planoa.com" className="w-full bg-[#D9D9D9] border border-black px-3 py-2 text-black outline-none" />
            </div>
          </div>

          
          <div className="fixed bottom-0 right-0 p-8 bg-white w-[calc(100%-16rem)] border-t border-gray-200 flex justify-end z-10">
            <button type="button" onClick={handleSalvarClick} className="flex items-center gap-2 cursor-pointer bg-[#0B1B40] hover:bg-blue-900 text-white font-medium py-2.5 px-6 rounded-lg transition transform active:scale-95">
              <Save size={18} /> Salvar Alterações
            </button>
          </div>
        </form>
      </div>

      {/* MODAL 1: CONFIRMAÇÃO */}
      {modalConfirmacaoAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl border border-black shadow-xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-medium text-black mb-4 border-b border-gray-300 pb-2 flex items-center gap-2"><span className="text-blue-600 font-bold">Aviso</span></h2>
            <p className="text-black mb-8 text-base">Deseja criar o usuário <strong>{nome}</strong> com o perfil <strong>{perfil}</strong>?</p>
            <div className="flex justify-end gap-4 w-full">
              <button onClick={() => setModalConfirmacaoAberto(false)} className="px-6 py-2 rounded-lg border border-black bg-[#e6e6e6] text-black font-medium hover:bg-gray-300 transition-colors cursor-pointer">Não</button>
              <button onClick={handleConfirmar} className="px-6 py-2 rounded-lg border border-black bg-[#0B1B40] text-white font-medium hover:bg-blue-900 transition-colors cursor-pointer">Sim</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SUCESSO */}
      {modalSucessoAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl border border-black shadow-xl p-6 w-full max-sm animate-in fade-in zoom-in duration-200 flex flex-col items-center text-center">
            <CheckCircle2 size={48} className="text-green-600 mb-4" />
            <h2 className="text-xl font-bold text-black mb-2">Sucesso!</h2>
            <p className="text-gray-700 mb-8 text-base">Usuário cadastrado e pronto para o login!</p>
            <button onClick={handleFecharSucesso} className="w-full px-6 py-2 rounded-lg border border-black bg-[#0B1B40] text-white font-medium hover:bg-blue-900 transition-colors cursor-pointer">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}