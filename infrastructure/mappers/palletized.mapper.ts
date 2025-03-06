import { PalletizedResponse } from "@/core/supervisor/interfaces";
import { Palletized } from "../entities";

export class PalletizedMapper {
  static fromPalletizedProductionResultToEntity(result: PalletizedResponse): Palletized {
    return {
      hasPallet: result.tiene_pallet === 1,
      mixQuantityKG: result.cantidad_mezcla,
      palletQuantity: result.cantidad_palet,
      palletTotalWeight: result.peso_total,
    };
  }
}
