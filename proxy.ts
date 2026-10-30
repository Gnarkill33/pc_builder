import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = new Set(["/signup", "/login", "/"]);

function isPublicPath(pathname: string) {
 return PUBLIC_PATHS.has(pathname);
}

export function proxy(request: NextRequest) {
 const { pathname } = request.nextUrl;

 if (isPublicPath(pathname)) {
  return NextResponse.next();
 }

 const sessionCookie =
  request.cookies.get("authjs.session-token") ??
  request.cookies.get("__Secure-authjs.session-token");

 if (!sessionCookie?.value) {
  return NextResponse.redirect(new URL("/login", request.url));
 }

 return NextResponse.next();
}

export const config = {
 matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
