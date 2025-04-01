import React from "react";
import { render } from "@testing-library/react-native";
import { router } from "expo-router";

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
    const mockCheckLocationPermission = jest.fn();
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
});
