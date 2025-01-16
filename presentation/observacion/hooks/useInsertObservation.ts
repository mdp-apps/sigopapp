import { useState } from "react";

import * as UseCases from "@/core/req/use-cases";

import { sigopApiFetcher } from "@/config/api/sigopApi";

type InsertObsBody = {
  reqCode: string;
  commment: string;
  path: string;
  userCode: number;
}

export const useInsertObservation = () => {

  const [isLoadingInsertObservation, setIsLoadingInsertObservation] = useState(false);

  const insertObservation = async (body: InsertObsBody) => {
    setIsLoadingInsertObservation(true);

    const response = await UseCases.insertReqObservationUseCase(
      sigopApiFetcher,
      {
        accion: "Insertar observacion requerimiento",
        requerimiento: body.reqCode,
        comentario: body.commment,
        ruta: body.path,
        usuario: body.userCode,
      }
    );
    console.log("insertObservation", JSON.stringify(response));

    setIsLoadingInsertObservation(false);

    return response;
  };

  return {
    isLoadingInsertObservation,
    insertObservation,
  };
};
