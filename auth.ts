import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";
import prisma from "./lib/prisma";

export type Role = "admin" | "user";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  image: string;
} & DefaultSession["user"];

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
}

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  theme: {
    colorScheme: "light",
    logo: "/logo-dark.svg",
  },
  providers: [
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // basePath: "/auth",
  // baseUrl: process.env.BASE_URL
  trustHost: true,
  callbacks: {
    async session({ user, session }) {
      const userOut = await prisma.user.findFirst({
        where: { email: user.email },
      });
      session.user.role = "user";
      if (userOut?.role == "admin") session.user.role = "admin";
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
