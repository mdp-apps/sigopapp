import * as UseCases from "@/core/auth/use-cases";
import {
  AuthStatus,
  DriverSession,
} from "@/infrastructure/entities";

import { sigopApiFetcher } from "@/config/api/sigopApi";
import { StorageAdapter } from "@/config/adapters";

import { create } from "zustand";

export interface DriverAuthState {
  status: AuthStatus;
  driver: DriverSession | null;

  loginDriver: (rut: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkStatusDriver: () => Promise<void>;
}

export const useDriverAuthStore = create<DriverAuthState>((set) => ({
  status: "checking",
  driver: null,

  loginDriver: async (rut: string) => {
    const res = await UseCases.driverLoginUseCase(sigopApiFetcher, {
      accion: "Validar inicio sesion conductor",
      rut: rut.replaceAll(".", ""),
    });

    if (res.isSessionSaved === "SI") {
      await StorageAdapter.setItem("userRut", rut);

      const driverSession: DriverSession = {
        code: res.user.code,
        rut: res.user.rut,
        name: res.user.name,
        paternalLastname: res.user.paternalLastname,
        maternalLastname: res.user.maternalLastname,
      };
      await StorageAdapter.setItem(
        "driverSession",
        JSON.stringify(driverSession)
      );

      set({ status: "authenticated", driver: driverSession });
      return true;
    }

    set({ status: "unauthenticated", driver: undefined });
    return false;
  },
  logout: async () => {
    await StorageAdapter.removeItem("driverSession");

    set({
      status: "unauthenticated",
      driver: undefined,
    });
  },
  checkStatusDriver: async () => {
    const rut = await StorageAdapter.getItem("userRut");

    if (rut) {
      const res = await UseCases.driverLoginUseCase(sigopApiFetcher, {
        accion: "Validar inicio sesion conductor",
        rut: rut.replaceAll(".", ""),
      });

      if (res.isSessionSaved === "SI") {
        const driverSession: DriverSession = {
          code: res.user.code,
          rut: res.user.rut,
          name: res.user.name,
          paternalLastname: res.user.paternalLastname,
          maternalLastname: res.user.maternalLastname,
        };
        await StorageAdapter.setItem(
          "driverSession",
          JSON.stringify(driverSession)
        );

        set({ status: "authenticated", driver: driverSession });
        return;
      }

      set({ status: "unauthenticated", driver: undefined });
    }
  },
}));
