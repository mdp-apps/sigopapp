import { act, renderHook } from "@testing-library/react-native";

import * as ScreenOrientation from "expo-screen-orientation";
import { useScreenOrientation } from "../useScreenOrientation";

// Mock de expo-screen-orientation
jest.mock("expo-screen-orientation", () => ({
  lockAsync: jest.fn(),
  getOrientationLockAsync: jest.fn(
    () => Promise.resolve(0) 
  ),
  unlockAsync: jest.fn(),
  OrientationLock: {
    DEFAULT: 0,
    ALL: 1,
    PORTRAIT: 2,
    PORTRAIT_UP: 3,
    PORTRAIT_DOWN: 4,
    LANDSCAPE: 5,
    LANDSCAPE_LEFT: 6,
    LANDSCAPE_RIGHT: 7,
  },
}));

describe("Probar hook useScreenOrientation", () => {
  test("Debe obtener la orientación inicial", async () => {
    const { result } = renderHook(() => useScreenOrientation());
    await act(async () => {
      await result.current.getCurrentOrientation();
    });
    
    expect(result.current.currentOrientation).toBe(
      ScreenOrientation.OrientationLock.DEFAULT
    );
  });
  
  test("Debe bloquear la orientación en 'LANDSCAPE'", async () => {
    const { result } = renderHook(() => useScreenOrientation());
    
    await act(async () => {
      await result.current.lockToLandscape();
    });
    
    expect(ScreenOrientation.lockAsync).toHaveBeenCalledWith(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  });
  
  test("Debe bloquear la orientación en 'PORTRAIT'", async () => {
    const { result } = renderHook(() => useScreenOrientation());
    
    await act(async () => {
      await result.current.lockToPortrait();
    });
    
    expect(ScreenOrientation.lockAsync).toHaveBeenCalledWith(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  });
  
  test("Debe alternar entre 'LANDSCAPE' y 'PORTRAIT'", async () => {
    const { result } = renderHook(() => useScreenOrientation());
    
    await act(async () => {
      await result.current.toggleScreenOrientation();
    });
    
    expect(ScreenOrientation.lockAsync).toHaveBeenCalledWith(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
    
    await act(async () => {
      await result.current.toggleScreenOrientation();
    });
    
    expect(ScreenOrientation.lockAsync).toHaveBeenCalledWith(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
  });
  
  test("Debe desbloquear la orientación", async () => {
    const { result } = renderHook(() => useScreenOrientation());
    
    await act(async () => {
      await result.current.unlockOrientation();
    });

    expect(ScreenOrientation.unlockAsync).toHaveBeenCalled();
  });
});
