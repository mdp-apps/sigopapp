import { useEffect, useState } from "react";

import * as UseCases from "@/core/movimiento/use-cases";
import { sigopApiFetcher } from "@/config/api/sigopApi";
import { Formatter } from "@/config/helpers";

import { useQuery, useQueryClient } from "@tanstack/react-query";

type InternalMovementBody = {
  code: string;
  detailCode: string;
  date: string;
  turn: string;
  internalMovementStatus: string;
  internalMovementType: string;
  customer: string;
};

const initialTotals = {
  planned: "",
  pending: "",
  transferred: "",
};

export const useInternalMovements = (
  internalMovsBody?: InternalMovementBody
) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [movCurrentDate, setMovCurrentDate] = useState("");
  const [movTurn, setMovTurn] = useState("");
  const [movTotals, setMovTotals] = useState(initialTotals);

  const queryClient = useQueryClient();

  const queryInternalMovements = useQuery({
    queryKey: ["internal-movs", internalMovsBody ? internalMovsBody : "all"],
    queryFn: async () => {
      const {
        code = "",
        detailCode = "",
        date = "",
        turn = "",
        internalMovementStatus = "",
        internalMovementType = "",
        customer = "",
      } = internalMovsBody || {};

      const response = await UseCases.getInternalMovsUseCase(sigopApiFetcher, {
        accion: "Consultar movimientos internos",
        codigo: code,
        codigo_detalle: detailCode,
        fecha: date,
        turno: turn,
        estado: internalMovementStatus,
        tipo_movimiento_interno: internalMovementType,
        cliente: customer,
      });

      return response;
    },
  });

  useEffect(() => {
    if (queryInternalMovements.data) {
      const date = queryInternalMovements.data.at(0)?.plannedDate;
      setMovCurrentDate(date!);
    }
  }, [queryInternalMovements.data]);

  useEffect(() => {
    if (queryInternalMovements.data && queryInternalMovements.data.length > 0) {
      const turnCounts = queryInternalMovements.data.reduce(
        (acc: Record<string, number>, movement) => {
          acc[movement.turn] = (acc[movement.turn] || 0) + 1;
          return acc;
        },
        {}
      );

      const predominantTurn = Object.keys(turnCounts).reduce((a, b) => {
        return turnCounts[a] > turnCounts[b] ? a : b;
      });
      setMovTurn(`T${predominantTurn}`);

      const totalsForTurn = queryInternalMovements.data.reduce(
        (acc, movement) => {
          if (movement.turn === Number(predominantTurn)) {
            acc.planned += movement.totalQuantityKG;
            acc.pending += movement.pendingQuantityKG;
            acc.transferred += movement.transferredQuantityKG;
          }
          return acc;
        },
        {
          planned: 0,
          pending: 0,
          transferred: 0,
        }
      );

      const totalsFormatted = {
        planned: Formatter.numberWithDots(totalsForTurn.planned).concat(" KG"),
        pending: Formatter.numberWithDots(totalsForTurn.pending).concat(" KG"),
        transferred: Formatter.numberWithDots(totalsForTurn.transferred).concat(" KG"),
      };

      setMovTotals(totalsFormatted);
    }
  }, [queryInternalMovements.data]);

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 200));

    queryClient.invalidateQueries({
      queryKey: ["internal-movs", internalMovsBody ? internalMovsBody : "all"],
    });

    setIsRefreshing(false);
  };

  return {
    queryInternalMovements,
    movCurrentDate,
    movTurn,
    movTotals,
    isRefreshing,
    onPullToRefresh,
  };
};
