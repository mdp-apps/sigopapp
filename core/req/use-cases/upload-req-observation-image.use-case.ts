import { HttpAdapter } from "@/config/adapters";


interface Body {
  file: string;
  requerimiento: string;
  filename: string;
}

export const uploadReqObservationImageUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<string> => {
  try {
    const { file, requerimiento, filename } = body;
    
    const formData = new FormData();

    formData.append("file", {
      uri: file,
      name: filename,
      type: "image/jpeg",
    } as any);

    formData.append("requerimiento", requerimiento);
    formData.append("filename", filename);

    const uploadImage = await fetcher.post<string, FormData>(
      `/requerimientos/observaciones/subirfoto/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );


    return uploadImage;
  } catch (error) {
    throw new Error("Error al subir la imagen de la observación");
  }
};
