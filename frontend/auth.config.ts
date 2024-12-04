import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt";
import prisma from "@/lib/db"; // Adjust the import based on your project structure
import { LoginSchema } from "@/lib/types"; // Adjust the import based on your project structure

export const authConfig = {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        //{ email: string, password: string, csrfToken: string, callbackUrl: string, json: boolean })
        console.log("Authorizing credentials:", credentials);
        const validatedCred = LoginSchema.safeParse(credentials);
        if (!validatedCred.success) {
          console.log("Validation failed:", validatedCred.error);
          return null;
        }
        const { email, password } = validatedCred.data;
        const user = await prisma.user.findFirst({
          where: { email },
        });
        if (!user || !user.verified) {
          console.log("User not found or not verified");
          return null;
        }
        const passwordMatch = await bcrypt.compare(
          password,
          user.password ?? ""
        );
        if (passwordMatch && user.verified) {
          console.log("Password match, user authorized");
          return {
            id: user.id,
            email: user.email,
            image: user.profileImage,
            name: user.name,
          };
        } else {
          console.log("Password mismatch");
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session({ session, token }: any) {
      // console.log("Session callback:", session, token);
      session.user.id = token.id;
      // console.log("Session callback:", session);
      return session;
    },
    async jwt({ token, user, account }: any) {
      // console.log("JWT callback:", token, user, account);
      if (user) {
        token.id = user.id;
      } else {
        const dbUser = await prisma.user.findFirst({
          where: { id: token.sub },
        });
        if (dbUser) {
          token.id = dbUser.id;
        }
      }
      return token;
    },
    async redirect({ url, baseUrl }: any) {
      // console.log("Redirect callback:", url, baseUrl);
      if (url === "/dashboard") {
        console.log(
          "Redirecting to dashboard -----------------------------------------------------"
        );
        return baseUrl + "/dashboard";
      }
      return baseUrl + "/signin";
    },
    // 1st callback when user signs in
    async signIn({ user, account, profile, email, credentials }: any) {
      if (account.provider === "credentials") {
        console.log("Credentials provider");
        const dbUser = await prisma.user.findFirst({
          where: { id: user.id },
        });
        if (dbUser) {
          console.log("User found:", dbUser);
          return true;
        } else {
          console.log("User not found");
          return false;
        }
      } else if (account.provider === "google") {
        const dbUser = await prisma.user.findFirst({
          where: { email: profile.email },
        });
        if (!dbUser) {
          const newUser = await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name,
              profileImage: profile.picture,
            },
          });
          return true;
        } else {
          return true;
        }
      }
      return false;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as "jwt",
  },
};

export default NextAuth(authConfig);
