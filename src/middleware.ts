import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

const authPath = ["/login"];
const gamePath = ["/match"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  const match = cookieStore.get("match")?.value;

  if (authPath.some((path) => path === pathname) && sessionToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (gamePath.some((path) => path === pathname) && match === undefined) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/login", "/match"],
};
