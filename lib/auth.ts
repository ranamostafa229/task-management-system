import { NextResponse } from "next/server";
import { env } from "./env";

export async function refreshAccessToken(refreshToken: string) {
  const response = await fetch(
    `${env.BASE_URL}/auth/v1/token?grant_type=refresh_token`,
    {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
      headers: {
        apikey: env.API_KEY,
      },
    },
  );
  if (response.ok) {
    const result = await response.json();
    const res = NextResponse.next();
    res.cookies.set("access_token", result.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: result.expires_in,
    });

    if (result.refresh_token) {
      res.cookies.set("refresh_token", result.refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: 60 * 60 * 24 * 30, // 30 days
      });
    }
    return res;
  }
  return null;
}
