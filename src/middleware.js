import { NextResponse } from "next/server";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
export const config = {
  matcher: ["/", "/login", "/signup", "/verifymail"],
};
