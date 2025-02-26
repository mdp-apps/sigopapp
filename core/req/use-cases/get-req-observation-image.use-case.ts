import { HttpAdapter } from "@/config/adapters";
import { ObservationImage } from "@/infrastructure/entities";

import base64 from "base64-js";

interface Body {
  requerimiento: string;
  filename: string;
  method: string;
}



export const getReqObservationImageUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<ObservationImage> => {
  try {
    const observationImage = await fetcher.post<ArrayBuffer, Body>(
      `/requerimientos/observaciones/obtenerfoto`,
      body,
      {
        responseType: "arraybuffer",
      }
    );

    const base64Array = new Uint8Array(observationImage);
    const base64Str = base64.fromByteArray(base64Array);
    const imageUrl = `data:image/jpeg;base64,${base64Str}`;

    return { imageUrl, base64Str };
  } catch (error) {
    throw new Error(
      "Error al obtener la imagen de la observación del requerimiento"
    );
  }
};
