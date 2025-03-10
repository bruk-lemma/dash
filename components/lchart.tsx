"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  Cell,
} from "recharts";

// const COLORS = ["#2563EB", "#1D4ED8", "#0F766E", "#0EA5E9", "#0284C7"];
const COLORS = ["#7B1FA2", "#6A1B9A", "#8E24AA", "#9C27B0", "#AB47BC"];

export default function LicenseBarChart({
  licenseTypeData,
}: {
  licenseTypeData: Record<string, number>;
}) {
  const data = Object.entries(licenseTypeData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="w-full h-full p-1 flex flex-col items-center">
      <h2 className="text-lg font-semibold text-center mb-2">License Types</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 80 }} // Increased bottom margin
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            className="text-sm"
            //tick={{ angle: -45, textAnchor: "end" }} // Horizontal text
            tickLine={false}
            interval={0} // Ensure all ticks are visible
            padding={{ left: 10, right: 10 }} // Extra padding for better spacing
            dy={20} // Move labels down slightly to avoid overlap
          />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="value" barSize={60}>
            {" "}
            {/* Increased bar size */}
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
