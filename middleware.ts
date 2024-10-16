import { authMiddleware, clerkMiddleware } from '@clerk/nextjs/server'


// middleware.ts in the root of your project

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(req: NextRequest) {
//     // Example: redirecting from /old-path to /new-path
//     if (req.nextUrl.pathname === '/old-path') {
//         return NextResponse.redirect(new URL('/new-path', req.url));
//     }
//     return NextResponse.next();
// }

export default authMiddleware({
  publicRoutes: ["/api/uploadthing"]
});  

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
