import {
  InternalMovResponse,
  StatusInternalMovResponse,
  TotalInternalMovResponse,
  TypeInternalMovResponse,
} from "@/core/movimiento/interfaces";
import {
  InternalMov,
  StatusInternalMov,
  TotalInternalMov,
  TypeInternalMov,
} from "../entities";
import { Formatter } from "@/config/helpers";

export class MovementMapper {
  static fromInternalMovResultToEntity(
    response: InternalMovResponse
  ): InternalMov {
    return {
      cashing: response.cobro,
      customerName: response.nombre_cliente,
      detailId: response.id_detalle,
      id: response.id,
      operationCode: response.codigo_operacion,
      operationDestinyCode: response.codigo_operacion_destino,
      operationDestinyName: response.nombre_operacion_destino,
      operationName: response.nombre_operacion,
      pendingQuantityKG: response.cantidad_total - response.cantidad_verificada,
      productName: response.nombre_producto,
      status: response.estado,
      totalQuantityKG: response.cantidad_total,
      turn: response.turno,
      transferredQuantityKG: response.cantidad_verificada,
      warehouseDestinyName: response.nombre_bodega_destino,
      warehouseName: response.nombre_bodega,
    };
  }

  static fromTotalInternalMovToEntity(
    response: TotalInternalMovResponse
  ): TotalInternalMov {
    return {
      plannedDate: response.fecha,
      pending: Formatter.numberWithDots(response.pendiente).concat(" KG"),
      planned: Formatter.numberWithDots(response.planificado).concat(" KG"),
      transferred: Formatter.numberWithDots(response.trasladado).concat("KG"),
      turn: response.turno,
    };
  }

  static fromStatusInternalMovResultToEntity(
    response: StatusInternalMovResponse
  ): StatusInternalMov {
    return MovementMapper.fromTypeInternalMovResultToEntity(response);
  }

  static fromTypeInternalMovResultToEntity(
    response: TypeInternalMovResponse
  ): TypeInternalMov {
    return {
      code: response.codigo,
      name: response.nombre,
    };
  }
}
