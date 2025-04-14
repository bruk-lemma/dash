import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      id: string;
      userType: "REGION" | "STATION" | "SCHOOL";
    };
    let redirectPath = "/dashboard";
    if (decoded.userType === "REGION") {
      redirectPath = "/region";
    } else if (decoded.userType === "STATION") {
      redirectPath = "/station";
    } else if (decoded.userType === "SCHOOL") {
      redirectPath = "/center";
    }

    if (
      request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname === "/dashboard"
    ) {
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification error: ", error);
    return NextResponse.redirect(new URL("/not-found", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
