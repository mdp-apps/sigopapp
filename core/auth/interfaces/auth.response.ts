export interface AuthResponse<T> {
  resultado: "SI" | "NO";
  data: T[];
}

export interface UserResponse {
  apellido_m: string;
  apellido_p: string;
  cargo: number;
  cod: number;
  codigo_empresa: string;
  login: string;
  nombre_empresa: string;
  nombre: string;
  recupera: number;
  rut: string;
}

export interface DriverResponse {
  apellido_materno: string;
  apellido_paterno: string;
  bloqueo: 1 | 0;
  codigo: number;
  nombre: string;
  rut: string;
  tipo_ci: number;
}