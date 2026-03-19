export interface IAutorizacao {
  nome: string;
  autorizado: boolean;
}

export interface IUsuario {
  id: string;
  nome: string;
  email: string;
  perfil: string;
  status: string;
  autorizacoes?: IAutorizacao[];
}

export interface IObra {
  id: string;
  nome: string;
  codigoSienge: string;
  status: string;
  categoria: string;
  inicioObra: string;
  fimObra: string;
  local: string;
  usuarios: IUsuario[];
}

export interface IUsuarioPerfil {
  id: string;
  nome: string;
}

export interface IPerfil {
  id: string;
  nome: string;
  usuarios: IUsuarioPerfil[];
}