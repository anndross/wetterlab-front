import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/Header";
import { clsx } from "clsx";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";

// const inter = Inter({ subsets: ["latin"] });

const main = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-main",
});

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
    <html lang="en" className={`${main.variable}`}>
      <body className={clsx("font-main pt-20 flex flex-col justify-between")}>
        <CookiesProvider>
          <Header />
          {children}
          <Footer />
        </CookiesProvider>
      </body>
    </html>
  );
}
