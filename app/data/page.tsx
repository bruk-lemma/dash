"use client";
import { useState } from "react";
import Card from "@/components/card";
import { Station } from "@/components/data";
import { Cog, Users, KeyRound, Home } from "lucide-react";

import StudentGenderChart from "@/components/stuchart";
import StudentExamChart from "@/components/mbar";
import LicenseBarChart from "@/components/lchart";
import { useRouter } from "next/navigation";

const stations: Station[] = [
  {
    name: "Station 1",
    region: "Addis Ababa",
    schools: [
      {
        name: "School A",
        total: 50,
        passed: 30,
        failed: 20,
        maleStudents: {
          total: 20,
          passed: 12,
          failed: 8,
        },
        femaleStudents: {
          total: 30,
          passed: 18,
          failed: 12,
        },
        LicenceType: {
          አውቶሞቢል: 10,
          ደረቅ_1: 7,
          ደረቅ_2: 8,
          ህዝብ_1: 12,
          ህዝብ_2: 8,
        },
      },
    ],
    students: {
      total: 50,
      passed: {
        total: 30,
        male: 12,
        female: 18,
      },
      failed: {
        total: 20,
        male: 8,
        female: 12,
      },
    },
  },
  {
    name: "Station 2",
    region: "Oromia",
    schools: [
      {
        name: "School B",
        total: 72,
        passed: 50,
        failed: 22,
        maleStudents: {
          total: 35,
          passed: 22,
          failed: 13,
        },
        femaleStudents: {
          total: 37,
          passed: 28,
          failed: 9,
        },
        LicenceType: {
          አውቶሞቢል: 15,
          ደረቅ_1: 12,
          ደረቅ_2: 10,
          ህዝብ_1: 15,
          ህዝብ_2: 10,
        },
      },
    ],
    students: {
      total: 72,
      passed: {
        total: 50,
        male: 22,
        female: 28,
      },
      failed: {
        total: 22,
        male: 13,
        female: 9,
      },
    },
  },
];

