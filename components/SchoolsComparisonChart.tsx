// "use client";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// interface SchoolComparisonProps {
//   data: {
//     name: string;
//     total: number;
//     passed: number;
//     failed: number;
//   }[];
// }

// export default function SchoolsComparisonChart({
//   data,
// }: SchoolComparisonProps) {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart
//         data={data}
//         margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" tick={{ fontSize: 12 }} />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="total" fill="#8884d8" name="Total Students" />
//         <Bar dataKey="passed" fill="#82ca9d" name="Passed Students" />
//         <Bar dataKey="failed" fill="#ff7675" name="Failed Students" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }
// "use client";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// interface StudentStats {
//   total: number;
//   passed: number;
//   failed: number;
// }

// interface StudentLineChartProps {
//   data: StudentStats[];
// }

// export default function StudentLineChart({ data }: StudentLineChartProps) {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <LineChart
//         data={data}
//         margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" tick={{ fontSize: 12 }} hide />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line
//           type="monotone"
//           dataKey="total"
//           stroke="#8884d8"
//           name="Total Students"
//         />
//         <Line
//           type="monotone"
//           dataKey="passed"
//           stroke="#82ca9d"
//           name="Passed Students"
//         />
//         <Line
//           type="monotone"
//           dataKey="failed"
//           stroke="#ff7675"
//           name="Failed Students"
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }
// "use client";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// interface StudentExamChartProps {
//   data: { name: string; passed: number; failed: number }[];
// }

// export default function StudentExamChart({ data }: StudentExamChartProps) {
//   return (
//     <div className="w-full h-[300px] border rounded-lg p-4 bg-white">
//       <h2 className="text-lg font-semibold text-center mb-2">
//         Passed vs Failed Students
//       </h2>
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="passed"
//             stroke="#4CAF50"
//             strokeWidth={2}
//           />
//           <Line
//             type="monotone"
//             dataKey="failed"
//             stroke="#F44336"
//             strokeWidth={2}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface StudentExamLineChartProps {
  data: { name: string; passed: number; failed: number; total: number }[];
}

export default function StudentExamLineChart({
  data,
}: StudentExamLineChartProps) {
  return (
    <div className="border p-5 w-full bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">
        Student Exam Results
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#2196F3"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="passed"
            stroke="#4CAF50"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="failed"
            stroke="#F44336"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
