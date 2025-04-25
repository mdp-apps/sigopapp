import { sigopApiFetcher } from "@/config/api/sigopApi";
import { driverLoginUseCase } from "../use-cases";

test("login exitoso", async () => {
  const result = await driverLoginUseCase(sigopApiFetcher, {
    accion: "Validar inicio sesion conductor",
    rut: "12345678-9",
  });
 console.log(result);
});
