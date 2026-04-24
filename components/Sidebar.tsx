"use client";

import { useState, useEffect } from "react";
import { Menu, ChevronRight, ChevronDown, Users, Shield, HardHat, UserPlus, UserCog, Search, LogOut, Eye, PlusCircle, Edit, Lock, Key, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 

interface SidebarProps {
  isOpen: boolean;
  cargo: string | null;
  onClose?: () => void;
}

export function Sidebar({ isOpen, cargo, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Estados iniciais: baseados na URL para já nascerem abertos na página certa
  const [isSegurancaOpen, setIsSegurancaOpen] = useState(true);
  const [isUsuariosOpen, setIsUsuariosOpen] = useState(
    pathname.startsWith("/usuarios"),
  );
  const [isPerfisOpen, setIsPerfisOpen] = useState(
    pathname.startsWith("/perfis"),
  );
  const [isObrasOpen, setIsObrasOpen] = useState(pathname.startsWith("/obras"));
  const [isAutorizacoesOpen, setIsAutorizacoesOpen] = useState(
    pathname.startsWith("/autorizacoes"),
  );
  const [isIndicadoresOpen, setIsIndicadoresOpen] = useState(
    pathname.startsWith("/indicadores"),
  );

  // A MÁGICA DA MEMÓRIA: Assim que carregar, puxa as anotações do navegador
  useEffect(() => {
    const memorySeguranca = localStorage.getItem("menu_seguranca");
    if (memorySeguranca !== null) setIsSegurancaOpen(memorySeguranca === "true");

    const memoryUsuarios = localStorage.getItem("menu_usuarios");
    if (memoryUsuarios !== null) setIsUsuariosOpen(memoryUsuarios === "true");

    const memoryPerfis = localStorage.getItem("menu_perfis");
    if (memoryPerfis !== null) setIsPerfisOpen(memoryPerfis === "true");

    const memoryObras = localStorage.getItem("menu_obras");
    if (memoryObras !== null) setIsObrasOpen(memoryObras === "true");

    const memoryAutorizacoes = localStorage.getItem("menu_autorizacoes");
    if (memoryAutorizacoes !== null) setIsAutorizacoesOpen(memoryAutorizacoes === "true");

    const memoryIndicadores = localStorage.getItem("menu_indicadores");
    if (memoryIndicadores !== null) setIsIndicadoresOpen(memoryIndicadores === "true");
  }, []);

  // O Menu Inteligente continua aqui (Força a aba atual ficar aberta)
  useEffect(() => {
    if (pathname.startsWith("/usuarios")) {
      setIsUsuariosOpen(true);
      localStorage.setItem("menu_usuarios", "true");
    }
    if (pathname.startsWith("/perfis")) {
      setIsPerfisOpen(true);
      localStorage.setItem("menu_perfis", "true");
    }
    if (pathname.startsWith("/obras")) {
      setIsObrasOpen(true);
      localStorage.setItem("menu_obras", "true");
    }
    if (pathname.startsWith("/autorizacoes")) {
      setIsAutorizacoesOpen(true);
      localStorage.setItem("menu_autorizacoes", "true");
    }
    if (pathname.startsWith("/indicadores")) {
      setIsIndicadoresOpen(true);
      localStorage.setItem("menu_indicadores", "true");
    }
  }, [pathname]);

  // Função central que abre/fecha e SALVA no navegador
  const toggleMenu = (
    menuName: string,
    currentState: boolean,
    setter: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    const newState = !currentState;
    setter(newState);
    localStorage.setItem(`menu_${menuName}`, String(newState));
  };

  const SidebarLink = ({
    href,
    icon: Icon,
    label,
  }: {
    href: string;
    icon: any;
    label: string;
  }) => {
    const hrefWithAuth = `${href}?cargo=${cargo || ""}`;
    const isActive = pathname === href;

    return (
      <Link
        href={hrefWithAuth}
        onClick={onClose}
        className={`flex items-center gap-2 px-2 py-2 rounded-lg transition-all font-medium whitespace-nowrap
          ${isActive ? "bg-blue-600/20 text-blue-400" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
      >
        <Icon size={20} />
        {label}
      </Link>
    );
  };

  return (
    <>
      {/* FUNDO DESFOCADO (BACKDROP) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[45] bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR (Agora flutuante por cima de tudo) */}
      <aside
        className={`fixed top-0 left-0 z-50 bg-[#0a0a1f] text-white flex flex-col h-screen w-64 transform transition-transform duration-300 ease-in-out border-r border-white/10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* HEADER COM A LOGO */}
        <div className="h-20 w-full flex items-center justify-center border-b border-white/10 shrink-0 px-4 bg-[#0a0a1f]">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition focus:outline-none cursor-pointer absolute left-4"
          >
            <Menu className="text-blue-400" size={24} />
          </button>
          <Link href={`/dashboard?cargo=${cargo}`} onClick={onClose} className="ml-8">
            <img
              src="/logo-planoa-branco.png"
              alt="Logo da plano A"
              className="h-12 w-auto object-contain cursor-pointer hover:opacity-90 transition"
            />
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          
          {/* NAVEGAÇÃO */}
          <nav className="flex-1 px-4 space-y-4 mt-6">
            <div className="space-y-1">
              {/* === MÓDULO RAIZ: INDICADORES === */}
              <div className="flex flex-col mt-4">
                <button
                  onClick={() => toggleMenu("indicadores", isIndicadoresOpen, setIsIndicadoresOpen)}
                  className="flex items-center justify-between cursor-pointer px-2 py-2 rounded-lg transition-all text-slate-400 hover:text-white hover:bg-white/5 w-full mb-2 group"
                >
                  <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs">
                    <TrendingUp size={16} className="text-blue-400 group-hover:text-blue-300" />
                    <span>Indicadores</span>
                  </div>
                  {isIndicadoresOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>

                {isIndicadoresOpen && (
                  <div className="flex flex-col pl-3 ml-2 border-l border-white/10 space-y-1 mb-4">
                    <SidebarLink
                      href="/indicadores"
                      icon={TrendingUp}
                      label="Dashboards"
                    />
                  </div>
                )}
              </div>

              {/* === MÓDULO RAIZ: SEGURANÇA === */}
              <div className="flex flex-col mt-4">
                <button
                  onClick={() => toggleMenu("seguranca", isSegurancaOpen, setIsSegurancaOpen)}
                  className="flex items-center justify-between cursor-pointer px-2 py-2 rounded-lg transition-all text-slate-400 hover:text-white hover:bg-white/5 w-full mb-2 group"
                >
                  <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs">
                    <Lock size={16} className="text-blue-400 group-hover:text-blue-300" />
                    <span>Segurança</span>
                  </div>
                  {isSegurancaOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>

                {isSegurancaOpen && (
                  <div className="flex flex-col pl-3 ml-2 border-l border-white/10 space-y-1">
                    
                    {/* Módulo Usuários */}
                    <div className="flex flex-col">
                      <button
                        onClick={() => toggleMenu("usuarios", isUsuariosOpen, setIsUsuariosOpen)}
                        className="flex items-center justify-between cursor-pointer px-2 py-2 rounded-lg transition-all font-medium text-slate-300 hover:text-white hover:bg-white/5 w-full"
                      >
                        <div className="flex items-center gap-2">
                          <Users size={18} className="text-slate-400" />
                          <span>Usuários</span>
                        </div>
                        {isUsuariosOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </button>
                      {isUsuariosOpen && (
                        <div className="flex flex-col pl-6 mt-1 space-y-1 mb-2">
                          <SidebarLink href="/usuarios/cadastro_user" icon={UserPlus} label="Cadastro" />
                          <SidebarLink href="/usuarios/editar_user" icon={UserCog} label="Editar" />
                          <SidebarLink href="/usuarios/consultar_user" icon={Search} label="Consultar" />
                        </div>
                      )}
                    </div>

                    {/* Módulo Perfis */}
                    <div className="flex flex-col">
                      <button
                        onClick={() => toggleMenu("perfis", isPerfisOpen, setIsPerfisOpen)}
                        className="flex items-center justify-between cursor-pointer px-2 py-2 rounded-lg transition-all font-medium text-slate-300 hover:text-white hover:bg-white/5 w-full"
                      >
                        <div className="flex items-center gap-2">
                          <Shield size={18} className="text-slate-400" />
                          <span>Perfis</span>
                        </div>
                        {isPerfisOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </button>
                      {isPerfisOpen && (
                        <div className="flex flex-col pl-6 mt-1 space-y-1 mb-2">
                          <SidebarLink href="/perfis/criar_perfil" icon={Shield} label="Criar Perfil" />
                          <SidebarLink href="/perfis/editar_perfil" icon={Edit} label="Editar Perfil" />
                          <SidebarLink href="/perfis/consultar_perfil" icon={Search} label="Consultar Perfil" />
                        </div>
                      )}
                    </div>

                    {/* Módulo Obras */}
                    <div className="flex flex-col">
                      <button
                        onClick={() => toggleMenu("obras", isObrasOpen, setIsObrasOpen)}
                        className="flex items-center justify-between cursor-pointer px-2 py-2 rounded-lg transition-all font-medium text-slate-300 hover:text-white hover:bg-white/5 w-full"
                      >
                        <div className="flex items-center gap-2">
                          <HardHat size={18} className="text-slate-400" />
                          <span>Obras</span>
                        </div>
                        {isObrasOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </button>
                      {isObrasOpen && (
                        <div className="flex flex-col pl-6 mt-1 space-y-1 mb-2">
                          <SidebarLink href="/obras/cadastro_obra" icon={PlusCircle} label="Cadastro Obras" />
                          <SidebarLink href="/obras/editar_obra" icon={Edit} label="Editar Obras" />
                          <SidebarLink href="/obras/visualizar_obra" icon={Eye} label="Ver Obra" />
                        </div>
                      )}
                    </div>

                  </div>
                )}
              </div>

              {/* === MÓDULO RAIZ: AUTORIZAÇÕES === */}
              <div className="flex flex-col mt-4">
                <button
                  onClick={() => toggleMenu("autorizacoes", isAutorizacoesOpen, setIsAutorizacoesOpen)}
                  className="flex items-center justify-between cursor-pointer px-2 py-2 rounded-lg transition-all text-slate-400 hover:text-white hover:bg-white/5 w-full mb-2 group"
                >
                  <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs">
                    <Key size={16} className="text-blue-400 group-hover:text-blue-300" />
                    <span>Autorizações</span>
                  </div>
                  {isAutorizacoesOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>

                {isAutorizacoesOpen && (
                  <div className="flex flex-col pl-3 ml-2 border-l border-white/10 space-y-1">
                    <SidebarLink href="/autorizacao/auth_usuarios" icon={Users} label="Usuários" />
                  </div>
                )}
              </div>

            </div>
          </nav>

          {/* RODAPÉ: SAIR */}
          <div className="p-6 mt-auto border-t border-white/10">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition text-sm font-medium"
            >
              <LogOut size={16} /> Sair
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}