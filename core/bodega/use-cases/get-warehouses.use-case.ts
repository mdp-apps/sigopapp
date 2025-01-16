import { HttpAdapter } from "@/config/adapters";

import { WareHouseResponse } from "../interfaces";
import { ApiResponse } from "@/infrastructure/interfaces";
import { WarehouseMapper } from "@/infrastructure/mappers";
import { WareHouse } from "@/infrastructure/entities";

interface Body {
  accion: "Consultar lista bodegas";
  cliente: number;
}

export const getWarehousesUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<WareHouse[]> => {
  const warehouses = await fetcher.post<ApiResponse<WareHouseResponse[]>, Body>(
    `/listas/bodegas`,
    body
  );


  return warehouses.resultado.map(WarehouseMapper.fromWarehouseResultToEntity);
};
