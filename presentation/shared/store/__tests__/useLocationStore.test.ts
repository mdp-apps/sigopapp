import { act, renderHook } from "@testing-library/react-native";

import { useLocationStore } from "../useLocationStore";

import { MDP_LATITUDE, MDP_LONGITUDE } from "@/config/constants";

jest.mock("@/config/constants", () => {
  const actualConstants = jest.requireActual("@/config/constants");
  return {
    MDP_LATITUDE: actualConstants.MDP_LATITUDE,
    MDP_LONGITUDE: actualConstants.MDP_LONGITUDE,
  };
});

jest.mock("@/core/location/use-cases", () => {
  const { MDP_LATITUDE, MDP_LONGITUDE } = require("@/config/constants");

  return {
    getCurrentLocationUseCase: jest.fn(() =>
      Promise.resolve({ latitude: MDP_LATITUDE, longitude: MDP_LONGITUDE })
    ),
  };
});

describe("Probar store useLocationStore", () => {
  test("Debe tener un estado inicial de 'lastKnownLocation' en null", () => {
    const { result } = renderHook(() => useLocationStore());

    expect(result.current.lastKnownLocation).toBeNull();
  });

  test("Debe actualizar 'lastKnownLocation' al obtener la ubicación", async () => {
    const { result } = renderHook(() => useLocationStore());

    await act(async () => {
      await result.current.getLocation();
    });

    expect(result.current.lastKnownLocation).toEqual({
      latitude: MDP_LATITUDE,
      longitude: MDP_LONGITUDE,
    });
  });
});
