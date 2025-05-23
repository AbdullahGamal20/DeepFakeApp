import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Get cookies from request
  const userID = req.cookies.get("userID")?.value;

  // If userID is missing, redirect to login page
  if (!userID) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow request if userID exists
  return NextResponse.next();
}

// Apply middleware only to the /upload page
export const config = {
  matcher: ["/upload", "/posts", "/knowledge-center", "/FAQ"],
};
