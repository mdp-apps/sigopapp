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
  quantityMix: z
    .string()
    .min(1, "La cantidad de mezcla paletizada debe ser mayor que 0")
    .refine((val) => !isNaN(Number(val)), {
      message: "Debes ingresar un valor numérico",
    })
    .refine((val) => parseInt(val, 10) > 0, {
      message: "La cantidad de mezcla paletizada debe ser mayor que 0",
    }),
});


