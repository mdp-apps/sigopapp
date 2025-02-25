import { z } from "zod";

export const palletizingProductionReqSchema = z.object({
  reqCode: z
    .string()
    .min(1, "El código de requerimiento es requerido")
    .refine((val) => !isNaN(Number(val)), {
      message: "El código de requerimiento debe ser un número",
    }),
});

export const palletSchema = z.object({
  hasPallets: z.boolean().default(false),
  nroPallets: z
    .number()
    .int()
    .positive()
    .min(1, "El número de pallets debe ser mayor que 0"),
  totalPalletWeight: z
    .number()
    .int()
    .positive()
    .min(1, "El peso total de los pallets debe ser mayor que 0"),
  quantityMix: z
    .number()
    .int()
    .positive()
    .min(1, "La cantidad de mezcla paletizada debe ser mayor que 0"),
});


