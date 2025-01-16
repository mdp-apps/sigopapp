import { Alert } from "react-native";

import { HttpAdapter } from "@/config/adapters";

import { AuthMapper } from "@/infrastructure/mappers";
import { AuthSession, Driver } from "@/infrastructure/entities";
import { AuthResponse, DriverResponse } from "../interfaces";

interface Body {
  accion: "Validar inicio sesion conductor";
  rut: string;
}

export const driverLoginUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<AuthSession<Driver>> => {
  try {
    const sessionDriver = await fetcher.post<AuthResponse<DriverResponse>, Body>(
      `/validasesionconductor`,
      body
    );
    // console.log(JSON.stringify(sessionDriver, null, 2));

    return AuthMapper.fromAuthSessionToEntity<DriverResponse,Driver>(
      sessionDriver,
      AuthMapper.fromDriverResultToEntity
    );
  } catch (error) {
    console.log(error);

    Alert.alert(
      "Error",
      "Intente iniciar sesión nuevamente. Si no puede, contacte a soporte."
    );

    throw new Error("Error to login driver");
  }
};
