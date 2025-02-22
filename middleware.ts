import { withAuth } from "next-auth/middleware";

// This is a middleware that will redirect the user to the login page if they are not authenticated
export default withAuth({
  pages: {
    signIn: "/login",
  },
});

// This is the configuration for the middleware
// It specifies the pages that the middleware should be applied to
export const config = {
  matcher: ["/", "/my-list", "/search/:path*"],
};
