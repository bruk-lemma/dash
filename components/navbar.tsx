"use client";

import { ChartLine, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white text-black p-4 shadow-sm fixed top-0 right-0 w-full z-[9999]">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Home
          size={32}
          className="text-black cursor-pointer hover:text-[#6c63ff]"
          onClick={() => {
            window.location.href = "/";
          }}
        />

        {/* Left Logo or Title */}
        <div className="text-lg font-bold tracking-wide text-black">
          <Link
            href="/dashboard"
            className={`hover:text-[#6c63ff] transition-colors duration-200 ${
              pathname === "/dashboard" ? "underline text-[#6c63ff]" : ""
            }`}
          >
            Home
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link
            href="/new"
            className={`hover:text-[#6c63ff] transition-colors duration-200 text-lg font-semibold ${
              pathname === "/new" ? "underline text-[#6c63ff]" : ""
            }`}
          >
            Stations
          </Link>
        </div>

        {/* Optional Right Section for User Profile or Notifications */}
        <div className="flex items-center space-x-4"></div>
      </div>
    </nav>
  );
}
