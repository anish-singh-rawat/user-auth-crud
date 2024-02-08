import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = cookies();
  const islogin: any = token.get("authToken");
  if (!islogin) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/component")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/UserDashBoard")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  
  else if (islogin) {
    const { value } = await islogin;
    const data: any = jwtDecode(value);
    const { role }: any = data.existUser;

    if(role.toLowerCase() == "user"){
      if (url.pathname === "/") {
        return NextResponse.redirect(new URL("/UserDashBoard", request.url));
      }
      else if (url.pathname === "/SignUp") {
        return NextResponse.redirect(new URL("/UserDashBoard", request.url));
      }
      else if (url.pathname === "/dashboard") {
        return NextResponse.redirect(new URL("/UserDashBoard", request.url));
      }
      else if (url.pathname === "/dashboard/AddUser") {
        return NextResponse.redirect(new URL("/UserDashBoard", request.url));
      }
      else if (url.pathname === "/dashboard/AllUsers") {
        return NextResponse.redirect(new URL("/UserDashBoard", request.url));
      }
      else if (url.pathname === "/dashboard/userProfile") {
        return NextResponse.redirect(new URL("/UserDashBoard", request.url));
      }
    }

    if(role.toLowerCase() == "admin"){
      if (url.pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      else if (url.pathname === "/SignUp") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      else if (url.pathname === "/UserDashBoard") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }
}
