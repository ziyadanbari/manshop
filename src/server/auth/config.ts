import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { db } from "@/server/db";
import type { NextAuthConfig } from "next-auth";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Authenticator",
      credentials: {
        email: {
          label: "Email or Username",
          type: "text",
          placeholder: "Enter your email or username...",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password...",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // Find user by email or username
        const user = await db.user.findFirst({
          where: {
            OR: [{ email }, { username: email }],
          },
        });
        if (!user || !user.password) return null;
        const isValid = await bcrypt.compare(
          String(password),
          String(user.password),
        );
        if (!isValid) return null;
        // Return user object for session
        return {
          id: user.id,
          username: user.name || user.username,
          email: user.email,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session?.user,
          id: token.id as string,
          email: token.email,
          username: token.username as string,
        },
      };
    },
    jwt({ token, user }) {
      if (!user) return token;
      token = {
        ...token,
        username: user.username,
        email: user?.email,
        id: user?.id,
      };
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
