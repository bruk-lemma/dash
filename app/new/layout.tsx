import Navbar from "@/components/navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className=" bg-white flex justify-center ">
      {" "}
      <Navbar />
      {children}
    </div>
  );
}
