export class ImageAdapter {
  static prepareImages(images: string[]): string[] {
    const localFileImages = images.filter((image) => image.startsWith("file://"));


    return localFileImages.map((image) => image.split("/").pop()!);
  };
}