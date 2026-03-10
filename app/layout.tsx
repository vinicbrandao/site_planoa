import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plano  A | Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className="antialiased">
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
