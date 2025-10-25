// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// only protect paths listed here; middleware runs before pages/route handlers
export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"], // change to your protected routes
};
