import { z } from "zod";

export const interalMovFiltersSchema = z.object({
  turn: z.string().optional(),
  customer: z.string().optional(),
});

export const stockFiltersSchema = z.object({
  customer: z.string().optional(),
  warehouse: z.string().optional(),
  product: z.string().optional(),
  operation: z.string().optional(),
});   