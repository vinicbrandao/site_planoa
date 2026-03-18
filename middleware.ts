// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const tokenCargo = request.cookies.get('auth_token')?.value;
  const urlAtual = request.nextUrl.pathname;

  // 1. Bloqueio de Segurança: Se não está logado, só pode ver a página de Login ('/')
  if (!tokenCargo && urlAtual !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. Redirecionamento Inteligente: Se já está logado e tenta ir para o Login
  if (tokenCargo && urlAtual === '/') {
    return NextResponse.redirect(new URL(`/dashboard?cargo=${tokenCargo}`, request.url));
  }

  // 3. CONTROLE DE NÍVEL DE ACESSO (Roles)
  // Definimos quais caminhos são restritos apenas para o admin
  const rotasSomenteAdmin = ['/usuarios', '/perfis', '/autorizacao'];
  
  const ehRotaRestrita = rotasSomenteAdmin.some(rota => urlAtual.startsWith(rota));

  if (ehRotaRestrita && tokenCargo !== 'admin') {
    // Se não for admin e tentar acessar área restrita, manda de volta para o Dashboard
    // com uma mensagem de erro na URL (opcional)
    return NextResponse.redirect(new URL(`/dashboard?cargo=${tokenCargo}&erro=sem_permissao`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};