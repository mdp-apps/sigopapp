import { act, renderHook } from "@testing-library/react-native";
import { useCameraStore } from "../useCameraStore";

describe("Probar useCameraStore", () => {
  beforeEach(() => {
    act(() => {
      useCameraStore.getState().clearImages();
    });
  });

  test("Debe inicializar con un array vacío de imágenes seleccionadas", () => {
    const { result } = renderHook(() => useCameraStore());
    expect(result.current.selectedImages).toEqual([]);
  });

  test("Debe agregar una imagen al array de imágenes seleccionadas", () => {
    const { result } = renderHook(() => useCameraStore());
    const image = "image1.jpg";

    act(() => {
      result.current.addSelectedImage(image);
    });

    expect(result.current.selectedImages).toEqual([image]);
  });

  test("Debe agregar múltiples imágenes al array de imágenes seleccionadas", () => {
    const { result } = renderHook(() => useCameraStore());
    const images = ["image1.jpg", "image2.png", "image3.jpeg"];

    act(() => {
      images.forEach((image) => result.current.addSelectedImage(image));
    });

    expect(result.current.selectedImages).toEqual(images);
  });

  test("Debe limpiar el array de imágenes seleccionadas", () => {
    const { result } = renderHook(() => useCameraStore());
    const images = ["image1.jpg", "image2.png"];

    act(() => {
      images.forEach((image) => result.current.addSelectedImage(image));
    });

    act(() => {
      result.current.clearImages();
    });

    expect(result.current.selectedImages).toEqual([]);
  });
});