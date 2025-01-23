import { useState } from "react";

import * as UseCases from "@/core/req/use-cases";

import { Req } from "@/infrastructure/entities";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useAuthStore, UserProfile } from "@/presentation/auth/store";

type ReqsBody = {
  patent?: string;
  requirement?: string;
  date?: string;
  turn?: string;
  status?: string;
  reqType?: string;
  customer?: string;
};

export const useReqs = () => {
  const [reqs, setReqs] = useState<Req[]>([]);
  const [isLoadingReqs, setIsLoadingReqs] = useState(false);

  const { profile } = useAuthStore();

  const getRequirements = async (reqsBody: ReqsBody) => {
    setIsLoadingReqs(true);

    const body: UseCases.ReqsBody = {
      accion: "Consultar requerimientos",
      cliente: reqsBody.customer,
      estado: reqsBody.status,
      fecha: reqsBody.date,
      patente: reqsBody.patent,
      requerimiento: reqsBody.requirement,
      tipo_requerimiento: reqsBody.reqType,
      turno: reqsBody.turn,
    };

    if (profile === UserProfile.driver) {
      // body.conductor = user?.code.toString();
    }
    const response = await UseCases.getReqsUseCase(sigopApiFetcher, body);

    setReqs(response);
    setIsLoadingReqs(false);
  };

  return {
    reqs,
    isLoadingReqs,
    getRequirements,
  };
};
