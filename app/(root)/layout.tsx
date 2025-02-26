import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AuthProvider from "@context/AuthProvider";

// Importing the Inter font
const inter = Inter({ subsets: ["latin"] });

// Exporting the metadata
export const metadata: Metadata = {
  title: "Cine Flex",
  description: "NextJS 15 Netflix Clone Project",
};

// Exporting the RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Head */}
      <body className={`${inter.className} bg-black-1`}>
        {/* AuthProvider */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
