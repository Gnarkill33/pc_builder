import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const {
 handlers: { GET, POST },
 auth,
 signIn,
 signOut,
} = NextAuth({
 secret: process.env.NEXTAUTH_SECRET,
 providers: [
  CredentialsProvider({
   name: "Credentials",
   credentials: {
    email: { label: "email" },
    password: { label: "password" },
   },
   async authorize(credentials) {
    if (!credentials?.email || typeof credentials.email !== "string") {
     return null;
    }

    if (!credentials?.password || typeof credentials.password !== "string") {
     return null;
    }

    const existingUser = await prisma.user.findUnique({
     where: { email: credentials.email },
    });

    if (!existingUser?.password) {
     return null;
    }

    const isValidPassword = await bcrypt.compare(
     credentials.password,
     existingUser?.password,
    );

    if (!isValidPassword) {
     return null;
    }

    return {
     id: existingUser.id,
     name: existingUser.name,
     email: existingUser.email,
    };
   },
  }),
 ],
 session: {
  strategy: "jwt",
 },
 pages: {
  signIn: "/login",
 },
 callbacks: {
  async jwt({ token, user }) {
   if (user) {
    token.id = user.id;
    token.name = user.name;
    token.email = user.email;
   }
   return token;
  },
  async session({ session, token }) {
   if (session.user) {
    session.user.id = token.id;
    session.user.email = token.email as string;
    session.user.name = token.name;
   }
   return session;
  },
 },
});
