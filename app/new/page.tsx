"use client";
import { useState } from "react";
import MyDonutChart from "@/components/mydonut";
import MyBarChart from "@/components/mybar";
import { data } from "@/components/data";

export default function Page() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedStation, setSelectedStation] = useState<string>("All");

  // Get unique regions
  const uniqueRegions = [
    "All",
    ...Array.from(new Set(data.map((station) => station.region))),
  ];

  // Filter stations by selected region
  const filteredStations =
    selectedRegion === "All"
      ? data
      : data.filter((station) => station.region === selectedRegion);

  // Get unique stations from the filtered stations
  const uniqueStations = [
    "All",
    ...Array.from(new Set(filteredStations.map((station) => station.name))),
  ];

  // Filter data by selected station
  const filteredData =
    selectedStation === "All"
      ? filteredStations
      : filteredStations.filter((station) => station.name === selectedStation);

  const totalSchools = filteredData.reduce(
    (sum, station) => sum + station.schools,
    0
  );
  const passedStudents = filteredData.reduce(
    (sum, station) => sum + station.passed,
    0
  );
  const failedStudents = filteredData.reduce(
    (sum, station) => sum + station.failed,
    0
  );

  const maleStudents = filteredData.reduce(
    (sum, station) => sum + station.maleStudents.total,
    0
  );
  const femaleStudents = filteredData.reduce(
    (sum, station) => sum + station.femaleStudents.total,
    0
  );

  const malePassed = filteredData.reduce(
    (sum, station) => sum + station.maleStudents.passed,
    0
  );
  const maleFailed = filteredData.reduce(
    (sum, station) => sum + station.maleStudents.failed,
    0
  );

  const femalePassed = filteredData.reduce(
    (sum, station) => sum + station.femaleStudents.passed,
    0
  );
  const femaleFailed = filteredData.reduce(
    (sum, station) => sum + station.femaleStudents.failed,
    0
  );

  return (
    <div className="flex flex-col items-center w-full text-black m-10 ">
      <div className="fixed top-15  left-0 w-full flex justify-center bg-white shadow-md p-6 pt-6 z-50">
        <div className="flex gap-5">
          {/* Region Filter */}
          <div className="">
            <label className="text-sm font-medium">Filter by Region:</label>
            <select
              className="ml-2 border p-2 rounded bg-white"
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setSelectedStation("All"); // Reset station filter when region changes
              }}
            >
              {uniqueRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* Station Filter */}
          <div>
            <label className="text-sm font-medium">Filter by Station:</label>
            <select
              className="ml-2 border p-2 rounded bg-white "
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
            >
              {uniqueStations.map((station) => (
                <option key={station} value={station}>
                  {station}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full mt-24 ">
        {/* Schools Count Bar Chart */}
        <div className="border rounded-md p-5 w-full">
          {/* <h2 className="font-semibold text-lg mb-3">Total Schools</h2> */}
          <MyBarChart
            data={[{ name: "Schools", value: totalSchools }]}
            title="Total Schools"
          />
        </div>

        {/* Passed vs Failed Students Donut Chart */}
        <div className="border rounded-md p-5  w-full">
          {/* <h2 className="font-semibold text-lg">Passed vs Failed Students</h2> */}
          <MyDonutChart
            data={[
              { name: "Passed", value: passedStudents },
              { name: "Failed", value: failedStudents },
            ]}
            title="Passed vs Failed Students"
          />
        </div>

        {/* Gender-wise Students Bar Chart */}
        <div className="border rounded-md p-5 w-full">
          {/* <h2 className="font-semibold text-lg mb-3">Gender-wise Students</h2> */}
          <MyBarChart
            data={[
              { name: "Male Students", value: maleStudents },
              { name: "Female Students", value: femaleStudents },
            ]}
            title="Gender-wise Students"
          />
        </div>

        {/* Gender-wise Passed vs Failed Students Donut Chart */}
        <div className="border rounded-md w-full py-5">
          <h2 className="font-semibold text-lg mb-3 text-center">
            {/* Gender-wise Passed vs Failed Students */}
          </h2>
          <MyDonutChart
            data={[
              { name: "Male Passed", value: malePassed },
              { name: "Male Failed", value: maleFailed },
              { name: "Female Passed", value: femalePassed },
              { name: "Female Failed", value: femaleFailed },
            ]}
            title="Gender-wise Passed vs Failed Students"
          />
        </div>
      </div>
    </div>
  );
}
