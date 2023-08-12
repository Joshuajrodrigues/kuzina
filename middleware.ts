import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { BASE_URL } from "./lib/constants";
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const noAuthPaths = ["/","/auth"]
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  // magic link bullshit
  if (code) {
    return NextResponse.redirect(`${BASE_URL}api/auth/callback?code=${code}`)
  }


  // if user is signed in and the current path is / redirect the user to /lobby
  if (user && noAuthPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/kitchen/lobby", req.url));
  }

  // if user is not signed in and the current path is not / or /auth redirect the user to /auth
  if (!user && !noAuthPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return res;
}
export const config = {
  matcher: ["/",'/auth',"/kitchen/:path*", "/account"],
};
