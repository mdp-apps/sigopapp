import * as UseCases from "@/core/req/use-cases";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";


type ReqsBody = {
  customer?: string;
  date?: string;
  patent?: string;
  reqType?: string;
  requirement?: string;
  status?: string;
  turn?: string;
};

export const useReqs = (reqBody?: ReqsBody) => {
  const queryReqs = useQuery({
    queryKey: ["reqs", reqBody ? reqBody : "all"],
    queryFn: async () => {
      const {
        customer = "",
        date = "",
        patent = "",
        reqType = "",
        requirement = "",
        status = "",
        turn = "",
      } = reqBody || {};

      const response = await UseCases.getReqsUseCase(sigopApiFetcher, {
        accion: "Consultar requerimientos",
        cliente: customer,
        estado: status,
        fecha: date,
        patente: patent,
        requerimiento: requirement,
        tipo_requerimiento: reqType,
        turno: turn,
      });
      return response;
    },
  });

  return {
    queryReqs,
  };
};
