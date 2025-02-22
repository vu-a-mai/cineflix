import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ToasterContext from "@context/ToasterContext";

// Importing the Inter font
const inter = Inter({ subsets: ["latin"] });

// Exporting the metadata
export const metadata: Metadata = {
  title: "Auth Cine Flex",
  description: "NextJS 15 Auth Netflix Clone Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Head */}
      <body className={inter.className}>
        {/* ToasterContext */}
        <ToasterContext />
        {children}
      </body>
    </html>
  );
}
