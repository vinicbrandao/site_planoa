'use client'; // <--- ESTA LINHA É MÁGICA. Sem ela, o useState dá erro.

import { useState } from 'react';

export default function Contador() {
  const [numero, setNumero] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 border p-4 rounded-lg bg-gray-100">
      <h2 className="text-xl text-black">Contador: {numero}</h2>
      <button 
        onClick={() => setNumero(numero + 1)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Aumentar +
      </button>
    </div>
  );
}