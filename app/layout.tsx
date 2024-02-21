import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";
import { NextAuthProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Albatro-test",
  description:
    "Test task for Albatro, using Next.js, TailwindCSS, next-auth and OpenApi JWT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          <main className="flex flex-col min-h-screen items-center justify-center">
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
