import {
  AuthResponse,
  DriverResponse,
  UserResponse,
} from "@/core/auth/interfaces";
import { AuthSession, Driver, User } from "../entities";

export class AuthMapper {
  static fromAuthSessionToEntity<T, U>(
    response: AuthResponse<T>,
    mapper: (response: T) => U
  ): AuthSession<U> {
    return {
      isSessionSaved: response.resultado,
      user: mapper(response.data[0]),
    };
  }

  static fromUserResultToEntity(response: UserResponse): User {
    return {
      code: response.cod,
      companyCode: response.codigo_empresa,
      companyName: response.nombre_empresa,
      emailLogin: response.login,
      jobCode: response.cargo,
      maternalLastname: response.apellido_m,
      name: response.nombre,
      paternalLastname: response.apellido_p,
      recover: response.recupera,
      rut: response.rut,
    };
  }

  static fromDriverResultToEntity(response: DriverResponse): Driver {
    return {
      code: response.codigo,
      isDriverBlocked: response.bloqueo,
      maternalLastname: response.apellido_paterno,
      name: response.nombre,
      paternalLastname: response.apellido_materno,
      rut: response.rut,
      typeCI: response.tipo_ci,
    };
  }
}
