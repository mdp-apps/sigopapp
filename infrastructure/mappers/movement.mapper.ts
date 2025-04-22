import {
  InternalMovDetailResponse,
  InternalMovResponse,
  StatusInternalMovResponse,
  TotalInternalMovResponse,
  TypeInternalMovResponse,
} from "@/core/movimiento/interfaces";
import {
  InternalMov,
  InternalMovDetail,
  StatusInternalMov,
  TotalInternalMov,
  TypeInternalMov,
} from "../entities";
import { Formatter } from "@/config/helpers";
import { DateAdapter } from "@/config/adapters";

export class MovementMapper {
  static fromInternalMovResultToEntity(
    response: InternalMovResponse
  ): InternalMov {
    return {
      pendingQuantityKG: Formatter.numberWithDots(
        response.cantidad_pendiente 
      ).concat(" KG"),
      productCode: response.codigo_producto,
      productName: response.nombre_producto,
      totalQuantityKG: Formatter.numberWithDots(response.cantidad_total).concat(
        " KG"
      ),
      
      transferredQuantityKG: Formatter.numberWithDots(
        response.cantidad_verificada
      ).concat(" KG"),
      details: response.detalles.map((detail) => {
        return MovementMapper.fromInternalMovDetailResultToEntity(detail);
      }),
    };
  }

  static fromInternalMovDetailResultToEntity(
    response: InternalMovDetailResponse
  ): InternalMovDetail {
    return {
      customerName: response.nombre_cliente,
      operationDestinyName: response.nombre_operacion_destino,
      operationName: response.nombre_operacion,
      pendingQuantityKG: Formatter.numberWithDots(
        response.cantidad_pendiente
      ).concat(" KG"),
      totalQuantityKG: Formatter.numberWithDots(response.cantidad_total).concat(
        " KG"
      ),
      transferredQuantityKG: Formatter.numberWithDots(
        response.cantidad_verificada
      ).concat(" KG"),
      warehouseDestinyName: response.nombre_bodega_destino,
      warehouseDestinyCode: `B${response.codigo_bodega_destino}`,
      warehouseName: response.nombre_bodega,
      warehouseCode: `B${response.codigo_bodega}`,
    };
  }

  static fromTotalInternalMovToEntity(
    response: TotalInternalMovResponse
  ): TotalInternalMov {
    return {
      plannedDate: DateAdapter.format(response.fecha, "dd 'de' MMMM 'de' yyyy"),
      pending: Formatter.numberWithDots(response.pendiente).concat(" KG"),
      planned: Formatter.numberWithDots(response.planificado).concat(" KG"),
      transferred: Formatter.numberWithDots(response.trasladado).concat(" KG"),
      turn: `T${response.turno}`,
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
