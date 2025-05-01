// import {
//   ResponsiveContainer,
//   BarChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   Bar,
// } from "recharts";
// import { useState, useMemo } from "react";
// import { Loader } from "lucide-react";
// import { useGetSationPerformance } from "@/api/data";

// // Generate month options starting from January (0)
// const monthOptions = [
//   "All Months",
//   ...Array.from({ length: 12 }, (_, i) =>
//     new Date(2025, i, 1).toLocaleString("default", { month: "long" })
//   ),
// ];

// export default function StationWiseStudentPerformance(stationId) {
//   const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);
//   const selectedYear = 2025;
//   //const stationId =

//   const monthIndex = monthOptions.indexOf(selectedMonth) - 1;

//   const startDate =
//     selectedMonth === "All Months"
//       ? `${selectedYear}-01-01`
//       : `${selectedYear}-${String(monthIndex + 1).padStart(2, "0")}-01`;

//   const endDate =
//     selectedMonth === "All Months"
//       ? `${selectedYear}-12-31`
//       : new Date(selectedYear, monthIndex + 1, 0).toISOString().split("T")[0]; // Last day of selected month

//   const {
//     data: station,
//     isLoading,
//     error,
//   } = useGetSationPerformance(stationId.stationId, startDate, endDate);

//   const chartData = useMemo(() => {
//     if (!station) return [];

//     const passed = station.students?.passed?.total || 0;
//     const failed = station.students?.failed?.total || 0;
//     const total = station.students?.total || 0;

//     return [
//       {
//         name: selectedMonth,
//         total,
//         passed,
//         failed,
//       },
//     ];
//   }, [station, selectedMonth]);
//   console.log("station id is,,,, ", stationId.stationId);

//   return (
//     <div className="border p-5 w-full h-[500px]">
//       <h2 className="text-xl font-bold text-center mb-4">
//         Station Performances for..
//       </h2>

//       <div className="flex justify-between items-center mb-4">
//         <label className="font-semibold">Select Month:</label>
//         <select
//           className="border px-4 py-2 rounded-md bg-white"
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//         >
//           {monthOptions.map((month) => (
//             <option key={month} value={month}>
//               {month}
//             </option>
//           ))}
//         </select>
//       </div>

//       {isLoading ? (
//         <div className="flex justify-center items-center h-48">
//           <Loader size={32} className="animate-spin" color="black" />
//         </div>
//       ) : error ? (
//         <div className="text-center text-red-500">
//           Error loading station data.
//         </div>
//       ) : chartData &&
//         chartData.some(
//           (entry) => entry.total > 0 || entry.passed > 0 || entry.failed > 0
//         ) ? (
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar
//               dataKey="total"
//               fill="#8884d8"
//               name="Registered Students"
//               barSize={30}
//             />
//             <Bar
//               dataKey="passed"
//               fill="#4caf50"
//               name="Passed Students"
//               barSize={30}
//             />
//             <Bar
//               dataKey="failed"
//               fill="#e74c3c"
//               name="Failed Students"
//               barSize={30}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       ) : (
//         <div className="text-center flex items-center justify-center">
//           <p>
//             No data available for {selectedMonth} of {selectedYear}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { useState, useMemo } from "react";
import { Loader } from "lucide-react";
import { useGetSationPerformance } from "@/api/data";

const monthOptions = [
  "All Months",
  ...Array.from({ length: 12 }, (_, i) =>
    new Date(2025, i, 1).toLocaleString("default", { month: "long" })
  ),
];

export default function StationWiseStudentPerformance({
  stationId,
}: {
  stationId: string;
}) {
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);
  const selectedYear = 2025;

  const monthIndex = monthOptions.indexOf(selectedMonth) - 1;

  const startDate =
    selectedMonth === "All Months"
      ? null // Do not set start date
      : `${selectedYear}-${String(monthIndex + 1).padStart(2, "0")}-01`;

  const endDate =
    selectedMonth === "All Months"
      ? null // Do not set end date
      : new Date(selectedYear, monthIndex + 1, 0).toISOString().split("T")[0];

  // Call the hook with the stationId and dates only if not null
  const {
    data: station,
    isLoading,
    error,
  } = useGetSationPerformance(stationId, startDate, endDate);

  const chartData = useMemo(() => {
    if (!station) return [];

    const passed = station.students?.passed?.total || 0;
    const failed = station.students?.failed?.total || 0;
    const total = station.students?.total || 0;

    return [
      {
        name: selectedMonth,
        total,
        passed,
        failed,
      },
    ];
  }, [station, selectedMonth]);

  return (
    <div className="border p-5 w-full h-[500px]">
      <h2 className="text-xl font-bold text-center mb-4">
        Station Performance
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

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader size={32} className="animate-spin" color="black" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          Error loading station data.
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
  );
}
