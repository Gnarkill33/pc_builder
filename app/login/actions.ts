"use server";

import { redirect } from "next/navigation";
import { signIn } from "../api/auth/[...nextauth]/route";
import { AuthError } from "next-auth";

export type LoginState = { error?: string };

export async function Login(prevState: LoginState | null, formData: FormData) {
 const rawFormData = {
  email: formData.get("email") as string | undefined,
  password: formData.get("password") as string | undefined,
 };

 if (!rawFormData.email || !rawFormData.password) {
  return { error: "Enter email or password" };
 }

 try {
  await signIn("credentials", { ...rawFormData, redirectTo: "/dashboard" });
  redirect("/dashboard");
 } catch (error) {
  if (error instanceof AuthError) {
   if (error.type === "CredentialsSignin") {
    return { error: "Неверный email или пароль" };
   }
   return { error: "Ошибка авторизации" };
  }
  throw error;
 }
}
