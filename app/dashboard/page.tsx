'use client'; // Necessário para ler parâmetros da URL e ter interatividade

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const cargo = searchParams.get('cargo'); // Pega o valor de "?cargo=..." da URL

  // Lógica simples para definir quantos botões mostrar
  let botoes = [];
  
  if (cargo === 'admin') {
    botoes = ['Painel Financeiro', 'Gerenciar Obras', 'Relatórios Globais'];
  } else if (cargo === 'engenheiro') {
    botoes = ['Gerenciar Obras', 'Relatórios da Obra'];
  } else if (cargo === 'cliente') {
    botoes = ['Acompanhar Minha Obra'];
  } else {
    return <p className="text-red-500">Erro: Cargo não identificado. Faça login novamente.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-black">
      <h1 className="text-3xl font-bold mb-2 text-white">Bem-vindo, {cargo}!</h1>
      <p className="mb-8 text-white">Aqui estão suas ferramentas disponíveis:</p>

      <div className="grid gap-4 w-full max-w-md">
        {botoes.map((botao, index) => (
          <button 
            key={index}
            className="w-full p-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-bold"
          >
            {botao}
          </button>
        ))}
      </div>

      <Link href="/" className="mt-8 text-sm text-gray-500 hover:underline">
        Sair / Voltar ao Login
      </Link>
    </div>
  );
}

// O Next.js pede que componentes que usam useSearchParams fiquem dentro de Suspense
export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <DashboardContent />
    </Suspense>
  );
}