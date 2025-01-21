import { z } from "zod";

import { REGEX } from "@/config/constants";

export const loginRutSchema = z.object({
  rut: z
    .string()
    .min(9, { message: "El rut debe tener al menos 9 caracteres" })
    .regex(REGEX.rutWithoutDots, {
      message: "El rut debe tener el formato: 12345678-9",
    }),
});

export const loginUserSchema = z.object({
  email: z.string().email({ message: "El email inválido, sigue el formato correcto" }),
  password: z
    .string()
    .min(6, { message: "Contraseña debe tener al menos 6 caracteres" }),
});
