'use server';

import { cookies } from 'next/headers';

export async function criarSessaoNoServidor(cargo: string) {
  const cookieStore = await cookies();

  await cookieStore.set('auth_token', cargo, { 
    httpOnly: true, 
    path: '/',
    maxAge: 60 * 30 * 24 
  });

  return true;
}

export async function logoutNoServidor() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
}