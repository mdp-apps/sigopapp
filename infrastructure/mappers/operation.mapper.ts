import { OperationResponse } from "@/core/operacion/interfaces";
import { Operation } from "../entities";

export class OperationMapper {
  static fromOperationResultToEntity(response: OperationResponse): Operation {
    return {
      code: response.codigo,
      name: response.nombre,
      operationCode: response.string1,
    };
  }
}