import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const noAuthPaths = ["/","/auth"]
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is signed in and the current path is / redirect the user to /pantry
  if (user && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/pantry", req.url));
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && !noAuthPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return res;
}
export const config = {
  matcher: ["/","/pantry",'/auth', "/account"],
};
