import {
  ActiveReqResponse,
  DriverReqResponse,
  LogStatusReqResponse,
  ReqResponse,
  StatusReqResponse,
  TypeReqResponse,
} from "@/core/req/interfaces";
import {
  ActiveReq,
  CurrentStatusReq,
  DriverReq,
  LogStatusReq,
  Req,
  StatusReq,
  TypeReq,
} from "../entities";

import { CalcAdapter } from "@/config/adapters";

export class ReqMapper {
  static fromActiveReqsAccountResultToEntity(
    response: ActiveReqResponse
  ): ActiveReq {
    return {
      loadNumber: response.numero_carga,
    };
  }

  static fromCurrentStatusReqResultToEntity(
    response: DriverReqResponse
  ): CurrentStatusReq {
    return {
      status: response.estado,
    };
  }

  static fromDriverReqResultToEntity(response: DriverReqResponse): DriverReq {
    return {
      carrierName: response.nombre_transportista,
      customerAbbr: response.abreviacion_cliente,
      date: response.fecha,
      formatType: response.tipo_formato,
      internalCode: response.codigo_interno,
      maxHour: response.hora_maxima,
      minHour: response.hora_minima,
      nameReq: response.nombre_requerimiento_formato,
      observation: response.observacion,
      reqType: response.tipo_requerimiento,
      rutDriver: response.rut_chofer,
      status: response.estado,
      turn: response.turno,
      vehiclePatent: response.patente_vehiculo,
    };
  }

  static fromLogStatusReqResultToEntity(
    response: LogStatusReqResponse
  ): LogStatusReq {
    return {
      id: response.id,
      description: response.descripcion,
      eventDate: response.fecha_evento,
      fullUserName: response.nombre_completo_usuario,
      reqStatusName: response.nombre_estado_requerimiento,
      userCode: response.codigo_usuario,
    };
  }

  static fromReqsResultToEntity(response: ReqResponse): Req {
    return {
      carrierName: response.nombre_transportista,
      customerAbbr: response.abreviacion_cliente,
      customer: response.cliente,
      customerCode: response.codigo_cliente,
      date: response.fecha,
      description: response.descripcion,
      driverName: response.nombre_chofer,
      formatType: response.tipo_formato,
      //! Cambiar si cambia el endpoint o la propiedad
      hasPallet: response.tiene_palet
        ? response.tiene_palet === 1
        : CalcAdapter.getRandomNumber(0, 1) === 1,
      name: response.nombre,
      nameReqFormat: response.nombre_requerimiento_formato,
      observation: response.observacion,
      patent: response.patente,
      //! Cambiar si cambia el endpoint o la propiedad
      plantCode: response.planta
        ? response.planta
        : CalcAdapter.getRandomNumber(1, 14),
      reqCode: response.codigo_interno,
      reqType: response.tipo_requerimiento,
      rutDriver: response.rut_chofer,
      status: response.estado,
      statusName: response.estado_nombre,
      turn: response.turno,
      vehiclePatent: response.patente_vehiculo,
      //! Cambiar si cambia el endpoint o la propiedad
      warehouseCode: response.bodega
        ? response.bodega
        : CalcAdapter.getRandomNumber(1, 29),
    };
  }

  static fromStatusReqResultToEntity(response: StatusReqResponse): StatusReq {
    return ReqMapper.fromTypeReqResultToEntity(response);
  }

  static fromTypeReqResultToEntity(response: TypeReqResponse): TypeReq {
    return {
      code: response.codigo,
      name: response.nombre,
    };
  }
}
