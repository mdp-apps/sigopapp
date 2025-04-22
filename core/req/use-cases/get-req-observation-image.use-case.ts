import { HttpAdapter } from "@/config/adapters";
import { ObservationImage } from "@/infrastructure/entities";
import { ApiResponse } from "@/infrastructure/interfaces";


interface Body {
  requerimiento: string;
  filename: string;
}

export const getReqObservationImageUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<ObservationImage> => {
  try {
    const observationImage = await fetcher.post<
      ApiResponse<ObservationImage>,
      Body
    >(`/requerimientos/observaciones/obtenerfoto`, body);


    return observationImage.resultado;
  } catch (error) {
    throw new Error(
      "Error al obtener la imagen de la observación del requerimiento"
    );
  }
};
