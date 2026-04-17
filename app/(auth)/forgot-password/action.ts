"use server";

import { env } from "@/lib/env";
import { ApiResponse } from "@/lib/types";
import {
  forgotPasswordSchema,
  ForgotPasswordSchemaType,
} from "@/lib/zodSchemas";

export async function forgotPasswordAction(
  data: ForgotPasswordSchemaType,
): Promise<ApiResponse> {
  try {
    const validation = forgotPasswordSchema.safeParse(data);
    if (!validation.success) {
      return {
        message: "Invalid data provided.",
        status: "error",
      };
    }
    const response = await fetch(`${env.BASE_URL}/auth/v1/recover`, {
      method: "POST",
      body: JSON.stringify(validation.data),
      headers: {
        apikey: env.API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return {
        message: "Failed to send reset link. Please try again.",
        status: "error",
      };
    }
    return {
      message: "Reset link sent successfully.",
      status: "success",
    };
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return {
      message:
        "An error occurred while processing your request. Please try again later.",
      status: "error",
    };
  }
}
