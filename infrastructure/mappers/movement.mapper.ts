import {
  InternalMovementResponse,
  StatusInternalMovResponse,
  TypeInternalMovResponse,
} from "@/core/movimiento/interfaces";
import {
  InternalMovement,
  StatusInternalMov,
  TypeInternalMov,
} from "../entities";

export class MovementMapper {
  static fromInternalMovResultToEntity(
    response: InternalMovementResponse
  ): InternalMovement {
    return {
      cashing: response.cobro,
      customerName: response.nombre_cliente,
      dapiCode: response.codigo_dapi,
      detailId: response.id_detalle,
      diCode: response.codigo_di,
      id: response.id,
      movementTypeName: response.nombre_tipo_movimiento,
      observation: response.observacion,
      operationCode: response.codigo_operacion,
      operationDestinyCode: response.codigo_operacion_destino,
      operationDestinyName: response.nombre_operacion_destino,
      operationName: response.nombre_operacion,
      plannedDate: response.fecha_planificada,
      productName: response.nombre_producto,
      status: response.estado,
      totalQuantity: response.cantidad_total,
      turn: response.turno,
      verifiedQuantity: response.cantidad_verificada,
      warehouseDestinyName: response.nombre_bodega_destino,
      warehouseName: response.nombre_bodega,
    }
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
