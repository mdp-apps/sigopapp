import { HttpAdapter } from "@/config/adapters";

import { CustomerResponse } from "../interfaces";
import { ApiResponse } from "@/infrastructure/interfaces";
import { CustomerMapper } from "@/infrastructure/mappers";
import { Customer } from "@/infrastructure/entities";

interface Body {
  accion: "Consultar clientes";
}

export const getCustomersUseCase = async (
  fetcher: HttpAdapter,
  body: Body
): Promise<Customer[]> => {
  const customers = await fetcher.post<ApiResponse<CustomerResponse[]>, Body>(
    `/listas/clientes`,
    body
  );

  return customers.resultado.map(CustomerMapper.fromCustomerResultToEntity);
};
