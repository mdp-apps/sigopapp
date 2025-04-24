import { Alert } from "react-native";
import { renderHook, act } from "@testing-library/react-native";

import { useCamera } from "../useCamera";
import { useCameraStore } from "@/presentation/shared/store";

import { router } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import { CameraView } from "expo-camera";

// Mock de useCameraStore
jest.mock("@/presentation/shared/store", () => ({
  useCameraStore: jest.fn(),
}));

// Mock de expo-router
jest.mock("expo-router", () => ({
  router: {
    dismiss: jest.fn(),
  },
}));

// Mock de expo-camera
jest.mock("expo-camera", () => ({
  CameraView: jest.fn(),
  useCameraPermissions: jest.fn(() => [
    { status: "undetermined" },
    jest.fn(() => Promise.resolve({ status: "granted" })),
  ]),
}));

// Mock de expo-media-library
jest.mock("expo-media-library", () => ({
  usePermissions: jest.fn(() => [
    { status: "undetermined" },
    jest.fn(() => Promise.resolve({ status: "granted" })),
  ]),
  createAssetAsync: jest.fn(),
}));

// Mock de expo-image-picker
jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(() =>
    Promise.resolve({
      canceled: false,
      assets: [{ uri: "mock-image-uri" }],
    })
  ),
}));

// Mock de Alert
jest.spyOn(Alert, "alert");

describe("Probar useCamera", () => {
  const mockAddSelectedImage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useCameraStore as unknown as jest.Mock).mockReturnValue({
      addSelectedImage: mockAddSelectedImage,
    });
  });

  test("Debe solicitar permisos de cámara y galería correctamente", async () => {
    const { result } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.onRequestPermissions();
    });

    expect(Alert.alert).not.toHaveBeenCalled();
  });

  test.skip("Debe mostrar una alerta si los permisos de cámara son denegados", async () => {
    jest.mock("expo-camera", () => ({
      useCameraPermissions: jest.fn(() => [
        { status: "denied" },
        jest.fn(() => Promise.resolve({ status: "denied" })),
      ]),
    }));

    const { result } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.onRequestPermissions();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Lo siento",
      "Necesitamos permiso para acceder a la cámara para tomar fotos."
    );
  });

  test.skip("Debe capturar una foto correctamente", async () => {
    const mockTakePictureAsync = jest.fn(() =>
      Promise.resolve({ uri: "mock-photo-uri" })
    );

    (CameraView as unknown as jest.Mock).mockImplementation(() => ({
      takePictureAsync: mockTakePictureAsync,
    }));

    const { result } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.onShutterButtonPress();
    });

    expect(result.current.selectedImage).toBe("mock-photo-uri");
  });

  test.skip("Debe guardar la foto en la galería y agregarla al store", async () => {
    const { result } = renderHook(() => useCamera());

    await act(async () => {
      result.current.onPictureAccepted();
    });

    expect(MediaLibrary.createAssetAsync).toHaveBeenCalledWith("mock-photo-uri");
    expect(mockAddSelectedImage).toHaveBeenCalledWith("mock-photo-uri");
    expect(router.dismiss).toHaveBeenCalled();
  });

  test.skip("Debe permitir seleccionar imágenes de la galería", async () => {
    const { result } = renderHook(() => useCamera());

    await act(async () => {
      await result.current.onPickImages();
    });

    expect(mockAddSelectedImage).toHaveBeenCalledWith("mock-image-uri");
    expect(router.dismiss).toHaveBeenCalled();
  });

  test.skip("Debe alternar entre las cámaras frontal y trasera", () => {
    const { result } = renderHook(() => useCamera());

    act(() => {
      result.current.toggleCameraFacing();
    });

    expect(result.current.facing).toBe("front");

    act(() => {
      result.current.toggleCameraFacing();
    });

    expect(result.current.facing).toBe("back");
  });

  test.skip("Debe cancelar y cerrar la cámara", () => {
    const { result } = renderHook(() => useCamera());

    act(() => {
      result.current.onReturnCancel();
    });

    expect(router.dismiss).toHaveBeenCalled();
  });
});