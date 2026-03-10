'use client';
import { loginNoServidor } from './lib/actions'; // <--- Adicione isso junto com os outros imports
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();
  
  const handleLogin = async (e: React.FormEvent) => { // <--- Atenção ao 'async' aqui!
    e.preventDefault();

    // Chama a função "mock" do servidor (futura conexão com banco)
    const cargoRecebido = await loginNoServidor(usuario, senha);

    if (cargoRecebido) {
      router.push(`/dashboard?cargo=${cargoRecebido}`);
    } else {
      alert('Usuário ou senha incorretos!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-sans">
      <div className="bg-gray-800 p-8 rounded-xl shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Login de Acesso</h1>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          
          {/* Campo de Usuário */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">Usuário</label>
            <input 
              type="text" 
              required
              value={usuario}
              onChange={(e) => setUsuario(e.target.value.toLowerCase())} // Força minúsculo
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-white"
              placeholder="ex: admin"
            />
          </div>

          {/* Campo de Senha */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">Senha</label>
            <input 
              type="password" 
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none text-white"
              placeholder="Digite sua senha"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-bold mt-2"
          >
            Entrar
          </button>

        </form>
        
      </div>
    </div>
  );
}