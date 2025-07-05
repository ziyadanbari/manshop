import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const reviewRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        productId: z.number(),
        rating: z.number().min(1).max(5),
        comment: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { productId, rating, comment } = input;
      const userId = ctx.session.user.id;

      // 1. Create the review
      const review = await ctx.db.review.create({
        data: {
          userId,
          productId,
          rating,
          comment,
        },
        include: {
          user: {
            select: {
              name: true,
              username: true,
            },
          },
        },
      });

      // 2. Recalculate product rating and review count
      const allReviews = await ctx.db.review.findMany({
        where: { productId },
        select: { rating: true },
      });
      const newCount = allReviews.length;
      const newAvg =
        allReviews.reduce((sum, r) => sum + r.rating, 0) /
        Math.max(newCount, 1);

      await ctx.db.product.update({
        where: { id: productId },
        data: {
          rating: newAvg,
          reviews: newCount,
        },
      });

      return review;
    }),

  update: protectedProcedure
    .input(
      z.object({
        productId: z.number(),
        rating: z.number().min(1).max(5),
        comment: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { productId, rating, comment } = input;
      const userId = ctx.session.user.id;

      return await ctx.db.review.update({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
        data: {
          rating,
          comment,
        },
        include: {
          user: {
            select: {
              name: true,
              username: true,
            },
          },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ productId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { productId } = input;
      const userId = ctx.session.user.id;

      return await ctx.db.review.delete({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });
    }),

  getProductReviews: protectedProcedure
    .input(z.object({ productId: z.number() }))
    .query(async ({ ctx, input }) => {
      const { productId } = input;

      return await ctx.db.review.findMany({
        where: { productId },
        include: {
          user: {
            select: {
              name: true,
              username: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  getUserReviews: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    return await ctx.db.review.findMany({
      where: { userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            images: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }),
});
