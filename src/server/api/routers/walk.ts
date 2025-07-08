import { z } from "zod";
import { walkSchema } from "~/lib/schemas";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const walkRouter = createTRPCRouter({
  upsert: publicProcedure
    .input(z.object({ id: z.number().optional(), data: walkSchema }))
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;
      return ctx.db.walk.upsert({
        where: { id: id ?? 0 },
        update: data,
        create: data,
      });
    }),

  getById: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db.walk.findUnique({
      where: { id: input },
      include: { collection: true },
    });
  }),

  // getAll: publicProcedure.query(async ({ ctx }) => {
  //   const collections = await ctx.db.walkCollection.findMany();

  //   return collections ?? [];
  // }),
});
