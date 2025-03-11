import { z } from "zod";

export const observationSchema = z.object({
  observation: z
    .string()
    .nonempty(
      "La observación es requerida. Por favor, ingrese una."
    ),
});
