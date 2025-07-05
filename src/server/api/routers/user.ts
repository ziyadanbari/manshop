import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import bcrypt from "bcryptjs";
import { db } from "@/server/db";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        username: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ input }) => {
      const { username, email, password } = input;

      const existing = await db.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });
      if (existing) {
        throw new Error("User with this email or username already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await db.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });
      return { id: user.id, username: user.username, email: user.email };
    }),
});
