import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // Check if the user is authenticated
  const isLoggedIn = !!req.auth;
  const { pathname, search } = req.nextUrl;

  // Define protected routes
  const protectedRoutes = ["/ai-frames", "/deep-research"];

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If accessing a protected route without being logged in
  if (isProtectedRoute && !isLoggedIn) {
    // Create the callback URL for redirect after login
    const callbackUrl = encodeURIComponent(pathname + search);
    const signInUrl = new URL(
      `/auth/signin?callbackUrl=${callbackUrl}`,
      req.url
    );
    return NextResponse.redirect(signInUrl);
  }

  // If user is logged in and trying to access sign-in page
  if (isLoggedIn && pathname === "/auth/signin") {
    // Check if there's a callback URL to redirect to
    const callbackUrl = req.nextUrl.searchParams.get("callbackUrl");
    const redirectUrl = callbackUrl || "/";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  // Allow the request to continue
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
