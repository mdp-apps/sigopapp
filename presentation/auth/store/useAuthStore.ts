import { StorageAdapter } from "@/config/adapters/storage.adapter";

import * as UseCases from "@/core/auth/use-cases";
import {
  Driver,
  DriverSession,
  User,
  UserSession,
} from "@/infrastructure/entities";

import { sigopApiFetcher } from "@/config/api/sigopApi";

import { create } from "zustand";
import { CustomerCompany } from "@/config/constants";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export enum UserProfile {
  driver = "driver",
  customer = "customer",
}

export interface AuthState {
  status: AuthStatus;
  user?: UserSession | DriverSession;
  profile?: UserProfile;

  login: (email: string, password: string) => Promise<boolean>;
  loginDriver: (rut: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;

  changeStatus: (
    isSessionSaved: string,
    user?: User | Driver
  ) => Promise<boolean>;
}

const saveUserSession = async (
  isSessionSaved: string,
  user: User | Driver
): Promise<{ session: UserSession | DriverSession; profile: UserProfile }> => {
  let profile: UserProfile;
  let session: UserSession | DriverSession;

  const isAuthenticated = isSessionSaved === "SI";

  const baseSession = {
    code: user.code,
    rut: user.rut,
    name: user.name,
    paternalLastname: user.paternalLastname,
    maternalLastname: user.maternalLastname,
  };

  if ("emailLogin" in user) {
    isAuthenticated && Number(user.companyCode) !== CustomerCompany.mdp
      ? (profile = UserProfile.customer)
      : (profile = UserProfile.driver);

    session = {
      ...baseSession,
      companyCode: user.companyCode,
      companyName: user.companyName,
      emailLogin: user.emailLogin,
    };
  } else {
    profile = UserProfile.driver;
    session = {
      ...baseSession,
    };
  }

  await StorageAdapter.setItem("userSession", JSON.stringify(session));

  return { session, profile };
};

export const useAuthStore = create<AuthState>((set, get) => ({
  status: "checking",
  user: undefined,

  changeStatus: async (isSessionSaved: string, user?: User | Driver) => {
    if (isSessionSaved === "NO" || !user) {
      set({ status: "unauthenticated", user: undefined, profile: undefined });

      get().logout();

      return false;
    }

    const { session, profile } = await saveUserSession(isSessionSaved, user);

    set({ status: "authenticated", user: session, profile: profile });

    return true;
  },
  login: async (email: string, password: string) => {
    const res = await UseCases.userLoginUseCase(sigopApiFetcher, {
      accion: "Validar inicio sesion",
      email: email,
      pwd: password,
    });

    if (res.isSessionSaved === "SI") {
      await StorageAdapter.setItem("userEmail", email);
      await StorageAdapter.setItem("userPassword", password);
    }

    return get().changeStatus(res.isSessionSaved, res.user);
  },
  loginDriver: async (rut: string) => {
    const res = await UseCases.driverLoginUseCase(sigopApiFetcher, {
      accion: "Validar inicio sesion conductor",
      rut: rut.replaceAll(".", ""),
    });

    if (res.isSessionSaved === "SI") {
      await StorageAdapter.setItem("userRut", rut);
    }

    return get().changeStatus(res.isSessionSaved, res.user);
  },
  checkStatus: async () => {
    const email = await StorageAdapter.getItem("userEmail");
    const password = await StorageAdapter.getItem("userPassword");
    const rut = await StorageAdapter.getItem("userRut");
    // console.log(JSON.stringify({ email, password, rut }, null, 2));

    if (email && password) {
      const res = await UseCases.userLoginUseCase(sigopApiFetcher, {
        accion: "Validar inicio sesion",
        email: email,
        pwd: password,
      });

      if (res.isSessionSaved === "SI") {
        const authUser = get().changeStatus(res.isSessionSaved, res.user);
        console.log(JSON.stringify(authUser, null, 2));
      } else {
        set({ status: "unauthenticated", user: undefined, profile: undefined });
      }

      return;
    }

    if (rut) {
      const res = await UseCases.driverLoginUseCase(sigopApiFetcher, {
        accion: "Validar inicio sesion conductor",
        rut: rut.replaceAll(".", ""),
      });

      if (res.isSessionSaved === "SI") {
        get().changeStatus(res.isSessionSaved, res.user);
      } else {
        set({ status: "unauthenticated", user: undefined, profile: undefined });
      }

      return;
    }

    set({ status: "unauthenticated", user: undefined, profile: undefined });
  },
  logout: async () => {
    await StorageAdapter.removeItem("userSession");
    await StorageAdapter.removeItem("userEmail");
    await StorageAdapter.removeItem("userPassword");
    await StorageAdapter.removeItem("userRut");

    set({ status: "unauthenticated", user: undefined, profile: undefined });
  },
}));
