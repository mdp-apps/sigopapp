import { HttpAdapter } from "@/config/adapters";

import { ObservationReqResponse } from "../interfaces";
import { ObservationReq } from "@/infrastructure/entities";

import { ApiResponse } from "@/infrastructure/interfaces";
import { ObservationMapper } from "@/infrastructure/mappers";
import { getReqObservationImageUseCase } from "./get-req-observation-image.use-case";

interface Body {
  accion: "Consultar observaciones requerimiento";
  cod_req: number;
}

export const getReqObservationsUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<ObservationReq[]> => {
  const reqObservations = await fetcher.post<
    ApiResponse<ObservationReqResponse[]>,
    Body
  >(`/requerimientos/observaciones`, body);

  const observations = await Promise.allSettled(
    reqObservations.resultado.map(async (obs) => {
      try {
        const observationImage = await getReqObservationImageUseCase(fetcher, {
          requerimiento: body.cod_req.toString(),
          filename: obs.ruta,
        });

        return ObservationMapper.fromReqObservationsResultToEntity({
          ...obs,
          ruta: observationImage.imageUrl,
        });
      } catch (error) {

        return ObservationMapper.fromReqObservationsResultToEntity({
          ...obs,
          ruta: "",
        });
      }
    })
  );

  return observations.map(
    (result) =>
      result.status === "fulfilled"
        ? result.value
        : (result.reason as ObservationReq)
  );
};
