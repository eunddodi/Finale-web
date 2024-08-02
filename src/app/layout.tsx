import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import Header from "./components/Header";
import QueryClientProvider from "./components/QueryClientProvider";
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const pretendard = localFont({
  src: [
    { path: './fonts/Pretendard-Regular.woff', weight: '400' },
    { path: './fonts/Pretendard-SemiBold.woff', weight: '600' },
    { path: './fonts/Pretendard-Bold.woff', weight: '700' },
    { path: './fonts/Pretendard-ExtraBold.woff', weight: '800' },
  ]
})

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
    <html lang="en" className={pretendard.className}>
      <head>
        <title>피날레 - 성인 취미 피겨팀</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <QueryClientProvider>
          <Header />
          {children}
          <ToastContainer {...toastConfig} />
        </QueryClientProvider>
      </body>
    </html>
  );
}

const toastConfig: ToastContainerProps = {
  hideProgressBar: true,
  position: 'top-center',
  autoClose: 3000,
  role: 'success',
  toastStyle: {
    width: '320px',
    maxWidth: '90%',
    boxSizing: 'border-box',
    margin: 'auto',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    top: '12px'
  },
  bodyStyle: {
    fontSize: '14px',
    padding: 0,
    margin: 0,
  },
}