import { z } from "zod";
import { walkCollectionSchema } from "~/lib/schemas";

import {
  createTRPCRouter,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const walkCollectionRouter = createTRPCRouter({
  upsert: publicProcedure
    .input(z.object({ id: z.number().optional(), data: walkCollectionSchema }))
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;
      return ctx.db.walkCollection.upsert({
        where: { id: id ?? 0 },
        update: data,
        create: data,
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.walkCollection.findUnique({
        where: { id: input.id },
        include: { walks: true },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const collections = await ctx.db.walkCollection.findMany({
      include: { walks: true },
    });

    return collections ?? [];
  }),
});
