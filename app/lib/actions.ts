// app/actions.ts
'use server'; // <--- OBRIGATÓRIO: Diz que isso roda no servidor

// Simulação temporária (Substituiremos isso pelo Prisma/Postgres depois)
export async function loginNoServidor(usuario: string, senhaDigitada: string) {
  const usuariosValidos: any = {
      admin: 'admin123',
      engenheiro: 'engenheiro123',
      cliente: 'cliente123'
  };

  if (usuariosValidos[usuario] && usuariosValidos[usuario] === senhaDigitada) {
    return usuario; // Retorna o cargo (sucesso)
  }

  return null; // Falha
}