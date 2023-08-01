import { Header } from "./_components/Header";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kuzine",
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
        {/* <div className=" fixed -z-10 overflow-hidden h-full w-full">
          <Image
            alt="Background"
            src={food}
            placeholder="blur"
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />
        </div> */}

        <Header />
        {children}
      </body>
    </html>
  );
}
