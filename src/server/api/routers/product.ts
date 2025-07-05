import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return (
      await ctx.db.product.findMany({
        orderBy: { createdAt: "desc" },
      })
    ).map((product) => ({
      ...product,
      price: Number(product.price),
      originalPrice: Number(product.originalPrice),
      reviews: Number(product.reviews),
      rating: Number(product.rating),
    }));
  }),

  getFiltered: protectedProcedure
    .input(
      z.object({
        searchQuery: z.string().optional(),
        categories: z.array(z.string()).optional(),
        genders: z.array(z.string()).optional(),
        sizes: z.array(z.string()).optional(),
        priceRange: z.string().optional(),
        sortBy: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const {
        searchQuery = "",
        categories = [],
        genders = [],
        sizes = [],
        priceRange = "",
        sortBy = "",
      } = input;

      let where: any = {};

      // Search query
      if (searchQuery) {
        where.name = {
          contains: searchQuery,
          mode: "insensitive" as const,
        };
      }

      // Categories filter
      if (categories.length > 0) {
        where.category = {
          in: categories,
        };
      }

      // Genders filter
      if (genders.length > 0) {
        where.gender = {
          in: genders,
        };
      }

      // Sizes filter
      if (sizes.length > 0) {
        where.sizes = {
          hasSome: sizes,
        };
      }

      // Price range filter
      if (priceRange) {
        const [min, max] = priceRange.split("-").map(Number);
        where.price = {
          gte: min,
          ...(max && { lte: max }),
        };
      }

      // Sort options
      let orderBy: any = { createdAt: "desc" };
      if (sortBy === "price-low") {
        orderBy = { price: "asc" };
      } else if (sortBy === "price-high") {
        orderBy = { price: "desc" };
      } else if (sortBy === "rating") {
        orderBy = { rating: "desc" };
      } else if (sortBy === "name") {
        orderBy = { name: "asc" };
      }

      return (
        await ctx.db.product.findMany({
          where,
          orderBy,
        })
      ).map((product) => ({
        ...product,
        price: Number(product.price),
        originalPrice: Number(product.originalPrice),
        reviews: Number(product.reviews),
        rating: Number(product.rating),
      }));
    }),

  getCategories: protectedProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.product.findMany({
      select: { category: true },
    });
    return [...new Set(products.map((p) => p.category))];
  }),

  getGenders: protectedProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.product.findMany({
      select: { gender: true },
    });
    return [...new Set(products.map((p) => p.gender))];
  }),

  getSizes: protectedProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.product.findMany({
      select: { sizes: true },
    });
    const allSizes = products.flatMap((p) => p.sizes);
    return [...new Set(allSizes)];
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const product = await ctx.db.product.findUnique({
        where: { id: input.id },
        include: {
          productReviews: {
            include: {
              user: {
                select: {
                  name: true,
                  username: true,
                },
              },
            },
            orderBy: { createdAt: "desc" },
          },
        },
      });
      if (!product) return null;
      return {
        ...product,
        price: Number(product.price),
        originalPrice: Number(product.originalPrice),
        reviews: Number(product.reviews),
        rating: Number(product.rating),
      };
    }),
});
