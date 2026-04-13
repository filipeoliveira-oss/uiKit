import { type NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    if (req.url.includes("/development")) {
        if (process.env.NODE_ENV === "development") {
            return NextResponse.next();
        }
        return NextResponse.redirect(
            new URL("/docs/introduction", req.nextUrl),
        );
    }

    const pathname = req.nextUrl.pathname;
    const lowerPath = pathname.toLowerCase();

    if (pathname !== lowerPath) {
        return NextResponse.redirect(new URL(lowerPath, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
        // "/development/:path*",
    ],
};
