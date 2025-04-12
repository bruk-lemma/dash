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
