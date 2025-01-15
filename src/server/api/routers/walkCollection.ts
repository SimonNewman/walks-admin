import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const walkCollectionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
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

  // getById: publicProcedure.query(async ({ ctx, input }) => {
  //   console.log(input);
  //   const collection = await ctx.db.walkCollection.findFirst({
  //     where: {
  //       id: 2,
  //     },
  //     // include: {
  //     //   walk: true,
  //     // },
  //   });

  //   return collection;
  // }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const collections = await ctx.db.walkCollection.findMany({
      include: { walks: true },
    });

    return collections ?? [];
  }),
});
