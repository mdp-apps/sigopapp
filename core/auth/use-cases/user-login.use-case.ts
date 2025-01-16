import { Alert } from "react-native";

import { HttpAdapter } from "@/config/adapters";

import { AuthMapper } from "@/infrastructure/mappers";
import { AuthSession, User } from "@/infrastructure/entities";
import { AuthResponse, UserResponse } from "../interfaces";

interface Body {
  accion: "Validar inicio sesion";
  email: string;
  pwd: string;
}

export const userLoginUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<AuthSession<User>> => {
  try {
    const sessionUser = await fetcher.post<AuthResponse<UserResponse>, Body>(
      `/validasesion`,
      body
    );

    return AuthMapper.fromAuthSessionToEntity<UserResponse,User>(
      sessionUser,
      AuthMapper.fromUserResultToEntity,
    );
  } catch (error) {
    console.log(error);

    Alert.alert(
      "Error",
      "Intente iniciar sesión nuevamente. Si no puede, contacte a soporte."
    );

    throw new Error("Error to login user");
  }
};
