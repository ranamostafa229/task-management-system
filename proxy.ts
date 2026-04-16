import { NextRequest, NextResponse } from "next/server";
import { refreshAccessToken } from "./lib/auth";

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  const authPages = ["/login", "/signup"];
  if (accessToken && authPages.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  // If access token is missing but refresh token exists => refresh
  if (!accessToken && req.nextUrl.pathname.startsWith("/dashboard")) {
    if (refreshToken) {
      const res = await refreshAccessToken(refreshToken);
      if (res) return res;
    }
    // if refresh fails, clear cookies and redirect to login
    const failRes = NextResponse.redirect(new URL("/login", req.url));
    failRes.cookies.delete("access_token");
    failRes.cookies.delete("refresh_token");
    return failRes;
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*"],
};
