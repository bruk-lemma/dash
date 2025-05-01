import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/providers/queryProvider";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

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
        <div className="h-screen ">
          <Toaster richColors position="top-center" />
          <AuthProvider>
            <QueryProvider>
              <div className="bg-white max-w-[99%] m-auto">
                {/* <Navbar /> */}
                {children}
              </div>
            </QueryProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
