import { act, renderHook } from "@testing-library/react-native";

import { useLocationPermissionsStore } from "../useLocationPermissionsStore";

// Mock de los use cases
jest.mock("@/core/location/use-cases", () => {
  const { PermissionStatus } = require("@/core/location/interfaces");

  return {
    requestLocationPermissionUseCase: jest.fn(() =>
      Promise.resolve(PermissionStatus.GRANTED)
    ),
    checkLocationPermissionUseCase: jest.fn(() =>
      Promise.resolve(PermissionStatus.GRANTED)
    ),
  };
});

describe("Probar store useLocationPermissionsStore", () => {
  test("Debe tener un estado inicial 'checking'", () => {
    const { PermissionStatus } = require("@/core/location/interfaces");
    const { result } = renderHook(() => useLocationPermissionsStore());

    expect(result.current.locationStatus).toBe(PermissionStatus.CHECKING);
  });

  test("Debe cambiar a 'granted' cuando se solicita el permiso", async () => {
    const { PermissionStatus } = require("@/core/location/interfaces");
    const { result } = renderHook(() => useLocationPermissionsStore());
    await act(async () => {
      await result.current.requestLocationPermission();
    });
    
    expect(result.current.locationStatus).toBe(PermissionStatus.GRANTED);
  });

  test("Debe verificar el permiso al llamarse checkLocationPermission()", async () => {
    const { PermissionStatus } = require("@/core/location/interfaces");
    const { result } = renderHook(() => useLocationPermissionsStore());

    await act(async () => {
      await result.current.checkLocationPermission();
    });

    expect(result.current.locationStatus).toBe(PermissionStatus.GRANTED);
  });
});