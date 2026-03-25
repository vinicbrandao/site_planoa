'use client';

import { useState, useRef, useEffect } from 'react';
import { IUsuario, IAutorizacao } from '@/lib/types';

const usuariosCadastrados = [
  {
    id: '2NJNGJ-MRRF-224FMRF-9943N',
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
    id: '8XJKS-PLMN-192MDJ-1029X',
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
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<IUsuario | null>(null);
  const [autorizacoes, setAutorizacoes] = useState<IAutorizacao[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<'id' | 'nome' | 'email' | null>(null);
  const [sugestoes, setSugestoes] = useState(usuariosCadastrados);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const preencherDados = (match: any) => {
    setId(match.id);
    setNome(match.nome);
    setEmail(match.email);
    setStatus(match.status);
    setUsuarioSelecionado(match);
    setAutorizacoes(match.autorizacoes);
    setActiveDropdown(null);
  };

  const handleInputChange = (campo: 'id' | 'nome' | 'email' | 'status', valor: string) => {
    setUsuarioSelecionado(null);
    if (valor === '') {
      setId(''); setNome(''); setEmail(''); setStatus('');
      setActiveDropdown(null);
      return;
    }
    if (campo === 'id') { setId(valor); setNome(''); setEmail(''); setStatus(''); }
    if (campo === 'nome') { setNome(valor); setId(''); setEmail(''); setStatus(''); }
    if (campo === 'email') { setEmail(valor); setId(''); setNome(''); setStatus(''); }
    if (campo === 'status') { setStatus(valor); }
    if (campo !== 'status') {
      const filtrados = usuariosCadastrados.filter((u) => {
        if (campo === 'id') return u.id.toLowerCase().includes(valor.toLowerCase());
        if (campo === 'nome') return u.nome.toLowerCase().includes(valor.toLowerCase());
        if (campo === 'email') return u.email.toLowerCase().includes(valor.toLowerCase());
        return false;
      });
      setSugestoes(filtrados);
      setActiveDropdown(campo);
    }
    const match = usuariosCadastrados.find((u) => {
      if (campo === 'id') return u.id.toLowerCase() === valor.toLowerCase();
      if (campo === 'nome') return u.nome.toLowerCase() === valor.toLowerCase();
      if (campo === 'email') return u.email.toLowerCase() === valor.toLowerCase();
      return false;
    });
    if (match) preencherDados(match);
  };

  const handleToggleAutorizacao = (index: number) => {
    setAutorizacoes((lista) =>
      lista.map((item, i) =>
        i === index ? { ...item, autorizado: !item.autorizado } : item));
  };

  return (
    <div className="flex flex-col h-full bg-[#080818] relative w-full">
      <div className="bg-[#0D0D1F] border-b border-white/20 px-6 py-3 flex items-center shrink-0">
        <h1 className="text-2xl font-normal text-white tracking-wide">Autorizações dos Usuários</h1>
      </div>

      <div className="p-8 flex-1 overflow-y-auto w-full pt-6">
        <div className="mb-6">
          <span className="text-xl text-white border-b border-white/20 pb-1 pr-16 inline-block font-normal">
            Parâmetros de Consulta
          </span>
        </div>

        <div className="flex flex-col gap-4 max-w-sm" ref={dropdownRef}>
          {/* CAMPO ID */}
          <div className="relative w-full">
            <label className="block text-white text-sm mb-1">ID:</label>
            <input
              type="text" value={id}
              onChange={(e) => handleInputChange('id', e.target.value)}
              onFocus={() => { if(id) { setActiveDropdown('id'); handleInputChange('id', id); } }}
              placeholder="Digite para buscar pelo ID..."
              autoComplete="off"
              className="w-full bg-[#1a1a2e] border border-white/20 px-2 py-1.5 text-white outline-none focus:ring-1 focus:ring-white/30"
            />
            {activeDropdown === 'id' && sugestoes.length > 0 && (
              <ul className="absolute z-50 w-full bg-[#1a1a2e] border border-white/20 border-t-0 mt-0 max-h-48 overflow-y-auto shadow-lg">
                {sugestoes.map((u) => (
                  <li key={u.id} onClick={() => preencherDados(u)} className="px-2 py-1.5 text-white cursor-pointer hover:bg-white/10 transition-colors flex flex-col">
                    <span>{u.id}</span>
                    <span className="text-gray-400 text-xs">{u.nome}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* CAMPO NOME */}
          <div className="relative w-full">
            <label className="block text-white text-sm mb-1">Nome:</label>
            <input
              type="text" value={nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              onFocus={() => { if(nome) { setActiveDropdown('nome'); handleInputChange('nome', nome); } }}
              placeholder="Digite para buscar pelo Nome..."
              autoComplete="off"
              className="w-full bg-[#1a1a2e] border border-white/20 px-2 py-1.5 text-white outline-none focus:ring-1 focus:ring-white/30"
            />
            {activeDropdown === 'nome' && sugestoes.length > 0 && (
              <ul className="absolute z-50 w-full bg-[#1a1a2e] border border-white/20 border-t-0 mt-0 max-h-48 overflow-y-auto shadow-lg">
                {sugestoes.map((u) => (
                  <li key={u.id} onClick={() => preencherDados(u)} className="px-2 py-1.5 text-white cursor-pointer hover:bg-white/10 transition-colors flex flex-col">
                    <span>{u.nome}</span>
                    <span className="text-gray-400 text-xs">{u.email}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* CAMPO E-MAIL */}
          <div className="relative w-full">
            <label className="block text-white text-sm mb-1">E-mail:</label>
            <input
              type="text" value={email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onFocus={() => { if(email) { setActiveDropdown('email'); handleInputChange('email', email); } }}
              placeholder="Digite para buscar pelo E-mail..."
              autoComplete="off"
              className="w-full bg-[#1a1a2e] border border-white/20 px-2 py-1.5 text-white outline-none focus:ring-1 focus:ring-white/30"
            />
            {activeDropdown === 'email' && sugestoes.length > 0 && (
              <ul className="absolute z-50 w-full bg-[#1a1a2e] border border-white/20 border-t-0 mt-0 max-h-48 overflow-y-auto shadow-lg">
                {sugestoes.map((u) => (
                  <li key={u.id} onClick={() => preencherDados(u)} className="px-2 py-1.5 text-white cursor-pointer hover:bg-white/10 transition-colors flex flex-col">
                    <span>{u.email}</span>
                    <span className="text-gray-400 text-xs">{u.nome}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* CAMPO STATUS */}
          <div>
            <label className="block text-white text-sm mb-1">Status:</label>
            <input
              type="text" value={status} readOnly
              className="w-full bg-[#1a1a2e] border border-white/20 px-2 py-1.5 text-white outline-none opacity-60 cursor-not-allowed"
            />
          </div>
        </div>

        {usuarioSelecionado && (
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
            <div className="mb-6">
              <span className="text-xl text-white border-b border-white/20 pb-1 pr-16 inline-block font-normal">
                Resultado da Consulta
              </span>
            </div>
            <div className="border border-white/20 w-full max-w-4xl overflow-x-auto bg-[#0D0D1F]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 border-r border-b border-white/20 font-semibold text-white">Autorizações de {usuarioSelecionado.nome}</th>
                    <th className="p-2 border-b border-white/20 font-semibold text-white text-center text-xs w-32">Autorizado</th>
                  </tr>
                </thead>
                <tbody>
                  {autorizacoes.map((item: IAutorizacao, index: number) => (
                    <tr key={index} className="border-b border-white/20 last:border-b-0 hover:bg-white/5 transition-colors">
                      <td className="p-2 border-r border-white/20 text-white">{item.nome}</td>
                      <td className="p-2 flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={item.autorizado}
                          onChange={() => handleToggleAutorizacao(index)}
                          className="w-5 h-5 cursor-pointer accent-blue-500"
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