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
  const [selectedSchool, setSelectedSchool] = useState(stations[0].schools[0]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const school = stations
      .flatMap((station) => station.schools)
      .find((school) => school.name === event.target.value);
    setSelectedSchool(school || stations[0].schools[0]);
  };

  if (!selectedSchool) return null;

  // Aggregating License Type Data for the selected school
  const licenseTypeData = Object.entries(selectedSchool.LicenceType).reduce(
    (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    {} as Record<string, number>
  );

  const studentGenderData = {
    maleCount: selectedSchool.maleStudents.total,
    femaleCount: selectedSchool.femaleStudents.total,
  };

  const studentExamData = {
    name: selectedSchool.name,
    malePassed: selectedSchool.maleStudents.passed,
    maleFailed: selectedSchool.maleStudents.failed,
    femalePassed: selectedSchool.femaleStudents.passed,
    femaleFailed: selectedSchool.femaleStudents.failed,
  };

  return (
    <div className="text-black flex flex-col gap-6 p-10">
      {/* Top bar */}
      <div className="border fixed top-0 w-full bg-white shadow-md z-50 p-4 flex justify-between items-center mb-20">
        {/* Back button */}
        <div className="flex items-center">
          <button
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
            onClick={() => router.back()}
          >
            ← Back
          </button>
        </div>

        {/* School Selection Dropdown */}
        <div className="flex items-center justify-center flex-1">
          <select
            className="border px-4 py-2 rounded-md bg-white"
            value={selectedSchool.name}
            onChange={handleChange}
          >
            {stations
              .flatMap((station) => station.schools)
              .map((school) => (
                <option key={school.name} value={school.name}>
                  {school.name}
                </option>
              ))}
          </select>
        </div>

        {/* School Name */}
        <div className="flex items-center justify-center flex-1">
          <p className="text-center text-2xl font-bold">
            {selectedSchool.name}
          </p>
        </div>

        {/* Spacer to maintain layout */}
        <div className="w-[100px]"></div>
      </div>

      {/* Main Content */}
      {/* Cards Displaying Student Data for the Selected School */}
      <div className="flex justify-between gap-3 mt-20 ">
        <Card
          name="Total Students"
          value={selectedSchool.total}
          Icon={Users}
          male={selectedSchool.maleStudents.total}
          female={selectedSchool.femaleStudents.total}
        />
        <Card
          name="Passed Students"
          value={selectedSchool.passed}
          Icon={Cog}
          male={selectedSchool.maleStudents.passed}
          female={selectedSchool.femaleStudents.passed}
        />
        <Card
          name="Failed Students"
          value={selectedSchool.failed}
          Icon={Cog}
          male={selectedSchool.maleStudents.failed}
          female={selectedSchool.femaleStudents.failed}
        />
        <LicenseTypeCard data={licenseTypeData} />
      </div>

      {/* License Type Card */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="border items-center justify-center p-5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-600 text-center">
                Total Students
              </p>
              <p className="font-semibold text-purple-600">
                Total :{" "}
                {studentGenderData.maleCount + studentGenderData.femaleCount}
              </p>
            </div>

            <StudentGenderChart
              male={studentGenderData.maleCount}
              female={studentGenderData.femaleCount}
            />
          </div>
          <div className="border items-center justify-center p-5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-600 text-center">
                Passed Students
              </p>
              <p className="font-semibold text-purple-600">
                Total :{" "}
                {studentExamData.malePassed + studentExamData.femalePassed}
              </p>
            </div>
            <StudentGenderChart
              male={studentExamData.malePassed}
              female={studentExamData.femalePassed}
            />
          </div>
          <div className="border items-center justify-center p-5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-600 text-center">
                Failed Students
              </p>
              <p className="font-semibold text-purple-600">
                Total :{" "}
                {studentExamData.maleFailed + studentExamData.femaleFailed}
              </p>
            </div>
            <StudentGenderChart
              male={studentExamData.maleFailed}
              female={studentExamData.femaleFailed}
            />
          </div>
        </div>

        <div className="flex">
          <div className="border items-center justify-center p-1 w-full">
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
    <div className="border px-4 py-3 rounded-lg w-[300px] bg-white ">
      <div className="flex justify-between items-center border-b to-gray-200 rounded-t-lg">
        <p className="text-lg font-semibold text-black">License Types</p>
        <KeyRound size={24} className="text-black" />
      </div>

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
