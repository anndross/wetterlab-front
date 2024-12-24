import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { clsx } from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/system";
import { CookiesProvider } from "next-client-cookies/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wetterlab",
  description: "Wetterlab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(inter.className, "pt-20 flex flex-col justify-between")}
      >
        <CookiesProvider>
          <NextUIProvider>
            <Header />
            {children}
            <Footer />
          </NextUIProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
