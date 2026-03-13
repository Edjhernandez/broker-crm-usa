import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "validation.emailRequired")
    .email("validation.invalidEmail"),
  password: z
    .string()
    .min(1, "validation.passwordRequired")
    .min(6, "validation.passwordTooShort")
    .max(8, "validation.passwordTooLong"),
});

// Este tipo te servirá para Typescript más adelante
export type LoginInput = z.infer<typeof loginSchema>;
