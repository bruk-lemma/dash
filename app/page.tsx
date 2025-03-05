"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex  gap-12 items-center justify-center h-screen ">
      <div className="flex flex-col items-center gap-10">
        <h2 className="text-black font-normal text-2xl ">
          Welcome ! Click the button below to go to the Dashboard
        </h2>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-3 bg-[#6c63ff] text-white font-semibold rounded-sm shadow-md hover:bg-gray-50 hover:text-black transition border"
        >
          Go to Dashboard
        </button>
      </div>
      <img src="/undraw_financial-data_r0vs.svg" alt="data-trends" />
    </div>
  );
}
