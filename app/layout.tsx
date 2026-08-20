import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Juncheng Qian",
    template: "%s | Juncheng Qian",
  },
  description: "Personal website of Juncheng Qian.",
};

const navigation = [
  { href: "/", label: "Home" },
  { href: "/life", label: "Life" },
  { href: "/thoughts", label: "Thoughts" },
  { href: "/work", label: "Work" },
  { href: "/cv", label: "CV" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <Link className="site-name" href="/" aria-label="Juncheng Qian home">
              JQ
            </Link>
            <nav className="site-nav" aria-label="Primary navigation">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
