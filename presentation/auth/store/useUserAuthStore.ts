import { router } from "expo-router";


import * as UseCases from "@/core/auth/use-cases";
import {
  AuthStatus,
  UserProfile,
  UserSession,
} from "@/infrastructure/entities";

import { StorageAdapter } from "@/config/adapters";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { create } from "zustand";

export interface UserAuthState {
  status: AuthStatus;
  user: UserSession | null;
  profile: UserProfile;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkStatus: () => Promise<void>;
  selectProfile: (profile: UserProfile) => void;
}

export const useUserAuthStore = create<UserAuthState>((set, get) => ({
  status: "checking",
  user: null,
  profile: UserProfile.default,

  login: async (email: string, password: string) => {
    const res = await UseCases.userLoginUseCase(sigopApiFetcher, {
      accion: "Validar inicio sesion",
      email: email,
      pwd: password,
    });

    if (res.isSessionSaved === "SI") {
      await StorageAdapter.setItem("userEmail", email);
      await StorageAdapter.setItem("userPassword", password);

      const session: UserSession = {
        code: res.user.code,
        rut: res.user.rut,
        name: res.user.name,
        paternalLastname: res.user.paternalLastname,
        maternalLastname: res.user.maternalLastname,
        companyCode: res.user.companyCode,
        companyName: res.user.companyName,
        emailLogin: res.user.emailLogin,
      };
      await StorageAdapter.setItem("userSession", JSON.stringify(session));

      const profile = (await StorageAdapter.getItem(
        "userProfile"
      )) as UserProfile;

      set({
        status: "authenticated",
        user: session,
        profile: profile,
      });

      return true;
    }

    set({ status: "unauthenticated", user: undefined });
    return false;
  },
  logout: async () => {
    await StorageAdapter.removeItem("userSession");
    await StorageAdapter.removeItem("userEmail");
    await StorageAdapter.removeItem("userPassword");

    set({
      status: "unauthenticated",
      user: undefined,
      profile: UserProfile.default,
    });
  },
  checkStatus: async () => {
    const email = await StorageAdapter.getItem("userEmail");
    const password = await StorageAdapter.getItem("userPassword");

    if (email && password) {
      const res = await UseCases.userLoginUseCase(sigopApiFetcher, {
        accion: "Validar inicio sesion",
        email: email,
        pwd: password,
      });

      if (res.isSessionSaved === "SI") {
        const session: UserSession = {
          code: res.user.code,
          rut: res.user.rut,
          name: res.user.name,
          paternalLastname: res.user.paternalLastname,
          maternalLastname: res.user.maternalLastname,
          companyCode: res.user.companyCode,
          companyName: res.user.companyName,
          emailLogin: res.user.emailLogin,
        };
        await StorageAdapter.setItem("userSession", JSON.stringify(session));

        const profile = (await StorageAdapter.getItem(
          "userProfile"
        )) as UserProfile;

        set({
          status: "authenticated",
          user: session,
          profile: profile,
        });

        return;
      }
      set({ status: "unauthenticated", user: undefined });
    }

    set({ status: "unauthenticated", user: undefined, profile: undefined });
  },
  selectProfile: async (profile: UserProfile) => {
    if (profile === UserProfile.default) return;

    set({ profile });
    await StorageAdapter.setItem("userProfile", profile);

    if (profile === UserProfile.driver) {
      router.push("/auth/login-driver");
      return;
    }

    router.push("/auth/login-user");
  },
}));
