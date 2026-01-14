import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastNotificationCont from "@/utils/ToastNotificationCont";
import UserProvider from "@/contexts/UserProvider";
import TanstackProvider from "@/contexts/TanstackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookWorm | Home",
  description: "A Personalized Book Recommendation & Reading Tracker Application",
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
        <TanstackProvider>
          <UserProvider>
            {children}
            <ToastNotificationCont />
          </UserProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
