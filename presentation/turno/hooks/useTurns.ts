import { useEffect, useState } from "react";

import * as UseCases from "@/core/turno/use-cases";

import { Customer } from "@/infrastructure/entities";
import { DropdownResponse } from "@/infrastructure/interfaces";
import { sigopApiFetcher } from "@/config/api/sigopApi";

export const useTurns = () => {
  const [turns, setTurns] = useState<Customer[]>([]);
  const [dropdownTurns, setDropdownTurns] = useState<DropdownResponse[]>([]);

  const [isLoadingTurns, setIsLoadingTurns] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingTurns(true);
      const response = await UseCases.getTurnsUseCase(sigopApiFetcher, {
        accion: "Consultar lista turnos",
      });

      const dropdownTurnResult = response.map((turn) => ({
        code: turn.code.toString(),
        name: turn.name,
      }));

      setTurns(response);
      setDropdownTurns(dropdownTurnResult);
      setIsLoadingTurns(false);
    })();
  }, []);

  return {
    turns,
    isLoadingTurns,
    dropdownTurns,
  };
};
