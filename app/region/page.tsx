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
  useGetReportofStations,
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
import { useAuth } from "@/context/AuthContext";
import { setCookie } from "nookies";

export default function Page() {
  const router = useRouter();
  const [selectedStation, setSelectedStation] = useState<string | undefined>();
  setCookie(null, "selectedStation", selectedStation || "", {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
  });
  // useEffect(() => {
  //   if (typeof window !== "undefined" && selectedStation) {
  //     localStorage.setItem("selectedStation", selectedStation.toString());
  //   }
  // }, [selectedStation]);
  // document.cookie(
  //   "auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoic2lkYW1hQGdtYWlsLmNvbSIsIm5hbWUiOiJTaWRhbWEiLCJ1c2VyVHlwZSI6IlJFR0lPTiIsInByaXZpbGVnZXMiOlsidmlld1N0dWRlbnQiLCJ2aWV3Um9sZSIsImNyZWF0ZVJvbGUiLCJ1cGRhdGVSb2xlIiwiZGVsZXRlUm9sZSIsInZpZXdXcml0dGVuRXhhbVJlcXVlc3QiLCJ2aWV3V3JpdHRlbkV4YW1SZXN1bHQiLCJ2aWV3RHJpdmluZ0V4YW1SZXF1ZXN0Iiwidmlld0RyaXZpbmdFeGFtUmVzdWx0Iiwidmlld1NjaG9vbCIsImNyZWF0ZVNjaG9vbCIsInVwZGF0ZVNjaG9vbCIsImRlbGV0ZVNjaG9vbCIsInZpZXdTdGF0aW9uIiwiY3JlYXRlU3RhdGlvbiIsInVwZGF0ZVN0YXRpb24iLCJkZWxldGVTdGF0aW9uIiwidmlld1VzZXIiLCJjcmVhdGVVc2VyIiwiZGVsZXRlVXNlciIsInZpZXdQcm9maWxlIiwidXBkYXRlUHJvZmlsZSIsInZpZXdQcmludGVkIiwiY3JlYXRlUHJpbnRlZCIsInZpZXdUb2JlUHJpbnRlZCIsInVwZGF0ZVRvYmVQcmludGVkIl0sInJlZ2lvbiI6eyJpZCI6MSwicmVnaW9uIjoiU2lkYW1hIn0sInN0YXRpb24iOm51bGwsInNjaG9vbCI6bnVsbCwiaWF0IjoxNzQ2MDk5MzU3LCJleHAiOjE3NDYyNzIxNTd9.XkT0Og6gJ_NP9GStC-ga0RFEpZ_HV_cxLDYgEx7PLAM"
  // );
  // const auth =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsImVtYWlsIjoic2lkYW1hQGdtYWlsLmNvbSIsIm5hbWUiOiJTaWRhbWEiLCJ1c2VyVHlwZSI6IlJFR0lPTiIsInByaXZpbGVnZXMiOlsidmlld1N0dWRlbnQiLCJ2aWV3Um9sZSIsImNyZWF0ZVJvbGUiLCJ1cGRhdGVSb2xlIiwiZGVsZXRlUm9sZSIsInZpZXdXcml0dGVuRXhhbVJlcXVlc3QiLCJ2aWV3V3JpdHRlbkV4YW1SZXN1bHQiLCJ2aWV3RHJpdmluZ0V4YW1SZXF1ZXN0Iiwidmlld0RyaXZpbmdFeGFtUmVzdWx0Iiwidmlld1NjaG9vbCIsImNyZWF0ZVNjaG9vbCIsInVwZGF0ZVNjaG9vbCIsImRlbGV0ZVNjaG9vbCIsInZpZXdTdGF0aW9uIiwiY3JlYXRlU3RhdGlvbiIsInVwZGF0ZVN0YXRpb24iLCJkZWxldGVTdGF0aW9uIiwidmlld1VzZXIiLCJjcmVhdGVVc2VyIiwiZGVsZXRlVXNlciIsInZpZXdQcm9maWxlIiwidXBkYXRlUHJvZmlsZSIsInZpZXdQcmludGVkIiwiY3JlYXRlUHJpbnRlZCIsInZpZXdUb2JlUHJpbnRlZCIsInVwZGF0ZVRvYmVQcmludGVkIl0sInJlZ2lvbiI6eyJpZCI6MSwicmVnaW9uIjoiU2lkYW1hIn0sInN0YXRpb24iOm51bGwsInNjaG9vbCI6bnVsbCwiaWF0IjoxNzQ2MDk5MzU3LCJleHAiOjE3NDYyNzIxNTd9.XkT0Og6gJ_NP9GStC-ga0RFEpZ_HV_cxLDYgEx7PLAM";
  // localStorage.setItem("auth_token", auth);
  const { user } = useAuth(); // Access user from AuthContext
  const regionId = user?.details?.id; // Get the region ID from the user object

  const {
    data: RegionData,
    isLoading: RegionIsLoading,
    error: RegionError,
  } = useGetRegionPerformance(regionId, "2025-01-01", "2025-12-31");

  const {
    data: regionStudentData,
    isLoading: regionStudentIsLoading,
    error: regionStudentError,
  } = useGetStudentsInRegion(regionId); // Provide a default value if regionId is undefined

  const {
    data: regionLicenseData,
    isLoading: regionLicenseIsLoading,
    error: regionLicenseError,
  } = useGetLicenseTypesInRegion(regionId);

  const {
    data: regionStationData,
    isLoading: regionStationIsLoading,
    error: regionStationError,
  } = useGetStationsInRegion(regionId);

  const {
    data: regionSchoolData,
    isLoading: regionSchoolIsLoading,
    error: regionSchoolError,
  } = useGetSchoolsInRegion(regionId);

  const {
    data: stationData,
    isLoading,
    error,
  } = useGetStation(selectedStation === "All" ? "" : selectedStation);
  const {
    data: regionTotalData,
    isLoading: regionTotalIsLoading,
    error: regionTotalError,
  } = useGetRegionTotalData(regionId);

  const {
    data: chartData,
    isLoading: chartIsLoading,
    error: chartError,
  } = useGetReportofStations(regionId);

  interface SchoolData {
    name: string;
    totalStudents: number;
    passedStudents: number;
    failedStudents: number;
  }

  const {
    data: regionalStationData,
    isLoading: regionalStationIsLoading,
    error: regionalStationError,
  } = usegetRegionStationData(regionId);

  //  console.log("this is regional station data", regionalStationData);

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
      name: "Registered Students",
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

  useEffect(() => {
    if (
      regionStationData?.stations?.length > 0 &&
      selectedStation === undefined
    ) {
      setSelectedStation(regionStationData.stations[0].id);
    }
  }, [regionStationData, selectedStation]);

  //console.log("passed students", regionTotalData?.students?.passed?.total);
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
            <p className="text-center text-2xl font-bold">
              {/* {regionStationData?.name} */}
            </p>
          </div>
          {/* <div className="w-[100px]"></div> */}
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
            value={regionStationData?.schoolCount}
            Icon={Home}
            loading={regionStationIsLoading}
            error={regionStationError?.message}
          />
          <Card
            name="Registered Students"
            value={regionStudentData?.count}
            Icon={Users}
            loading={regionStudentIsLoading}
            error={RegionError?.message}
            //male={studentGenderData.maleCount}
            // female={studentGenderData.femaleCount}
          />
          <Card
            name="Passed Students"
            value={regionTotalData?.students?.passed?.total}
            Icon={Cog}
            male={regionTotalData?.students?.passed?.male}
            female={regionTotalData?.students?.passed?.female}
          />
          <Card
            name="Failed Students"
            value={regionTotalData?.students?.failed?.total}
            Icon={Cog}
            male={regionTotalData?.students?.failed?.male}
            female={regionTotalData?.students?.failed?.female}
          />
          <LicenseTypeCard2
            selectedStation={regionId}
            // data={regionLicenseData}
            // loading={regionLicenseIsLoading}
          />
        </div>

        <div className="flex justify-between gap-4 max-lg:flex-col">
          <div className="border items-center justify-center p-5 w-full">
            <h3 className="text-lg font-semibold text-gray-600 text-center">
              Passed Students Gender Distribution
            </h3>
            {regionTotalData?.students?.passed?.male === 0 &&
            regionTotalData?.students?.passed?.female === 0 ? (
              <div className="flex items-center  justify-center">
                <p className="text-black">No data available</p>
              </div>
            ) : (
              <StudentGenderChart
                male={regionTotalData?.students?.passed?.male}
                female={regionTotalData?.students?.passed?.female}
              />
            )}
          </div>
          <div className="border items-center justify-center p-5 w-full">
            <h3 className="text-lg font-semibold text-gray-600 text-center">
              Failed Students Gender Distribution
            </h3>
            {regionTotalData?.students?.failed?.male === 0 &&
            regionTotalData?.students?.failed?.female === 0 ? (
              <div className="flex items-center  justify-center">
                <p className="text-black">No data available</p>
              </div>
            ) : (
              <StudentGenderChart
                male={regionTotalData?.students?.failed?.male}
                female={regionTotalData?.students?.failed?.female}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between items-center mb-4"></div>

        <BarChartComponent
          data={lineChartData}
          isLoading={isLoading}
          error={RegionError}
        />

        <div>
          <LicenseBarChart2 licenseTypeData={regionLicenseData} />
        </div>
        <div className="border p-5 max-lg:p-2 w-full mt-5 overflow-x-auto">
          <h2 className="text-xl font-bold text-center mb-4">
            Stations Comparison (Total vs Passed vs Failed)
          </h2>

          {/* Station Filter Dropdown */}
          <div className="flex justify-center mb-4">
            {/* <select
              className="border border-gray-300 rounded px-4 py-2"
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
            >
              {regionStationData?.stations?.map((name: any) => (
                <option key={name.id} value={name.id}>
                  {name.name}
                </option>
              ))}
            </select> */}
          </div>
          {chartIsLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader size={32} className="animate-spin" color="black" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <p>Error Fetching data</p>
            </div>
          ) : chartData && chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="total"
                  stackId="a"
                  fill="#8884d8"
                  name="Total Students"
                  barSize={50}
                />
                <Bar
                  dataKey="failed"
                  stackId="a"
                  fill="#ff7300"
                  name="Failed Students"
                  barSize={50}
                />
                <Bar
                  dataKey="passed"
                  stackId="a"
                  fill="#82ca9d"
                  name="Passed Students"
                  barSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>No data available</p>
            </div>
          )}
          {/* <StationChart station={stationData} isLoading={isLoading} /> */}
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
