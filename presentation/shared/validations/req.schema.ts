import { REGEX } from "@/config/constants";
import { z } from "zod";

export const driverReqSchema = z.object({
  rut: z
    .string()
    .min(9, { message: "El rut debe tener al menos 9 caracteres" })
    .regex(REGEX.rutWithoutDots, {
      message: "El rut debe tener el formato: 12345678-9",
    }),
});

export const searchReqSchema = z
  .object({
    reqCode: z
      .string()
      .optional()
      .refine((val) => !isNaN(Number(val)), {
        message: "El código de requerimiento debe ser un número",
      }),
    patent: z.string().optional(),
  })
  .refine(
    (data) => data.reqCode || data.patent,
    {
      message: "Debe ingresar un código de requerimiento o una patente",
      path: ["reqCode", "patent"],
    }
  );
