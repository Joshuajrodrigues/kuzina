import Link from "next/link";
import { Header } from "./_components/Header";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kuzina",
  description: "Your kitchen management",
};

export const dynamic = 'force-dynamic'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <Header/>
        {children}
      </body>
    </html>
  );
}
