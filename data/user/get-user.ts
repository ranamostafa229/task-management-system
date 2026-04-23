import { env } from "@/lib/env";
import { currentUserSchema, User } from "@/lib/zodSchemas";

export async function getUser(accessToken: string): Promise<User | null> {
  if (!accessToken) return null;
  try {
    const response = await fetch(`${env.BASE_URL}/auth/v1/user`, {
      method: "GET",
      headers: {
        apikey: env.API_KEY,
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });
    if (!response.ok) return null;

    const userData = await response.json();
    const validation = currentUserSchema.safeParse(userData);

    if (!validation.success) return null;
    return validation.data;
  } catch (error) {
    console.log("current user error", error);
    return null;
  }
}
