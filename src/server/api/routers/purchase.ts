import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const purchaseRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        productId: z.number(),
        quantity: z.number().min(1),
        size: z.string(),
        color: z.string(),
        price: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { productId, quantity, size, color, price } = input;
      const userId = ctx.session.user.id;

      return await ctx.db.purchase.create({
        data: {
          userId,
          productId,
          quantity,
          size,
          color,
          price: price.toString(),
          status: "pending",
        },
        include: {
          product: true,
        },
      });
    }),

  getUserPurchases: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    return await ctx.db.purchase.findMany({
      where: { userId },
      include: {
        product: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        purchaseId: z.string(),
        status: z.enum(["pending", "completed", "cancelled"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { purchaseId, status } = input;

      return await ctx.db.purchase.update({
        where: { id: purchaseId },
        data: { status },
      });
    }),
});
