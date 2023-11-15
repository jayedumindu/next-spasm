import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export const middleware = async (request) => {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  console.log(path);
  console.log("token", token);

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifymail";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
};

// See "Matching Paths" below to learn more
export const config = withAuth({
  matcher: ["/", "/login", "/signup", "/verifymail"],
});
