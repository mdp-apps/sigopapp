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