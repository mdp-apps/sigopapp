import { PalletizedResponse } from "@/core/supervisor/interfaces";
import { Palletized } from "../entities";

export class PalletizedMapper {
  static fromPalletizedProductionResultToEntity(result: PalletizedResponse): Palletized {
    return {
      hasPallet: result.tiene_pallet,
      mixQuantity: result.cantidad_mezcla,
      palletQuantity: result.cantidad_pallet,
      totalWeight: result.peso_total,
    };
  }
}
