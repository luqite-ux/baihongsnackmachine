import { NextResponse as ServiceGuardNextResponse, type NextRequest as ServiceGuardRequest } from 'next/server'
import { isServiceGuardExcludedPath, isWebsiteServiceAvailable } from './lib/service-status'
import { NextResponse, type NextRequest } from "next/server"
import { SESSION_COOKIE } from "@/lib/admin-session"

function existingServiceExpiryIntegration(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = pathname.startsWith("/admin/login") || pathname.startsWith("/admin/logout")
  if (!isPublic && pathname.startsWith("/admin") && !request.cookies.get(SESSION_COOKIE)?.value) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    url.searchParams.set("reason", "unauthorized")
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = { matcher: ["/((?!_next|images|favicon.ico|icon|apple-icon|robots.txt|sitemap.xml).*)"] }

export async function middleware(request: ServiceGuardRequest) {
  if (request.nextUrl.pathname === '/service-expired') return ServiceGuardNextResponse.next()
  if (!isServiceGuardExcludedPath(request.nextUrl.pathname) && !await isWebsiteServiceAvailable()) return ServiceGuardNextResponse.rewrite(new URL('/service-expired', request.url))
  const pathname = request.nextUrl.pathname
  if (pathname === "/zh" || pathname.startsWith("/zh/")) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-site-locale", "zh")
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(3) || "/"
    const response = ServiceGuardNextResponse.rewrite(url, { request: { headers: requestHeaders } })
    response.cookies.set("site_locale", "zh", { path: "/", sameSite: "lax", maxAge: 31536000 })
    return response
  }
  return existingServiceExpiryIntegration(request)
}
