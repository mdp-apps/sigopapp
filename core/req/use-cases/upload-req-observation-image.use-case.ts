import { AxiosResponse } from "axios";
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

    const response = await fetch(file);
    const blob = await response.blob();

    formData.append("file", blob, "image.jpg");

    formData.append("requerimiento", requerimiento);
    formData.append("filename", filename);

    const uploadImage = await fetcher.post<AxiosResponse, FormData>(
      `/requerimientos/observaciones/subirfoto/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );


    return uploadImage.data;
  } catch (error) {
    throw new Error("Error al subir la imagen de la observación");
  }
};
