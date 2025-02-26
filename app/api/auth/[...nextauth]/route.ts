import NextAuth from "next-auth"
import { options } from "./option"

/**
 * NextAuth Authentication Handler
 * 
 * Creates and configures the NextAuth authentication handler with the specified options.
 * This handler processes all authentication-related requests including:
 * - Sign in/out
 * - Session management
 * - Callback handling
 * 
 * @remarks
 * The handler is exported as both GET and POST to handle different types of auth requests.
 * The options are re-exported as authOptions for use in server-side authentication checks.
 */
const handler = NextAuth(options)

export { handler as GET, handler as POST, options as authOptions }