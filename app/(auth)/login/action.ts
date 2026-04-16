"use server";

import { env } from "@/lib/env";
import { LoginResponse } from "@/lib/types";
import { loginSchema, LoginSchemaType } from "@/lib/zodSchemas";
import { cookies } from "next/headers";

export async function LoginAction(
  data: LoginSchemaType,
): Promise<LoginResponse> {
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
        body: JSON.stringify({
          email: validation.data.email,
          password: validation.data.password,
        }),
        headers: {
          apikey: env.API_KEY,
        },
      },
    );
    const result = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message:
          result.msg ||
          "Failed to login. Please check your credentials and try again.",
      };
    }
    const cookieStore = await cookies(); // in server actions , cookies is async, on the other hand in middleware and route handlers , cookies is sync

    if (validation.data.rememberMe) {
      cookieStore.set("access_token", result.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: result.expires_in,
        path: "/", // Ensure the cookie is sent on all routes
      });
    } else {
      cookieStore.set("access_token", result.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/", // Ensure the cookie is sent on all routes
      });
    }

    cookieStore.set("refresh_token", result.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/", // Ensure the cookie is sent on all routes
    });
    return {
      status: "success",
      message: "Login successful",
      access_token: result.access_token,
      refresh_token: result.refresh_token,
      user: result.user,
    };
  } catch {
    return {
      status: "error",
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
