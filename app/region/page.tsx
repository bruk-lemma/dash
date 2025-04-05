"use client";
import { useEffect, useState } from "react";
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
  Bar,
  BarChart,
} from "recharts";
// Generate month options starting from January (0)
const monthOptions = [
  "All Months",
  ...Array.from({ length: 12 }, (_, i) =>
    new Date(2025, i, 1).toLocaleString("default", { month: "long" })
  ),
];
import { useRouter } from "next/navigation";
import {
  useGetLicenseTypesInRegion,
  useGetRegionPerformance,
  usegetRegionStationData,
  useGetRegionStudentData,
  useGetRegionTotalData,
  useGetSchoolsInRegion,
  useGetStation,
  useGetStationLicenseType,
  useGetStationSchoolData,
  useGetStationsInRegion,
  useGetStudentsInRegion,
} from "@/api/data";
import LicenseTypeCard2 from "@/components/license2";
import { LicenseBarChart2 } from "@/components/lchart";
import StationWiseStudentPerformance from "@/components/stationBymonth";
import StudentGenderChart from "@/components/stuchart";
import RegionWiseStudentPerformance from "@/components/regionbymonth";

export default function Page() {
  const router = useRouter();
  const [selectedStation, setSelectedStation] = useState<string | undefined>();

  const {
    data: RegionData,
    isLoading: RegionIsLoading,
    error: RegionError,
  } = useGetRegionPerformance(1, "2025-01-01", "2025-12-31");

  const {
    data: regionStudentData,
    isLoading: regionStudentIsLoading,
    error: regionStudentError,
  } = useGetStudentsInRegion();

  const {
    data: regionLicenseData,
    isLoading: regionLicenseIsLoading,
    error: regionLicenseError,
  } = useGetLicenseTypesInRegion();

  const {
    data: regionStationData,
    isLoading: regionStationIsLoading,
    error: regionStationError,
  } = useGetStationsInRegion();

  const {
    data: regionSchoolData,
    isLoading: regionSchoolIsLoading,
    error: regionSchoolError,
  } = useGetSchoolsInRegion();

  const {
    data: stationData,
    isLoading,
    error,
  } = useGetStation(selectedStation === "All" ? "" : selectedStation);
  const {
    data: regionTotalData,
    isLoading: regionTotalIsLoading,
    error: regionTotalError,
  } = useGetRegionTotalData();

  const {
    data: stationLicenseData,
    isLoading: licenseIsLoading,
    error: licenseError,
  } = useGetStationLicenseType();
  // const {
  //   data: schoolData,
  //   isLoading: schoolIsLoading,
  //   error: schoolError,
  // } = useGetStationSchoolData();
  interface SchoolData {
    name: string;
    totalStudents: number;
    passedStudents: number;
    failedStudents: number;
  }

  // const schoolsComparisonData = schoolData?.map(
  //   ({ name, totalStudents, passedStudents, failedStudents }: SchoolData) => ({
  //     name,
  //     total: totalStudents,
  //     passed: passedStudents,
  //     failed: failedStudents,
  //   })
  // );

  const {
    data: regionalStationData,
    isLoading: regionalStationIsLoading,
    error: regionalStationError,
  } = usegetRegionStationData();

  //   console.log("schoolData", schoolData);
  //   console.log("region license datais...", regionLicenseData);
  console.log("this is regional station data", regionalStationData);

  const [selectedMonth, setSelectedMonth] = useState("All");

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const studentGenderData = {
    maleCount:
      stationData?.students?.passed.male + stationData?.students?.failed.male,
    femaleCount:
      stationData?.students?.passed.female +
      stationData?.students?.failed.female,
  };

  const lineChartData = [
    {
      name: "Total Students",
      value: regionTotalData?.students?.total,
    },
    {
      name: "Passed Students",
      value: regionTotalData?.students?.passed.total,
    },
    {
      name: "Failed Students",
      value: regionTotalData?.students?.failed.total,
    },
  ];
  {
    error && (
      <div className="flex justify-center items-center h-full">
        <p>Error Fetching data</p>
      </div>
    );
  }
  const filteredData = [
    {
      name: stationData?.name,
      totalStudents: stationData?.students?.total || 0,
      passedStudents: stationData?.students?.passed?.total || 0,
      failedStudents: stationData?.students?.failed?.total || 0,
    },
  ];

  // const chartData = [
  //   {
  //     name: stationData?.name,
  //     passedStudents: stationData?.students?.passed?.total || 0,
  //     failedStudents: stationData?.students?.failed?.total || 0,
  //     totalStudents: stationData?.students?.total || 0,
  //   },
  // ];
  useEffect(() => {
    if (
      regionStationData?.stations?.length > 0 &&
      selectedStation === undefined
    ) {
      setSelectedStation(regionStationData.stations[0].id);
    }
  }, [regionStationData, selectedStation]);
  return (
    <>
      <div className="text-black flex flex-col gap-6 p-10 max-lg:p-4 bg-white">
        {/* Top bar */}
        <div className="border fixed top-0 w-full  shadow-md z-50 p-4 flex justify-between items-center mb-20">
          <div className="flex items-center">
            <button
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
              //onClick={() => router.back()}
            >
              {/* ← Back */}
            </button>
          </div>
          <div className="flex items-center justify-center flex-1">
            <p className="text-center text-2xl font-bold">{RegionData?.name}</p>
          </div>
          <div className="w-[100px]"></div>
        </div>

        <div className="grid grid-cols-4 max-lg:grid-cols-1 justify-between  gap-3 mt-20">
          <Card
            name="Total Stations"
            value={regionStationData?.stations?.length}
            Icon={Home}
            loading={regionStationIsLoading}
            error={regionStationError?.message}
            goto={true}
            nav="/station"
          />
          <Card
            name="Total Schools"
            value={regionSchoolData?.count}
            Icon={Home}
            loading={regionSchoolIsLoading}
            error={regionSchoolError?.message}
          />
          <Card
            name="Total Students"
            value={regionStudentData?.count}
            Icon={Users}
            loading={regionStudentIsLoading}
            error={RegionError?.message}
            //male={studentGenderData.maleCount}
            // female={studentGenderData.femaleCount}
          />
          <Card
            name="Passed Students"
            value={regionTotalData?.students.passed.total}
            Icon={Cog}
            male={regionTotalData?.students.passed.male}
            female={regionTotalData?.students.passed.female}
          />
          <Card
            name="Failed Students"
            value={regionTotalData?.students.failed.total}
            Icon={Cog}
            male={regionTotalData?.students.failed.male}
            female={regionTotalData?.students.failed.female}
          />
          <LicenseTypeCard2
            data={regionLicenseData}
            loading={regionLicenseIsLoading}
          />
        </div>

        <div className="flex justify-between gap-4 max-lg:flex-col">
          <div className="border items-center justify-center p-5 w-full">
            <h3 className="text-lg font-semibold text-gray-600 text-center">
              Passed Students Gender Distribution
            </h3>
            {regionTotalData?.students.passed.male === 0 &&
            regionTotalData?.students.passed.female === 0 ? (
              <div className="flex items-center  justify-center">
                <p className="text-black">No data available</p>
              </div>
            ) : (
              <StudentGenderChart
                male={regionTotalData?.students.passed.male}
                female={regionTotalData?.students.passed.female}
              />
            )}
          </div>
          <div className="border items-center justify-center p-5 w-full">
            <h3 className="text-lg font-semibold text-gray-600 text-center">
              Failed Students Gender Distribution
            </h3>
            {regionTotalData?.students.failed.male === 0 &&
            regionTotalData?.students.failed.female === 0 ? (
              <div className="flex items-center  justify-center">
                <p className="text-black">No data available</p>
              </div>
            ) : (
              <StudentGenderChart
                male={regionTotalData?.students.failed.male}
                female={regionTotalData?.students.failed.female}
              />
            )}
          </div>
          {/* <div className="flex gap-4">
            <div className="border items-center justify-center p-5 w-full">
              <h3 className="text-lg font-semibold text-gray-600 text-center">
                Total Gender Distribution
              </h3>
              <StudentGenderChart
                male={studentGenderData.maleCount}
                female={studentGenderData.femaleCount}
              />
            </div>

   

           
          </div> */}
        </div>
        <div className="flex justify-between items-center mb-4"></div>

        <BarChartComponent
          data={lineChartData}
          isLoading={isLoading}
          error={RegionError}
        />

        <div>
          {/* <LicenseTypeCard data={stationLicenseData} /> */}
          <LicenseBarChart2 licenseTypeData={regionLicenseData} />
        </div>
        <div className="border p-5 max-lg:p-2 w-full mt-5 overflow-x-auto">
          <h2 className="text-xl font-bold text-center mb-4">
            Stations Comparison (Total vs Passed vs Failed)
          </h2>

          {/* Station Filter Dropdown */}
          <div className="flex justify-center mb-4">
            <select
              className="border border-gray-300 rounded px-4 py-2"
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
            >
              {regionStationData?.stations?.map((name: any) => (
                <option key={name.id} value={name.id}>
                  {name.name}
                </option>
              ))}
            </select>
          </div>

          <StationChart station={stationData} isLoading={isLoading} />
        </div>

        <div>
          <RegionWiseStudentPerformance />
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
interface Station {
  name: string;
  students?: {
    passed?: { total: number };
    failed?: { total: number };
    total?: number;
  };
}

function StationChart({
  station,
  isLoading,
}: {
  station: Station | null;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        <Loader size={32} color="black" className="animate-spin" />
      </div>
    );
  }

  if (!station) return null;

  const chartData = [
    {
      name: station.name,
      passedStudents: station.students?.passed?.total || 0,
      failedStudents: station.students?.failed?.total || 0,
      totalStudents: station.students?.total || 0,
    },
  ];

  return (
    <div style={{ height: "400px" }} className="w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="overflow-x-auto overflow-y-auto"
      >
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 0, left: 0, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-50}
            textAnchor="end"
            tickMargin={5}
            tick={{ dy: 0 }}
          />
          <YAxis padding={{ top: 5, bottom: 0 }} />
          <Tooltip />
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="top"
            wrapperStyle={{
              marginBottom: "20px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              padding: "10px",
            }}
          />
          <Bar
            dataKey="passedStudents"
            stackId="a"
            fill="#82ca9d"
            barSize={30}
          />
          <Bar
            dataKey="failedStudents"
            stackId="a"
            fill="#ff7300"
            barSize={30}
          />
          <Bar
            dataKey="totalStudents"
            stackId="a"
            fill="#8884d8"
            barSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
function BarChartComponent({
  data,
  isLoading,
  error,
}: {
  data: { name: string; value: number }[]; // Define the expected structure of the data
  isLoading: boolean;
  error: any;
}) {
  return (
    <div className="border p-5 max-lg:p-2 w-full">
      <h2 className="text-xl font-bold text-center mb-4">
        Students Comparison (Total vs Passed vs Failed)
      </h2>

      {error && (
        <div className="flex justify-center items-center h-full text-black">
          <p className="text-black">Error fetching data</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader size={32} className="animate-spin text-indigo-600" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
