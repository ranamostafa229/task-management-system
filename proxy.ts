import { NextRequest, NextResponse } from "next/server";
import { refreshAccessToken } from "./lib/auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  const publicPages = [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];
  const isPublicPage = publicPages.includes(pathname);

  if (accessToken && publicPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/project", req.url));
  }

  // Protect all non-public app routes (e.g. routes under (dashboard) group).
  if (!accessToken && !isPublicPage) {
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
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
