import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import KanbanHeader from "@/features/kanban/layout/KanbanHeader";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-blue-100`}
      >
        <Providers>
          <KanbanHeader />
          <main className="pt-30 p-6 h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
