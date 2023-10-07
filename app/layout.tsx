import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ui/theme_provider";
import { Header } from "./_components/Header";
import "./globals.css";
import { Comfortaa, Pacifico } from "next/font/google";

const inter = Comfortaa({ subsets: ["latin"] });
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});
export const metadata = {
  title: "Kuzina",
  description: "Your kitchen management",
};

export const dynamic = "force-dynamic";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Header font={pacifico} />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
      <footer className="flex items-center justify-center">
        <p>&copy; 2023 Kuzina. All rights reserved.</p>
      </footer>
    </html>
  );
}
