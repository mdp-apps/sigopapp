
export interface AuthSession<T>{
  isSessionSaved: "SI" | "NO";
  user: T;
}

export interface BaseUser {
  code: number;
  maternalLastname: string;
  name: string;
  paternalLastname: string;
  rut: string;
}

export interface User extends BaseUser {
  companyCode: string;
  companyName: string;
  emailLogin: string;
  jobCode: number;
  recover: number;
}

export interface Driver extends BaseUser {
  isDriverBlocked: 1 | 0; // Si el conductor puede entrar al muelle o no
  typeCI: number;
}

export interface UserSession extends BaseUser {
  companyCode: string;
  companyName: string;
  emailLogin: string;
}

export interface DriverSession extends BaseUser {
}
