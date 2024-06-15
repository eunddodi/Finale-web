import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import QueryClientProvider from "./components/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Finale',
  description: '서울 및 경기권 12개의 링크장에서 다양한 수업을 진행하고 있는 성인 취미 피겨팀 피날레입니다',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </head>
      <body className={inter.className}>
        <QueryClientProvider>
          <Header />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
