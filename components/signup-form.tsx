"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
 Field,
 FieldDescription,
 FieldGroup,
 FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Signup, SignupState } from "@/app/signup/actions";
import { useActionState } from "react";
import { ErrorMessage } from "./ui/error-message";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
 const [state, formAction] = useActionState<SignupState | null, FormData>(
  Signup,
  null,
 );

 return (
  <Card {...props}>
   <CardHeader>
    <CardTitle>Create an account</CardTitle>
   </CardHeader>
   <CardContent>
    <form action={formAction}>
     <FieldGroup>
      <Field>
       <FieldLabel htmlFor='name'>Full Name</FieldLabel>
       <Input
        id='name'
        name='name'
        type='text'
        placeholder='John Doe'
        required
       />
      </Field>
      <Field>
       <FieldLabel htmlFor='email'>Email</FieldLabel>
       <Input
        name='email'
        id='email'
        type='email'
        placeholder='example@example.com'
        required
       />
      </Field>
      <Field>
       <FieldLabel htmlFor='password'>Password</FieldLabel>
       <Input id='password' name='password' type='password' required />
       <FieldDescription>Must be at least 8 characters long</FieldDescription>
      </Field>
      {state?.error && <ErrorMessage message={state.error} />}
      <FieldGroup>
       <Field>
        <Button type='submit'>Create Account</Button>
        <FieldDescription className='px-6 text-center'>
         Already have an account? <a href='/login'>Sign in</a>
        </FieldDescription>
       </Field>
      </FieldGroup>
     </FieldGroup>
    </form>
   </CardContent>
  </Card>
 );
}
