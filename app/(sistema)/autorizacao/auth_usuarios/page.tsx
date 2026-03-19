'use client';

import { useState, useRef, useEffect } from 'react';
import { IUsuário, IAutorização } from '@/lib/types';

// 1. NOSSO "BANCO DE DADOS"
const usuariosCadastrados = [
  {
    id: '2NJNGJ-MRRF-224FMRF-9943N', // O uid virou o id principal
    nome: 'João da Silva',
    email: 'joao.silva@planoa.com',
    status: 'Ativo',
    autorizacoes: [
      { nome: 'Indicadores - Menu', autorizado: true },
      { nome: 'Indicadores - Resumo', autorizado: true },
      { nome: 'Indicadores - Comparações', autorizado: false },
      { nome: 'Indicadores - SAA', autorizado: true },
      { nome: 'Viabilidade - Menu', autorizado: true },
      { nome: 'Obras - Menu', autorizado: true },
      { nome: 'Obras - City Park - Visualizar', autorizado: false },
      { nome: 'Obras - City Park - Editar', autorizado: false },
    ]
  },
  {
    id: '8XJKS-PLMN-192MDJ-1029X', // O uid virou o id principal
    nome: 'Maria Souza',
    email: 'maria.souza@planoa.com',
    status: 'Inativo',
    autorizacoes: [
      { nome: 'Indicadores - Menu', autorizado: true },
      { nome: 'Indicadores - Resumo', autorizado: false },
      { nome: 'Indicadores - Comparações', autorizado: false },
      { nome: 'Indicadores - SAA', autorizado: false },
      { nome: 'Viabilidade - Menu', autorizado: false },
      { nome: 'Obras - Menu', autorizado: true },
      { nome: 'Obras - City Park - Visualizar', autorizado: true },
      { nome: 'Obras - City Park - Editar', autorizado: true },
    ]
  }
];

