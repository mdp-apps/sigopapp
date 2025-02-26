import { useEffect, useState } from "react";

import * as UseCases from "@/core/turno/use-cases";

import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

import { useQuery } from "@tanstack/react-query";

export const useTurns = () => {
  const [dropdownTurns, setDropdownTurns] = useState<DropdownResponse[]>([]);

  const queryTurns = useQuery({
    queryKey: ["turns"],
    queryFn: async () => {
      const response = await UseCases.getTurnsUseCase(sigopApiFetcher, {
        accion: "Consultar lista turnos",
      });

      return response;
    },
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (queryTurns.isSuccess) {
      const dropdownTurnResult = queryTurns.data.map((turn) => ({
        code: turn.code.toString(),
        name: turn.name,
      }));

      setDropdownTurns(dropdownTurnResult);
    }
  }, [queryTurns.isSuccess]);

  return {
    queryTurns,
    dropdownTurns,
  };
};
