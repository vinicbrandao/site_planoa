'use client';

import { useState } from 'react';
import { Menu, User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logoutNoServidor } from '@/app/lib/actions';

interface HeaderProps {
  onMenuClick: () => void;
  cargo: string | null;
  isSidebarOpen: boolean; 
}

export function Header({ onMenuClick, cargo, isSidebarOpen }: HeaderProps) {
  const router = useRouter();
  
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [modalSairAberto, setModalSairAberto] = useState(false);

  const handleConfirmarSair = async () => {
    setModalSairAberto(false);
    await logoutNoServidor(); 
    router.push('/');         
  };

  return (
    <>
      <header className="relative w-full shrink-0 h-20 bg-[#0a0a1f] shadow-sm flex items-center justify-between px-6 border-b border-gray-800 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-[#04044b] transition focus:outline-none"
          >
            <Menu className="text-blue-900 cursor-pointer" size={24} />
          </button>
          <Link href={`/dashboard?cargo=${cargo}`}>
            <img src="/logo-planoa-branco.png" alt="Logo da plano A" className="h-15 w-auto object-contain cursor-pointer hover:opacity-90 transition" />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:block border border-gray-800 bg-[#0B1B40] text-blue-100 px-4 py-1.5 rounded-full font-medium text-sm">
            Bem-vindo, {cargo}!
          </div>

          <Link href={`/user?cargo=${cargo}`} className="p-2 hover:bg-[#04044b] rounded-full transition cursor-pointer">
            <User className="text-gray-500 hover:text-blue-900" size={24} />
          </Link>
          
          <div className="relative">
            <button 
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="p-2 hover:bg-[#04044b] rounded-full cursor-pointer transition focus:outline-none"
            >
              <Settings 
                className={`transition ${settingsOpen ? 'text-blue-900 rotate-90' : 'text-gray-500 hover:text-blue-900'}`} 
                size={24} 
              />
            </button>

            {settingsOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSettingsOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-48 bg-[#04044b] rounded-xl shadow-xl border border-gray-500 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="py-1">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-gray-500 hover:text-blue-700 transition">
                      <User size={16} /> Alterar Usuário
                    </Link>
                    <hr className="border-gray-500" />
                    
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
          <div className="bg-[#04044b] rounded-2xl border border-black shadow-xl p-6 w-full max-w-sm animate-in fade-in zoom-in duration-200">
            
            <h2 className="text-xl font-medium text-black mb-4 border-b border-gray-300 pb-2 flex items-center gap-2">
              <span className="text-red-600 font-bold">Aviso</span>
            </h2>
            
            <p className="text-white mb-8 text-base">
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