export default function AutorizacoesUsuarios() {
  // 2. ESTADOS DOS CAMPOS
  const [id, setId] = useState(''); // Alterado de uid para id
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  // 3. ESTADOS DO MENU CUSTOMIZADO
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<IUsuario | null>(null);
  const [autorizacoes, setAutorizacoes] = useState<IAutorizacao[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<'id' | 'nome' | 'email' | null>(null); // Alterado de uid para id
  const [sugestoes, setSugestoes] = useState(usuariosCadastrados);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o menu se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 4. FUNÇÃO QUE PREENCHE TUDO E MOSTRA A TABELA
  const preencherDados = (match: any) => {
    setId(match.id); // Alterado de uid para id
    setNome(match.nome);
    setEmail(match.email);
    setStatus(match.status);
    setUsuarioSelecionado(match);
    setAutorizacoes(match.autorizacoes);
    setActiveDropdown(null); // Esconde a listinha ao selecionar
  };

  // 5. A MÁGICA DA BUSCA INDIVIDUAL
  const handleInputChange = (campo: 'id' | 'nome' | 'email' | 'status', valor: string) => { // Alterado de uid para id
    setUsuarioSelecionado(null);

    // Se apagar tudo, limpa a tela
    if (valor === '') {
      setId(''); setNome(''); setEmail(''); setStatus(''); // Alterado
      setActiveDropdown(null);
      return;
    }

    // Limpa as outras caixas para focar na busca atual
    if (campo === 'id') { setId(valor); setNome(''); setEmail(''); setStatus(''); } // Alterado
    if (campo === 'nome') { setNome(valor); setId(''); setEmail(''); setStatus(''); } // Alterado
    if (campo === 'email') { setEmail(valor); setId(''); setNome(''); setStatus(''); } // Alterado
    if (campo === 'status') { setStatus(valor); }

    // Filtra as sugestões para o menu bonitinho
    if (campo !== 'status') {
      const filtrados = usuariosCadastrados.filter((u) => {
        if (campo === 'id') return u.id.toLowerCase().includes(valor.toLowerCase()); // Alterado
        if (campo === 'nome') return u.nome.toLowerCase().includes(valor.toLowerCase());
        if (campo === 'email') return u.email.toLowerCase().includes(valor.toLowerCase());
        return false;
      });
      setSugestoes(filtrados);
      setActiveDropdown(campo);
    }

    // Se o que digitou bater 100% com alguém, já preenche tudo sozinho
    const match = usuariosCadastrados.find((u) => {
      if (campo === 'id') return u.id.toLowerCase() === valor.toLowerCase(); // Alterado
      if (campo === 'nome') return u.nome.toLowerCase() === valor.toLowerCase();
      if (campo === 'email') return u.email.toLowerCase() === valor.toLowerCase();
      return false;
    });

    if (match) {
      preencherDados(match);
    }
  };

  const handleToggleAutorizacao = (index: number) => {
  setAutorizacoes((lista) =>
    lista.map((item, i) =>
      i === index ? { ...item, autorizado: !item.autorizado } : item));
};

  return (
    <div className="flex flex-col h-full bg-white relative w-full">
      
      <div className="bg-[#e6e6e6] border-b border-black px-6 py-3 flex items-center shrink-0">
        <h1 className="text-2xl font-normal text-black tracking-wide">
          Autorizações dos Usuários
        </h1>
      </div>

      <div className="p-8 flex-1 overflow-y-auto w-full pt-6">
        
        <div className="mb-6">
          <span className="text-xl text-black border-b border-gray-400 pb-1 pr-16 inline-block font-normal">
            Parâmetros de Consulta
          </span>
        </div>

        {/* Formulário envelopado no Ref para fechar a lista ao clicar fora */}
        <div className="flex flex-col gap-4 max-w-sm" ref={dropdownRef}>
          
          {/* === CAMPO ID === */}
          <div className="relative w-full">
            <label className="block text-black text-sm mb-1">ID:</label> {/* Alterado */}
            <input 
              type="text" 
              value={id} // Alterado
              onChange={(e) => handleInputChange('id', e.target.value)} // Alterado
              onFocus={() => { if(id) { setActiveDropdown('id'); handleInputChange('id', id); } }} // Alterado
              placeholder="Digite para buscar pelo ID..." // Alterado
              autoComplete="off"
              className="w-full bg-[#e6e6e6] border border-black px-2 py-1.5 text-black outline-none focus:ring-1 focus:ring-black" 
            />
            {/* Lista Customizada ID */}
            {activeDropdown === 'id' && sugestoes.length > 0 && ( // Alterado
              <ul className="absolute z-50 w-full bg-[#e6e6e6] border border-black border-t-0 mt-0 max-h-48 overflow-y-auto shadow-lg">
                {sugestoes.map((u) => (
                  <li key={u.id} onClick={() => preencherDados(u)} className="px-2 py-1.5 text-black cursor-pointer hover:bg-[#c0c0c0] transition-colors flex flex-col">
                    <span>{u.id}</span> {/* Alterado */}
                    <span className="text-gray-600 text-xs">{u.nome}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* === CAMPO NOME === */}
          <div className="relative w-full">
            <label className="block text-black text-sm mb-1">Nome:</label>
            <input 
              type="text" 
              value={nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              onFocus={() => { if(nome) { setActiveDropdown('nome'); handleInputChange('nome', nome); } }}
              placeholder="Digite para buscar pelo Nome..."
              autoComplete="off"
              className="w-full bg-[#e6e6e6] border border-black px-2 py-1.5 text-black outline-none focus:ring-1 focus:ring-black" 
            />
            {/* Lista Customizada Nome */}
            {activeDropdown === 'nome' && sugestoes.length > 0 && (
              <ul className="absolute z-50 w-full bg-[#e6e6e6] border border-black border-t-0 mt-0 max-h-48 overflow-y-auto shadow-lg">
                {sugestoes.map((u) => (
                  <li key={u.id} onClick={() => preencherDados(u)} className="px-2 py-1.5 text-black cursor-pointer hover:bg-[#c0c0c0] transition-colors flex flex-col">
                    <span>{u.nome}</span>
                    <span className="text-gray-600 text-xs">{u.email}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* === CAMPO E-MAIL === */}
          <div className="relative w-full">
            <label className="block text-black text-sm mb-1">E-mail:</label>
            <input 
              type="text" 
              value={email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onFocus={() => { if(email) { setActiveDropdown('email'); handleInputChange('email', email); } }}
              placeholder="Digite para buscar pelo E-mail..."
              autoComplete="off"
              className="w-full bg-[#e6e6e6] border border-black px-2 py-1.5 text-black outline-none focus:ring-1 focus:ring-black" 
            />
            {/* Lista Customizada E-mail */}
            {activeDropdown === 'email' && sugestoes.length > 0 && (
              <ul className="absolute z-50 w-full bg-[#e6e6e6] border border-black border-t-0 mt-0 max-h-48 overflow-y-auto shadow-lg">
                {sugestoes.map((u) => (
                  <li key={u.id} onClick={() => preencherDados(u)} className="px-2 py-1.5 text-black cursor-pointer hover:bg-[#c0c0c0] transition-colors flex flex-col">
                    <span>{u.email}</span>
                    <span className="text-gray-600 text-xs">{u.nome}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* === CAMPO STATUS === */}
          <div>
            <label className="block text-black text-sm mb-1">Status:</label>
            <input 
              type="text" 
              value={status}
              readOnly 
              className="w-full bg-[#f0f0f0] border border-black px-2 py-1.5 text-black outline-none opacity-80 cursor-not-allowed" 
            />
          </div>

        </div>

        {/* === SEÇÃO 2: RESULTADO DA CONSULTA === */}
        {usuarioSelecionado && (
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
            
            <div className="mb-6">
              <span className="text-xl text-black border-b border-gray-400 pb-1 pr-16 inline-block font-normal">
                Resultado da Consulta
              </span>
            </div>         
            <div className="border border-black w-full max-w-4xl overflow-x-auto bg-[#e6e6e6]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 border-r border-b border-black font-semibold text-black">Autorizações de {usuarioSelecionado.nome}</th>
                    <th className="p-2 border-b border-black font-semibold text-black text-center text-xs w-32">Autorizado</th>
                  </tr>
                </thead>
                <tbody>
                {autorizacoes.map((item: IAutorizacao, index: number) => (
                  <tr key={index} className="border-b border-black last:border-b-0 hover:bg-[#d4d4d4] transition-colors">
                    <td className="p-2 border-r border-black text-black">{item.nome}</td>
                    <td className="p-2 flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={item.autorizado}
                        onChange={() => handleToggleAutorizacao(index)}
                        className="w-5 h-5 cursor-pointer accent-black"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}