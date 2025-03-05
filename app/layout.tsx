import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/providers/queryProvider";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <QueryProvider>
          <div className="bg-white">
            {/* <Navbar /> */}
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
