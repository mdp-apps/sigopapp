import React from "react";
import { AppState } from "react-native";
import { router } from "expo-router";

import { render } from "@testing-library/react-native";

import { useLocationPermissionsStore } from "../../store";
import { PermissionsCheckerProvider } from "../PermissionsCheckerProvider";
import { PermissionStatus } from "@/core/location/interfaces";

// 🔥 Mockeamos expo-router para evitar redirecciones en los tests
jest.mock("expo-router", () => ({
  router: { replace: jest.fn() },
}));

// 🔥 Mockeamos el store de permisos
jest.mock("../../store", () => ({
  useLocationPermissionsStore: jest.fn(),
}));

describe("Probar <PermissionsCheckerProvider />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockCheckLocationPermission = jest.fn();

  test("Debe redirigir a home si el permiso de localización es 'granted'", () => {
    (useLocationPermissionsStore as unknown as jest.Mock).mockReturnValue({
      locationStatus: PermissionStatus.GRANTED,
      checkLocationPermission: jest.fn(),
    });

    render(
      <PermissionsCheckerProvider>
        <></>
      </PermissionsCheckerProvider>
    );

    expect(router.replace).toHaveBeenCalledWith("/(sigop-app)/(home)");
  });

  test("No debe redirigir si el permiso de localización no es 'granted'", () => {
    (useLocationPermissionsStore as unknown as jest.Mock).mockReturnValue({
      locationStatus: PermissionStatus.DENIED,
      checkLocationPermission: jest.fn(),
    });

    render(
      <PermissionsCheckerProvider>
        <></>
      </PermissionsCheckerProvider>
    );

    expect(router.replace).not.toHaveBeenCalled();
  });

  test("Debe llamar a checkLocationPermission() al montarse", () => {
    (useLocationPermissionsStore as unknown as jest.Mock).mockReturnValue({
      locationStatus: PermissionStatus.UNDETERMINED,
      checkLocationPermission: mockCheckLocationPermission,
    });

    render(
      <PermissionsCheckerProvider>
        <></>
      </PermissionsCheckerProvider>
    );

    expect(mockCheckLocationPermission).toHaveBeenCalled();
  });

  test("Debe llamar a checkLocationPermission() cuando el estado de la app cambia a 'active'", () => {
    (useLocationPermissionsStore as unknown as jest.Mock).mockReturnValue({
      locationStatus: PermissionStatus.UNDETERMINED,
      checkLocationPermission: mockCheckLocationPermission,
    });

    const appStateChangeHandler = jest.fn();
    jest
      .spyOn(AppState, "addEventListener")
      .mockImplementation((_, handler) => {
        appStateChangeHandler.mockImplementation(handler);
        return { remove: jest.fn() };
      });

    render(
      <PermissionsCheckerProvider>
        <></>
      </PermissionsCheckerProvider>
    );

    // Simular cambio de estado de la app a "active"
    appStateChangeHandler("active");

    expect(mockCheckLocationPermission).toHaveBeenCalled();
  });
});
