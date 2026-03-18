'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logoutNoServidor } from '@/app/lib/actions';

interface HeaderProps {
  onMenuClick: () => void;
  cargo: string | null;
}

export function Header({ onMenuClick, cargo }: HeaderProps) {
  const router = useRouter();
  
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [modalSairAberto, setModalSairAberto] = useState(false);
  const [mostrarHeader, setMostrarHeader] = useState(true);

  const ultimoScrollY = useRef(0);

  // O "Olheiro" do Scroll
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement | Document;
      
      // Ignora rolagens dentro de pequenos menus ou tabelas
      if (target !== document && (target as HTMLElement).clientHeight < window.innerHeight * 0.5) {
        return;
      }

      // Pega a posição real de onde a página foi rolada
      const scrollAtual = target === document ? window.scrollY : (target as HTMLElement).scrollTop || 0;

      // Trava de Segurança: Se voltou pro topo da página, mostra a barra sempre.
      if (scrollAtual <= 80) {
        setMostrarHeader(true);
        ultimoScrollY.current = scrollAtual;
        return;
      }

      // Ignora pequenos saltos para evitar tremedeira
      if (Math.abs(scrollAtual - ultimoScrollY.current) < 15) return;

      // A Mágica
      if (scrollAtual > ultimoScrollY.current) {
        setMostrarHeader(false); // Rolou pra baixo: Esconde
      } else {
        setMostrarHeader(true);  // Rolou pra cima: Mostra
      }
      
      ultimoScrollY.current = scrollAtual;
    };

    // O 'true' captura o scroll mesmo se ele acontecer dentro da div de conteúdo
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []); 


  const handleConfirmarSair = async () => {
    setModalSairAberto(false);
    await logoutNoServidor(); 
    router.push('/');         
  };

  return (
    <>
      <header 
        className={`relative w-full shrink-0 h-20 bg-white shadow-sm flex items-center justify-between px-6 border-b border-gray-800 z-40 transition-all duration-300 ease-in-out ${
          mostrarHeader ? 'mt-0' : '-mt-20'
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition focus:outline-none"
          >
            <Menu className="text-blue-900 cursor-pointer" size={24} />
          </button>
          <Link href={`/dashboard?cargo=${cargo || ''}`}>
            <img src="/logo-planoa.png" alt="Logo da plano A" className="h-20 w-auto object-contain cursor-pointer hover:opacity-90 transition" />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:block border border-gray-800 bg-[#0B1B40] text-blue-100 px-4 py-1.5 rounded-full font-medium text-sm">
            Bem-vindo, {cargo || 'Visitante'}!
          </div>

          <Link href={`/user?cargo=${cargo}`} className="p-2 hover:bg-gray-100 rounded-full transition">
            <User className="text-gray-500 hover:text-blue-900" size={24} />
          </Link>
          
          <div className="relative">
            <button 
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition focus:outline-none"
            >
              <Settings 
                className={`transition ${settingsOpen ? 'text-blue-900 rotate-90' : 'text-gray-500 hover:text-blue-900'}`} 
                size={24} 
              />
            </button>

            {settingsOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSettingsOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="py-1">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition">
                      <User size={16} /> Alterar Usuário
                    </Link>
                    <hr className="border-gray-100" />
                    
                    <button 
                      onClick={() => {
                        setModalSairAberto(true);
                        setSettingsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition cursor-pointer text-left"
                    >
                      <LogOut size={16} /> Sair
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* MODAL DE SAIR PROTEGIDO AQUI FORA */}
      {modalSairAberto && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"> 
          <div className="bg-white rounded-2xl border border-black shadow-xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200">
            
            <h2 className="text-xl font-medium text-black mb-4 border-b border-gray-300 pb-2 flex items-center gap-2">
              <span className="text-red-600 font-bold">Aviso</span>
            </h2>
            
            <p className="text-black mb-8 text-base">
              Você deseja encerrar a sessão atual?
            </p>
            
            <div className="flex justify-end gap-4 w-full">
              <button 
                onClick={() => setModalSairAberto(false)}
                className="px-6 py-2 rounded-lg border border-black bg-[#e6e6e6] text-black font-medium hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Não
              </button>
              
              <button 
                onClick={handleConfirmarSair}
                className="px-6 py-2 rounded-lg border border-black bg-red-600 text-white font-medium hover:bg-red-700 transition-colors cursor-pointer"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}