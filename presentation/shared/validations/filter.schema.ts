import { z } from "zod";

export const interalMovFiltersSchema = z.object({
  code: z.string().optional(),
  detailCode: z.string().optional(),
  internalMovementType: z.string().optional(),
  internalMovementStatus: z.string().optional(),
  date: z.string().optional(),
  turn: z.string().optional(),
});