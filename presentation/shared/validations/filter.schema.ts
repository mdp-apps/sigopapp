import { z } from "zod";

export const interalMovFiltersSchema = z.object({
  turn: z.string().optional(),
  customer: z.string().optional(),
});