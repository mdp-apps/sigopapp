import { z } from "zod";

export const palletSchema = z.object({
  nroPallets: z
    .string()
    .min(1, "El número de pallets debe ser mayor que 0")
    .refine((val) => !isNaN(Number(val)), {
      message: "Debes ingresar un valor numérico",
    })
    .refine((val) => parseInt(val, 10) > 0, {
      message: "El número de pallets debe ser mayor que 0",
    }),
  totalPalletWeight: z
    .string()
    .min(1, "El peso total de los pallets debe ser mayor que 0")
    .refine((val) => !isNaN(Number(val)), {
      message: "Debes ingresar un valor numérico",
    })
    .refine((val) => parseInt(val, 10) > 0, {
      message: "El peso total de los pallets debe ser mayor que 0",
    }),
});


