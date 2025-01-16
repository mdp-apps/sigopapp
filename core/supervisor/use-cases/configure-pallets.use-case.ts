import { HttpAdapter } from "@/config/adapters";

import { ApiResponse, Result } from "@/infrastructure/interfaces";
import { ResultMapper } from "@/infrastructure/mappers";

interface Body {
  accion: "Configurar pallets";
  id: number;
  ingresa_kiosco: number;
  opcion: number;
  requerimiento: number;
  tiene_pallet: number;
  usuario: string;

  cant_mezcla?: number;
  lote?: number;
  mezcla?: string;
  n_pallet?: number;
  peso_total?: number;
}

export const configurePalletsUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<Result> => {
  try {
    const configurePallets = await fetcher.post<ApiResponse<string>, Body>(
      `/supervisor/configurarpallets`,
      body
    );

    return ResultMapper.fromResultToEntity(configurePallets);
  } catch (error) {
    throw new Error("Error al configurar pallets");
  }
};
