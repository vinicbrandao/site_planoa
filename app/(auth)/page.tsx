'use client';

import { criarSessaoNoServidor } from '../lib/actions'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, Loader2 } from 'lucide-react'; 
import Image from 'next/image';


export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(''); 
  const [carregando, setCarregando] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      // Caso 1: Admin Mestre (Acesso de emergência)
      if (usuario === 'admin' && senha === 'admin') {
        await criarSessaoNoServidor('admin');
        router.push(`/dashboard?cargo=admin`);
        return;
      }

      // Caso 2: Usuários que VOCÊ cadastrou (Lê do navegador)
      const dbUsuarios = JSON.parse(localStorage.getItem('db_usuarios') || '[]');
      
      const usuarioEncontrado = dbUsuarios.find(
        (u: any) => u.email.toLowerCase() === usuario.toLowerCase() && u.senha === senha
      );

      if (usuarioEncontrado) {
        // Pega o perfil (ex: Engenheiro Civil) e transforma em algo simples para a URL
        const perfilFormatado = usuarioEncontrado.perfil.toLowerCase().replace(/\s+/g, '_');
        
        // Avisa o servidor para criar o cookie (crachá)
        await criarSessaoNoServidor(perfilFormatado);
        
        router.push(`/dashboard?cargo=${perfilFormatado}`);
      } else {
        setErro('Usuário ou senha incorretos.');
      }
    } catch (error) {
      setErro('Ocorreu um erro inesperado.');
    } finally {
      setCarregando(false);
    } 
  };

  return (
    // 1. MUDANÇA: Fundo da tela inteira agora usa o azul escuro do Figma (#00025D) e centraliza o cartão na tela (justify-center).
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00025D] font-sans p-4">
      
      {/* 2. MUDANÇA: O Cartão agora tem fundo cinza claro (#D9D9D9), está mais largo (max-w-xl) e tem bordas mais arredondadas (rounded-3xl). */}
      <div className="bg-[#D9D9D9] p-10 md:p-14 rounded-3xl shadow-2xl w-full max-w-xl flex flex-col items-center">
        
        {/* 3. MUDANÇA: A logo foi movida para DENTRO do cartão cinza, como no seu design. */}
        <Image src="/logo-planoa.png" width={384} height={100} alt="Logo Plano A" />
        
        <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full max-w-sm">
          
          {/* 4. MUDANÇA: Input de "E-mail" com fundo cinza escuro (#8D8D8D), bordas arredondadas e texto/ícone preto. */}
          <div className="flex items-center bg-[#8D8D8D] rounded-xl px-4 transition-all focus-within:ring-2 focus-within:ring-[#0048FF]">
            <User className="text-black" size={20} />
            <input 
              type="text" 
              required
              value={usuario}
              onChange={(e) => setUsuario(e.target.value.toLowerCase())}
              className="w-full bg-transparent text-black p-3 outline-none placeholder-black font-medium"
              placeholder="E-mail:"
            />
          </div>

          {/* 5. MUDANÇA: Input de "Senha" seguindo o mesmo estilo do Figma. */}
          <div className="flex items-center bg-[#8D8D8D] rounded-xl px-4 transition-all focus-within:ring-2 focus-within:ring-[#0048FF]">
            <Lock className="text-black" size={20} />
            <input 
              type="password" 
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full bg-transparent text-black p-3 outline-none placeholder-black font-medium"
              placeholder="Senha:"
            />
          </div>

          {/* Mensagem de Erro (Ajustada para combinar com o fundo cinza claro) */}
          {erro && (
            <div className="bg-red-100 border border-red-400 text-red-600 text-sm p-3 rounded-lg text-center font-medium animate-pulse mt-2">
              {erro}
            </div>
          )}

          {/* 6. MUDANÇA: Botão usa o azul vibrante (#0048FF). Centralizei ele usando flexbox para não esticar de ponta a ponta. */}
          <div className="flex justify-center mt-6">
            <button 
              type="submit" 
              disabled={carregando}
              className="cursor-pointer bg-[#0048FF] text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-all font-medium disabled:bg-blue-900 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-md"
            >
              {carregando ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Entrando...
                </>
              ) : (
                "Entrar na plataforma"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}