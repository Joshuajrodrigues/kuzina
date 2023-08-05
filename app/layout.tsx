import Link from "next/link";
import { Header } from "./_components/Header";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kuzina",
  description: "Your kitchen management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="mx-5 mb-5 p-5 flex justify-between">
          <Link href={"/"}>
            <h1 className="text-3xl text-black">KUZINA</h1>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
