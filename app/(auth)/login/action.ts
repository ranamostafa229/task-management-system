"use server";

import { env } from "@/lib/env";
import { ApiResponse } from "@/lib/types";
import { loginSchema, LoginSchemaType } from "@/lib/zodSchemas";

export async function LoginAction(data: LoginSchemaType): Promise<ApiResponse> {
  try {
    const validation = loginSchema.safeParse(data);
    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid data provided.",
      };
    }
    const response = await fetch(
      `${env.BASE_URL}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        body: JSON.stringify(validation.data),
        headers: {
          apikey: env.API_KEY,
        },
      },
    );
    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: "error",
        message:
          errorData.msg ||
          "Failed to login. Please check your credentials and try again.",
      };
    }
    return {
      status: "success",
      message: "Login successful",
    };
  } catch {
    return {
      status: "error",
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
