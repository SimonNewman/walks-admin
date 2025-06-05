import { time } from "console";
import { z } from "zod";

export const generateWalkCollectionSchema = z.object({
  url: z.string().min(1),
});

export const walkCollectionSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  url: z.string(),
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
  url: z.string(),
  gpx: z.string().optional(),
  stiles: z.number().optional(),
  time: z.number().optional(),
});