export default function Page() {
  const router = useRouter();
  const [selectedStation, setSelectedStation] = useState<Station | null>(
    stations[0]
  );

  const studenGenderData = stations.map((selectedStation) => ({
    name: selectedStation.name,
    maleCount: selectedStation.schools.reduce(
      (acc, school) => acc + school.maleStudents.total,
      0
    ),
    femaleCount: selectedStation.schools.reduce(
      (acc, school) => acc + school.femaleStudents.total,
      0
    ),
  }));
  const stundentGenderExamData = stations.map((selectedStation) => ({
    name: selectedStation.name,
    malePassed: selectedStation.schools.reduce(
      (acc, school) => acc + school.maleStudents.passed,
      0
    ),
    maleFailed: selectedStation.schools.reduce(
      (acc, school) => acc + school.maleStudents.failed,
      0
    ),
    femalePassed: selectedStation.schools.reduce(
      (acc, school) => acc + school.femaleStudents.passed,
      0
    ),
    femaleFailed: selectedStation.schools.reduce(
      (acc, school) => acc + school.femaleStudents.failed,
      0
    ),
  }));

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const station = stations.find((s) => s.name === event.target.value);
    setSelectedStation(station || null);
  };

  if (!selectedStation) return null;

  // Aggregating License Type Data
  const licenseTypeData = selectedStation.schools.reduce((acc, school) => {
    Object.entries(school.LicenceType).forEach(([key, value]) => {
      acc[key] = (acc[key] || 0) + value;
    });
    return acc;
  }, {} as Record<string, number>);

  console.log("studengenderdata", licenseTypeData);

  return (
    <div className=" text-black flex flex-col  gap-6 p-10">
      {/* Station Selection Dropdown */}
      <div className="bg-white shadow-md py-4 px-6 fixed top-0 left-10 w-full z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left side - Station Name and Region */}
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-gray-900">
              {selectedStation.name}
            </p>
            <p className="text-sm font-medium text-gray-600">
              {selectedStation.region}
            </p>
          </div>

          {/* Centered Dropdown */}
          <div className="flex-grow flex justify-center">
            <select
              className="w-64 px-4 py-2 text-lg font-medium text-gray-800 bg-white border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:outline-none"
              value={selectedStation.name}
              onChange={handleChange}
            >
              {stations.map((station) => (
                <option key={station.name} value={station.name}>
                  {station.name} ({station.region})
                </option>
              ))}
            </select>
          </div>

          {/* Right side - Optional */}
          <div className="flex space-x-4">
            {/* Other nav items or icons could go here */}
          </div>
        </div>
      </div>

      {/* Cards Displaying Student Data */}
      <div className="flex justify-between gap-3 mt-20 ">
        <Card
          name="Total Schools"
          value={selectedStation.schools.length}
          Icon={Home}
          // onClick={() => router.push("/scholl")}
          goto={true}

          // male={selectedStation.students.passed.male}
          // female={selectedStation.students.passed.female}
        />
        <Card
          name="Total Students"
          value={selectedStation.students.total}
          Icon={Users}
          male={selectedStation.students.passed.male}
          female={selectedStation.students.passed.female}
        />
        <Card
          name="Passed Students"
          value={selectedStation.students.passed.total}
          Icon={Cog}
          male={selectedStation.students.passed.male}
          female={selectedStation.students.passed.female}
        />
        <Card
          name="Failed Students"
          value={selectedStation.students.failed.total}
          Icon={Cog}
          male={selectedStation.students.failed.male}
          female={selectedStation.students.failed.female}
        />
        <LicenseTypeCard data={licenseTypeData} />
      </div>

      {/* License Type Card */}
      <div className="flex flex-col gap-4 ">
        <div className="flex gap-5">
          <div className="border  items-center justify-center p-5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-600 text-center">
                Total Number of Students
              </p>
              <p className="font-semibold text-purple-600">
                Total : {""}
                {selectedStation.schools.reduce(
                  (acc, school) => acc + school.total,
                  0
                )}
              </p>
            </div>
            <hr />

            <StudentGenderChart
              male={
                studenGenderData.filter(
                  (station) => station.name === selectedStation.name
                )[0].maleCount
              }
              female={
                studenGenderData.filter(
                  (station) => station.name === selectedStation.name
                )[0].femaleCount
              }
            />
          </div>
          <div className="border  items-center justify-center p-5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-600 text-center">
                Passed Students
              </p>
              <p className="font-semibold text-purple-600">
                Total : {selectedStation.students.passed.total}
              </p>
            </div>
            <hr />
            <StudentGenderChart
              male={selectedStation.students.passed.male}
              female={selectedStation.students.passed.female}
            />
          </div>
          <div className="border  items-center justify-center p-5 w-full">
            <div className="flex items-center justify-between ">
              <p className="text-lg font-semibold text-gray-600 text-center">
                Failed Students
              </p>
              <p className="font-semibold text-purple-600">
                Total : {selectedStation.students.failed.total}
              </p>
            </div>
            <hr />

            <StudentGenderChart
              male={selectedStation.students.failed.male}
              female={selectedStation.students.failed.female}
            />
          </div>
        </div>

        <div className="flex gap-4">
          {/* <div className="border  items-center justify-center p-5 w-full">
   
            <StudentExamChart
              data={stundentGenderExamData.filter(
                (station) => station.name === selectedStation.name
              )}
            />
          </div> */}

          {/* <div className="border  items-center justify-center p-1 w-full">
 
            <StudentExamChart
              data={stundentGenderExamData.filter(
                (station) => station.name === selectedStation.name
              )}
            />
          </div> */}

          <div className="border  items-center justify-center p-1 w-full">
            {/* <p className="text-lg font-semibold text-gray-600 text-center">
              License Types
            </p> */}
            <LicenseBarChart licenseTypeData={licenseTypeData} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface LicenseTypeCardProps {
  data: Record<string, number>;
}

function LicenseTypeCard({ data }: LicenseTypeCardProps) {
  return (
    <div className="border px-4 py-3 rounded-lg w-[400px] bg-white ">
      {/* Header with Gradient Background */}
      <div className="flex justify-between items-center border-b   to-gray-200 rounded-t-lg">
        <p className="text-lg font-semibold text-black">License Types</p>
        <KeyRound size={24} className="text-indigo-600" />
      </div>

      {/* License List with Grid Layout */}
      <div className="grid grid-cols-2 gap-3 mt-2">
        {Object.entries(data).map(([license, count], index) => (
          <div
            key={license}
            className={`flex justify-between items-center px-3 py-2 rounded-md transition-all duration-200 ease-in-out ${
              index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
            } hover:bg-blue-50 hover:scale-105`}
          >
            <span className="text-gray-800 font-medium text-sm">{license}</span>
            <span className="text-gray-900 font-semibold text-sm">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
