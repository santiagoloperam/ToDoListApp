export interface RespuestaLogin {
  token: Token;
  user: User;
}

export interface User {
  headers: Headers;
  original: Usuario;
  exception?: any;
}

export interface Usuario {
  id?: number;
  name?: string;
  email?: string;
  email_verified_at?: any;
  created_at?: string;
  updated_at?: string;
}

export interface Token {
  headers: Headers;
  original: Original;
  exception?: any;
}

export interface Original {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface RootObject {
  actividades?: Actividad[];
  categorias?: Categoria[];
}

export interface Categoria {
  id?: number;
  nombre?: string;
  usuario_id?: number;
  updated_at?: string;
  created_at?: string;
}

export interface Actividad {
  id?: number;
  nombre?: string;
  descripcion?: string;
  estado?: number;
  categoria_id?: number;
  usuario_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Refresh {
  access_token: string;
  token_type: string;
  expires_in: number;
}





