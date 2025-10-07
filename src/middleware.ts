import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Public paths (accessible without login)
  const publicPaths = ["/", "/login", "/signup", "/verifyemail"];

  const token = request.cookies.get("token")?.value || "";

  // 1️⃣ If logged in and trying to visit login/signup → redirect to home
  if (token && ["/login", "/signup"].includes(path)) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // 2️⃣ If not logged in and trying to visit a protected route → redirect to login
  if (!token && !publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // 3️⃣ Otherwise, allow the request
  return NextResponse.next();
}

// ✅ Apply middleware only to main pages (not API or static files)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
