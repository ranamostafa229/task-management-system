"use server";
import { env } from "@/lib/env";
import { ApiResponse } from "@/lib/types";
import { resetPasswordSchema, ResetPasswordSchemaType } from "@/lib/zodSchemas";

export async function resetPasswordAction(
  data: ResetPasswordSchemaType,
  token: string,
): Promise<ApiResponse> {
  try {
    const validation = resetPasswordSchema.safeParse(data);
    if (!validation.success) {
      return {
        message: "Invalid data provided.",
        status: "error",
      };
    }

    const response = await fetch(`${env.BASE_URL}/auth/v1/user`, {
      method: "PUT",
      body: JSON.stringify({
        password: validation.data.newPassword,
      }),
      headers: {
        apikey: env.API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      return {
        message:
          "Your password has been updated successfully. You can now log in.",
        status: "success",
      };
    } else {
      if (result.error_code === "same_password") {
        return {
          message:
            result?.msg ||
            "New password should be different from the old password.",
          status: "error",
        };
      }
      return {
        message:
          result?.msg || "Failed to reset password. Please try again later.",
        status: "error",
      };
    }
  } catch (error) {
    console.error("Reset Password Error:", error);
    return {
      message: "Failed to reset password. Please try again later.",
      status: "error",
    };
  }
}
