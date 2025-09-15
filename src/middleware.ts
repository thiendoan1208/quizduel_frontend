import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

const authPath = ["/login"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  if (authPath.some((path) => path === pathname) && sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/login"],
};
