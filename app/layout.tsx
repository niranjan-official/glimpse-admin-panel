import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Tab from "@/components/Tab";
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react";
import Loading from "@/app/loading";

const poppins = Poppins({ subsets: ["latin"], weight: '400' });

export const metadata: Metadata = {
  title: "Glimpse Admin Panel",
  description: "Admin Panel of Glimpse-PRC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header/>
        <Suspense fallback={<Loading/>}>
          {children}
        </Suspense>
        <Tab/>
        <Toaster />
      </body>
    </html>
  );
}
