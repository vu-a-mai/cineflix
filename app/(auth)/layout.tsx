/**
 * Authentication Layout Component
 * 
 * This layout wraps all authentication-related pages (login and register) and provides
 * necessary context providers and error handling for the authentication flow.
 * 
 * Features:
 * - Configures metadata for SEO optimization
 * - Provides error boundary for graceful error handling
 * - Integrates authentication context for user session management
 * - Includes toast notifications for user feedback
 * - Uses Inter font for consistent typography
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ToasterContext from "@context/ToasterContext";
import AuthProvider from "@context/AuthProvider";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/ErrorFallback";

// Importing and configuring the Inter font for optimal performance
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});


/**
 * Metadata configuration for authentication pages
 * Optimizes SEO and social sharing for the authentication section
 */
export const metadata: Metadata = {
  title: "Auth Cine Flex - Sign In or Register",
  description: "Access your Cine Flex account. Watch unlimited movies and TV shows on your favorite devices.",
  keywords: "netflix clone, movie streaming, tv shows, authentication",
  openGraph: {
    title: "Auth Cine Flex - Sign In or Register",
    description: "Access your Cine Flex account. Watch unlimited movies and TV shows on your favorite devices.",
    type: "website",
    locale: "en_US",
  },
};

/**
 * Props interface for the RootLayout component
 */
interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root Layout Component for Authentication Pages
 * Provides the base structure and context providers for authentication flows
 * 
 * @param {RootLayoutProps} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout
 * @returns {JSX.Element} The rendered layout component
 */
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AuthProvider>
            <ToasterContext />
            {children}
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
