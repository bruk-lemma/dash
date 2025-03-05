"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface StackedBarChartProps {
  data: { name: string; passed: number; failed: number }[];
}

export default function StackedBarChart({ data }: StackedBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} stackOffset="sign">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="passed" stackId="a" fill="#4CAF50" />
        <Bar dataKey="failed" stackId="a" fill="#FF5733" />
      </BarChart>
    </ResponsiveContainer>
  );
}
