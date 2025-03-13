import { z } from "zod";

export const packagingSchema = z.object({
  packagingQuantity: z
    .string()
    .min(1, "La cantidad de envases debe ser mayor que 0")
    .refine((val) => !isNaN(Number(val)), {
      message: "Debes ingresar un valor numérico",
    })
    .refine((val) => parseInt(val, 10) > 0, {
      message: "La cantidad de envases debe ser mayor que 0",
    }),
});