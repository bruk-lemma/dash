"use client";
import BarChartComponent from "@/components/barchart";
import Card from "@/components/card";
import DonutChart from "@/components/piechart";
import Stations from "@/components/stations";
import { useData, useRegions } from "@/hooks/usedata";
import { Cog, MapPinHouse, School, Users } from "lucide-react";

export default function Page() {
  const { data, isLoading } = useData();
  const { data: regions, isLoading: isRegionsLoading } = useRegions();

  return (
    <div className="text-black mt-10 flex flex-col gap-5 border rounded-md p-4 bg-white max-w-[90%] m-auto">
      <h1 className="font-bold text-lg">Analytics</h1>
      <div className="flex w-full justify-evenly gap-4">
        <Card
          name="Regions"
          value={isRegionsLoading ? "Loading..." : regions?.length || 10}
          Icon={Cog}
        />
        <Card
          name="Stations"
          value={isLoading ? "Loading..." : data?.stations || 20}
          Icon={MapPinHouse}
        />
        <Card
          name="Schools"
          value={isLoading ? "Loading..." : data?.schools || 40}
          Icon={School}
        />
        <Card
          name="Students"
          value={isLoading ? "Loading..." : data?.students || 100}
          Icon={Users}
        />
      </div>
      <div className="border p-2 py-2 rounded-md">
        <h1 className="font-semibold text-lg">Students count</h1>
        <BarChartComponent />
      </div>
      <div className="">
        {/* <div className="border rounded-md w-full h-full p-4"> */}
        <Stations />
        {/* </div> */}
        {/* <div className="border rounded-md w-full">
          <DonutChart />
        </div> */}
      </div>
    </div>
  );
}
