import { CustomerResponse } from "@/core/cliente/interfaces";
import { Customer } from "../entities";

export class CustomerMapper{
  static fromCustomerResultToEntity(response: CustomerResponse): Customer {
    return {
      code: response.codigo,
      name: response.nombre,
    }
  }
}