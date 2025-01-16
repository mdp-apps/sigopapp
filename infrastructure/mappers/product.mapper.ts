import {
  ProductReqResponse,
  ProductResponse,
} from "@/core/producto/interfaces";
import { Product, ProductReq } from "../entities";

export class ProductMapper {
  static fromProductResultToEntity(response: ProductResponse): Product {
    return {
      code: response.codigo,
      name: response.nombre,
      customerCode: response.string1,
    };
  }

  static fromProductReqResultToEntity(
    response: ProductReqResponse
  ): ProductReq {
    return {
      abbrPlant: response.abreviacion_planta,
      abbrWarehouse: response.abreviacion_bodega,
      ballotCode: response.codigo_papeleta,
      batch: response.lote,
      codeDetailReq: response.codigo_detalle_requerimiento,
      codeDI: response.codigo_di,
      mixCode: response.codigo_mezcla,
      codeProduct: response.codigo_producto,
      codeReq: response.codigo_requerimiento,
      componentType: response.tipo_componente,
      customerCode: response.codigo_cliente,
      kgProduct: response.kg_producto,
      mixName: response.nombre_mezcla,
      observation: response.observacion,
      operationCode: response.codigo_operacion,
      operationName: response.nombre_operacion,
      productName: response.nombre_producto,
      quantity: response.cantidad,
    };
  }
}
