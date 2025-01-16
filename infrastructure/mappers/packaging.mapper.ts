import { PackagingResponse } from "@/core/envase/interfaces";
import { Packaging } from "../entities";

export class PackagingMapper {
  static fromPackagingResultToEntity(response: PackagingResponse): Packaging {
    return {
      //! En la API el codigo de envase esta en "string1" en vez de en "codigo"
      code: response.string1, 
      name: response.nombre,
    };
  }
}