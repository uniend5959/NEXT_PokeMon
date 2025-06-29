import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PokeMon",
  description: "포켓몬 도감 ",
  keywords : [
    
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Header/>
        <div className=" bg-gradient-to-b from-yellow-200 yellow-200 to-yellow-400">
          <div className="main-container h-screen pt-30">
               {children}
          </div>
        </div>
      </body>
    </html>
  );
}
