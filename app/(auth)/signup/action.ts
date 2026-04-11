"use server";

import { env } from "@/lib/env";
import { ApiResponse } from "@/lib/types";
import { signupSchema, SignUpSchemaType } from "@/lib/zodSchemas";

export async function SignUpAction(
  data: SignUpSchemaType,
): Promise<ApiResponse> {
  try {
    const validation = signupSchema.safeParse(data);
    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid data provided.",
      };
    }
    const response = await fetch(`${env.BASE_URL}/auth/v1/signup`, {
      method: "POST",
      body: JSON.stringify(validation.data),
      headers: {
        apikey: env.API_KEY,
      },
    });
    if (!response.ok) {
      try {
        const errorData = await response.json();
        return {
          status: "error",
          message: errorData.msg || "Failed to signup. Please try again.",
        };
      } catch {
        return {
          status: "error",
          message: "Failed to signup. Please try again.",
        };
      }
    }
    return {
      status: "success",
      message: "Signup successful",
    };
  } catch {
    return {
      status: "error",
      message: "An error occurred during signup. Please try again.",
    };
  }
}
