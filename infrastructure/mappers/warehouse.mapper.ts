import { WareHouseResponse } from "@/core/bodega/interfaces";
import { WareHouse } from "../entities";

export class WarehouseMapper{
  static fromWarehouseResultToEntity(response: WareHouseResponse): WareHouse {
    return {
      code: response.codigo,
      name: response.nombre,
      abbrName: response.string1,
    }
  }
}