"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  data: { name: string; value: number }[];
  title: string;
}

const COLORS = ["#4CAF50", "#FF5733"];

export default function MyBarChart({ data, title }: BarChartProps) {
  return (
    <div className="w-full  bg-white p-4 rounded-lg flex flex-col items-center justify-center">
      <h2 className="text-lg font-semibold mt-2 text-center">{title}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            cursor={false}
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.8)",
              border: "none",
              borderRadius: "2px",
              padding: "5px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              fontSize: "12px",
            }}
          />
          <Legend />
          <Bar dataKey="value" fill="#ae3ec9" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
