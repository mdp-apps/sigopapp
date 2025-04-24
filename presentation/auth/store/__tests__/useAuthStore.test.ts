import { act, renderHook } from "@testing-library/react-native";
import { router } from "expo-router";

import { useAuthStore } from "../useAuthStore";

import * as UseCases from "@/core/auth/use-cases";
import { Driver, UserProfile } from "@/infrastructure/entities";
import { StorageAdapter } from "@/config/adapters/storage.adapter";

// Mock de StorageAdapter
jest.mock("@/config/adapters/storage.adapter", () => ({
  StorageAdapter: {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
  },
}));

// Mock de UseCases
jest.mock("@/core/auth/use-cases", () => ({
  userLoginUseCase: jest.fn(),
  driverLoginUseCase: jest.fn(),
}));

// Mock de expo-router
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

describe("Probar useAuthStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe realizar login exitoso de usuario", async () => {
    const mockUser = {
      code: "123",
      name: "Test User",
      emailLogin: "test@example.com",
    };
    const mockResponse = { isSessionSaved: "SI", user: mockUser };

    (UseCases.userLoginUseCase as jest.Mock).mockResolvedValueOnce(
      mockResponse
    );

    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      const success = await result.current.login(
        "test@example.com",
        "password123"
      );
      expect(success).toBe(true);
    });

    expect(StorageAdapter.setItem).toHaveBeenCalledWith(
      "userEmail",
      "test@example.com"
    );
    expect(StorageAdapter.setItem).toHaveBeenCalledWith(
      "userPassword",
      "password123"
    );
    expect(UseCases.userLoginUseCase).toHaveBeenCalledWith(expect.anything(), {
      accion: "Validar inicio sesion",
      email: "test@example.com",
      pwd: "password123",
    });
  });

  test("Debe realizar login exitoso de conductor", async () => {
    const mockDriver = { code: "456", name: "Test Driver", rut: "12345678-9" };
    const mockResponse = { isSessionSaved: "SI", user: mockDriver };

    (UseCases.driverLoginUseCase as jest.Mock).mockResolvedValueOnce(
      mockResponse
    );

    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      const success = await result.current.loginDriver("12345678-9");
      expect(success).toBe(true);
    });

    expect(StorageAdapter.setItem).toHaveBeenCalledWith(
      "userRut",
      "12345678-9"
    );
    expect(UseCases.driverLoginUseCase).toHaveBeenCalledWith(
      expect.anything(),
      {
        accion: "Validar inicio sesion conductor",
        rut: "12345678-9",
      }
    );
  });

  test("Debe realizar logout correctamente", async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.logout();
    });

    expect(StorageAdapter.removeItem).toHaveBeenCalledWith("userSession");
    expect(StorageAdapter.removeItem).toHaveBeenCalledWith("userEmail");
    expect(StorageAdapter.removeItem).toHaveBeenCalledWith("userPassword");
    expect(StorageAdapter.removeItem).toHaveBeenCalledWith("userRut");
    expect(result.current.status).toBe("unauthenticated");
    expect(result.current.user).toBeUndefined();
    expect(result.current.profile).toBeUndefined();
  });

  test("Debe verificar el estado y autenticar al usuario", async () => {
    const mockUser = {
      code: "123",
      name: "Test User",
      emailLogin: "test@example.com",
    };
    const mockResponse = { isSessionSaved: "SI", user: mockUser };

    (StorageAdapter.getItem as jest.Mock).mockResolvedValueOnce(
      "test@example.com"
    );
    (StorageAdapter.getItem as jest.Mock).mockResolvedValueOnce("password123");
    (UseCases.userLoginUseCase as jest.Mock).mockResolvedValueOnce(
      mockResponse
    );

    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.checkStatus();
    });

    expect(UseCases.userLoginUseCase).toHaveBeenCalledWith(expect.anything(), {
      accion: "Validar inicio sesion",
      email: "test@example.com",
      pwd: "password123",
    });
    expect(result.current.status).toBe("authenticated");
    expect(result.current.user).toEqual(mockUser);
  });

  test("Debe autenticar al conductor si existe un rut en el almacenamiento", async () => {
    const mockDriver = { code: "456", name: "Test Driver", rut: "12345678-9" };
    const mockResponse = { isSessionSaved: "SI", user: mockDriver };

    (StorageAdapter.getItem as jest.Mock).mockResolvedValueOnce(null);
    (StorageAdapter.getItem as jest.Mock).mockResolvedValueOnce(null);
    (StorageAdapter.getItem as jest.Mock).mockResolvedValueOnce("12345678-9");
    (UseCases.driverLoginUseCase as jest.Mock).mockResolvedValueOnce(
      mockResponse
    );

    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.checkStatus();
    });

    expect(UseCases.driverLoginUseCase).toHaveBeenCalledWith(
      expect.anything(),
      {
        accion: "Validar inicio sesion conductor",
        rut: "12345678-9",
      }
    );
    expect(result.current.status).toBe("authenticated");
    expect(result.current.user).toEqual(mockDriver);
  });

   test("Debe cambiar el estado a 'unauthenticated' si isSessionSaved es 'NO'", async () => {
     const { result } = renderHook(() => useAuthStore());

     await act(async () => {
       const success = await result.current.changeStatus("NO");
       expect(success).toBe(false);
     });

     expect(result.current.status).toBe("unauthenticated");
     expect(result.current.user).toBeUndefined();
     expect(result.current.profile).toBeUndefined();
   });
  
  test("Debe cambiar el estado a 'authenticated' si isSessionSaved es 'SI'", async () => {
    const mockUser = {
      code: "123",
      rut: "12345678-9",
      name: "Test User",
      paternalLastname: undefined,
      maternalLastname: undefined,
    };
    const mockProfile = UserProfile.driver;

    (StorageAdapter.getItem as jest.Mock).mockResolvedValueOnce(mockProfile);

    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      const success = await result.current.changeStatus("SI", mockUser as unknown as Driver);
      expect(success).toBe(true);
    });

    expect(result.current.status).toBe("authenticated");
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.profile).toBe(mockProfile);
    expect(StorageAdapter.getItem).toHaveBeenCalledWith("userProfile");
    expect(StorageAdapter.setItem).toHaveBeenCalledWith(
      "userSession",
      JSON.stringify(mockUser)
    );
  });

  test("Debe establecer el estado como 'unauthenticated' si el usuario no está autenticado con email y password", async () => {
    (StorageAdapter.getItem as jest.Mock).mockResolvedValueOnce(
      "test@example.com"
    );
    (StorageAdapter.getItem as jest.Mock).mockResolvedValueOnce("password123");
    (UseCases.userLoginUseCase as jest.Mock).mockResolvedValueOnce({
      isSessionSaved: "NO",
      user: null,
    });

    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.checkStatus();
    });

    expect(result.current.status).toBe("unauthenticated");
    expect(result.current.user).toBeUndefined();
    expect(result.current.profile).toBeUndefined();
  });

  test("Debe establecer el estado como 'unauthenticated' si el conductor no está autenticado con rut", async () => {
    (StorageAdapter.getItem as jest.Mock).mockResolvedValueOnce(null);
    (StorageAdapter.getItem as jest.Mock).mockResolvedValueOnce(null);
    (StorageAdapter.getItem as jest.Mock).mockResolvedValueOnce("12345678-9");
    (UseCases.driverLoginUseCase as jest.Mock).mockResolvedValueOnce({
      isSessionSaved: "NO",
      user: null,
    });

    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.checkStatus();
    });

    expect(result.current.status).toBe("unauthenticated");
    expect(result.current.user).toBeUndefined();
    expect(result.current.profile).toBeUndefined();
  });

  test("Debe establecer el estado como 'unauthenticated' si no hay email, password ni rut en el almacenamiento", async () => {
    (StorageAdapter.getItem as jest.Mock).mockResolvedValueOnce(null);
    (StorageAdapter.getItem as jest.Mock).mockResolvedValueOnce(null);
    (StorageAdapter.getItem as jest.Mock).mockResolvedValueOnce(null);

    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      await result.current.checkStatus();
    });

    expect(result.current.status).toBe("unauthenticated");
    expect(result.current.user).toBeUndefined();
    expect(result.current.profile).toBeUndefined();
  });

  test("Debe seleccionar un perfil conductor y redirigir correctamente", async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      result.current.selectProfile(UserProfile.driver);
    });

    expect(StorageAdapter.setItem).toHaveBeenCalledWith(
      "userProfile",
      UserProfile.driver
    );
    expect(router.push).toHaveBeenCalledWith("/auth/login-driver");
  });

  test("Debe seleccionar un perfil usuario distinto a conductor y redirigir correctamente", async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      result.current.selectProfile(UserProfile.supervisor);
    });

    expect(StorageAdapter.setItem).toHaveBeenCalledWith(
      "userProfile",
      UserProfile.supervisor
    );
    expect(router.push).toHaveBeenCalledWith("/auth/login-user");
  });

  test("No debe redirigir si el perfil es default", async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {
      result.current.selectProfile(UserProfile.default);
    });

    expect(StorageAdapter.setItem).not.toHaveBeenCalledWith(
      "userProfile",
      UserProfile.default
    );
    expect(router.push).not.toHaveBeenCalled();
  });
  
});
