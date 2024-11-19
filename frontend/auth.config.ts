import type { NextAuthOptions, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { LoginSchema } from "./lib/types";
import prisma from "./lib/db";
import bcrypt from "bcrypt";
import { getUserById } from "./lib/functions/getuserById";
export interface session extends Session {
  user: {
    id: string;
    email: string;
    profileImage?: string;
    name: string;
  };
}

export const authConfig = {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials: any, req) {
        const validatedCred = LoginSchema.safeParse(credentials);
        if (!validatedCred.success) {
          return null;
        }
        const { email, password } = validatedCred.data;
        // Check if user already exists
        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });
        if (!user || !user.verified) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          return {
            id: user.id,
            email: user.email,
            image: user.profileImage,
            name: user.name,
          };
        }
        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = user;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthOptions;
