import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "@/server/api/routers/user";
import { productRouter } from "@/server/api/routers/product";
import { purchaseRouter } from "@/server/api/routers/purchase";
import { reviewRouter } from "@/server/api/routers/review";
import { paymentRouter } from "./routers/payment";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  product: productRouter,
  purchase: purchaseRouter,
  review: reviewRouter,
  payment: paymentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
