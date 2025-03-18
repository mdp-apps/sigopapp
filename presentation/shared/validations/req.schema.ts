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

export const searchCodeReqSchema = z.object({
  reqCode: z
    .string()
    .min(1, { message: "El código de requerimiento es requerido" })
    .refine((val) => !isNaN(Number(val)), {
      message: "El código de requerimiento debe ser un número",
    }),
});

export const searchPatentReqSchema = z.object({
  patent: z.string().min(1, {
    message: "La patente del requerimiento es requerido",
  }),
});
