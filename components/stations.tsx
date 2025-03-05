"use client";
import { useState } from "react";
import DonutChart from "./piechart";
import { data } from "./data";

export default function Stations() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  // Convert Set back into an array to avoid TypeScript error
  const uniqueRegions = [
    "All",
    ...Array.from(new Set(data?.map((station) => station.region))),
  ];

  const filteredData =
    selectedRegion === "All"
      ? data
      : data.filter((station) => station.region === selectedRegion);

  return (
    <div className="flex justify-evenly">
      <div className="flex flex-col min-h-[400px] max-h-[500px] py-5 text-sm w-full">
        <div className="flex justify-between pr-2">
          {/* Header */}
          <h1 className="font-semibold text-xl pb-2 border-b">Stations</h1>

          {/* Filter */}
          <div className="my-2">
            <label className="text-sm font-medium">Filter by Region:</label>
            <select
              className="ml-2  border p-2 bg-white"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {uniqueRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto space-y-2 mt-2">
          {filteredData?.map((station, index) => {
            // Extract initials from station name
            const initials = station.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase();

            return (
              <div
                key={index}
                className="flex items-center justify-between p-2 m-2 border rounded-lg bg-white shadow-sm"
              >
                <div className="flex items-center gap-5">
                  <div className="border rounded-3xl p-2 bg-gray-100 text-xs font-bold w-8 h-8 flex items-center justify-center">
                    {initials}
                  </div>
                  <p>{station.name}</p>
                </div>
                <p>{station.region}</p>
                <p>{station.value}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border rounded-md w-full py-5">
        <DonutChart region={selectedRegion} />
      </div>
    </div>
  );
}
