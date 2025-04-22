export class ImageAdapter {
  static prepareImages(images: string[]): string[] {
    const localFileImages = images.filter((image) => image.startsWith("file://"));
    console.log("fileImages", localFileImages);


    return localFileImages.map((image) => image.split("/").pop()!);
  };
}