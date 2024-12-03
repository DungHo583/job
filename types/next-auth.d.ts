import NextAuth, { DefaultUser } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface UserAccount extends DefaultUser {

  }
  interface Session {
    email: string;
    role: string;
    name: string;
    userId: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultUser {
    email: string;
    role: string;
    name: string;
    userId: string;
  }
}