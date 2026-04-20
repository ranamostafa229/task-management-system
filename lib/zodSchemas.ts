import { z } from "zod";
import { PASSWORD_REQUIREMENTS } from "./password-requirements";

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { error: "Name must be at least 3 characters" })
      .max(50, { error: "Name must be less than 50 characters" })
      .regex(/^(?!.*  )[\p{L}\s]+$/u, {
        error: "Name can only contain letters and single spaces",
      }),
    email: z.email({ error: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters" })
      .max(64, { error: "Password must be less than 64 characters" })
      .regex(/^\S*$/, { error: "Password cannot contain white-space" })
      .regex(PASSWORD_REQUIREMENTS[0].pattern, {
        error: "Password must contain at least one uppercase letter",
      })
      .regex(PASSWORD_REQUIREMENTS[1].pattern, {
        error: "Password must contain at least one lowercase letter",
      })
      .regex(PASSWORD_REQUIREMENTS[2].pattern, {
        error: "Password must contain at least one digit",
      })
      .regex(PASSWORD_REQUIREMENTS[5].pattern, {
        error: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(8, { error: "Confirm Password must be at least 8 characters" })
      .max(64, { error: "Confirm Password must be less than 64 characters" }),
    jobTitle: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email({ error: "Please enter a valid email address" }),
  password: z.string().min(8, { error: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.email({ error: "Please enter a valid email address" }),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { error: "Password must be at least 8 characters" })
      .max(64, { error: "Password must be less than 64 characters" })
      .regex(/^\S*$/, { error: "Password cannot contain white-space" })
      .regex(PASSWORD_REQUIREMENTS[0].pattern, {
        error: "Password must contain at least one uppercase letter",
      })
      .regex(PASSWORD_REQUIREMENTS[1].pattern, {
        error: "Password must contain at least one lowercase letter",
      })
      .regex(PASSWORD_REQUIREMENTS[2].pattern, {
        error: "Password must contain at least one digit",
      })
      .regex(PASSWORD_REQUIREMENTS[5].pattern, {
        error: "Password must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(8, { error: "Confirm Password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpSchemaType = z.infer<typeof signupSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
