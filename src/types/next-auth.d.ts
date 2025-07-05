import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      email: string;
      id: string;
      username: string;
    } & DefaultSession["user"];
  }
  interface User {
    username?: string;
  }
  interface JWT {
    id: string;
    username: string;
    email: string;
  }
}
