import { z } from "zod";

export const observationSchema = z.object({
  observation: z
    .string()
    .nonempty(
      "La observación no ha sido ingresada, favor revisar los campos requeridos."
    ),
});
