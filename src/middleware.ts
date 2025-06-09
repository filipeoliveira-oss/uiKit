import { type NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    
    if (process.env.NODE_ENV === "development") {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/docs/introduction", req.nextUrl));
}

export const config = {
    matcher: [
        // "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
        "/development/:path*",
    ],
};
