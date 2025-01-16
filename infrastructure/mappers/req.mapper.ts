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
      internalCode: response.codigo_interno,
      name: response.nombre,
      nameReqFormat: response.nombre_requerimiento_formato,
      observation: response.observacion,
      patent: response.patente,
      reqType: response.tipo_requerimiento,
      rutDriver: response.rut_chofer,
      status: response.estado,
      statusName: response.estado_nombre,
      turn: response.turno,
      vehiclePatent: response.patente_vehiculo,
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
