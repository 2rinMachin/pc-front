import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { twJoin } from "tailwind-merge";
import Header from "@/common/components/Header";
import Footer from "@/common/components/Footer";

export const metadata: Metadata = {
  title: "Pizza Hut",
};

const sharpSans = localFont({
  src: "./SharpSansDispNo1-Semibold.woff2",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full flex flex-col">
      <body
        className={twJoin(
          sharpSans.className,
          "antialiased flex flex-col grow",
        )}
      >
        <Header />
        <div className="grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
