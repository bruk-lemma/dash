"use client";
import { useEffect, useMemo, useState } from "react";
import Card from "@/components/card";
import { Cog, Users, KeyRound, Loader, Loader2 } from "lucide-react";
import StudentGenderChart from "@/components/stuchart";
import { LicenseBarChart } from "@/components/lchart";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  useGetSationPerformance,
  useGetSchool,
  useGetSchoolPerformance,
  useGetStation,
} from "@/api/data";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { parseCookies, setCookie } from "nookies";
const monthOptions = [
  "All Months",
  ...Array.from({ length: 12 }, (_, i) =>
    new Date(2025, i, 1).toLocaleString("default", { month: "long" })
  ),
];
export default function Page() {
  const router = useRouter();

  // const [selectedStation, setSelectedStation] = useState<string | null>();

  // setCookie(null, "selectedStation", selectedStation || "", {
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  //   path: "/",
  // });

  // const selectedStation =
  // useEffect(() => {
  //   if (typeof window !== "undefined" && selectedStation) {
  //     localStorage.setItem("selectedStation", selectedStation);
  //   }
  // }, [selectedStation]);
  const cookies = parseCookies();
  const selectedStation = cookies.selectedStation;

  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);
  const {
    data: stationData,
    isLoading: stationLoading,
    error: stationError,
  } = useGetStation(selectedStation);

  const [selectedSchool, setSelectedSchool] = useState(
    stationData?.schools?.[0]?.id
  );
  // console.log("school data", data);

  const monthIndex = monthOptions.indexOf(selectedMonth) - 1;
  const selectedYear = 2025;
  //const schoolId = selectedSchool; //read stationid from local storage
  //read stationid from local storage
  const { data, isLoading, error } = useGetSchool(selectedSchool);
  //console.log("the selected school is", selectedSchool);

  const startDate =
    selectedMonth === "All Months"
      ? `${selectedYear}-01-01`
      : `${selectedYear}-${String(monthIndex + 1).padStart(2, "0")}-01`;

  const endDate =
    selectedMonth === "All Months"
      ? `${selectedYear}-12-31`
      : new Date(selectedYear, monthIndex + 1, 0).toISOString().split("T")[0]; // Last day of selected month
  const {
    data: school,
    isLoading: schoolLoading,
    error: schoolError,
  } = useGetSchoolPerformance(selectedSchool, startDate, endDate);

  // const school = data;
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const licenseTypeData = Object.entries(data?.licenseType || {}).reduce(
    (acc, [key, value]) => {
      acc[key] = value as number;
      return acc;
    },
    {} as Record<string, number>
  );
  const chartData = useMemo(() => {
    //console.log("school data is", school);
    if (!school) return [];

    const passed = school.passed || 0;
    const failed = school.failed || 0;
    const total = school.total || 0;

    return [
      {
        name: selectedMonth,
        total,
        passed,
        failed,
      },
    ];
  }, [school, selectedMonth]);
  const studentGenderData = {
    maleCount: data?.maleStudents?.total || 0,
    femaleCount: data?.femaleStudents?.total || 0,
  };

  const studentExamData = {
    name: data?.name,
    malePassed: data?.maleStudents?.passed,
    maleFailed: data?.maleStudents?.failed,
    femalePassed: data?.femaleStudents?.passed,
    femaleFailed: data?.femaleStudents?.failed,
  };

  const allStudents: {
    name: string;
    gender: string;
    status: string;
    createdAt?: string;
  }[] =
    data?.students?.map(
      (student: {
        name: string;
        gender: string;
        status: string;
        createdAt?: string;
      }) => ({
        ...student,
        createdAt: student.createdAt || "N/A", // Provide a default value for createdAt
      })
    ) || [];

  const filteredStudents =
    selectedMonth === "All"
      ? allStudents
      : allStudents.filter(
          (student) =>
            new Date(student.createdAt || "").toLocaleString("default", {
              month: "long",
            }) === selectedMonth
        );

  const lineChartData = [
    {
      name: "Registered Students",
      value: filteredStudents.length,
    },
    {
      name: "Passed Students",
      value: filteredStudents.filter((s) => s.status === "passed").length,
    },
    {
      name: "Failed Students",
      value: filteredStudents.filter((s) => s.status === "failed").length,
    },
  ];

  return (
    <div className="text-black flex flex-col gap-6 p-10 max-lg:p-4 bg-white">
      {/* Top bar */}
      <div className="border fixed top-0 w-full  shadow-md z-50 p-4  flex justify-between items-center mb-20 bg-white">
        <div className="flex items-center ">
          <button
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
            onClick={() => router.back()}
          >
            ← Back
          </button>
        </div>
        <div className="flex items-center gap-6 justify-center flex-1">
          <p className="text-center text-2xl font-bold max-lg:text-lg ">
            {data?.name}
          </p>
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
        <div className="w-[100px]"></div>
      </div>

      {/* Main Content */}
      <div className="flex justify-between gap-3 mt-20 max-lg:flex-col ">
        <Card
          name="Registered Students"
          value={data?.total ?? 0}
          Icon={Users}
          male={studentGenderData.maleCount}
          female={studentGenderData.femaleCount}
          loading={isLoading} // Pass loading state
        />
        <Card
          name="Passed Students"
          value={data?.passed ?? 0}
          Icon={Cog}
          male={studentExamData.malePassed ?? 0}
          female={studentExamData.femalePassed ?? 0}
          loading={isLoading} // Pass loading state
        />
        <Card
          name="Failed Students"
          value={data?.failed ?? 0}
          Icon={Cog}
          male={studentExamData.maleFailed}
          female={studentExamData.femaleFailed}
          loading={isLoading} // Pass loading state
        />
        <LicenseTypeCard data={licenseTypeData} />
      </div>

      {/* License Type Card */}
      <div className="flex flex-col gap-4">
        <div className="flex max-lg:flex-col gap-4 ">
          <div className="border items-center justify-center p-5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-600 text-center">
                Registred Students
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
                {(studentExamData.malePassed ?? 0) +
                  (studentExamData.femalePassed ?? 0)}
              </p>
            </div>
            <StudentGenderChart
              male={studentExamData.malePassed ?? 0}
              female={studentExamData.femalePassed ?? 0}
            />
          </div>
          <div className="border items-center justify-center p-5 w-full">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-600 text-center">
                Failed Students
              </p>
              <p className="font-semibold text-purple-600">
                Total :{" "}
                {(studentExamData.maleFailed ?? 0) +
                  (studentExamData.femaleFailed ?? 0)}
              </p>
            </div>
            <StudentGenderChart
              male={studentExamData.maleFailed ?? 0}
              female={studentExamData.femaleFailed ?? 0}
            />
          </div>
        </div>

        <div className="flex">
          <div className="border items-center justify-center p-1 w-full">
            <LicenseBarChart licenseTypeData={licenseTypeData} />
          </div>
        </div>
        {data ? (
          <SchoolPerformanceBarChart
            school={{
              name: data.name,
              total: data.total,
              passed: data.passed,
              failed: data.failed,
            }}
            isLoading={isLoading}
          />
        ) : (
          <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
            No data available
          </div>
        )}
        {/* Month Selection for Line Chart */}

        {/* Line Chart to show Total, Passed, Failed Students */}
        <div className="border p-5 w-full h-[500px]">
          <h2 className="text-xl font-bold text-center mb-4">
            School Performances
          </h2>

          <div className="flex justify-between items-center mb-4">
            <label className="font-semibold">Select Month:</label>
            <select
              className="border px-4 py-2 rounded-md bg-white"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {monthOptions.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {schoolLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader size={32} className="animate-spin" color="black" />
            </div>
          ) : schoolError ? (
            <div className="text-center text-red-500">
              Error loading school data.
            </div>
          ) : chartData &&
            chartData.some(
              (entry) => entry.total > 0 || entry.passed > 0 || entry.failed > 0
            ) ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="total"
                  fill="#8884d8"
                  name="Registered Students"
                  barSize={30}
                />
                <Bar
                  dataKey="passed"
                  fill="#4caf50"
                  name="Passed Students"
                  barSize={30}
                />
                <Bar
                  dataKey="failed"
                  fill="#e74c3c"
                  name="Failed Students"
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center flex items-center justify-center">
              <p>
                No data available for {selectedMonth} of {selectedYear}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// LicenseTypeCard component remains the same

interface LicenseTypeCardProps {
  data: Record<string, number>;
}

function LicenseTypeCard({ data }: LicenseTypeCardProps) {
  return (
    <div className="border px-4 py-3 rounded-lg w-[300px] max-lg:w-full bg-white ">
      <div className="flex justify-between items-center border-b to-gray-200 rounded-t-lg">
        <p className="text-lg font-semibold text-black">License Types</p>
        <KeyRound size={24} className="text-black" />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-2 max-lg:grid-cols-1">
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

function SchoolPerformanceBarChart({
  school,
  isLoading,
}: {
  school: {
    name: string;
    total: number;
    passed: number;
    failed: number;
  };
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <Loader size={32} className="animate-spin text-black" />
      </div>
    );
  }

  const hasData =
    school && (school.total > 0 || school.passed > 0 || school.failed > 0);

  if (!hasData) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  const chartData = [
    {
      name: school.name || "School",
      total: school.total,
      passed: school.passed,
      failed: school.failed,
    },
  ];

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="total"
            fill="#8884d8"
            name="Registered Students"
            barSize={30}
          />
          <Bar
            dataKey="passed"
            fill="#4CAF50"
            name="Passed Students"
            barSize={30}
          />
          <Bar
            dataKey="failed"
            fill="#FF5722"
            name="Failed Students"
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
