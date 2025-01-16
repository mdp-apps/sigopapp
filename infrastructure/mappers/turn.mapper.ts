import { TurnResponse } from "@/core/turno/interfaces";
import { Turn } from "../entities";

export class TurnMapper{
  static fromTurnResultToEntity(response: TurnResponse): Turn {
    return {
      code: response.codigo,
      name: response.nombre,
    }
  }
}