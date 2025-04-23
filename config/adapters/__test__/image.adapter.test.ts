import { ImageAdapter } from "../image.adapter";

describe("Probar ImageAdapter", () => {
  test("Debe devolver solo el nombre y la extensión de las imágenes locales", () => {
    const images = [
      "file://path/to/image1.jpg",
      "file://another/path/to/image2.png",
      "https://example.com/image3.jpg", 
      "file://yet/another/path/image4.jpeg",
    ];

    const result = ImageAdapter.prepareImages(images);

    expect(result).toEqual(["image1.jpg", "image2.png", "image4.jpeg"]);
  });

  test("Debe devolver un array vacío si no hay imágenes locales", () => {
    const images = [
      "https://example.com/image1.jpg",
      "https://example.com/image2.png",
    ];

    const result = ImageAdapter.prepareImages(images);

    expect(result).toEqual([]);
  });

  test("Debe manejar un array vacío sin errores", () => {
    const images: string[] = [];

    const result = ImageAdapter.prepareImages(images);

    expect(result).toEqual([]);
  });
});