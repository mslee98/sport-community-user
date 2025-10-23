import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "스포츠 커뮤니티 - 배팅 사이트 순위 & 랭킹",
  description: "국내외 배팅 사이트들의 순위와 랭킹을 확인하고, 스포츠 커뮤니티에서 다양한 정보를 공유하세요.",
  keywords: ["스포츠", "배팅", "순위", "랭킹", "커뮤니티", "토토"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
