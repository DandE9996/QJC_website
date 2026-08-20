import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import SiteChrome from "./site-chrome";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

const sansFont = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Juncheng Qian",
    template: "%s | Juncheng Qian",
  },
  description: "Personal website of Juncheng Qian.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${sansFont.variable}`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
