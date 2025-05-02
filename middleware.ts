// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get("auth_token")?.value;
//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
//   try {
//     const { payload } = await jwtVerify(token, secret);
//     let redirectPath = "/dashboard";
//     if (payload.userType === "REGION") {
//       redirectPath = "/region";
//     } else if (payload.userType === "STATION") {
//       redirectPath = "/station";
//     } else if (payload.userType === "SCHOOL") {
//       redirectPath = "/center";
//     }
//     if (
//       request.nextUrl.pathname === "/" ||
//       request.nextUrl.pathname === "/dashboard"
//     ) {
//       return NextResponse.redirect(new URL(redirectPath, request.url));
//     }
//     return NextResponse.next();
//   } catch (error) {
//     console.error("JWT verification failed:", error);
//     return NextResponse.redirect(new URL("/not-found", request.url));
//   }
// }

// export const config = {
//   matcher: ["/((?!_next|static|favicon.ico).*)"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);

export async function middleware(request: NextRequest) {
  // const token = request.cookies.get("auth_token")?.value;
  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // try {
  //   const { payload } = await jwtVerify(token, secret);
  //   const roleRedirectMap: Record<string, string> = {
  //     REGION: "/region",
  //     STATION: "/station",
  //     SCHOOL: "/center",
  //   };
  //   const redirectPath =
  //     roleRedirectMap[payload.userType as string] || "/dashboard";
  //   const currentPath = request.nextUrl.pathname;
  //   if (
  //     (currentPath === "/" || currentPath === "/dashboard") &&
  //     currentPath !== redirectPath
  //   ) {
  //     return NextResponse.redirect(new URL(redirectPath, request.url));
  //   }
  //   return NextResponse.next();
  // } catch (error) {
  //   console.error("JWT verification failed:", error);
  //   return NextResponse.redirect(new URL("/not-found", request.url));
  // }
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|login).*)"],
};
