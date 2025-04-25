import { Alert } from "react-native";
import { renderHook, act } from "@testing-library/react-native";

import { useCamera } from "../useCamera";
import { useCameraStore } from "@/presentation/shared/store";

import { router } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import { useCameraPermissions } from "expo-camera";

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
  createAssetAsync: jest.fn(() => Promise.resolve()),
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

  describe("Probar onRequestPermissions", () => {
    test("Debe solicitar permisos de cámara y galería correctamente", async () => {
      const { result } = renderHook(() => useCamera());

      await act(async () => {
        await result.current.onRequestPermissions();
      });

      expect(Alert.alert).not.toHaveBeenCalled();
    });

    test("Debe mostrar una alerta si los permisos de cámara son denegados", async () => {
      (useCameraPermissions as jest.Mock).mockReturnValueOnce([
        { status: "denied" },
        jest.fn(() => Promise.resolve({ status: "denied" })),
      ]);

      const { result } = renderHook(() => useCamera());

      await act(async () => {
        await result.current.onRequestPermissions();
      });

      expect(Alert.alert).toHaveBeenCalledWith(
        "Lo siento",
        "Necesitamos permiso para acceder a la cámara para tomar fotos."
      );
    });

    test("Debe mostrar una alerta si los permisos de galería son denegados", async () => {
      (MediaLibrary.usePermissions as jest.Mock).mockReturnValueOnce([
        { status: "denied" },
        jest.fn(() => Promise.resolve({ status: "denied" })),
      ]);

      const { result } = renderHook(() => useCamera());

      await act(async () => {
        await result.current.onRequestPermissions();
      });

      expect(Alert.alert).toHaveBeenCalledWith(
        "Lo siento",
        "Necesitamos permiso para acceder a la galería para guardar las fotos tomadas."
      );
    });

    test("Debe mostrar una alerta si ocurre un error al solicitar permisos", async () => {
      (useCameraPermissions as jest.Mock).mockReturnValueOnce([
        { status: "undetermined" },
        jest.fn(() => Promise.reject(new Error("Error al solicitar permisos"))),
      ]);

      const { result } = renderHook(() => useCamera());

      await act(async () => {
        await result.current.onRequestPermissions();
      });

      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Algo salió mal al solicitar los permisos."
      );
    });
  });

  describe("Probar onShutterButtonPress", () => {
    test("Debe capturar una foto correctamente", async () => {
      const mockTakePictureAsync = jest.fn(() =>
        Promise.resolve({ uri: "mock-photo-uri" })
      );

      // Mock de CameraView para incluir takePictureAsync
      const mockCameraRef = {
        takePictureAsync: mockTakePictureAsync,
      };

      const { result } = renderHook(() => useCamera());

      act(() => {
        (result.current.cameraRef as React.MutableRefObject<any>).current =
          mockCameraRef;
      });

      await act(async () => {
        await result.current.onShutterButtonPress();
      });

      expect(result.current.selectedImage).toBe("mock-photo-uri");
      expect(mockTakePictureAsync).toHaveBeenCalled();
    });

    test("No debe capturar una foto si cameraRef es undefined", async () => {
      const { result } = renderHook(() => useCamera());

      await act(async () => {
        await result.current.onShutterButtonPress();
      });

      expect(result.current.selectedImage).toBeUndefined();
    });

    test("No debe capturar una foto si no hay uri", async () => {
      const mockTakePictureAsync = jest.fn(() =>
        Promise.resolve({ uri: undefined })
      );

      const mockCameraRef = {
        takePictureAsync: mockTakePictureAsync,
      };

      const { result } = renderHook(() => useCamera());

      act(() => {
        (result.current.cameraRef as React.MutableRefObject<any>).current =
          mockCameraRef;
      });

      await act(async () => {
        await result.current.onShutterButtonPress();
      });

      expect(result.current.selectedImage).toBeUndefined();
    });
  });

  describe("Probar onPictureAccepted", () => {
    test("Debe guardar la foto en la galería y agregarla al store", async () => {
      // 1. Configura el mock de CameraView
      const mockTakePictureAsync = jest.fn(() =>
        Promise.resolve({ uri: "mock-photo-uri" })
      );
      const mockCameraRef = {
        takePictureAsync: mockTakePictureAsync,
      };

      const { result } = renderHook(() => useCamera());

      // 2. Simula la referencia de la cámara
      act(() => {
        (result.current.cameraRef as React.MutableRefObject<any>).current =
          mockCameraRef;
      });

      // 3. Simula tomar una foto
      await act(async () => {
        await result.current.onShutterButtonPress();
      });

      // 4. Ahora ejecuta onPictureAccepted
      await act(async () => {
        await result.current.onPictureAccepted();
      });

      // Verificaciones
      expect(MediaLibrary.createAssetAsync).toHaveBeenCalledWith(
        "mock-photo-uri"
      );
      expect(mockAddSelectedImage).toHaveBeenCalledWith("mock-photo-uri");
      expect(router.dismiss).toHaveBeenCalled();
    });

    test("Debe manejar el caso en que no hay imagen seleccionada", async () => {
      const { result } = renderHook(() => useCamera());

      await act(async () => {
        await result.current.onPictureAccepted();
      });

      expect(MediaLibrary.createAssetAsync).not.toHaveBeenCalled();
      expect(mockAddSelectedImage).not.toHaveBeenCalled();
      expect(router.dismiss).not.toHaveBeenCalled();
    });
  });

  describe("Probar onPickImages", () => {
    test("Debe permitir seleccionar imágenes de la galería", async () => {
      const { result } = renderHook(() => useCamera());

      await act(async () => {
        await result.current.onPickImages();
      });

      expect(mockAddSelectedImage).toHaveBeenCalledWith("mock-image-uri");
      expect(router.dismiss).toHaveBeenCalled();
    });

    test("Debe manejar el caso de cancelación al seleccionar imágenes", async () => {
      (
        require("expo-image-picker").launchImageLibraryAsync as jest.Mock
      ).mockReturnValueOnce(Promise.resolve({ canceled: true }));

      const { result } = renderHook(() => useCamera());

      await act(async () => {
        await result.current.onPickImages();
      });

      expect(mockAddSelectedImage).not.toHaveBeenCalled();
      expect(router.dismiss).not.toHaveBeenCalled();
    });
  });

  describe("Probar toggleCameraFacing", () => {
    test("Debe alternar entre las cámaras frontal y trasera", () => {
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
  });

  describe("Probar onReturnCancel", () => {
    test("Debe cancelar y cerrar la cámara", () => {
      const { result } = renderHook(() => useCamera());

      act(() => {
        result.current.onReturnCancel();
      });

      expect(router.dismiss).toHaveBeenCalled();
    });
  });

  describe("Probar onReturnCancel", () => {
    test("Debe volver a tomar la foto", () => {
      const { result } = renderHook(() => useCamera());

      act(() => {
        result.current.onRetakePhoto();
      });

      expect(result.current.selectedImage).toBeUndefined();
    });
  });
});
