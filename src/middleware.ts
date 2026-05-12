import { NextResponse, type NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const allCookies = request.cookies.getAll()
  
  const token = allCookies.find(c =>
    c.name.startsWith("sb-") && c.name.endsWith("-auth-token")
  )?.value

  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard")
  const isAuth      = request.nextUrl.pathname === "/auth"

  if (isDashboard && !token) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  if (isAuth && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth"],
}