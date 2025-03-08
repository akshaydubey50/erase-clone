import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function middleware(request: NextRequest) {
  const session = getKindeServerSession();

  if (!(await session.isAuthenticated())) {
    const response = NextResponse.redirect(
      new URL("/api/auth/login?post_login_redirect_url=/dashboard", request.url)
    );
    
    return response; 
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|about|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|$).*)",
  ],
};
