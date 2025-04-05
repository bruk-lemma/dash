"use client";
import { useState } from "react";
import Card from "@/components/card";
import { Cog, Users, Home, Car, Loader, KeyRound } from "lucide-react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  BarChart,
  Bar,
} from "recharts";

import StudentGenderChart from "@/components/stuchart";

import { useRouter } from "next/navigation";
import {
  useGetSchool,
  useGetStation,
  useGetStationLicenseType,
  useGetStationSchoolData,
} from "@/api/data";
import LicenseTypeCard2 from "@/components/license2";
import { LicenseBarChart2 } from "@/components/lchart";
import StationWiseStudentPerformance from "@/components/stationBymonth";

export default function Page() {
  const router = useRouter();
  const [selectedSchool, setSelectedSchool] = useState("All");
  const { data: stationData, isLoading, error } = useGetStation(1);
  console.log("station is loading", isLoading);
  const {
    data: stationLicenseData,
    isLoading: licenseIsLoading,
    error: licenseError,
  } = useGetStationLicenseType();

  const {
    data: schoolData,
    isLoading: schoolIsLoading,
    error: schoolError,
  } = useGetSchool(selectedSchool === "All" ? "" : selectedSchool);

  interface SchoolData {
    name: string;
    totalStudents: number;
    passedStudents: number;
    failedStudents: number;
  }

  const [selectedMonth, setSelectedMonth] = useState("All");

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const studentGenderData = {
    maleCount:
      stationData?.students?.passed?.male + stationData?.students?.failed?.male,
    femaleCount:
      stationData?.students?.passed?.female +
      stationData?.students?.failed?.female,
  };

  const lineChartData = [
    {
      name: "Total Students",
      value: stationData?.students?.total,
    },
    {
      name: "Passed Students",
      value: stationData?.students?.passed?.total,
    },
    {
      name: "Failed Students",
      value: stationData?.students?.failed?.total,
    },
  ];

  return (
    <>
      <div className="text-black flex flex-col gap-6 p-10 bg-white max-lg:p-4">
        {/* Top bar */}
        <div className="border fixed top-0 w-full  shadow-md z-50 p-4 flex justify-between items-center mb-20 ">
          <div className="flex items-center">
            <button
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
              onClick={() => router.back()}
            >
              ← Back
            </button>
          </div>
          <div className="flex items-center justify-center flex-1 max-lg:items-start">
            <p className="text-center text-2xl max-lg:text-lg font-bold">
              {stationData?.name}
            </p>
          </div>
        </div>

        <div className="flex justify-between gap-3 mt-20 max-lg:flex-col">
          <Card
            name="Total Schools"
            value={stationData?.schools?.length}
            Icon={Home}
            loading={isLoading}
            error={error?.message}
            goto={true}
            nav="/center"
          />
          <Card
            name="Total Students"
            value={stationData?.students?.total}
            Icon={Users}
            loading={isLoading}

            //male={studentGenderData.maleCount}
            //female={studentGenderData.femaleCount}
          />
          <Card
            name="Passed Students"
            value={stationData?.students?.passed?.total}
            Icon={Cog}
            loading={isLoading}

            //male={stationData.students.passed.male}
            //female={stationData.students.passed.female}
          />
          <Card
            name="Failed Students"
            value={stationData?.students?.failed.total}
            Icon={Cog}
            male={stationData?.students?.failed.male}
            female={stationData?.students?.failed.female}
            loading={isLoading}
          />
          <LicenseTypeCard2
            data={stationLicenseData}
            loading={licenseIsLoading}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4 max-lg:flex-col">
            <div className="border items-center justify-center p-5 w-full">
              <h3 className="text-lg font-semibold text-gray-600 text-center">
                Total Gender Distribution
              </h3>
              <StudentGenderChart
                male={studentGenderData.maleCount}
                female={studentGenderData.femaleCount}
                loading={isLoading}
              />
            </div>

            <div className="border items-center justify-center p-5 w-full">
              <h3 className="text-lg font-semibold text-gray-600 text-center">
                Passed Students Gender Distribution
              </h3>
              {stationData?.students?.passed?.male === 0 ||
              stationData?.students?.passed?.female === 0 ? (
                <div className="flex items-center  justify-center">
                  <p className="text-black">No data available</p>
                </div>
              ) : (
                <StudentGenderChart
                  male={stationData?.students?.passed?.male}
                  female={stationData?.students?.passed?.female}
                  loading={isLoading}
                />
              )}
            </div>

            <div className="border items-center justify-center p-5 w-full">
              <h3 className="text-lg font-semibold text-gray-600 text-center">
                Failed Students Gender Distribution
              </h3>
              <StudentGenderChart
                male={stationData?.students?.failed?.male}
                female={stationData?.students?.failed?.female}
                loading={isLoading}
              />
            </div>
          </div>

          <div className="flex justify-between items-center mb-4"></div>

          {/* Line Chart to show Total, Passed, Failed Students */}
          <StudentPerformanceBarChart
            data={lineChartData}
            loading={isLoading}
          />
        </div>
        <div>
          {/* <LicenseTypeCard data={stationLicenseData} /> */}
          {/* <LicenseBarChart2 licenseTypeData={stationLicenseData} /> */}
        </div>
        <div className="border p-5 w-full mt-5 overflow-x-auto">
          {" "}
          {/* Enable horizontal scrolling */}
          <h2 className="text-xl font-bold text-center mb-4">
            Schools Comparison (Total vs Passed vs Failed)
          </h2>
          {/* Station Filter Dropdown */}
          <div className="flex flex-col justify-center mb-4">
            <div className="flex justify-end">
              <select
                className="border border-gray-300 rounded px-4 py-2"
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                //value={selectedStation}
                //onChange={(e) => setSelectedStation(e.target.value)}
              >
                {stationData?.schools?.map((name: any) => (
                  <option key={name.id} value={name.id}>
                    {name.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <SchoolChart
            school={
              schoolData
                ? {
                    students: {
                      total: schoolData.total,
                      passed: { total: schoolData.passed },
                      failed: { total: schoolData.failed },
                    },
                  }
                : null
            }
            isLoading={schoolIsLoading}
          />
        </div>
        <div>
          <StationWiseStudentPerformance />
        </div>
      </div>
    </>
  );
}

interface License {
  licenseType: string | null;
  count: number;
}

interface LicenseTypeCardProps {
  data: License[];
}

function LicenseTypeCard({ data }: LicenseTypeCardProps) {
  return (
    <div className="border px-4 py-3 rounded-lg w-[400px] bg-white ">
      {/* Header with Gradient Background */}
      <div className="flex justify-between items-center border-b to-gray-200 rounded-t-lg">
        <p className="text-lg font-semibold text-black">License Types</p>
        <KeyRound size={24} className="text-indigo-600" />
      </div>

      {/* License List with Grid Layout */}
      <div className="grid grid-cols-2 gap-3 mt-2">
        {data?.map(({ licenseType, count }, index) => (
          <div
            key={licenseType || index} // Use index as a fallback key for null types
            className={`flex justify-between items-center px-3 py-2 rounded-md transition-all duration-200 ease-in-out ${
              index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
            } hover:bg-blue-50 hover:scale-105`}
          >
            <span className="text-gray-800 font-medium text-sm">
              {licenseType || "Unspecified"}
            </span>
            <span className="text-gray-900 font-semibold text-sm">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SchoolChart({
  school,
  isLoading,
}: {
  school: {
    students?: {
      total?: number;
      passed?: { total?: number };
      failed?: { total?: number };
    };
  } | null;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <Loader size={32} color="black" className="animate-spin" />
      </div>
    );
  }

  const hasData =
    school &&
    school?.students &&
    ((school?.students?.total ?? 0) > 0 ||
      (school.students.passed?.total ?? 0) > 0 ||
      (school.students.failed?.total ?? 0) > 0);

  if (!hasData) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  const schoolChartData = [
    {
      name: "Total Students",
      total: school?.students?.total,
      passed: school?.students?.passed?.total,
      failed: school?.students?.failed?.total,
    },
  ];

  return (
    <div style={{ height: "400px" }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={schoolChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
          <YAxis padding={{ top: 20, bottom: 20 }} />
          <Tooltip />
          <Legend />
          <Line
            type="basis"
            dataKey="total"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            name="Total Students"
          />
          <Line
            type="monotone"
            dataKey="passed"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
            name="Passed Students"
          />
          <Line
            type="monotone"
            dataKey="failed"
            stroke="#ff7300"
            activeDot={{ r: 8 }}
            name="Failed Students"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
function StudentPerformanceBarChart({
  data,
  loading,
}: {
  data: { name: string; value: number }[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <Loader size={32} className="animate-spin text-indigo-600" />
      </div>
    );
  }
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
          <YAxis padding={{ top: 20, bottom: 20 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
