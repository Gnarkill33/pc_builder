"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SignupState = { error?: string };

export async function Signup(
 prevState: SignupState | null,
 formData: FormData,
) {
 const rawFormData = {
  email: formData.get("email") as string | undefined,
  password: formData.get("password") as string | undefined,
  name: formData.get("name") as string | undefined,
 };

 if (!rawFormData.email) {
  return { error: "Enter your email" };
 }

 if (!EMAIL_REGEX.test(rawFormData.email)) {
  return { error: "Incorrect email format" };
 }

 if (
  !rawFormData.password ||
  rawFormData.password.length < MIN_PASSWORD_LENGTH
 ) {
  return { error: "Min 8 characters" };
 }

 const existingUser = await prisma.user.findUnique({
  where: { email: rawFormData.email },
 });

 if (existingUser) {
  return { error: "Email already taken" };
 }

 const hashedPassword = await bcrypt.hash(rawFormData.password, 10);

 await prisma.user.create({
  data: {
   name: rawFormData.name,
   email: rawFormData.email,
   password: hashedPassword,
  },
 });

 redirect("/login");
}
