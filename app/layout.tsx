import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanbanic | Board Craft",
  description: "Kanbanic is a simple and modern Kanban board application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="px-6 py-4 border-b border-gray-200">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </header>
        <Providers>
          <main className="p-6 bg-blue-100 h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
