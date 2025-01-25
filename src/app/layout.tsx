import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trend Sentiment Analysis",
  description: "Analyze sentiment trends across various data sources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased bg-white text-gray-900`}>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
