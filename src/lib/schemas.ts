import { z } from "zod";

export const walkCollectionSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
});

export const walkSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  collectionId: z.number().optional(),
  distance: z.number(),
  order: z.number().optional(),
  circular: z.boolean(),
});
