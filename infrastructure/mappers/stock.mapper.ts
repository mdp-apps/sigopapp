import { StockResponse } from "@/core/supervisor/interfaces";
import { Stock } from "../entities";

export class StockMapper {
  static fromStockResultToEntity(response: StockResponse): Stock {

    return {
      customerName: response.nombre_cliente,
      operationCode: response.codigo_operacion,
      operationName: response.nombre_operacion,
      productName: response.nombre_producto,
      quantity: response.cantidad,
      warehouseAbbr: response.abreviacion_bodega,
    }
  }
}